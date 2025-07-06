import React, { useState } from 'react';

const OfferExplanation = ({ offer, className = '' }) => {
  const [activeTab, setActiveTab] = useState('calculation');

  if (!offer) return null;

  const tabs = [
    {
      id: 'calculation',
      label: 'How We Calculated',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'comparison',
      label: 'vs Traditional Banks',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      id: 'faq',
      label: 'FAQ',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const faqItems = [
    {
      question: 'When will I receive the funds?',
      answer: 'Funds are typically transferred within 24 hours of acceptance, often within minutes during business hours.'
    },
    {
      question: 'Are there any hidden fees?',
      answer: 'No hidden fees. The total cost is clearly shown: daily interest rate of 0.05% with no setup fees, processing fees, or early repayment penalties.'
    },
    {
      question: 'How does daily repayment work?',
      answer: 'Small daily payments are automatically deducted from your connected account. This matches your daily business income pattern for easier cash flow management.'
    },
    {
      question: 'Can I pay off early?',
      answer: 'Yes, you can pay off the loan early without any penalties. You\'ll save on interest costs by paying off sooner.'
    },
    {
      question: 'What if I miss a payment?',
      answer: 'We understand business cash flow can vary. Contact us immediately if you anticipate difficulties - we work with businesses to find solutions.'
    }
  ];

  return (
    <div className={`${className}`}>
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="pt-6">
        {/* Calculation Tab */}
        {activeTab === 'calculation' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Amount Calculation</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700 mb-3">{offer.explanation?.summary}</p>
                <p className="text-sm text-gray-700">{offer.explanation?.calculation}</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Your Positive Factors:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {offer.explanation?.strengths?.map((strength, index) => (
                  <div key={index} className="flex items-start bg-green-50 rounded-lg p-3">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-green-800">{strength}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Daily Repayment Structure:</h4>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-blue-900">Daily Payment</p>
                    <p className="text-blue-800">€{offer.repaymentTerms.dailyPayment}</p>
                  </div>
                  <div>
                    <p className="font-medium text-blue-900">Number of Days</p>
                    <p className="text-blue-800">{offer.repaymentTerms.numberOfDays}</p>
                  </div>
                  <div>
                    <p className="font-medium text-blue-900">Total Interest</p>
                    <p className="text-blue-800">€{offer.repaymentTerms.totalInterest}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Comparison Tab */}
        {activeTab === 'comparison' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Speed Comparison</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-medium text-green-800 mb-2">CashFlow Bridge</h4>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Decision in seconds
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Funds in 24 hours
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      No credit checks
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Based on cash flow
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">Traditional Banks</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      14-21 days decision
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Additional 7-14 days for funds
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Extensive credit checks
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Requires collateral
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>{offer.explanation?.comparison}</strong>
              </p>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Regulatory Compliance</h4>
              <div className="flex items-start bg-gray-50 rounded-lg p-4">
                <svg className="w-6 h-6 text-gray-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div>
                  <p className="text-sm text-gray-700 mb-2">
                    CashFlow Bridge operates under BaFin (German Federal Financial Supervisory Authority) regulations, ensuring your financial data protection and fair lending practices.
                  </p>
                  <p className="text-xs text-gray-600">
                    License Number: BaFin-ABC-123456 (Demo)
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
            {faqItems.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <div className="p-4">
                  <h4 className="font-medium text-gray-900 mb-2">{item.question}</h4>
                  <p className="text-sm text-gray-700">{item.answer}</p>
                </div>
              </div>
            ))}
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-yellow-800">Still have questions?</p>
                  <p className="text-sm text-yellow-700 mt-1">
                    Contact our business support team at support@cashflowbridge.de or call +49 30 1234 5678
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferExplanation;