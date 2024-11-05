import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import DemoPage from './pages/DemoPage';
import TablePage from './pages/TablePage';
import Program from './components/Program';

function App() {
  // Define which routes should have padding-top for the fixed navbar
  const routesWithPadding = ['/program']; // Add routes that need padding here

  const getContentClass = (pathname) => {
    const baseClasses = "flex-grow";
    return routesWithPadding.includes(pathname) 
      ? `${baseClasses} pt-16` // Add padding for fixed navbar
      : baseClasses;
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white text-black font-sans">
        {/* Conditionally render Navbar based on route */}
        <Routes>
          <Route path="/program" element={<Navbar variant="minimal" />} />
          <Route path="*" element={<Navbar />} />
        </Routes>

        {/* Main content with conditional padding */}
        <main className={getContentClass(window.location.pathname)}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/demo" element={<DemoPage />} />
            <Route path="/table" element={<TablePage />} />
            <Route path="/program" element={<Program />} />
          </Routes>
        </main>

        {/* Conditionally render Footer based on route */}
        <Routes>
          <Route path="/program" element={null} /> {/* No footer on program page */}
          <Route path="*" element={<Footer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;