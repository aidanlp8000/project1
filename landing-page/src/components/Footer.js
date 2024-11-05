import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-6 px-4 sm:px-8 border-t">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <p className="text-center sm:text-left">&copy; 2024 Make My List. All rights reserved.</p>
        <div className="flex space-x-4">
          <Link to="/privacy" className="text-gray-600 hover:text-black transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-gray-600 hover:text-black transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;