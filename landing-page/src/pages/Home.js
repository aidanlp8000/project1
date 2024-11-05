import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Typewriter from '../components/Typewriter';
import Features from '../components/Features';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    const subtitleTimer = setTimeout(() => {
      setShowSubtitle(true);
    }, 3500);

    return () => {
      clearTimeout(timer);
      clearTimeout(subtitleTimer);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <main className="flex-grow pt-24">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex items-center justify-center px-4 sm:px-8">
        <motion.div
          className="max-w-6xl mx-auto w-full"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <div className="flex flex-col items-center justify-center text-center">
            <motion.h1 variants={itemVariants} className="text-8xl md:text-9xl font-bold mb-4 leading-none text-gray-800">
              <Typewriter text="Make My List" speed={150} />
            </motion.h1>
            
            {showSubtitle && (
              <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-light mb-8 text-gray-600 max-w-xl">
                <Typewriter text="Automation for contents claims, made easy." speed={75} />
              </motion.h2>
            )}
            
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-600 max-w-2xl mb-12">
              Quickly turn photos into detailed contents claim lists.
            </motion.p>
            
            <motion.button 
              variants={itemVariants}
              className="bg-blue-500 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <Features />
      </section>
    </main>
  );
};

export default Home;