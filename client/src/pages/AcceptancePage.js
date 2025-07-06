import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TermsAndConditions from '../components/TermsAndConditions';
import DigitalSignature from '../components/DigitalSignature';
import SuccessAnimation from '../components/SuccessAnimation';

const AcceptancePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState('terms'); // 'terms', 'signature', 'success'
  const [termsAccepted, setTermsAccepted] = useState(null);
  const [signatureData, setSignatureData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loanData, setLoanData] = useState(null);

  // Get offer from previous page
  const offer = location.state?.offer;

  if (!offer) {
    // Redirect back if no offer data
    navigate('/credit-offer');
    return null;
  }

  const handleTermsAccepted = (consent) => {
    setTermsAccepted(consent);
    setCurrentStep('signature');
  };

  const handleSignatureComplete = async (signature) => {
    setSignatureData(signature);
    setIsProcessing(true);

    try {
      // Submit loan acceptance to API
      const response = await fetch('/api/accept-loan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          offerId: offer.offerId,
          signature: signature,
          termsAccepted: termsAccepted
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setLoanData(result);
        setCurrentStep('success');
      } else {
        throw new Error(result.error || 'Failed to process loan acceptance');
      }
    } catch (error) {
      console.error('Error accepting loan:', error);
      alert('Failed to process loan acceptance. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleContinueToSuccess = () => {
    navigate('/success-dashboard', { 
      state: { 
        loanData,
        offer 
      } 
    });
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Processing Your Loan...</h2>
          <p className="text-gray-600">Finalizing agreement and preparing disbursement</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentStep === 'success' && (
        <SuccessAnimation
          amount={offer.loanAmount}
          onContinue={handleContinueToSuccess}
          autoRedirect={true}
        />
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex justify-between items-center">
            <div className={`flex items-center ${currentStep === 'terms' ? 'text-blue-600' : currentStep === 'signature' || currentStep === 'success' ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold ${currentStep === 'terms' ? 'bg-blue-600 text-white' : currentStep === 'signature' || currentStep === 'success' ? 'bg-green-600 text-white' : 'bg-gray-300'}`}>
                {currentStep === 'signature' || currentStep === 'success' ? '✓' : '1'}
              </div>
              <span className="ml-2 font-medium">Terms & Conditions</span>
            </div>
            
            <div className={`flex-1 h-1 mx-4 ${currentStep === 'signature' || currentStep === 'success' ? 'bg-green-600' : 'bg-gray-300'}`}></div>
            
            <div className={`flex items-center ${currentStep === 'signature' ? 'text-blue-600' : currentStep === 'success' ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold ${currentStep === 'signature' ? 'bg-blue-600 text-white' : currentStep === 'success' ? 'bg-green-600 text-white' : 'bg-gray-300'}`}>
                {currentStep === 'success' ? '✓' : '2'}
              </div>
              <span className="ml-2 font-medium">Digital Signature</span>
            </div>
          </div>
        </div>

        {/* Loan Summary */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Loan Summary</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-blue-700">Amount:</span>
                <span className="font-semibold ml-2">€{offer.loanAmount?.toLocaleString('de-DE')}</span>
              </div>
              <div>
                <span className="text-blue-700">Daily Rate:</span>
                <span className="font-semibold ml-2">{(offer.dailyInterestRate * 100).toFixed(2)}%</span>
              </div>
              <div>
                <span className="text-blue-700">Daily Payment:</span>
                <span className="font-semibold ml-2">€{offer.repaymentTerms?.dailyPayment?.toLocaleString('de-DE')}</span>
              </div>
              <div>
                <span className="text-blue-700">Term:</span>
                <span className="font-semibold ml-2">{offer.repaymentTerms?.numberOfDays} days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content based on current step */}
        <div className="max-w-2xl mx-auto">
          {currentStep === 'terms' && (
            <TermsAndConditions onAccept={handleTermsAccepted} />
          )}
          
          {currentStep === 'signature' && (
            <DigitalSignature 
              onSign={handleSignatureComplete}
              accountHolder="Anna Schmidt" // In real app, this would come from account data
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AcceptancePage;