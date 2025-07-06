import React, { useState, useEffect } from 'react';

const HeroSection = ({ onGetStarted, onWatchDemo }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const rotatingTexts = [
    "Get instant credit approval based on your real cash flow",
    "Skip weeks of paperwork with AI-powered decisions",
    "Access working capital in 24 hours, not months"
  ];

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full filter blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-5xl mx-auto text-center text-white">
          {/* Main headline */}
          <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                CashFlow Bridge
              </span>
            </h1>
          </div>

          {/* Rotating subtitle */}
          <div className={`h-16 mb-8 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-xl md:text-2xl text-blue-100 transition-all duration-500">
              {rotatingTexts[currentTextIndex]}
            </p>
          </div>

          {/* Value proposition */}
          <div className={`transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-lg mb-12 text-blue-200 max-w-3xl mx-auto leading-relaxed">
              Connect your bank account, let our AI analyze your cash flow patterns, and receive personalized credit offers in seconds. No paperwork, no waiting, no traditional credit checks.
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <button
              onClick={onGetStarted}
              className="bg-white text-blue-700 font-bold text-lg px-8 py-4 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-xl transform hover:scale-105 hover:shadow-2xl group"
            >
              <span className="flex items-center">
                Get Started - Free Analysis
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            
            <button
              onClick={onWatchDemo}
              className="border-2 border-white text-white font-semibold text-lg px-8 py-4 rounded-lg hover:bg-white hover:text-blue-700 transition-all duration-200 transform hover:scale-105 group"
            >
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Watch Demo (2 min)
              </span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className={`transition-all duration-1000 delay-900 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex flex-wrap justify-center items-center gap-8 text-blue-200 text-sm mb-8">
              <div className="flex items-center bg-white bg-opacity-10 rounded-full px-4 py-2">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                No credit checks
              </div>
              <div className="flex items-center bg-white bg-opacity-10 rounded-full px-4 py-2">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Funds in 24 hours
              </div>
              <div className="flex items-center bg-white bg-opacity-10 rounded-full px-4 py-2">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                BaFin regulated
              </div>
            </div>

            {/* Security badges */}
            <div className="flex justify-center items-center space-x-6 text-blue-200 text-xs">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                256-bit SSL encryption
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                GDPR compliant
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Read-only bank access
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;