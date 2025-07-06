import React, { useState } from 'react';

const banks = [
  {
    id: 'deutsche-bank',
    name: 'Deutsche Bank',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Deutsche_Bank_logo_without_wordmark.svg/200px-Deutsche_Bank_logo_without_wordmark.svg.png',
    popular: true
  },
  {
    id: 'commerzbank',
    name: 'Commerzbank',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Commerzbank_logo_2020.svg/200px-Commerzbank_logo_2020.svg.png',
    popular: false
  },
  {
    id: 'sparkasse',
    name: 'Sparkasse',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Sparkasse.svg/200px-Sparkasse.svg.png',
    popular: false
  }
];

const BankSelector = ({ onBankSelect, selectedBank }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredBank, setHoveredBank] = useState(null);

  const handleSelect = (bank) => {
    onBankSelect(bank);
    setIsOpen(false);
  };

  const selectedBankData = banks.find(bank => bank.id === selectedBank);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Your Bank
      </label>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {selectedBankData ? (
              <>
                <img 
                  src={selectedBankData.logo} 
                  alt={selectedBankData.name}
                  className="h-6 w-auto mr-3"
                />
                <span className="text-gray-900">{selectedBankData.name}</span>
              </>
            ) : (
              <span className="text-gray-500">Choose a bank...</span>
            )}
          </div>
          <svg
            className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="py-1">
            {banks.map((bank) => (
              <button
                key={bank.id}
                onClick={() => handleSelect(bank.id)}
                onMouseEnter={() => setHoveredBank(bank.id)}
                onMouseLeave={() => setHoveredBank(null)}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 ${
                  selectedBank === bank.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img 
                      src={bank.logo} 
                      alt={bank.name}
                      className="h-8 w-auto mr-3"
                    />
                    <span className="text-gray-900 font-medium">{bank.name}</span>
                  </div>
                  {bank.popular && (
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                      Most Popular
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {hoveredBank === null && !selectedBank && (
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>This is a demo - no real bank connection will be made</span>
        </div>
      )}
    </div>
  );
};

export default BankSelector;