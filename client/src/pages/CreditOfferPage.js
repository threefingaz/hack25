import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreditOfferCard from '../components/CreditOfferCard';
import OfferExplanation from '../components/OfferExplanation';
import LoadingSpinner from '../components/LoadingSpinner';
import { getButtonClasses, getContainerClasses, getCardClasses, getTextClasses, getBackgroundClasses } from '../design-system/utils';

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
      <div className={"min-h-screen flex items-center justify-center " + getBackgroundClasses('default')}>
        <div className="text-center">
          <LoadingSpinner size="large" />
          <p className={getTextClasses('body') + ' mt-4'}>Loading your credit offer...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={"min-h-screen flex items-center justify-center " + getBackgroundClasses('default')}>
        <div className="text-center">
          <div className={getCardClasses('outline', 'md') + ' bg-red-50 border-red-200 max-w-md'}>
            <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className={getTextClasses('body') + ' text-red-600 mb-4'}>{error}</p>
            <button
              onClick={() => navigate('/cash-flow-analysis')}
              className={getButtonClasses('outline', 'md') + ' !border-red-600 !text-red-600 hover:!bg-red-50'}
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
      <div className={"min-h-screen " + getBackgroundClasses('surface')}>
        <div className={getContainerClasses('py-16')}>
          <div className="max-w-2xl mx-auto">
            {/* Header - Clean typography with no background */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-3 h-3 bg-orange-500 rounded-full mb-8"></div>
              <h1 className={getTextClasses('h1') + ' text-4xl font-light mb-3 tracking-tight'}>
                Application Review Complete
              </h1>
              <p className={getTextClasses('body') + ' text-xl font-light'}>
                We've carefully reviewed your weekly credit application
              </p>
            </div>

            {/* Status - Bold statement */}
            <div className="mb-16">
              <h2 className={getTextClasses('h1') + ' text-6xl mb-4'}>
                Not Approved
              </h2>
              <p className={getTextClasses('body') + ' text-2xl font-light'}>
                But we have great alternatives for you
              </p>
            </div>

            {/* Reason - Simple text block */}
            <div className="mb-12">
              <h3 className={getTextClasses('label') + ' uppercase tracking-wider mb-4'}>
                REASON
              </h3>
              <p className={getTextClasses('body') + ' text-lg leading-relaxed'}>
                {offer?.reason || 'Your application did not meet our weekly credit criteria.'}
              </p>
            </div>

            {/* Smart Referral - Clean typography hierarchy */}
            {offer?.referral && (
              <div className="mb-12">
                <h3 className={getTextClasses('label') + ' uppercase tracking-wider mb-6'}>
                  RECOMMENDED ALTERNATIVE
                </h3>
                <div className="pl-0">
                  <h4 className={getTextClasses('h2') + ' text-3xl mb-3'}>
                    {offer.referral.partner}
                  </h4>
                  <p className={getTextClasses('body') + ' text-lg mb-6 leading-relaxed'}>
                    {offer.referral.reason}
                  </p>
                  <div className="border-l-4 border-slate-900 pl-6 mb-4">
                    <p className={getTextClasses('label') + ' uppercase tracking-wider mb-2'}>
                      Next Steps
                    </p>
                    <p className={getTextClasses('body') + ' text-base'}>
                      {offer.referral.actionable}
                    </p>
                  </div>
                  {offer.referral.alternativeAction && (
                    <p className={getTextClasses('body') + ' text-base italic'}>
                      Or: {offer.referral.alternativeAction}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Improvement Suggestions - Clean list */}
            {offer?.alternatives && (
              <div className="mb-12">
                <h3 className={getTextClasses('label') + ' uppercase tracking-wider mb-6'}>
                  WAYS TO IMPROVE
                </h3>
                <ul className="space-y-3">
                  {offer.alternatives.map((alt, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-2xl leading-none mr-3 text-gray-400">
                        •
                      </span>
                      <span className={getTextClasses('body') + ' text-base pt-1'}>
                        {alt}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions - Clean buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-12 mt-12 border-t border-gray-200">
              <button
                onClick={() => navigate('/')}
                className={getButtonClasses('outline', 'lg') + ' flex-1 !rounded-none'}
              >
                Back to Home
              </button>
              <button
                onClick={() => navigate('/cash-flow-analysis')}
                className={getButtonClasses('outline', 'lg') + ' flex-1 !rounded-none !bg-slate-900 !text-white !border-slate-900 hover:!bg-slate-800'}
              >
                Try Again Later
              </button>
            </div>

            {/* Footer - Minimal encouragement */}
            <div className="mt-16 text-center">
              <p className={getTextClasses('caption') + ' font-light'}>
                Many successful businesses start here.
              </p>
              <p className={getTextClasses('caption') + ' font-light'}>
                Focus on the recommendations above.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={"min-h-screen " + getBackgroundClasses('surface')}>
      <div className={getContainerClasses('py-16')}>
        <div className="max-w-4xl mx-auto">
          {/* Header - Clean typography */}
          <div className="text-center mb-16">
            <h1 className={getTextClasses('h1') + ' text-6xl mb-4 tracking-tight !text-gray-900'}>
              Approved
            </h1>
            <p className={getTextClasses('body') + ' text-2xl font-light mb-2'}>
              Your weekly credit line is ready
            </p>
            <p className={getTextClasses('caption') + ' text-base font-light'}>
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
          <div className="mt-20 pt-16 border-t border-gray-200">
            <h2 className={getTextClasses('label') + ' uppercase tracking-wider mb-12'}>
              FREQUENTLY ASKED QUESTIONS
            </h2>
            
            <div className="space-y-10">
              <div>
                <h3 className={getTextClasses('h4') + ' mb-3'}>
                  How accurate is your credit assessment?
                </h3>
                <p className={getTextClasses('body') + ' text-base leading-relaxed'}>
                  Our AI analyzes 90 days of real transaction data, providing a more accurate picture of your business health than traditional credit scores. This leads to better loan amounts tailored to your actual cash flow.
                </p>
              </div>

              <div>
                <h3 className={getTextClasses('h4') + ' mb-3'}>
                  What if I can't make a weekly payment?
                </h3>
                <p className={getTextClasses('body') + ' text-base leading-relaxed'}>
                  Business cash flow can be unpredictable - that's why we offer weekly flexibility. You can skip any week with 24-hour notice. We'll simply pause your credit line and resume the following Monday.
                </p>
              </div>

              <div>
                <h3 className={getTextClasses('h4') + ' mb-3'}>
                  Is my banking data secure?
                </h3>
                <p className={getTextClasses('body') + ' text-base leading-relaxed'}>
                  Yes. We use bank-grade encryption and read-only access to your accounts. We never store your banking credentials and are fully GDPR compliant. Your data is deleted after the assessment period.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">
                  Can I get a larger loan amount?
                </h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  Our algorithm determines the optimal loan amount based on your cash flow to ensure comfortable repayment. As your business grows and cash flow improves, you can apply for larger amounts in the future.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">
                  What happens after I accept the offer?
                </h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  Funds are typically transferred to your Deutsche Bank account within 24 hours. Your weekly credit line will be available every Monday, with automatic collection of the previous week's balance plus interest.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">
                  Why weekly instead of monthly?
                </h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  Weekly credit matches your business cycle better than monthly loans. Food trucks, market vendors, and service businesses often have weekly patterns - our credit line aligns with when you earn, not arbitrary monthly dates.
                </p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mt-20 pt-16 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
              NEXT STEPS
            </h3>
            <p className="text-lg text-gray-800 leading-relaxed mb-2">
              This weekly credit line offer is valid for 24 hours.
            </p>
            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              If you accept, funds will be available Monday morning.
            </p>
            <p className="text-sm text-gray-500 font-light">
              Offer expires: {new Date(offer.offerValidUntil).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditOfferPage;