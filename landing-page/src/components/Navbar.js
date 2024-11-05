import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="py-6 px-4 sm:px-8 border-b fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50">
      <nav className="flex justify-between items-center max-w-7xl mx-auto relative">
        <h1 className="text-2xl font-bold z-10">
          <Link to="/">Make My List</Link>
        </h1>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden z-10 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span className={`w-full h-0.5 bg-black transform transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-full h-0.5 bg-black transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-full h-0.5 bg-black transform transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex space-x-8">
          <li>
            <Link to="/" className={`hover:text-gray-600 transition-colors ${location.pathname === '/' ? 'text-blue-500' : ''}`}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/demo" className={`hover:text-gray-600 transition-colors ${location.pathname === '/demo' ? 'text-blue-500' : ''}`}>
              Demo
            </Link>
          </li>
          <li>
            <Link to="/table" className={`hover:text-gray-600 transition-colors ${location.pathname === '/table' ? 'text-blue-500' : ''}`}>
              Table
            </Link>
          </li>
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex space-x-4">
          <button className="px-4 py-2 border border-black rounded-full hover:bg-gray-100 transition-colors">
            Log In
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
            Book a Demo
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`
          lg:hidden fixed inset-0 bg-white transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
          <div className="flex flex-col h-full pt-24 px-8">
            <ul className="space-y-6 text-lg">
              <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
              <li><Link to="/demo" onClick={() => setIsMobileMenuOpen(false)}>Demo</Link></li>
              <li><Link to="/table" onClick={() => setIsMobileMenuOpen(false)}>Table</Link></li>
            </ul>
            <div className="mt-8 space-y-4">
              <button className="w-full px-4 py-2 border border-black rounded-full hover:bg-gray-100 transition-colors">
                Log In
              </button>
              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
                Book a Demo
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;