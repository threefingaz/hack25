import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImpactMetrics from '../components/ImpactMetrics';
import TestimonialCarousel from '../components/TestimonialCarousel';
import Navigation from '../components/Navigation';
// Import persona photos
import annaPhoto from '../assets/anna-photo.jpg';
import mehmetPhoto from '../assets/mehmet-photo.jpg';
import mariaPhoto from '../assets/maria-photo.jpg';

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedPersona, setSelectedPersona] = useState(null);

  const handleGetStarted = () => {
    navigate('/connect');
  };

  const handlePersonaSelect = (persona) => {
    setSelectedPersona(persona.id);
    // Store selected persona for session consistency
    sessionStorage.setItem('selectedPersona', persona.id);
    sessionStorage.setItem('selectedPersonaName', persona.name);
    sessionStorage.setItem('selectedPersonaBusiness', persona.business);
    
    // Auto-redirect to bank connection after persona selection
    setTimeout(() => {
      navigate('/connect');
    }, 1500); // Give users time to see their selection
  };

  const personas = [
    {
      id: 'anna',
      name: 'Anna Schmidt',
      business: 'Food Truck Owner',
      description: 'Runs a popular food truck with steady weekly patterns',
      photo: annaPhoto,
      accountType: 'Business',
      balance: '€2,847',
      averageMonthlyIncome: '€2,100',
      pattern: 'Weekly income patterns with weekend variations',
      expectedLoan: '€525',
      latestTransaction: {
        type: 'income',
        description: 'Weekend Food Sales',
        amount: '+€287',
        time: 'Today, 16:30',
        icon: '🚚',
        iconBg: 'bg-orange-100'
      },
      bgColor: 'bg-gray-900 text-white'
    },
    {
      id: 'mehmet',
      name: 'Mehmet Özkan',
      business: 'Online Retailer',
      description: 'E-commerce business with monthly promotional spikes',
      photo: mehmetPhoto,
      accountType: 'Business',
      balance: '€4,235',
      averageMonthlyIncome: '€3,500',
      pattern: 'Monthly spikes with consistent daily base income',
      expectedLoan: '€875',
      latestTransaction: {
        type: 'income',
        description: 'Online Store Revenue',
        amount: '+€156',
        time: 'Today, 14:20',
        icon: '🛒',
        iconBg: 'bg-blue-100'
      },
      bgColor: 'bg-orange-100'
    },
    {
      id: 'maria',
      name: 'Maria Rodriguez',
      business: 'Event Planner',
      description: 'Freelance event planner with seasonal variations',
      photo: mariaPhoto,
      accountType: 'Business',
      balance: '€1,923',
      averageMonthlyIncome: '€1,800',
      pattern: 'Seasonal patterns with holiday boosts',
      expectedLoan: '€450',
      latestTransaction: {
        type: 'expense',
        description: 'Event Equipment',
        amount: '-€89',
        time: 'Yesterday, 11:45',
        icon: '🎉',
        iconBg: 'bg-purple-100'
      },
      bgColor: 'bg-green-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Combined Hero and Persona Section */}
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start" style={{ minHeight: '700px' }}>
          {/* Left side - Hero content */}
          <div className="max-w-xl">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              For businesses who need instant credit
            </h1>
            
            <p className="text-xl text-gray-600 mb-2">
              CashFlow Bridge is the{' '}
              <span className="font-semibold text-gray-900">instant credit approval system</span>
            </p>
            <p className="text-xl text-gray-600 mb-8">
              for businesses building a valuable future
            </p>

            <button
              onClick={handleGetStarted}
              className="bg-blue-600 text-white font-semibold text-lg px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg"
            >
              Get Started - Free Analysis
            </button>

            <p className="text-sm text-gray-500 mt-4">
              No credit checks • Instant approval
            </p>
          </div>

          {/* Right side - Persona cards */}
          <div className="relative" style={{ minHeight: '650px' }}>
            <div className="grid grid-cols-2 gap-4 h-full">
              {/* Left column - Mehmet card */}
              <div className="flex flex-col justify-center">
                <div 
                  onClick={() => handlePersonaSelect(personas[1])}
                  className={`relative w-full overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 cursor-pointer hover:scale-105 ${
                    selectedPersona === personas[1].id ? 'ring-4 ring-blue-500' : ''
                  }`}
                  style={{ 
                    height: '380px',
                    backgroundImage: `url(${personas[1].photo})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.8)'
                  }}
                >
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                  
                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-6 text-white z-10">
                    <h2 className="text-3xl font-bold mb-2">{personas[1].name}</h2>
                    <p className="text-lg font-medium mb-1">{personas[1].business}</p>
                    <p className="text-sm opacity-80">{personas[1].description}</p>
                  </div>
                </div>
              </div>

              {/* Right column - Anna and Maria cards */}
              <div className="flex flex-col gap-4">
                {/* Top right card - Anna */}
                <div 
                  onClick={() => handlePersonaSelect(personas[0])}
                  className={`relative w-full overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 cursor-pointer hover:scale-105 ${
                    selectedPersona === personas[0].id ? 'ring-4 ring-blue-500' : ''
                  }`}
                  style={{ 
                    height: '320px',
                    backgroundImage: `url(${personas[0].photo})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.95)'
                  }}
                >
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-6 text-white z-10">
                    <h2 className="text-2xl font-bold mb-1">{personas[0].name}</h2>
                    <p className="text-lg font-medium opacity-90">{personas[0].business}</p>
                  </div>
                </div>

                {/* Bottom right card - Maria */}
                <div 
                  onClick={() => handlePersonaSelect(personas[2])}
                  className={`relative w-full overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 cursor-pointer hover:scale-105 ${
                    selectedPersona === personas[2].id ? 'ring-4 ring-blue-500' : ''
                  }`}
                  style={{ 
                    height: '300px',
                    backgroundImage: `url(${personas[2].photo})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.85)'
                  }}
                >
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  
                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-6 text-white z-10">
                    <h2 className="text-2xl font-bold mb-1">{personas[2].name}</h2>
                    <p className="text-lg font-medium mb-1">{personas[2].business}</p>
                    <p className="text-sm opacity-80">{personas[2].description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {selectedPersona && (
          <div className="text-center mt-12">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 inline-block">
              <p className="text-blue-800 font-medium mb-2">
                ✨ Starting demo for {personas.find(p => p.id === selectedPersona)?.name}
              </p>
              <p className="text-sm text-blue-600">
                You'll now experience their complete loan application journey.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* How It Works */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">1. Connect Your Bank</h3>
                <p className="text-gray-600">Securely connect your business bank account in seconds</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">2. Analyze Cash Flow</h3>
                <p className="text-gray-600">We analyze your real business cash flow patterns</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">3. Get Instant Approval</h3>
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
              Join thousands of businesses getting faster access to capital
            </p>
            <button
              onClick={handleGetStarted}
              className="bg-white text-blue-700 font-bold text-lg px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg transform hover:scale-105"
            >
              Start Your Application
            </button>
            <p className="text-sm text-blue-200 mt-4">
              Free analysis • No commitment • 2 minutes to complete
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;