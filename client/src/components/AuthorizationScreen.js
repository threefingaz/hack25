import React from 'react';
import { getButtonClasses, getCardClasses, getTextClasses } from '../design-system/utils';

const AuthorizationScreen = ({ selectedBank, onAuthorize, onCancel }) => {
  const getBankName = () => {
    const bankNames = {
      'deutsche-bank': 'Deutsche Bank',
      'commerzbank': 'Commerzbank',
      'sparkasse': 'Sparkasse'
    };
    return bankNames[selectedBank] || 'Your Bank';
  };

  const getBankLogo = () => {
    const bankLogos = {
      'deutsche-bank': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Deutsche_Bank_logo_without_wordmark.svg/200px-Deutsche_Bank_logo_without_wordmark.svg.png',
      'commerzbank': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Commerzbank_logo_2020.svg/200px-Commerzbank_logo_2020.svg.png',
      'sparkasse': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Sparkasse.svg/200px-Sparkasse.svg.png'
    };
    return bankLogos[selectedBank];
  };

  return (
    <div className={getCardClasses('elevated', 'lg') + ' max-w-md mx-auto'}>
      <div className="text-center mb-6">
        <img 
          src={getBankLogo()} 
          alt={getBankName()}
          className="h-16 w-auto mx-auto mb-4"
        />
        <h2 className={getTextClasses('h2') + ' mb-2'}>Authorize CashFlow Bridge</h2>
        <p className={getTextClasses('body')}>
          {getBankName()} is requesting your permission to share account data
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">CashFlow Bridge will be able to:</h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-700">View your account balance and details</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-700">Access your transaction history (last 90 days)</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-700">Analyze your cash flow patterns</span>
          </li>
        </ul>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <svg className="h-5 w-5 text-slate-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <div className="text-sm">
            <p className="text-slate-900 font-medium">Your data is secure</p>
            <p className="text-slate-700 mt-1">
              CashFlow Bridge uses bank-level encryption and will never store your login credentials
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={onAuthorize}
          className={getButtonClasses('primary', 'lg') + ' w-full'}
        >
          Authorize CashFlow Bridge
        </button>
        <button
          onClick={onCancel}
          className={getButtonClasses('secondary', 'lg') + ' w-full'}
        >
          Cancel
        </button>
      </div>

      <p className={getTextClasses('caption') + ' text-center mt-6'}>
        By authorizing, you agree to share your financial data with CashFlow Bridge in accordance with their Privacy Policy and Terms of Service.
      </p>
    </div>
  );
};

export default AuthorizationScreen;