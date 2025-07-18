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
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-orange-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Application Review Complete</h1>
              <p className="text-lg text-gray-600">We've carefully reviewed your weekly credit application</p>
            </div>

            {/* Status */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Not Approved This Time</h2>
              <p className="text-gray-600">But we have great alternatives for you</p>
            </div>

            {/* Reason */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Why This Happened</h3>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{offer?.reason || 'Your application did not meet our weekly credit criteria.'}</p>
            </div>

            {/* Smart Referral */}
            {offer?.referral && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Perfect Alternative for You</h3>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-blue-900 mb-2">{offer.referral.partner}</h4>
                  <p className="text-blue-800 mb-4">{offer.referral.reason}</p>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-900 mb-2">Next Steps:</p>
                    <p className="text-sm text-gray-700">{offer.referral.actionable}</p>
                  </div>
                  {offer.referral.alternativeAction && (
                    <div className="mt-3 text-sm text-blue-700">
                      <span className="font-medium">Alternative:</span> {offer.referral.alternativeAction}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Improvement Suggestions */}
            {offer?.alternatives && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Ways to Improve for Future Applications</h3>
                <ul className="space-y-2">
                  {offer.alternatives.map((alt, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span className="text-gray-700">{alt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button
                onClick={() => navigate('/')}
                className="flex-1 bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Back to Home
              </button>
              <button
                onClick={() => navigate('/cash-flow-analysis')}
                className="flex-1 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again Later
              </button>
            </div>

            {/* Footer Message */}
            <div className="text-center mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-600 text-sm">
                <span className="font-medium">Don't worry!</span> Many successful businesses start here. Focus on the recommendations above and you'll be ready for weekly credit soon.
              </p>
            </div>
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
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-green-600 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Congratulations!
            </h1>
            <p className="text-xl text-gray-600 mb-6">Your weekly credit line has been approved</p>
            <p className="text-sm text-gray-500">
              Renews every Monday • Skip weeks anytime
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-12">
            {/* Credit Offer Card */}
            <CreditOfferCard
              offer={offer}
              onAccept={handleAccept}
              onDecline={handleDecline}
            />

            {/* Offer Explanation */}
            <OfferExplanation offer={offer} />
          </div>

          {/* FAQ Section */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-12">Frequently Asked Questions</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  How accurate is your credit assessment?
                </h3>
                <p className="text-gray-700">Our AI analyzes 90 days of real transaction data, providing a more accurate picture of your business health than traditional credit scores. This leads to better loan amounts tailored to your actual cash flow.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  What if I can't make a weekly payment?
                </h3>
                <p className="text-gray-700">Business cash flow can be unpredictable - that's why we offer weekly flexibility. You can skip any week with 24-hour notice. We'll simply pause your credit line and resume the following Monday.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Is my banking data secure?
                </h3>
                <p className="text-gray-700">Yes. We use bank-grade encryption and read-only access to your accounts. We never store your banking credentials and are fully GDPR compliant. Your data is deleted after the assessment period.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Can I get a larger loan amount?
                </h3>
                <p className="text-gray-700">Our algorithm determines the optimal loan amount based on your cash flow to ensure comfortable repayment. As your business grows and cash flow improves, you can apply for larger amounts in the future.</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  What happens after I accept the offer?
                </h3>
                <p className="text-gray-700">Funds are typically transferred to your Deutsche Bank account within 24 hours. Your weekly credit line will be available every Monday, with automatic collection of the previous week's balance plus interest.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Why weekly instead of monthly?
                </h3>
                <p className="text-gray-700">Weekly credit matches your business cycle better than monthly loans. Food trucks, market vendors, and service businesses often have weekly patterns - our credit line aligns with when you earn, not arbitrary monthly dates.</p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Next Steps</h3>
            <p className="text-gray-700 mb-4">
              This weekly credit line offer is valid for 24 hours. If you accept, funds will be available Monday morning.
            </p>
            <p className="text-sm text-gray-600">
              Offer expires: {new Date(offer.offerValidUntil).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditOfferPage;