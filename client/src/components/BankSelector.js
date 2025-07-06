import React, { useState } from 'react';

const banks = [
  {
    id: 'sparkasse',
    name: 'Sparkasse',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    hoverColor: 'hover:border-gray-300',
    selectedColor: 'ring-blue-500',
    popular: true,
    priority: 1
  },
  {
    id: 'deutsche-bank',
    name: 'Deutsche Bank',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    hoverColor: 'hover:border-gray-300',
    selectedColor: 'ring-blue-500',
    popular: false,
    priority: 2
  },
  {
    id: 'commerzbank',
    name: 'Commerzbank',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    hoverColor: 'hover:border-gray-300',
    selectedColor: 'ring-blue-500',
    popular: false,
    priority: 3
  }
];

const BankSelector = ({ onBankSelect, selectedBank }) => {
  const [hoveredBank, setHoveredBank] = useState(null);

  const handleSelect = (bankId) => {
    onBankSelect(bankId);
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Your Bank</h3>
        <p className="text-sm text-gray-600">
          Choose your business bank to securely analyze your cash flow
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {banks.sort((a, b) => a.priority - b.priority).map((bank) => (
          <div
            key={bank.id}
            onClick={() => handleSelect(bank.id)}
            onMouseEnter={() => setHoveredBank(bank.id)}
            onMouseLeave={() => setHoveredBank(null)}
            className={`
              relative cursor-pointer transition-all duration-200 
              ${bank.bgColor} ${bank.borderColor} 
              border-2 rounded-xl p-8 
              ${bank.hoverColor}
              transform hover:scale-105 hover:shadow-lg
              ${selectedBank === bank.id 
                ? `ring-4 ${bank.selectedColor} ring-opacity-50 shadow-lg scale-105` 
                : ''
              }
            `}
          >
            {/* Popular badge */}
            {bank.popular && (
              <div className="absolute -top-2 -right-2">
                <div className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  Most Popular
                </div>
              </div>
            )}

            {/* Bank Logo and Name */}
            <div className="text-center">
              <div className={`w-16 h-16 ${bank.id === 'sparkasse' ? 'bg-red-600' : 'bg-blue-100'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                {bank.id === 'sparkasse' ? (
                  <svg width="32" height="42" viewBox="0 0 128 167" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M44.1543 30.2705C45.2842 32.8302 46.8039 35.0698 48.7036 37.0095C50.6033 38.9492 52.843 40.459 55.4426 41.5588C58.0322 42.6587 60.7918 43.1986 63.7114 43.1986C66.6309 43.1986 69.3705 42.6487 71.9301 41.5588C74.4897 40.459 76.7294 38.9492 78.6691 37.0095C80.5988 35.0798 82.1185 32.8302 83.2184 30.2705C84.3182 27.7109 84.8581 24.9714 84.8581 22.0518C84.8581 19.1322 84.3082 16.3927 83.2184 13.8331C82.1185 11.2734 80.6088 9.03379 78.6691 7.09409C76.7294 5.16438 74.4897 3.64461 71.9301 2.54478C69.3705 1.44495 66.6309 0.905029 63.7114 0.905029C60.7918 0.905029 58.0322 1.45494 55.4426 2.54478C52.853 3.64461 50.6033 5.15438 48.7036 7.09409C46.8039 9.03379 45.2842 11.2734 44.1543 13.8331C43.0245 16.3927 42.4546 19.1322 42.4546 22.0518C42.4546 24.9714 43.0145 27.7109 44.1543 30.2705ZM1.8108 153.182C2.91063 155.741 4.4204 157.981 6.36011 159.921C8.28981 161.86 10.5395 163.37 13.0991 164.47C15.6587 165.57 18.3983 166.11 21.3178 166.11H106.215C109.134 166.11 111.894 165.56 114.484 164.47C117.073 163.37 119.323 161.86 121.223 159.921C123.122 157.991 124.622 155.741 125.712 153.182C126.812 150.622 127.352 147.883 127.352 144.963V98.2902H29.7465V85.5821H127.352V77.1434C127.352 74.2238 126.802 71.4843 125.712 68.9246C124.612 66.365 123.122 64.1254 121.223 62.1857C119.323 60.256 117.073 58.7362 114.484 57.6364C111.894 56.5365 109.134 55.9966 106.215 55.9966H21.3178C18.3983 55.9966 15.6587 56.5465 13.0991 57.6364C10.5395 58.7362 8.29981 60.246 6.36011 62.1857C4.4204 64.1254 2.91063 66.365 1.8108 68.9246C0.710968 71.4843 0.171051 74.2238 0.171051 77.1434V123.816H97.5662V136.524H0.171051V144.963C0.171051 147.883 0.720966 150.622 1.8108 153.182Z" fill="white"/>
                  </svg>
                ) : (
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                )}
              </div>
              <h4 className="text-xl font-bold text-gray-900">
                {bank.name}
              </h4>
            </div>

            {/* Selection Indicator */}
            {selectedBank === bank.id && (
              <div className="absolute top-3 left-3">
                <div className="bg-green-500 text-white rounded-full p-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}

            {/* Hover Effect */}
            {hoveredBank === bank.id && selectedBank !== bank.id && (
              <div className="absolute inset-0 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                <div className="bg-white rounded-full p-2 shadow-lg">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Demo Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-blue-800 mb-1">Demo Mode</h4>
            <p className="text-sm text-blue-700">
              This is a demonstration. No real bank connection will be made. 
              Use credentials <span className="font-mono bg-blue-100 px-1 rounded">demo/demo</span> when prompted.
            </p>
          </div>
        </div>
      </div>

      {/* Selection Status */}
      {selectedBank && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-green-800">
              {banks.find(b => b.id === selectedBank)?.name} selected
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BankSelector;