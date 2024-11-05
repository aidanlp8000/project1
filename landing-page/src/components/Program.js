import React, { useState } from 'react';
import { Upload, Camera, FileText, CheckCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '../components/ui/alert';
import { ImageProcessingService } from '../services/ImageProcessingService';

const Program = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [processingStatus, setProcessingStatus] = useState('idle');
  const [analysisResults, setAnalysisResults] = useState(null);
  const [error, setError] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-blue-500');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('border-blue-500');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-blue-500');
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = async (files) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      setError('Please upload image files only');
      return;
    }

    setError(null);
    setUploadedFiles(prev => [...prev, ...imageFiles]);
    setProcessingStatus('processing');

    try {
      const responses = await ImageProcessingService.processImages(imageFiles);
      console.log('API responses:', responses); // For debugging
      
      const formattedItems = ImageProcessingService.formatResults(responses);
      console.log('Formatted items:', formattedItems); // For debugging
      
      const totalValue = formattedItems.reduce((sum, item) => sum + (item.price || 0), 0);

      setAnalysisResults({
        items: formattedItems,
        totalValue: totalValue,
        confidence: 0.92
      });
    } catch (error) {
      console.error('Error processing images:', error);
      setError('Failed to process images. Please try again.');
    } finally {
      setProcessingStatus('complete');
    }
  };

  const handleAddMorePhotos = () => {
    document.getElementById('file-input').click();
  };

  const handleGenerateReport = () => {
    // Implement report generation logic here
    console.log('Generating report...');
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="h-full max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Contents Claim Generator</h1>
          <p className="text-gray-600">Upload photos of your items to generate a detailed claim list</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-8">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed border-gray-300 rounded-lg p-8 mb-8 text-center transition-colors hover:border-blue-400 bg-white ${
            !uploadedFiles.length && !analysisResults ? 'min-h-[60vh] flex items-center justify-center' : ''
          }`}
        >
          <div className="flex flex-col items-center space-y-4">
            <Upload size={48} className="text-blue-500" />
            <div>
              <p className="text-lg font-medium">Drag and drop your photos here</p>
              <p className="text-gray-500">or</p>
              <label className="inline-block mt-2">
                <input
                  id="file-input"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                />
                <span className="bg-blue-500 text-white px-6 py-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors">
                  Browse Files
                </span>
              </label>
            </div>
          </div>
        </div>

        {processingStatus === 'processing' && (
          <Alert className="mb-8">
            <div className="flex items-center">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2" />
              <AlertTitle>Processing Your Images</AlertTitle>
            </div>
            <AlertDescription>
              Analyzing items and retrieving product information...
            </AlertDescription>
          </Alert>
        )}

        {analysisResults && (
          <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Analysis Complete</AlertTitle>
              <AlertDescription>
                We've identified {analysisResults.items.length} items with {(analysisResults.confidence * 100).toFixed(1)}% confidence
              </AlertDescription>
            </Alert>

            <div className="bg-white rounded-lg overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h2 className="text-xl font-semibold">Identified Items</h2>
              </div>
              <div className="p-4 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="pb-2">Item</th>
                      <th className="pb-2">Brand</th>
                      <th className="pb-2">Model</th>
                      <th className="pb-2">Condition</th>
                      <th className="pb-2">Source</th>
                      <th className="pb-2 text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysisResults.items.map((item, index) => (
                      <tr key={index} className="border-b last:border-0">
                        <td className="py-3">{item.name}</td>
                        <td className="py-3">{item.brand}</td>
                        <td className="py-3">{item.model}</td>
                        <td className="py-3">{item.condition}</td>
                        <td className="py-3">{item.website}</td>
                        <td className="py-3 text-right">${typeof item.price === 'number' ? item.price.toFixed(2) : '0.00'}</td>
                      </tr>
                    ))}
                    <tr className="font-semibold bg-gray-50">
                      <td colSpan={5} className="py-3">Total Value</td>
                      <td className="py-3 text-right">${analysisResults.totalValue.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button 
                onClick={handleAddMorePhotos}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
              >
                <Camera className="w-4 h-4 mr-2" />
                Add More Photos
              </button>
              <button 
                onClick={handleGenerateReport}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
              >
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </button>
            </div>
          </div>
        )}

        {uploadedFiles.length > 0 && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Uploaded Photos</h3>
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="relative w-full pb-[100%]">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Uploaded file ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Program;