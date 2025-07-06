import React, { useState, useRef, useEffect } from 'react';

const TermsAndConditions = ({ onAccept }) => {
  const [hasReadTerms, setHasReadTerms] = useState(false);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [agreeChecked, setAgreeChecked] = useState(false);
  const [gdprConsent, setGdprConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    const container = scrollRef.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
      if (isAtBottom && !hasScrolledToBottom) {
        setHasScrolledToBottom(true);
        setHasReadTerms(true);
      }
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [hasScrolledToBottom]);

  const isFormValid = hasReadTerms && agreeChecked && gdprConsent;

  const handleContinue = () => {
    if (isFormValid) {
      onAccept({ gdprConsent, marketingConsent });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Terms & Conditions</h2>
      
      {/* Scrollable Terms Container */}
      <div 
        ref={scrollRef}
        className="h-64 overflow-y-auto border border-gray-300 rounded-lg p-4 mb-6 bg-gray-50"
        style={{ scrollBehavior: 'smooth' }}
      >
        <div className="space-y-4 text-sm leading-relaxed">
          <h3 className="font-semibold text-lg">CashFlow Bridge Credit Agreement</h3>
          
          <p>
            <span className="font-semibold">1. LOAN TERMS:</span> This agreement establishes the terms for your credit facility with CashFlow Bridge GmbH. 
            By accepting this offer, you agree to repay the principal amount plus daily interest as calculated using your cash flow analysis. 
            The interest rate is fixed at 0.05% per day, compounded daily. Your repayment schedule is based on your demonstrated cash flow patterns 
            and business revenue cycles.
          </p>
          
          <p>
            <span className="font-semibold">2. REPAYMENT OBLIGATIONS:</span> You agree to make daily payments as outlined in your repayment schedule. 
            Payments will be automatically deducted from your connected bank account. Should automatic payment fail, you have a 3-day grace period 
            to make manual payment before late fees apply. Early repayment is allowed without penalty and will reduce your total interest obligation 
            proportionally.
          </p>
          
          <p>
            <span className="font-semibold">3. DATA USAGE & PRIVACY:</span> CashFlow Bridge will continue to monitor your business bank account 
            to ensure loan performance and may adjust future credit offers based on updated cash flow analysis. Your financial data is encrypted 
            and stored securely in compliance with GDPR and German banking regulations. We will never share your specific transaction details 
            with third parties without your explicit consent.
          </p>
          
          <p>
            <span className="font-semibold">4. DEFAULT & COLLECTION:</span> Failure to make payments for 7 consecutive days constitutes default. 
            In case of default, the entire remaining balance becomes immediately due. We will work with you to establish payment plans before 
            pursuing collection activities. All collection efforts will comply with German consumer protection laws.
          </p>
          
          <p>
            <span className="font-semibold">5. CANCELLATION RIGHTS:</span> You have 14 days from signing this agreement to cancel without penalty, 
            provided you return the full loan amount. After this period, standard repayment terms apply. This right is protected under 
            German consumer credit law (Verbraucherkreditgesetz).
          </p>
          
          <p>
            <span className="font-semibold">6. REGULATORY COMPLIANCE:</span> CashFlow Bridge GmbH is authorized by BaFin (Federal Financial 
            Supervisory Authority) to provide credit services. This loan agreement is governed by German law and any disputes will be 
            resolved in German courts. Consumer protection rights apply as outlined in applicable German and EU legislation.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          📄 Print Terms
        </button>
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          💾 Download PDF
        </button>
      </div>

      {/* Consent Checkboxes */}
      <div className="space-y-4 mb-6">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="agree-terms"
            checked={agreeChecked}
            onChange={(e) => setAgreeChecked(e.target.checked)}
            disabled={!hasReadTerms}
            className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500 disabled:opacity-50"
          />
          <label htmlFor="agree-terms" className={`text-sm ${!hasReadTerms ? 'text-gray-400' : 'text-gray-700'}`}>
            <span className="font-semibold">I have read and agree to the Terms & Conditions</span>
            {!hasScrolledToBottom && (
              <span className="block text-xs text-amber-600 mt-1">
                Please scroll to the bottom to read all terms
              </span>
            )}
          </label>
        </div>

        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="gdpr-consent"
            checked={gdprConsent}
            onChange={(e) => setGdprConsent(e.target.checked)}
            className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <label htmlFor="gdpr-consent" className="text-sm text-gray-700">
            <span className="font-semibold">GDPR Data Processing Consent (Required)</span>
            <span className="block text-xs text-gray-500 mt-1">
              I consent to the processing of my financial data for loan assessment and account monitoring as outlined in the privacy policy.
            </span>
          </label>
        </div>

        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="marketing-consent"
            checked={marketingConsent}
            onChange={(e) => setMarketingConsent(e.target.checked)}
            className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <label htmlFor="marketing-consent" className="text-sm text-gray-700">
            <span className="font-semibold">Marketing Communications (Optional)</span>
            <span className="block text-xs text-gray-500 mt-1">
              I would like to receive updates about new financial products and business tips via email.
            </span>
          </label>
        </div>
      </div>

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        disabled={!isFormValid}
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
          isFormValid
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Continue to Digital Signature
      </button>
    </div>
  );
};

export default TermsAndConditions;