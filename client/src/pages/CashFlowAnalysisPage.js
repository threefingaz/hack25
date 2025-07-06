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

      const response = await fetch(`http://localhost:3001/api/cash-flow/${accountId}`);
      const data = await response.json();

      if (response.ok) {
        setCashFlowData(data);
      } else {
        setError(data.error || 'Failed to fetch cash flow data');
      }
    } catch (err) {
      setError('Failed to connect to server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleProceedToOffer = async () => {
    setIsLoading(true);
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

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('offerId', data.offerId);
        localStorage.setItem('creditOffer', JSON.stringify(data));
        navigate('/offer');
      } else {
        setError(data.error || 'Failed to generate credit offer');
      }
    } catch (err) {
      setError('Failed to process credit decision. Please try again.');
    } finally {
      setIsLoading(false);
    }
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