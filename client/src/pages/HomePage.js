import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import PersonaSelector from '../components/PersonaSelector';
import ImpactMetrics from '../components/ImpactMetrics';
import TestimonialCarousel from '../components/TestimonialCarousel';

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedPersona, setSelectedPersona] = useState(null);

  const handleGetStarted = () => {
    navigate('/connect');
  };

  const handleWatchDemo = () => {
    // Scroll to persona selector for demo selection
    const personaSection = document.getElementById('persona-selector');
    if (personaSection) {
      personaSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePersonaSelect = (persona) => {
    setSelectedPersona(persona);
    // Auto-scroll to call to action after selection
    setTimeout(() => {
      const ctaSection = document.getElementById('cta-section');
      if (ctaSection) {
        ctaSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection 
        onGetStarted={handleGetStarted}
        onWatchDemo={handleWatchDemo}
      />

      {/* Persona Selector */}
      <div id="persona-selector" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <PersonaSelector onPersonaSelect={handlePersonaSelect} />
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Connect Your Bank</h3>
                <p className="text-gray-600">Securely connect your business bank account in seconds</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Analyze Cash Flow</h3>
                <p className="text-gray-600">We analyze your real business cash flow patterns</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Get Instant Approval</h3>
                <p className="text-gray-600">Receive your personalized credit offer in seconds</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Metrics */}
      <ImpactMetrics />

      {/* Testimonials */}
      <TestimonialCarousel />

      {/* CTA Section */}
      <div id="cta-section" className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              {selectedPersona 
                ? `Experience the ${selectedPersona.name} demo and see your personalized credit offer`
                : 'Join thousands of businesses getting faster access to capital'
              }
            </p>
            <button
              onClick={handleGetStarted}
              className="bg-white text-blue-700 font-bold text-lg px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg transform hover:scale-105"
            >
              {selectedPersona ? 'Start Demo Application' : 'Start Your Application'}
            </button>
            <p className="text-sm text-blue-200 mt-4">
              Free analysis • No commitment • 2 minutes to complete
            </p>
            {selectedPersona && (
              <p className="text-xs text-blue-300 mt-2">
                Demo will use {selectedPersona.name}'s business profile
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;