import React from 'react';

const TestAcceptance = () => {
  const mockOffer = {
    offerId: 'demo_offer_123',
    loanAmount: 1500,
    dailyInterestRate: 0.0005,
    repaymentTerms: {
      dailyPayment: 52.63,
      numberOfDays: 30
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Test Acceptance Page</h1>
        <p className="text-gray-600 mb-4">This is a test component to verify routing works.</p>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Mock Offer:</h3>
          <pre className="text-xs overflow-auto">
            {JSON.stringify(mockOffer, null, 2)}
          </pre>
        </div>
        
        <button 
          onClick={() => window.location.href = '/'}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default TestAcceptance;