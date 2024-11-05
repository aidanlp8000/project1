import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DemoSection = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = async (files) => {
    setUploadedFiles(files);
    setIsProcessing(true);
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setShowResults(true);
  };

  const dropzoneClasses = `
    relative rounded-lg border-2 border-dashed p-12 
    transition-colors duration-300 ease-in-out
    ${isDragging 
      ? 'border-blue-500 bg-blue-50' 
      : 'border-gray-300 hover:border-blue-400'
    }
  `;

  return (
    <section id="demo" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            See It In Action
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload photos of your items and watch as they're automatically converted into a detailed list.
          </p>
        </div>

        {/* Upload Area */}
        <div className="mb-12">
          <div
            className={dropzoneClasses}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              multiple
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileInput}
              accept="image/*"
            />
            <div className="text-center">
              <div className="text-4xl mb-4">📸</div>
              <p className="text-lg mb-2">
                Drag and drop your photos here
              </p>
              <p className="text-sm text-gray-500">
                or click to select files
              </p>
            </div>
          </div>

          {/* File List */}
          {uploadedFiles.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Uploaded Files:</h3>
              <ul className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">📄</span>
                    {file.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Processing Status */}
          {isProcessing && (
            <div className="mt-6 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
              <p className="mt-2 text-gray-600">Processing your images...</p>
            </div>
          )}
        </div>

        {/* Results Table */}
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ItemsTable />
            <div className="mt-8 text-center">
              <button className="bg-blue-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105">
                Download Report
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

const ItemsTable = () => {
  const items = [
    {
      name: "Samsung Smart TV",
      model: "QN65Q80B",
      price: 997.99,
      source: "Best Buy"
    },
    {
      name: "KitchenAid Stand Mixer",
      model: "KSM150PSER",
      price: 429.99,
      source: "Amazon"
    },
    {
      name: "Dyson Vacuum",
      model: "V15 Detect",
      price: 749.99,
      source: "Dyson"
    },
    {
      name: "Apple MacBook Pro",
      model: "MVVJ2LL/A",
      price: 1299.00,
      source: "Apple Store"
    },
    {
      name: "Pottery Barn Sofa",
      model: "PB Comfort Roll Arm",
      price: 2199.00,
      source: "Pottery Barn"
    }
  ];

  return (
    <div className="w-full rounded-lg border bg-white shadow">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Identified Items</h2>
      </div>
      <div className="p-4">
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4 text-left font-semibold text-gray-900">Name</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-900">Model</th>
                <th className="py-3 px-4 text-right font-semibold text-gray-900">Price</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-900">Source</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr 
                  key={index}
                  className="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 font-medium">{item.name}</td>
                  <td className="py-3 px-4 font-mono text-sm">{item.model}</td>
                  <td className="py-3 px-4 text-right">
                    ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-4">{item.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-between items-center text-sm text-gray-500 px-4">
            <div>Showing {items.length} items</div>
            <div className="font-medium">
              Total: ${items.reduce((sum, item) => sum + item.price, 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoSection;