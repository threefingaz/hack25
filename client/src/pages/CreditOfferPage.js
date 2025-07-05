import React from 'react';

const CreditOfferPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Your Credit Offer</h1>
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">You're Approved!</h2>
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <p className="text-gray-500">Credit Offer Display Coming Soon</p>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <p className="text-gray-500">Offer Explanation Coming Soon</p>
              </div>
              <div className="flex space-x-4">
                <div className="flex-1 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <p className="text-gray-500">Accept Button</p>
                </div>
                <div className="flex-1 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <p className="text-gray-500">Decline Button</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditOfferPage;