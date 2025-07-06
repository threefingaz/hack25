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
      if (credentials.username === 'demo' && credentials.password === 'demo') {
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

      const data = await response.json();

      if (response.ok) {
        // Store account ID in localStorage for next pages
        localStorage.setItem('accountId', data.accountId);
        localStorage.setItem('selectedBank', selectedBank);
        
        // Show success animation briefly
        setTimeout(() => {
          navigate('/cash-flow-analysis');
        }, 2000);
      } else {
        setError(data.error || 'Failed to connect bank');
        setIsLoading(false);
      }
    } catch (err) {
      setError('Failed to connect to server. Please try again.');
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setCurrentStep(1);
    setSelectedBank(null);
  };

  const renderStep = () => {
    if (isLoading) {
      return (
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
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
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Connect Your Bank Account</h2>
            <p className="text-gray-600 mb-6">
              Select your bank to securely analyze your cash flow and get instant credit decisions.
            </p>
            
            <BankSelector 
              selectedBank={selectedBank}
              onBankSelect={handleBankSelect}
            />

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              onClick={handleProceedToLogin}
              disabled={!selectedBank}
              className={`w-full mt-6 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                selectedBank
                  ? 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue
            </button>
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
        <h1 className="text-3xl font-bold text-center mb-8">Connect Your Bank</h1>
        
        <StepIndicator currentStep={currentStep} />

        {renderStep()}
      </div>
    </div>
  );
};

export default BankConnectionPage;