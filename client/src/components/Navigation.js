import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getButtonClasses, getContainerClasses, getTextClasses } from '../design-system/utils';

const Navigation = () => {
  const navigate = useNavigate();
  
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 z-50">
      <div className={getContainerClasses()}>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                <svg 
                  className="w-5 h-5 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" 
                  />
                </svg>
              </div>
              <span className={getTextClasses('h5') + ' group-hover:text-slate-700 transition-colors'}>
                CashFlow Bridge
              </span>
            </div>
          </Link>
          
          {/* Navigation items */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="#features" 
              className="text-gray-600 hover:text-slate-900 font-medium text-sm transition-colors relative group"
            >
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-slate-900 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link 
              to="#use-cases" 
              className="text-gray-600 hover:text-slate-900 font-medium text-sm transition-colors relative group"
            >
              Use Cases
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-slate-900 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link 
              to="#resources" 
              className="text-gray-600 hover:text-slate-900 font-medium text-sm transition-colors relative group"
            >
              Resources
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-slate-900 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link 
              to="#pricing" 
              className="text-gray-600 hover:text-slate-900 font-medium text-sm transition-colors relative group"
            >
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-slate-900 transition-all duration-200 group-hover:w-full"></span>
            </Link>
          </div>
          
          {/* CTA buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/connect')}
              className={getButtonClasses('ghost', 'sm')}
            >
              Log in
            </button>
            <button
              onClick={() => navigate('/connect')}
              className={getButtonClasses('outline', 'sm') + ' !bg-slate-900 !text-white !border-slate-900 hover:!bg-slate-800'}
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