import React, { useState } from 'react';
import { getInputClasses, getButtonClasses, getCardClasses, getTextClasses } from '../design-system/utils';

const LoginForm = ({ selectedBank, onSubmit }) => {
  // Prepopulated demo values based on bank selection
  const getDefaultValues = () => {
    if (selectedBank === 'deutsche-bank') {
      return {
        branch: '100',
        account: '1234567', 
        subAccount: '00',
        pin: '12345'
      };
    }
    return {
      username: 'demo',
      password: 'demo'
    };
  };

  const defaults = getDefaultValues();
  const [formData, setFormData] = useState(defaults);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (selectedBank === 'deutsche-bank') {
      if (!formData.branch?.trim()) newErrors.branch = 'Branch code is required';
      if (!formData.account?.trim()) newErrors.account = 'Account number is required';
      if (!formData.subAccount?.trim()) newErrors.subAccount = 'Sub-account is required';
      if (!formData.pin?.trim()) newErrors.pin = 'PIN is required';
    } else {
      if (!formData.username?.trim()) newErrors.username = 'Username is required';
      if (!formData.password?.trim()) newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getBankName = () => {
    const bankNames = {
      'deutsche-bank': 'Deutsche Bank',
      'commerzbank': 'Commerzbank',
      'sparkasse': 'Sparkasse'
    };
    return bankNames[selectedBank] || 'Your Bank';
  };

  // Deutsche Bank specific form
  if (selectedBank === 'deutsche-bank') {
    return (
      <div className={getCardClasses('elevated', 'lg') + ' max-w-2xl mx-auto'}>
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-800 rounded flex items-center justify-center mr-4">
              <svg width="24" height="24" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H64V64H0V0ZM9.02564 9.00256V54.9974H55.1385V9.00256H9.02564ZM38.4 15.3862L14.1128 48.6138H25.6L49.8871 15.3862H38.4Z" fill="white"/>
              </svg>
            </div>
            <div>
              <h2 className={getTextClasses('h3')}>Deutsche Bank Login</h2>
              <p className={getTextClasses('body')}>Enter your banking credentials</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Account Fields Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-2">
                Branch<br/>
                <span className="text-xs text-gray-500">(three-digit)</span>
              </label>
              <input
                type="text"
                id="branch"
                value={formData.branch}
                onChange={(e) => handleInputChange('branch', e.target.value)}
                className={`${getInputClasses(errors.branch ? 'error' : 'default')} bg-gray-100 text-center font-mono`}
                maxLength="3"
                placeholder="100"
              />
              {errors.branch && (
                <p className="mt-1 text-xs text-red-600">{errors.branch}</p>
              )}
            </div>

            <div>
              <label htmlFor="account" className="block text-sm font-medium text-gray-700 mb-2">
                Account<br/>
                <span className="text-xs text-gray-500">(seven-digit)</span>
              </label>
              <input
                type="text"
                id="account"
                value={formData.account}
                onChange={(e) => handleInputChange('account', e.target.value)}
                className={`${getInputClasses(errors.account ? 'error' : 'default')} bg-gray-100 text-center font-mono`}
                maxLength="7"
                placeholder="1234567"
              />
              {errors.account && (
                <p className="mt-1 text-xs text-red-600">{errors.account}</p>
              )}
            </div>

            <div>
              <label htmlFor="subAccount" className="block text-sm font-medium text-gray-700 mb-2">
                Sub-account<br/>
                <span className="text-xs text-gray-500">(two-digit)</span>
              </label>
              <input
                type="text"
                id="subAccount"
                value={formData.subAccount}
                onChange={(e) => handleInputChange('subAccount', e.target.value)}
                className={`${getInputClasses(errors.subAccount ? 'error' : 'default')} bg-gray-100 text-center font-mono`}
                maxLength="2"
                placeholder="00"
              />
              {errors.subAccount && (
                <p className="mt-1 text-xs text-red-600">{errors.subAccount}</p>
              )}
            </div>

            <div>
              <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-2">
                PIN<br/>
                <span className="text-xs text-gray-500">(five-digit)</span>
              </label>
              <input
                type="password"
                id="pin"
                value={formData.pin}
                onChange={(e) => handleInputChange('pin', e.target.value)}
                className={`${getInputClasses(errors.pin ? 'error' : 'default')} bg-gray-100 text-center font-mono`}
                maxLength="5"
                placeholder="•••••"
              />
              {errors.pin && (
                <p className="mt-1 text-xs text-red-600">{errors.pin}</p>
              )}
            </div>
          </div>

          {/* Security notice */}
          <div className={getCardClasses('outline', 'sm') + ' bg-slate-50 border-l-4 border-slate-400 border-gray-200'}>
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className={getTextClasses('caption') + ' text-slate-800'}>
                  <strong>Deutsche Bank never asks for more than one TAN per transaction!</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Demo notice */}
          <div className={getCardClasses('outline', 'sm') + ' bg-gray-50'}>
            <div className="flex items-start">
              <svg className="h-5 w-5 text-gray-600 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className={getTextClasses('caption')}>
                <p className={getTextClasses('body') + ' font-medium'}>Demo Mode</p>
                <p className={getTextClasses('body') + ' mt-1'}>Fields are pre-filled with demo values for presentation. In real banking, you would enter your actual credentials.</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className={getButtonClasses('primary', 'lg') + ' w-full flex items-center justify-center'}
          >
            Execute Login
            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </form>
      </div>
    );
  }

  // Generic form for other banks
  return (
    <div className={getCardClasses('elevated', 'lg') + ' max-w-md mx-auto'}>
      <div className="mb-6">
        <h2 className={getTextClasses('h3') + ' mb-2'}>Login to {getBankName()}</h2>
        <p className={getTextClasses('body')}>Enter your online banking credentials</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={(e) => handleInputChange('username', e.target.value)}
            className={getInputClasses(errors.username ? 'error' : 'default')}
            placeholder="Enter your username"
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-600">{errors.username}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className={getInputClasses(errors.password ? 'error' : 'default')}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        <div className={getCardClasses('outline', 'sm') + ' bg-slate-50 border-slate-200'}>
          <div className="flex items-start">
            <svg className="h-5 w-5 text-slate-600 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className={getTextClasses('caption')}>
              <p className={getTextClasses('body') + ' font-medium'}>Demo Credentials</p>
              <p className={getTextClasses('body') + ' mt-1'}>Username: <span className="font-mono bg-white px-2 py-1 rounded">demo</span></p>
              <p className={getTextClasses('body')}>Password: <span className="font-mono bg-white px-2 py-1 rounded">demo</span></p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className={getButtonClasses('primary', 'md') + ' w-full'}
        >
          Continue to Authorization
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className={getTextClasses('caption')}>
          Your credentials are encrypted and secure. We never store your banking passwords.
        </p>
      </div>
    </div>
  );
};

export default LoginForm;