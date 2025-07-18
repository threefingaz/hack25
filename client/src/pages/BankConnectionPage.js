import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BankSelector from '../components/BankSelector';
import LoginForm from '../components/LoginForm';
import AuthorizationScreen from '../components/AuthorizationScreen';
import LoadingSpinner from '../components/LoadingSpinner';
import ProgressMessage from '../components/ProgressMessage';
import StepIndicator from '../components/StepIndicator';

const BankConnectionPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedBank, setSelectedBank] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleBankSelect = (bankId) => {
    setSelectedBank(bankId);
    setError(null);
  };

  const handleProceedToLogin = () => {
    if (!selectedBank) {
      setError('Please select a bank to continue');
      return;
    }
    setCurrentStep(2);
  };

  const handleLogin = async (credentials) => {
    setIsLoading(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      // Handle Deutsche Bank specific credentials
      if (selectedBank === 'deutsche-bank') {
        if (credentials.branch && credentials.account && credentials.subAccount && credentials.pin) {
          setIsLoading(false);
          setCurrentStep(3);
        } else {
          setIsLoading(false);
          setError('Please fill in all Deutsche Bank credentials');
        }
      } 
      // Handle other banks with username/password
      else if (credentials.username === 'demo' && credentials.password === 'demo') {
        setIsLoading(false);
        setCurrentStep(3);
      } else {
        setIsLoading(false);
        setError('Invalid credentials. Please use demo/demo');
      }
    }, 1500);
  };

  const handleAuthorize = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // For demo purposes, simulate the API call
      console.log('Connecting to bank:', selectedBank);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Try the actual API call, but fallback to demo mode if it fails
      let apiSuccess = false;
      try {
        const response = await fetch('http://localhost:3001/api/connect-bank', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bank: selectedBank,
            credentials: { username: 'demo', password: 'demo' }
          }),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('accountId', data.accountId);
          localStorage.setItem('selectedBank', selectedBank);
          apiSuccess = true;
        }
      } catch (apiError) {
        console.log('API not available, using demo mode');
      }

      // Fallback to demo mode if API fails
      if (!apiSuccess) {
        // Generate demo account ID
        const demoAccountId = `demo_acc_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('accountId', demoAccountId);
        localStorage.setItem('selectedBank', selectedBank);
      }
      
      console.log('Bank connected successfully, redirecting in 3 seconds...');
      
      // Show success state
      setIsLoading(false);
      setIsSuccess(true);
      
      // Redirect after showing success
      setTimeout(() => {
        console.log('Redirecting to cash flow analysis...');
        navigate('/cash-flow-analysis');
      }, 3000);
      
    } catch (err) {
      console.error('Bank connection error:', err);
      setError('Failed to connect to server. Please try again.');
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setCurrentStep(1);
    setSelectedBank(null);
  };

  const renderStep = () => {
    if (isSuccess) {
      return (
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-md mx-auto">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Bank Connected Successfully!</h3>
              <p className="text-gray-600 mb-4">Your account has been securely connected.</p>
              <p className="text-sm text-gray-500">Redirecting to cash flow analysis...</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-md mx-auto">
          <div className="space-y-6">
            <LoadingSpinner size="large" />
            <ProgressMessage />
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">Connect Your Bank Account</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Select your bank to securely analyze your cash flow and get instant credit decisions.
              </p>
            </div>
            
            <BankSelector 
              selectedBank={selectedBank}
              onBankSelect={handleBankSelect}
            />

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-600 font-medium">{error}</p>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-center">
              <button
                onClick={handleProceedToLogin}
                disabled={!selectedBank}
                className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
                  selectedBank
                    ? 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg transform hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {selectedBank ? 'Continue to Login' : 'Select a Bank to Continue'}
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <LoginForm 
            selectedBank={selectedBank}
            onSubmit={handleLogin}
          />
        );

      case 3:
        return (
          <AuthorizationScreen
            selectedBank={selectedBank}
            onAuthorize={handleAuthorize}
            onCancel={handleCancel}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 px-4">Connect Your Bank</h1>
        
        <StepIndicator currentStep={currentStep} />

        {renderStep()}
      </div>
    </div>
  );
};

export default BankConnectionPage;