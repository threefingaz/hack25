import React, { useState } from 'react';

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
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-800 rounded flex items-center justify-center mr-4">
              <svg width="24" height="24" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H64V64H0V0ZM9.02564 9.00256V54.9974H55.1385V9.00256H9.02564ZM38.4 15.3862L14.1128 48.6138H25.6L49.8871 15.3862H38.4Z" fill="white"/>
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Deutsche Bank Login</h2>
              <p className="text-gray-600">Enter your banking credentials</p>
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
                className={`w-full px-3 py-3 border rounded-lg bg-gray-100 text-center font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.branch ? 'border-red-500' : 'border-gray-300'
                }`}
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
                className={`w-full px-3 py-3 border rounded-lg bg-gray-100 text-center font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.account ? 'border-red-500' : 'border-gray-300'
                }`}
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
                className={`w-full px-3 py-3 border rounded-lg bg-gray-100 text-center font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.subAccount ? 'border-red-500' : 'border-gray-300'
                }`}
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
                className={`w-full px-3 py-3 border rounded-lg bg-gray-100 text-center font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.pin ? 'border-red-500' : 'border-gray-300'
                }`}
                maxLength="5"
                placeholder="•••••"
              />
              {errors.pin && (
                <p className="mt-1 text-xs text-red-600">{errors.pin}</p>
              )}
            </div>
          </div>


          {/* Security notice */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-800">
                  <strong>Deutsche Bank never asks for more than one TAN per transaction!</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Demo notice */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-start">
              <svg className="h-5 w-5 text-gray-600 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm">
                <p className="text-gray-800 font-medium">Demo Mode</p>
                <p className="text-gray-700 mt-1">Fields are pre-filled with demo values for presentation. In real banking, you would enter your actual credentials.</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
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
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Login to {getBankName()}</h2>
        <p className="text-gray-600">Enter your online banking credentials</p>
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
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.username ? 'border-red-500' : 'border-gray-300'
            }`}
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
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm">
              <p className="text-blue-800 font-medium">Demo Credentials</p>
              <p className="text-blue-700 mt-1">Username: <span className="font-mono bg-white px-2 py-1 rounded">demo</span></p>
              <p className="text-blue-700">Password: <span className="font-mono bg-white px-2 py-1 rounded">demo</span></p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Continue to Authorization
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          Your credentials are encrypted and secure. We never store your banking passwords.
        </p>
      </div>
    </div>
  );
};

export default LoginForm;