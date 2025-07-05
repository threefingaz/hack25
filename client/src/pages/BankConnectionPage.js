import React from 'react';

const BankConnectionPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Connect Your Bank</h1>
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Bank Connection</h2>
            <p className="text-gray-600 mb-4">
              Select your bank and securely connect your account
            </p>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <p className="text-gray-500">Bank Selection UI Coming Soon</p>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <p className="text-gray-500">OAuth Mock Flow Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankConnectionPage;