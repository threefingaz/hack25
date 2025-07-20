import React, { useState } from 'react';
import { getButtonClasses, getCardClasses, getTextClasses } from '../design-system/utils';

const CreditOfferCard = ({ offer, onAccept, onDecline }) => {
  const [showDetails, setShowDetails] = useState(false);

  if (!offer) return null;

  const { loanAmount, repaymentTerms, weeklyInterestRate } = offer;

  return (
    <div className={getCardClasses('elevated', 'none') + ' shadow-xl overflow-hidden'}>
      {/* Header */}
      <div className="bg-gradient-to-r from-lime-400 to-lime-500 text-slate-900 p-8 text-center -mx-8 -mt-8 mb-8">
        <h2 className={getTextClasses('h3') + ' text-2xl text-slate-900 mb-2'}>Your weekly credit line</h2>
        <div className="text-6xl font-bold mb-2 text-slate-900">
          €{new Intl.NumberFormat('de-DE').format(loanAmount)}
        </div>
        <p className="text-slate-700">Renews every Monday</p>
      </div>

      {/* Main Details */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <p className={getTextClasses('label') + ' mb-1'}>Weekly Interest Rate</p>
            <p className={getTextClasses('h3') + ' text-2xl'}>{weeklyInterestRate || 1.2}%</p>
            <p className={getTextClasses('caption') + ' mt-1'}>Fixed rate</p>
          </div>
          <div className="text-center">
            <p className={getTextClasses('label') + ' mb-1'}>Weekly Payment</p>
            <p className={getTextClasses('h3') + ' text-2xl'}>
              €{repaymentTerms.weeklyPayment || loanAmount}
            </p>
            <p className={getTextClasses('caption') + ' mt-1'}>+ interest</p>
          </div>
          <div className="text-center">
            <p className={getTextClasses('label') + ' mb-1'}>Renewal Date</p>
            <p className={getTextClasses('h3') + ' text-2xl'}>
              {repaymentTerms.renewalDate || 'Monday'}
            </p>
            <p className={getTextClasses('caption') + ' mt-1'}>Every week</p>
          </div>
        </div>

        {/* Total Weekly Payment */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Total Weekly Payment</p>
              <p className="text-xl font-semibold text-gray-900">
                €{new Intl.NumberFormat('de-DE').format(repaymentTerms.totalWeeklyPayment || loanAmount * 1.012)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Weekly Interest</p>
              <p className="text-lg font-medium text-gray-700">
                €{new Intl.NumberFormat('de-DE').format(repaymentTerms.weeklyInterest || loanAmount * 0.012)}
              </p>
            </div>
          </div>
          <div className="mt-3">
            <p className="text-xs text-gray-500">
              Effective APR: {repaymentTerms.effectiveAPR || 65}%
            </p>
          </div>
        </div>

        {/* Visual Weekly Timeline */}
        <div className="mb-6">
          <h4 className={getTextClasses('h6') + ' mb-3'}>Weekly Credit Cycle</h4>
          <div className="relative">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-slate-600 to-slate-700 rounded-full animate-pulse"></div>
            </div>
            <div className={"flex justify-between mt-2 " + getTextClasses('caption')}>
              <span>Monday</span>
              <span>Credit Available</span>
              <span>Next Monday</span>
            </div>
          </div>
          <div className="mt-2 text-center">
            <p className={getTextClasses('caption')}>
              {repaymentTerms.flexibleTerms || 'Skip a week anytime with 24hr notice'}
            </p>
          </div>
        </div>

        {/* Why This Offer Button */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full text-left mb-6 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-200"
        >
          <div className="flex justify-between items-center">
            <span className={getTextClasses('h6') + ' text-slate-900'}>Why weekly credit?</span>
            <svg
              className={`w-5 h-5 text-slate-600 transform transition-transform duration-200 ${
                showDetails ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {/* Expandable Details */}
        {showDetails && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">Perfect for Your Business:</h4>
            <ul className="space-y-2">
              {offer.explanation?.strengths?.map((strength, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-700">{strength}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">{offer.explanation?.summary}</p>
              <p className="text-sm text-gray-600 mt-2">{offer.explanation?.calculation}</p>
              {offer.explanation?.weeklyBenefit && (
                <p className={getTextClasses('body') + ' text-slate-700 mt-2 font-medium'}>{offer.explanation.weeklyBenefit}</p>
              )}
            </div>
            
            {/* Competitive Advantage */}
            {offer.competitiveAdvantage && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h5 className="font-medium text-gray-900 mb-2">{offer.competitiveAdvantage.title}</h5>
                <ul className="space-y-1">
                  {offer.competitiveAdvantage.points.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-4 h-4 text-slate-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs text-gray-600">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-5 h-5 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            No hidden fees
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-5 h-5 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Skip weeks anytime
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-5 h-5 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            24h validity
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onAccept}
            className={getButtonClasses('primary', 'lg') + ' flex-1 font-semibold'}
          >
            ACCEPT WEEKLY CREDIT
          </button>
          <button
            onClick={onDecline}
            className={getButtonClasses('secondary', 'lg') + ' flex-1'}
          >
            Decline
          </button>
        </div>

        {/* Disclaimer */}
        <p className={getTextClasses('caption') + ' text-center mt-4'}>
          By accepting, you agree to our terms and conditions. This weekly credit offer is valid until{' '}
          {new Date(offer.offerValidUntil).toLocaleString()}.
        </p>
      </div>
    </div>
  );
};

export default CreditOfferCard;