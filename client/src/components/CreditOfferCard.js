import React, { useState } from 'react';

const CreditOfferCard = ({ offer, onAccept, onDecline }) => {
  const [showDetails, setShowDetails] = useState(false);

  if (!offer) return null;

  const { loanAmount, repaymentTerms, dailyInterestRate } = offer;

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 text-center">
        <h2 className="text-2xl font-medium mb-2">You're approved for</h2>
        <div className="text-6xl font-bold mb-2">
          €{new Intl.NumberFormat('de-DE').format(loanAmount)}
        </div>
        <p className="text-blue-100">Instant business funding</p>
      </div>

      {/* Main Details */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Daily Interest Rate</p>
            <p className="text-2xl font-semibold text-gray-900">{dailyInterestRate}%</p>
            <p className="text-xs text-gray-500 mt-1">Fixed rate</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Daily Payment</p>
            <p className="text-2xl font-semibold text-gray-900">
              €{repaymentTerms.dailyPayment}
            </p>
            <p className="text-xs text-gray-500 mt-1">Automatic deduction</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Repayment Period</p>
            <p className="text-2xl font-semibold text-gray-900">
              {repaymentTerms.numberOfDays} days
            </p>
            <p className="text-xs text-gray-500 mt-1">No prepayment penalty</p>
          </div>
        </div>

        {/* Total Repayment */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Total Repayment</p>
              <p className="text-xl font-semibold text-gray-900">
                €{new Intl.NumberFormat('de-DE').format(repaymentTerms.totalRepayment)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Interest</p>
              <p className="text-lg font-medium text-gray-700">
                €{new Intl.NumberFormat('de-DE').format(repaymentTerms.totalInterest)}
              </p>
            </div>
          </div>
          <div className="mt-3">
            <p className="text-xs text-gray-500">
              Effective APR: {repaymentTerms.effectiveAPR}%
            </p>
          </div>
        </div>

        {/* Visual Repayment Timeline */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Daily Repayment Timeline</h4>
          <div className="relative">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-pulse"></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-600">
              <span>Day 1</span>
              <span>€{repaymentTerms.dailyPayment}/day</span>
              <span>Day {repaymentTerms.numberOfDays}</span>
            </div>
          </div>
        </div>

        {/* Why This Offer Button */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full text-left mb-6 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
        >
          <div className="flex justify-between items-center">
            <span className="font-medium text-blue-900">Why this offer?</span>
            <svg
              className={`w-5 h-5 text-blue-600 transform transition-transform duration-200 ${
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
            <h4 className="font-medium text-gray-900 mb-3">Factors in Your Favor:</h4>
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
            </div>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Instant disbursement
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
            className="flex-1 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Accept Offer
          </button>
          <button
            onClick={onDecline}
            className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Decline
          </button>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-gray-500 text-center mt-4">
          By accepting, you agree to our terms and conditions. This offer is valid until{' '}
          {new Date(offer.offerValidUntil).toLocaleString()}.
        </p>
      </div>
    </div>
  );
};

export default CreditOfferCard;