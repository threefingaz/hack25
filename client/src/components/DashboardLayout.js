import React from 'react';

const DashboardLayout = ({ loanData }) => {
  const currentDate = new Date();
  const nextPaymentDate = new Date(currentDate);
  nextPaymentDate.setDate(nextPaymentDate.getDate() + 1);
  
  const disbursementDate = new Date(loanData?.acceptedAt || currentDate);
  const daysSinceDisbursement = Math.floor((currentDate - disbursementDate) / (1000 * 60 * 60 * 24));
  const totalDays = Math.ceil(loanData?.amount / 50) || 30;
  const progressPercentage = Math.min((daysSinceDisbursement / totalDays) * 100, 100);
  
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome back, {loanData?.personaName || 'Business Owner'}!
        </h1>
        <p className="text-gray-600">
          Your loan is active and funds have been transferred to your account.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Loan Status</h2>
            <span className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
              Active
            </span>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Approved Amount</p>
              <p className="text-3xl font-bold text-gray-800">€{loanData?.amount || '0'}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Disbursement Status</p>
              <div className="flex items-center mt-1">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-base font-medium text-gray-800">Transferred to your account</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Daily Interest Rate</p>
              <p className="text-base font-medium text-gray-800">0.05%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Next Payment</h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Payment Date</p>
              <p className="text-xl font-bold text-gray-800">
                {nextPaymentDate.toLocaleDateString('en-GB', { 
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Amount Due</p>
              <p className="text-2xl font-bold text-indigo-600">€50.00</p>
              <p className="text-xs text-gray-500 mt-1">Includes principal + interest</p>
            </div>
            
            <div className="pt-2">
              <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Make Payment
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Repayment Progress</h2>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              {daysSinceDisbursement} of {totalDays} days
            </span>
            <span className="font-medium text-gray-800">
              {progressPercentage.toFixed(0)}% Complete
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          <div className="flex justify-between text-sm pt-2">
            <div>
              <p className="text-gray-500">Total Paid</p>
              <p className="font-semibold text-gray-800">
                €{(daysSinceDisbursement * 50).toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-500">Remaining Balance</p>
              <p className="font-semibold text-gray-800">
                €{Math.max(0, (loanData?.totalRepayment || 0) - (daysSinceDisbursement * 50)).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow text-center">
          <svg className="w-8 h-8 text-indigo-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="font-medium text-gray-800">View Statement</p>
        </button>
        
        <button className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow text-center">
          <svg className="w-8 h-8 text-indigo-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <p className="font-medium text-gray-800">Get Support</p>
        </button>
        
        <button className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow text-center">
          <svg className="w-8 h-8 text-indigo-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="font-medium text-gray-800">Increase Credit</p>
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-blue-800">Support Available 24/7</p>
            <p className="text-sm text-blue-700 mt-1">
              Need help? Contact us at support@cashflowbridge.de or call +49 30 12345678
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;