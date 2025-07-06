import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CashFlowChart from '../components/CashFlowChart';
import CashFlowSummary from '../components/CashFlowSummary';
import LoadingSkeleton from '../components/LoadingSkeleton';

const CashFlowAnalysisPage = () => {
  const navigate = useNavigate();
  const [cashFlowData, setCashFlowData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCashFlowData();
  }, []);

  const fetchCashFlowData = async () => {
    try {
      const accountId = localStorage.getItem('accountId');
      if (!accountId) {
        navigate('/connect');
        return;
      }

      let apiData = null;
      try {
        const response = await fetch(`http://localhost:3001/api/cash-flow/${accountId}`);
        if (response.ok) {
          apiData = await response.json();
        }
      } catch (apiError) {
        console.log('API not available, using demo data');
      }

      // Fallback to demo data if API fails
      if (!apiData) {
        apiData = generateDemoData(accountId);
      }

      setCashFlowData(apiData);
    } catch (err) {
      setError('Failed to load cash flow data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Generate demo data for when API is not available
  const generateDemoData = (accountId) => {
    const personas = [
      { 
        name: 'Anna Schmidt', 
        accountType: 'Business Current Account', 
        iban: 'DE89 1001 0010 0532 0130 00',
        bic: 'DEUTDEFFXXX',
        accountNumber: '0532013000',
        bankCode: '10010010',
        bankName: 'Deutsche Bank AG',
        accountOpened: '2019-03-15'
      },
      { 
        name: 'Mehmet Özkan', 
        accountType: 'Business Premium Account', 
        iban: 'DE89 1001 0010 9012 3456 78',
        bic: 'DEUTDEFFXXX',
        accountNumber: '9012345678',
        bankCode: '10010010',
        bankName: 'Deutsche Bank AG',
        accountOpened: '2020-07-22'
      },
      { 
        name: 'Maria Rodriguez', 
        accountType: 'Business Current Account', 
        iban: 'DE89 1001 0010 1098 7654 32',
        bic: 'DEUTDEFFXXX',
        accountNumber: '1098765432',
        bankCode: '10010010',
        bankName: 'Deutsche Bank AG',
        accountOpened: '2018-11-08'
      }
    ];
    const personaIndex = Math.abs((accountId || 'demo').charCodeAt(4) || 0) % personas.length;
    const selectedPersona = personas[personaIndex];
    
    return {
      accountId,
      persona: {
        name: selectedPersona.name,
        accountType: selectedPersona.accountType,
        iban: selectedPersona.iban,
        bic: selectedPersona.bic,
        accountNumber: selectedPersona.accountNumber,
        bankCode: selectedPersona.bankCode,
        bankName: selectedPersona.bankName,
        accountOpened: selectedPersona.accountOpened
      },
      monthlyFlows: [
        { month: '2024-10', income: 2150, expenses: 1850 },
        { month: '2024-11', income: 2300, expenses: 1950 },
        { month: '2024-12', income: 2450, expenses: 2100 }
      ],
      summary: {
        averageMonthlyIncome: 2300,
        averageMonthlyExpenses: 1967,
        averageNetCashFlow: 333,
        volatility: 15,
        positiveCashFlowMonths: 3,
        totalMonths: 3
      }
    };
  };

  const handleProceedToOffer = async () => {
    setIsLoading(true);
    try {
      let offerData = null;
      
      try {
        const response = await fetch('http://localhost:3001/api/credit-decision', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            accountId: localStorage.getItem('accountId'),
            cashFlowSummary: cashFlowData.summary
          }),
        });

        if (response.ok) {
          offerData = await response.json();
        }
      } catch (apiError) {
        console.log('API not available, using demo credit decision');
      }

      // Fallback to demo credit offer if API fails
      if (!offerData) {
        offerData = generateDemoCreditOffer(cashFlowData.summary);
      }

      localStorage.setItem('offerId', offerData.offerId);
      localStorage.setItem('creditOffer', JSON.stringify(offerData));
      navigate('/offer');
    } catch (err) {
      setError('Failed to process credit decision. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Generate demo credit offer
  const generateDemoCreditOffer = (summary) => {
    const loanAmount = Math.min(Math.round(summary.averageMonthlyIncome * 0.25), 2500);
    const dailyPayment = Math.ceil(loanAmount * 0.1);
    const numberOfDays = Math.ceil(loanAmount / dailyPayment);
    const totalInterest = Math.round((loanAmount * 0.05 / 100) * numberOfDays * 100) / 100;
    
    return {
      offerId: `demo_offer_${Math.random().toString(36).substr(2, 9)}`,
      approved: true,
      loanAmount: loanAmount,
      currency: 'EUR',
      dailyInterestRate: 0.05,
      repaymentTerms: {
        dailyPayment: dailyPayment,
        numberOfDays: numberOfDays,
        totalInterest: totalInterest,
        totalRepayment: loanAmount + totalInterest,
        effectiveAPR: 18.25
      },
      explanation: {
        summary: `Based on your average monthly income of €${summary.averageMonthlyIncome} and ${summary.volatility}% cash flow volatility, you qualify for a €${loanAmount} loan.`,
        calculation: `This represents ${Math.round((loanAmount / summary.averageMonthlyIncome) * 100)}% of your monthly income, ensuring comfortable repayment.`,
        strengths: ['Steady monthly income', 'Low cash flow volatility', 'Consistent positive cash flow'],
        comparison: 'Traditional banks would typically take 14-21 days for this decision. We did it in seconds using your real cash flow data.'
      },
      offerValidUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-48 mx-auto"></div>
              </div>
            </div>
            <div className="space-y-6">
              <LoadingSkeleton type="chart" />
              <LoadingSkeleton type="card" count={1} />
            </div>
          </div>
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
              onClick={fetchCashFlowData}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Cash Flow Analysis</h1>
            {cashFlowData?.persona && (
              <div>
                {/* Account Holder */}
                <div className="pb-4 border-b border-gray-200 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{cashFlowData.persona.name || 'Maria Rodriguez'}</h2>
                      <p className="text-sm text-gray-600">{cashFlowData.persona.accountType || 'Business Current Account'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Account Since</p>
                      <p className="text-sm font-semibold text-gray-700">
                        {cashFlowData.persona.accountOpened ? 
                          new Date(cashFlowData.persona.accountOpened).toLocaleDateString('en-GB', { 
                            year: 'numeric', 
                            month: 'long' 
                          }) : 'November 2018'
                        }
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bank Details */}
                <div className="mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Bank</p>
                      <p className="text-sm font-semibold text-gray-900">{cashFlowData.persona.bankName || 'Deutsche Bank AG'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">IBAN</p>
                      <p className="text-sm font-mono text-gray-700">{cashFlowData.persona.iban || 'DE89 1001 0010 1098 7654 32'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">BIC/SWIFT</p>
                      <p className="text-sm font-mono text-gray-700">{cashFlowData.persona.bic || 'DEUTDEFFXXX'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Account Number</p>
                      <p className="text-sm font-mono text-gray-700">{cashFlowData.persona.accountNumber || '1098765432'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Bank Code</p>
                      <p className="text-sm font-mono text-gray-700">{cashFlowData.persona.bankCode || '10010010'}</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-600">Account Active</span>
                    </div>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="pb-4 border-b border-gray-200">
                  <div className="flex items-center text-xs text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Read-only access • Bank-grade encryption • No transaction capability</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Cash Flow Chart */}
            {cashFlowData?.monthlyFlows && (
              <CashFlowChart monthlyFlows={cashFlowData.monthlyFlows} />
            )}

            {/* Cash Flow Summary */}
            {cashFlowData?.summary && (
              <CashFlowSummary summary={cashFlowData.summary} />
            )}
          </div>

          {/* Sticky Action Button */}
          <div className="mt-12 sticky bottom-8 z-10">
            <div className="bg-white rounded-xl shadow-2xl border-2 border-blue-200 p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div className="text-center sm:text-left mb-4 sm:mb-0">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    Get Your Credit Offer
                  </h3>
                  <p className="text-sm text-gray-600">
                    Instant decision based on your cash flow analysis
                  </p>
                </div>
                <button
                  onClick={handleProceedToOffer}
                  className="bg-blue-600 text-white font-bold py-4 px-8 rounded-lg hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg transform hover:scale-105 w-full sm:w-auto text-lg"
                >
                  Get My Offer →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashFlowAnalysisPage;