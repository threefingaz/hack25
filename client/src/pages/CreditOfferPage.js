import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreditOfferCard from '../components/CreditOfferCard';
import OfferExplanation from '../components/OfferExplanation';
import LoadingSpinner from '../components/LoadingSpinner';

const CreditOfferPage = () => {
  const navigate = useNavigate();
  const [offer, setOffer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadOffer();
  }, []);

  const loadOffer = () => {
    try {
      const storedOffer = localStorage.getItem('creditOffer');
      if (!storedOffer) {
        navigate('/cash-flow-analysis');
        return;
      }

      const offerData = JSON.parse(storedOffer);
      setOffer(offerData);
    } catch (err) {
      setError('Failed to load credit offer');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = () => {
    if (offer) {
      localStorage.setItem('acceptingOffer', JSON.stringify(offer));
      navigate('/accept');
    }
  };

  const handleDecline = () => {
    // Clear stored data and redirect
    localStorage.removeItem('creditOffer');
    localStorage.removeItem('offerId');
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-gray-600">Loading your credit offer...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => navigate('/cash-flow-analysis')}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!offer || !offer.approved) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md">
            <svg className="w-12 h-12 text-yellow-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Credit Application Not Approved</h3>
            <p className="text-yellow-700 mb-4">{offer?.reason || 'Your application did not meet our current criteria.'}</p>
            {offer?.alternatives && (
              <div className="text-left mb-4">
                <p className="text-sm font-medium text-yellow-800 mb-2">Consider these improvements:</p>
                <ul className="text-sm text-yellow-700 space-y-1">
                  {offer.alternatives.map((alt, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      {alt}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <button
              onClick={() => navigate('/')}
              className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Congratulations!</h1>
            <p className="text-lg text-gray-600">Your credit application has been approved</p>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Credit Offer Card - Full Width */}
            <CreditOfferCard
              offer={offer}
              onAccept={handleAccept}
              onDecline={handleDecline}
            />

            {/* Offer Explanation - Under the Card */}
            <OfferExplanation offer={offer} />
          </div>

          {/* FAQ Section */}
          <div className="mt-12 border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How accurate is your credit assessment?</h3>
                <p className="text-gray-700">Our AI analyzes 90 days of real transaction data, providing a more accurate picture of your business health than traditional credit scores. This leads to better loan amounts tailored to your actual cash flow.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What if I can't make a daily payment?</h3>
                <p className="text-gray-700">We understand business cash flow can be unpredictable. Contact us immediately if you anticipate payment difficulties. We offer flexible payment restructuring based on your updated cash flow patterns.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Is my banking data secure?</h3>
                <p className="text-gray-700">Yes. We use bank-grade encryption and read-only access to your accounts. We never store your banking credentials and are fully GDPR compliant. Your data is deleted after the assessment period.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I get a larger loan amount?</h3>
                <p className="text-gray-700">Our algorithm determines the optimal loan amount based on your cash flow to ensure comfortable repayment. As your business grows and cash flow improves, you can apply for larger amounts in the future.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What happens after I accept the offer?</h3>
                <p className="text-gray-700">Funds are typically transferred to your Deutsche Bank account within 24 hours. Daily payments will be automatically collected from the same account starting the next business day.</p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-blue-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Next Steps</h3>
                <p className="text-gray-700 mb-2">
                  This offer is valid for 24 hours. If you accept, funds will be transferred to your account within 24 hours.
                </p>
                <p className="text-sm text-gray-600">
                  Offer expires: {new Date(offer.offerValidUntil).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditOfferPage;