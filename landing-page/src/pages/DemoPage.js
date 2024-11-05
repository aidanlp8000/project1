import React from 'react';
import DemoSection from '../components/DemoSection';

const DemoPage = () => {
  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Try Make My List
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience firsthand how our AI-powered system transforms your photos into detailed claim lists.
          </p>
        </div>
        
        <DemoSection />

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">Ready to streamline your claims process?</p>
          <button className="bg-blue-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105">
            Start Free Trial
          </button>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;