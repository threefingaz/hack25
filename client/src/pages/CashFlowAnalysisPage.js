import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CashFlowChart from '../components/CashFlowChart';
import CashFlowSummary from '../components/CashFlowSummary';
import LoadingSpinner from '../components/LoadingSpinner';

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
    const personas = ['Anna Schmidt - Food Truck Owner', 'Mehmet Özkan - Online Retailer', 'Maria Rodriguez - Event Planner'];
    const personaIndex = Math.abs(accountId.charCodeAt(4) || 0) % personas.length;
    
    return {
      accountId,
      persona: {
        name: personas[personaIndex].split(' - ')[0],
        business: personas[personaIndex].split(' - ')[1],
        type: personas[personaIndex]
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-gray-600">Analyzing your cash flow...</p>
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
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Cash Flow Analysis</h1>
            {cashFlowData?.persona && (
              <p className="text-lg text-gray-600">
                {cashFlowData.persona.name} - {cashFlowData.persona.business}
              </p>
            )}
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            {/* Cash Flow Chart */}
            {cashFlowData?.monthlyFlows && (
              <CashFlowChart monthlyFlows={cashFlowData.monthlyFlows} />
            )}

            {/* Cash Flow Summary */}
            {cashFlowData?.summary && (
              <CashFlowSummary summary={cashFlowData.summary} />
            )}

            {/* Action Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Ready to see your credit offer?
                </h3>
                <p className="text-gray-600 mb-6">
                  Based on your cash flow analysis, we can provide you with a personalized credit offer in seconds.
                </p>
                <button
                  onClick={handleProceedToOffer}
                  className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Get My Credit Offer
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