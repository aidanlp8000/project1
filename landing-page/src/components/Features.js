import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FeatureDemo = ({ feature }) => {
  const [demoState, setDemoState] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDemoState((prevState) => (prevState + 1) % 3);
    }, 1500); // Reduced from 2000ms to 1500ms
    return () => clearInterval(timer);
  }, []);

  const renderDemo = () => {
    switch (feature.title) {
      case "Advanced Item Identification":
        return (
          <svg width="300" height="300" viewBox="0 0 300 300">
            <rect x="75" y="75" width="150" height="150" fill="#f0f0f0" />
            {demoState > 0 && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <rect x="90" y="90" width="45" height="45" fill="#f44336" />
                <rect x="150" y="150" width="60" height="60" fill="#2196F3" />
              </motion.g>
            )}
            {demoState > 1 && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <text x="112" y="82" fontSize="15" fill="#f44336">Chair</text>
                <text x="180" y="142" fontSize="15" fill="#2196F3">Table</text>
              </motion.g>
            )}
          </svg>
        );
      case "Photo to Itemized List":
        return (
          <svg width="300" height="300" viewBox="0 0 300 300">
            <rect x="75" y="75" width="150" height="150" fill="#f0f0f0" />
            {demoState > 0 && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <rect x="90" y="90" width="120" height="15" fill="#333" />
                <rect x="90" y="120" width="90" height="15" fill="#333" />
                <rect x="90" y="150" width="105" height="15" fill="#333" />
              </motion.g>
            )}
            {demoState > 1 && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <rect x="15" y="240" width="270" height="45" fill="#4CAF50" />
                <text x="150" y="270" textAnchor="middle" fill="white" fontSize="20">Itemized List Generated</text>
              </motion.g>
            )}
          </svg>
        );
      case "Accurate Pricing":
        return (
          <svg width="300" height="300" viewBox="0 0 300 300">
            <rect x="75" y="75" width="150" height="150" fill="#f0f0f0" />
            {demoState > 0 && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <text x="150" y="130" textAnchor="middle" fontSize="20" fill="#333">Item: Chair</text>
                <motion.text 
                  x="150" 
                  y="170" 
                  textAnchor="middle" 
                  fontSize="24" 
                  fill="#4CAF50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  $149.99
                </motion.text>
              </motion.g>
            )}
            {demoState > 1 && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <text x="150" y="210" textAnchor="middle" fontSize="16" fill="#2196F3">Source: TopFurniture.com</text>
              </motion.g>
            )}
          </svg>
        );
      case "Time-Saving Automation":
        return (
          <svg width="300" height="300" viewBox="0 0 300 300">
            <circle cx="150" cy="150" r="120" fill="#f0f0f0" />
            <motion.line
              x1="150"
              y1="150"
              x2="150"
              y2="70"
              stroke="#333"
              strokeWidth="4"
              animate={{ rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }} // Reduced from 10s to 5s
              style={{ transformOrigin: '150px 150px' }}
            />
            {demoState > 0 && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <text x="150" y="190" textAnchor="middle" fontSize="20" fill="#333">Processing Claims</text>
              </motion.g>
            )}
            {demoState > 1 && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <text x="150" y="220" textAnchor="middle" fontSize="18" fill="#4CAF50">Time Saved: 80%</text>
              </motion.g>
            )}
          </svg>
        );
      case "Comprehensive Documentation":
        return (
          <svg width="300" height="300" viewBox="0 0 300 300">
            <rect x="75" y="75" width="150" height="200" fill="#f0f0f0" />
            {demoState > 0 && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <rect x="90" y="90" width="120" height="15" fill="#333" />
                <rect x="90" y="115" width="90" height="15" fill="#333" />
                <rect x="90" y="140" width="105" height="15" fill="#333" />
              </motion.g>
            )}
            {demoState > 1 && (
              <motion.g>
                <motion.rect
                  x="90"
                  y="165"
                  width="0"
                  height="15"
                  fill="#4CAF50"
                  animate={{ width: 120 }}
                  transition={{ duration: 0.5 }} // Reduced from 1s to 0.5s
                />
                <motion.text
                  x="90"
                  y="200"
                  fontSize="16"
                  fill="#2196F3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }} // Reduced delay from 1s to 0.5s
                >
                  Report Complete
                </motion.text>
              </motion.g>
            )}
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center items-center">
      {renderDemo()}
    </div>
  );
};

const FeatureCard = ({ feature }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.3 }} // Reduced from default to 0.3s
    className="flex flex-col md:flex-row items-center justify-center max-w-5xl mx-auto mb-16"
  >
    <div className="w-full md:w-1/2 md:pr-8 mb-8 md:mb-0">
      <div className="text-5xl mb-4">{feature.icon}</div>
      <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
      <p className="text-lg text-gray-600 mb-4">{feature.description}</p>
      <p className="text-base text-gray-800">{feature.details}</p>
    </div>
    <div className="w-full md:w-1/2">
      <FeatureDemo feature={feature} />
    </div>
  </motion.div>
);

const Features = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const featuresList = [
    {
      title: "Advanced Item Identification",
      description: "Our AI recognizes items in images, extracting names, models, and other key details.",
      icon: "🔍🖼️",
      details: "Using state-of-the-art machine learning algorithms, we can identify thousands of different items, including brand names and model numbers, ensuring accurate documentation."
    },
    {
      title: "Photo to Itemized List",
      description: "Upload photos and get detailed, itemized loss lists automatically.",
      icon: "📸➡️📋",
      details: "Our advanced AI processes your photos in seconds, identifying items and creating a comprehensive list. This saves hours of manual work and ensures nothing is missed."
    },
    {
      title: "Accurate Pricing",
      description: "Retrieve current market prices from reputable online retailers for each item.",
      icon: "💲📊",
      details: "We cross-reference identified items with current prices from multiple online retailers, providing you with the most up-to-date and accurate valuation for your claims."
    },
    {
      title: "Time-Saving Automation",
      description: "Eliminate manual data entry and speed up the claims process significantly.",
      icon: "⏱️🚀",
      details: "What used to take weeks can now be done in minutes. Our automation reduces human error and allows you to process claims faster than ever before."
    },
    {
      title: "Comprehensive Documentation",
      description: "Generate complete, credible claim lists for insurance, restoration, or inventory purposes.",
      icon: "📄✅",
      details: "Our detailed reports include all necessary information for your claims, formatted to industry standards. This ensures smooth processing and reduces the likelihood of claim disputes."
    }
  ];

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <AnimatePresence mode="wait">
            <FeatureCard key={currentFeature} feature={featuresList[currentFeature]} />
          </AnimatePresence>
        </div>
        <div className="flex justify-center mt-10">
          {featuresList.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentFeature(index)}
              className={`w-3 h-3 rounded-full mx-1 ${
                index === currentFeature ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;