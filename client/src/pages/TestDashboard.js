import React from 'react';

const TestDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">🎯 Test Dashboard</h1>
        <p className="text-gray-600 mb-4">This test dashboard should be visible.</p>
        
        <div className="bg-green-50 p-4 rounded-lg mb-4">
          <h3 className="font-semibold text-green-800 mb-2">✅ Success!</h3>
          <p className="text-green-700 text-sm">If you can see this, the dashboard route is working.</p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Next Steps:</h3>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• Dashboard layout components</li>
            <li>• Loan details display</li>
            <li>• Repayment schedule</li>
            <li>• Account summary</li>
          </ul>
        </div>
        
        <button 
          onClick={() => window.location.href = '/accept'}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Back to Acceptance Flow
        </button>
      </div>
    </div>
  );
};

export default TestDashboard;