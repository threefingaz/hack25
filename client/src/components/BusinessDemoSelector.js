import React, { useState } from 'react';
// Import persona photos
import annaPhoto from '../assets/anna-photo.jpg';
import mehmetPhoto from '../assets/mehmet-photo.jpg';
import mariaPhoto from '../assets/maria-photo.jpg';

const BusinessDemoSelector = ({ onPersonaSelect }) => {
  const [selectedPersona, setSelectedPersona] = useState(null);


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
      }
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
      featured: true
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
      }
    }
  ];

  const handlePersonaClick = (persona) => {
    setSelectedPersona(persona.id);
    // Store selected persona for session consistency
    sessionStorage.setItem('selectedPersona', persona.id);
    sessionStorage.setItem('selectedPersonaName', persona.name);
    sessionStorage.setItem('selectedPersonaBusiness', persona.business);
    
    // Call the callback to notify parent component
    if (onPersonaSelect) {
      onPersonaSelect(persona);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Choose Your Business Demo
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select a business profile to see how CashFlow Bridge analyzes different types of cash flow patterns and provides personalized credit offers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {personas.map((persona) => (
          <div
            key={persona.id}
            className={`relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
              selectedPersona === persona.id ? 'ring-4 ring-blue-500 shadow-2xl' : 'shadow-lg hover:shadow-xl'
            } ${persona.featured ? 'md:scale-105' : ''}`}
            onClick={() => handlePersonaClick(persona)}
            style={{ minHeight: '500px' }}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${persona.photo})`,
                filter: 'brightness(0.9)'
              }}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            {/* Content */}
            <div className="relative h-full flex flex-col justify-between p-6 text-white">
              {/* Top Section - Account Info */}
              <div>
                <div className="mb-4">
                  <p className="text-sm opacity-80 mb-1">{persona.accountType}</p>
                  <p className="text-4xl font-bold">{persona.balance}</p>
                </div>
                
                <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-colors">
                  Konten
                </button>
              </div>
              
              {/* Bottom Section - Transaction */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 text-gray-900">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
                      persona.latestTransaction.iconBg || 'bg-gray-100'
                    }`}>
                      {persona.latestTransaction.icon}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{persona.latestTransaction.description}</p>
                      <p className="text-xs text-gray-500">{persona.latestTransaction.time}</p>
                    </div>
                  </div>
                  <p className={`font-bold ${
                    persona.latestTransaction.type === 'income' 
                      ? 'text-green-600' 
                      : 'text-gray-900'
                  }`}>
                    {persona.latestTransaction.amount}
                  </p>
                </div>
              </div>
              
              {/* Selection Indicator */}
              {selectedPersona === persona.id && (
                <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Selected
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedPersona && (
        <div className="text-center mt-8">
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
  );
};

export default BusinessDemoSelector;