import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export class ImageProcessingService {
  static async processImages(files) {
    const responses = [];
    
    for (const file of files) {
      try {
        // Convert file to base64
        const base64Image = await this.fileToBase64(file);
        
        // Process with OpenAI
        const response = await openai.chat.completions.create({
          model: "gpt-4o",  // Changed from gpt-4o to gpt-4-vision-preview
          messages: [
            {
              role: "system",
              content: "Extract information from images to gather details including the name, model, price, and the source of the price for each item depicted.\n\nYou will need to look up these items online to verify and gather the required information accurately.\n\n# Steps\n\n1. **Identify Items**: Analyze the image to identify all the items depicted, focusing on distinct features, labels, or branding that can assist in online searches.\n  \n2. **Search Online**: Using the identified features, search online resources to gather comprehensive information about each item:\n     - Look for the item's name and model, if applicable.\n     - Verify the current price from trusted sources.\n     - Determine the source of the price, such as online retailers or marketplaces.\n- If you cant find the price of the exact item, find something similar and or newer model. \n- Prioritize big box retails ie: target, best buy, home depot. Do not use used pricing from websites like ebay.\n- Adding an accurate price should be a priority. If you cant find the exact pricing find the newest model or something similar to that model and return the price of it.\n    \n3. **Record Information**: Document all gathered information accurately, ensuring all fields are correctly filled in for each item.\n\n# Output Format\n\nProvide the output in a structured JSON format with the following fields:\n- `\"name\"`: The name of the item.\n- `\"model\"`: The model of the item (if applicable).\n- `\"price\"`: The price of the item.\n- `\"source\"`: The source of the price.\n\nExample JSON:\n```json\n{\n  \"items\": [\n    {\n      \"name\": \"Example Item\",\n      \"model\": \"Model XYZ\",\n      \"price\": \"$199.99\",\n      \"source\": \"Amazon\"\n    },\n    {\n      \"name\": \"Another Item\",\n      \"model\": N/A,\n      \"price\": \"$29.99\",\n      \"source\": \"Target\"\n    }\n  ]\n}\n```\n\n# Notes\n\n- Ensure accuracy in identifying the items and their details to maintain credibility.\n- When multiple prices or sources are found, opt for the most reliable and widely recognized option.\n- If certain information cannot be found, use `N/A` for that field in the JSON output."
            },
            {
              role: "user",
              content: [
                {
                  type: "image_url",
                  image_url: {
                    url: `data:image/jpeg;base64,${base64Image}`
                  }
                },
              ]
            }
          ],
          max_tokens: 4096,
          temperature: 0.5,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
          response_format: {
            "type": "json_object"
          }
        });

        // Parse the response
        let parsedResponse;
        try {
          parsedResponse = {
            name: response.choices[0].message.content || "Error processing image",
            model: "N/A",
            retail_price: 0,
            website: "N/A"
          };
        } catch (parseError) {
          console.error('Error parsing response:', parseError);
          parsedResponse = {
            name: "Error processing image",
            model: "N/A",
            retail_price: 0,
            website: "N/A"
          };
        }

        responses.push(parsedResponse);
      } catch (error) {
        console.error('Error processing image:', error);
        responses.push({
          name: "Error processing image",
          model: "N/A",
          retail_price: 0,
          website: "N/A"
        });
      }
    }
    
    return responses;
  }

  static fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  }

  static formatResults(responses) {
    return responses.map(response => {
      let parsedItems = [];
      try {
        // Parse the JSON string if it's a string
        const content = typeof response.name === 'string' ? JSON.parse(response.name) : response.name;
        
        // Extract items array from the parsed content
        if (content && content.items && Array.isArray(content.items)) {
          parsedItems = content.items.map(item => ({
            name: item.name || "Unknown Item",
            brand: "Auto-detected",
            model: item.model || "N/A",
            price: this.parsePrice(item.price),
            condition: "Assessed",
            website: item.source || "N/A"
          }));
        }
      } catch (error) {
        console.error('Error parsing response:', error);
        parsedItems = [{
          name: "Error processing image",
          brand: "Auto-detected",
          model: "N/A",
          price: 0,
          condition: "Assessed",
          website: "N/A"
        }];
      }
      return parsedItems;
    }).flat();
  }

  static parsePrice(priceString) {
    if (!priceString) return 0;
    // Remove currency symbol and convert to number
    const numericPrice = parseFloat(priceString.replace(/[$,]/g, ''));
    return isNaN(numericPrice) ? 0 : numericPrice;
  }
}