import React, { useState } from 'react';

const PersonaSelector = ({ onPersonaSelect }) => {
  const [selectedPersona, setSelectedPersona] = useState(null);

  const personas = [
    {
      id: 'anna',
      name: 'Anna Schmidt',
      business: 'Food Truck Owner',
      description: 'Runs a popular food truck with steady weekly patterns',
      averageMonthlyIncome: '€2,100',
      pattern: 'Weekly income patterns with weekend variations',
      icon: '🚚',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-800',
      buttonColor: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      id: 'mehmet',
      name: 'Mehmet Özkan',
      business: 'Online Retailer',
      description: 'E-commerce business with monthly promotional spikes',
      averageMonthlyIncome: '€3,500',
      pattern: 'Monthly spikes with consistent daily base income',
      icon: '🛒',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800',
      buttonColor: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      id: 'maria',
      name: 'Maria Rodriguez',
      business: 'Event Planner',
      description: 'Freelance event planner with seasonal variations',
      averageMonthlyIncome: '€1,800',
      pattern: 'Seasonal patterns with holiday boosts',
      icon: '🎉',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-800',
      buttonColor: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  const handlePersonaClick = (persona) => {
    setSelectedPersona(persona.id);
    // Store selected persona for session consistency
    sessionStorage.setItem('selectedPersona', persona.id);
    sessionStorage.setItem('selectedPersonaName', persona.name);
    
    // Call the callback to notify parent component
    if (onPersonaSelect) {
      onPersonaSelect(persona);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Choose Your Business Demo
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select a business profile to see how CashFlow Bridge analyzes different types of cash flow patterns and provides personalized credit offers.
        </p>
        <div className="mt-4 inline-flex items-center px-4 py-2 bg-fuchsia-100 border border-fuchsia-300 rounded-lg">
          <svg className="w-5 h-5 text-fuchsia-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium text-fuchsia-800">
            Demo Mode: All data is simulated for demonstration purposes
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {personas.map((persona) => (
          <div
            key={persona.id}
            className={`${persona.bgColor} ${persona.borderColor} border-2 rounded-xl p-4 sm:p-6 transition-all duration-300 hover:shadow-lg cursor-pointer transform hover:scale-105 ${
              selectedPersona === persona.id ? 'ring-4 ring-blue-500 ring-opacity-50' : ''
            }`}
            onClick={() => handlePersonaClick(persona)}
          >
            <div className="text-center mb-4">
              <div className="text-4xl mb-3">{persona.icon}</div>
              <h3 className={`text-xl font-bold ${persona.textColor} mb-1`}>
                {persona.name}
              </h3>
              <p className="text-sm font-medium text-gray-600 mb-3">
                {persona.business}
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <p className="text-sm text-gray-700">
                {persona.description}
              </p>
              
              <div className="bg-white rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium text-gray-500">Avg Monthly Income</span>
                  <span className="text-lg font-bold text-green-600">{persona.averageMonthlyIncome}</span>
                </div>
                <div className="text-xs text-gray-600">
                  {persona.pattern}
                </div>
              </div>
            </div>

            <button
              className={`w-full ${persona.buttonColor} text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 ${
                selectedPersona === persona.id ? 'ring-2 ring-white' : ''
              }`}
            >
              {selectedPersona === persona.id ? 'Selected' : 'Try This Demo'}
            </button>

            {selectedPersona === persona.id && (
              <div className="mt-4 text-center">
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-2">
                  <p className="text-sm text-green-700 font-medium mb-1">
                    ✓ Demo selected! Starting application...
                  </p>
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600 mr-2"></div>
                    <span className="text-xs text-green-600">Redirecting in a moment</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedPersona && (
        <div className="text-center mt-12">
          <div className="bg-fuchsia-50 border border-fuchsia-200 rounded-lg p-4 inline-block">
            <p className="text-fuchsia-800 font-medium mb-2">
              ✨ Starting demo for {personas.find(p => p.id === selectedPersona)?.name}
            </p>
            <p className="text-sm text-fuchsia-600">
              You'll now experience their complete loan application journey.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonaSelector;