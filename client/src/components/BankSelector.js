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
              <div className={`w-16 h-16 ${bank.id === 'sparkasse' ? 'bg-red-600' : bank.id === 'deutsche-bank' ? 'bg-blue-800' : bank.id === 'commerzbank' ? 'bg-yellow-400' : 'bg-blue-100'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                {bank.id === 'sparkasse' ? (
                  <svg width="32" height="42" viewBox="0 0 128 167" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M44.1543 30.2705C45.2842 32.8302 46.8039 35.0698 48.7036 37.0095C50.6033 38.9492 52.843 40.459 55.4426 41.5588C58.0322 42.6587 60.7918 43.1986 63.7114 43.1986C66.6309 43.1986 69.3705 42.6487 71.9301 41.5588C74.4897 40.459 76.7294 38.9492 78.6691 37.0095C80.5988 35.0798 82.1185 32.8302 83.2184 30.2705C84.3182 27.7109 84.8581 24.9714 84.8581 22.0518C84.8581 19.1322 84.3082 16.3927 83.2184 13.8331C82.1185 11.2734 80.6088 9.03379 78.6691 7.09409C76.7294 5.16438 74.4897 3.64461 71.9301 2.54478C69.3705 1.44495 66.6309 0.905029 63.7114 0.905029C60.7918 0.905029 58.0322 1.45494 55.4426 2.54478C52.853 3.64461 50.6033 5.15438 48.7036 7.09409C46.8039 9.03379 45.2842 11.2734 44.1543 13.8331C43.0245 16.3927 42.4546 19.1322 42.4546 22.0518C42.4546 24.9714 43.0145 27.7109 44.1543 30.2705ZM1.8108 153.182C2.91063 155.741 4.4204 157.981 6.36011 159.921C8.28981 161.86 10.5395 163.37 13.0991 164.47C15.6587 165.57 18.3983 166.11 21.3178 166.11H106.215C109.134 166.11 111.894 165.56 114.484 164.47C117.073 163.37 119.323 161.86 121.223 159.921C123.122 157.991 124.622 155.741 125.712 153.182C126.812 150.622 127.352 147.883 127.352 144.963V98.2902H29.7465V85.5821H127.352V77.1434C127.352 74.2238 126.802 71.4843 125.712 68.9246C124.612 66.365 123.122 64.1254 121.223 62.1857C119.323 60.256 117.073 58.7362 114.484 57.6364C111.894 56.5365 109.134 55.9966 106.215 55.9966H21.3178C18.3983 55.9966 15.6587 56.5465 13.0991 57.6364C10.5395 58.7362 8.29981 60.246 6.36011 62.1857C4.4204 64.1254 2.91063 66.365 1.8108 68.9246C0.710968 71.4843 0.171051 74.2238 0.171051 77.1434V123.816H97.5662V136.524H0.171051V144.963C0.171051 147.883 0.720966 150.622 1.8108 153.182Z" fill="white"/>
                  </svg>
                ) : bank.id === 'deutsche-bank' ? (
                  <svg width="32" height="32" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0H64V64H0V0ZM9.02564 9.00256V54.9974H55.1385V9.00256H9.02564ZM38.4 15.3862L14.1128 48.6138H25.6L49.8871 15.3862H38.4Z" fill="white"/>
                  </svg>
                ) : bank.id === 'commerzbank' ? (
                  <svg width="35" height="30" viewBox="0 0 116 100" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <radialGradient id="cb_gradient_1" gradientUnits="userSpaceOnUse" cx="71.521" cy="-0.119" r="89.01">
                        <stop offset="0" stopColor="#FFEF19"/>
                        <stop offset="0.246" stopColor="#FFDF08"/>
                        <stop offset="0.44" stopColor="#FFD700"/>
                        <stop offset="0.588" stopColor="#FDD401"/>
                        <stop offset="0.713" stopColor="#F7C903"/>
                        <stop offset="0.829" stopColor="#ECB808"/>
                        <stop offset="0.9" stopColor="#E3A90B"/>
                        <stop offset="1" stopColor="#D98B07"/>
                      </radialGradient>
                      <radialGradient id="cb_gradient_2" gradientUnits="userSpaceOnUse" cx="7.446" cy="65.031" r="88.459">
                        <stop offset="0" stopColor="#FFEF19"/>
                        <stop offset="0.246" stopColor="#FFDF08"/>
                        <stop offset="0.44" stopColor="#FFD700"/>
                        <stop offset="0.588" stopColor="#FDD401"/>
                        <stop offset="0.713" stopColor="#F7C903"/>
                        <stop offset="0.829" stopColor="#ECB808"/>
                        <stop offset="0.9" stopColor="#E3A90B"/>
                        <stop offset="1" stopColor="#D98B07"/>
                      </radialGradient>
                      <radialGradient id="cb_gradient_3" gradientUnits="userSpaceOnUse" cx="95.135" cy="88.224" r="88.939">
                        <stop offset="0" stopColor="#FFEF19"/>
                        <stop offset="0.246" stopColor="#FFDF08"/>
                        <stop offset="0.44" stopColor="#FFD700"/>
                        <stop offset="0.588" stopColor="#FDD401"/>
                        <stop offset="0.713" stopColor="#F7C903"/>
                        <stop offset="0.829" stopColor="#ECB808"/>
                        <stop offset="0.9" stopColor="#E3A90B"/>
                        <stop offset="1" stopColor="#D98B07"/>
                      </radialGradient>
                    </defs>
                    <path d="M73.974,0 L72.95,0 L70.799,0 L70.799,0 L31.259,0 C31.223,0 31.191,0.019 31.173,0.05 L0.513,53.157 C0.496,53.188 0.496,53.226 0.513,53.257 L22.308,91.012 C22.225,90.75 22.078,90.459 22.078,90.459 C21.619,89.604 21.277,88.94 21.094,88.522 C20.202,86.479 19.682,83.659 19.826,80.91 C20.187,73.671 23.806,66.531 25.734,63.187 C30.28,55.326 39.053,40.131 39.053,40.131 C39.053,40.131 47.826,24.931 52.358,17.071 C53.482,15.125 55.396,11.977 57.997,8.91 L58.08,9.004 C58.08,9.004 58.175,8.9 58.18,8.895 C60.048,6.694 62.272,4.533 64.805,2.895 C67.124,1.398 69.829,0.433 72.048,0.189 C72.781,0.107 73.956,0 73.956,0" fill="url(#cb_gradient_1)"/>
                    <path d="M111.023,60.911 C110.003,62.622 109.208,63.894 108.778,64.487 C107.462,66.281 105.271,68.148 102.824,69.402 C96.366,72.709 88.266,72.94 84.398,72.94 C75.319,72.94 57.997,72.94 57.997,72.94 C57.997,72.94 40.451,72.94 31.369,72.94 C27.508,72.94 19.625,72.709 13.177,69.402 C10.729,68.148 8.535,66.281 7.218,64.487 C6.784,63.894 6.225,63.152 6.225,63.152 L27.467,99.949 C27.485,99.98 27.518,100 27.554,100 L88.432,100 C88.468,100 88.5,99.98 88.518,99.949 L111.146,60.769 C111.146,60.769 111.099,60.781 111.023,60.911 z" fill="url(#cb_gradient_2)"/>
                    <path d="M84.733,-0 L73.787,-0 C73.787,-0 72.612,0.107 71.879,0.189 C69.66,0.433 66.955,1.398 64.635,2.895 C62.096,4.537 59.868,6.704 57.997,8.91 C60.597,11.977 62.516,15.124 63.63,17.071 C68.168,24.931 76.951,40.131 76.951,40.131 C76.951,40.131 85.717,55.326 90.258,63.187 C92.189,66.531 95.814,73.671 96.171,80.91 C96.295,83.405 95.882,85.957 95.14,87.935 L94.494,89.602 L115.486,53.254 C115.504,53.223 115.504,53.185 115.486,53.154 L84.82,0.05 C84.802,0.019 84.769,-0 84.733,-0 z" fill="url(#cb_gradient_3)"/>
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