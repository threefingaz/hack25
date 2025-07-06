import React, { useState } from 'react';

const banks = [
  {
    id: 'sparkasse',
    name: 'Sparkasse',
    fullName: 'Sparkassen-Finanzgruppe',
    description: 'Germany\'s largest banking group',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    hoverColor: 'hover:border-gray-300',
    selectedColor: 'ring-blue-500',
    popular: true,
    priority: 1,
    customers: '50M+ customers'
  },
  {
    id: 'deutsche-bank',
    name: 'Deutsche Bank',
    fullName: 'Deutsche Bank AG',
    description: 'Leading international bank',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    hoverColor: 'hover:border-gray-300',
    selectedColor: 'ring-blue-500',
    popular: false,
    customers: '20M+ customers',
    priority: 2
  },
  {
    id: 'commerzbank',
    name: 'Commerzbank',
    fullName: 'Commerzbank AG',
    description: 'Major German commercial bank',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    hoverColor: 'hover:border-gray-300',
    selectedColor: 'ring-blue-500',
    popular: false,
    customers: '11M+ customers',
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
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {banks.sort((a, b) => a.priority - b.priority).map((bank) => (
          <div
            key={bank.id}
            onClick={() => handleSelect(bank.id)}
            onMouseEnter={() => setHoveredBank(bank.id)}
            onMouseLeave={() => setHoveredBank(null)}
            className={`
              relative cursor-pointer transition-all duration-200 
              ${bank.bgColor} ${bank.borderColor} 
              border-2 rounded-xl p-6 
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

            {/* Bank Logo */}
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-1">
                {bank.name}
              </h4>
              <p className="text-sm font-medium text-gray-600 mb-2">
                {bank.fullName}
              </p>
              <p className="text-xs text-gray-500">
                {bank.description}
              </p>
            </div>

            {/* Bank Info */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Customers:</span>
                <span className="font-semibold text-gray-900">{bank.customers}</span>
              </div>
              
              <div className="flex items-center text-sm text-green-600">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-xs">Secure connection</span>
              </div>
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