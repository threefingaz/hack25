import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();
  
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-gray-900">CashFlow Bridge</span>
          </Link>
          
          {/* Navigation items */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="#features" className="text-gray-600 hover:text-gray-900 font-medium">
              Features
            </Link>
            <Link to="#use-cases" className="text-gray-600 hover:text-gray-900 font-medium">
              Use Cases
            </Link>
            <Link to="#resources" className="text-gray-600 hover:text-gray-900 font-medium">
              Resources
            </Link>
            <Link to="#pricing" className="text-gray-600 hover:text-gray-900 font-medium">
              Pricing
            </Link>
          </div>
          
          {/* CTA buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/connect')}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Log in
            </button>
            <button
              onClick={() => navigate('/connect')}
              className="bg-black text-white font-medium px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;