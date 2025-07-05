import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">CashFlow Bridge</h1>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xl text-gray-600 mb-8">
            Get instant credit approval based on your cash flow analysis
          </p>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
            <p className="text-gray-600">
              Home page with impact metrics, hero section, and demo features
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;