import React from 'react';

const CashFlowSummary = ({ summary }) => {
  if (!summary) return null;

  const metrics = [
    {
      label: 'Average Monthly Income',
      value: summary.averageMonthlyIncome,
      format: 'currency',
      trend: summary.averageMonthlyIncome > 2000 ? 'positive' : 'neutral',
      tooltip: 'Your average income over the past 3 months'
    },
    {
      label: 'Average Monthly Expenses',
      value: summary.averageMonthlyExpenses,
      format: 'currency',
      trend: 'neutral',
      tooltip: 'Your average expenses over the past 3 months'
    },
    {
      label: 'Average Net Cash Flow',
      value: summary.averageNetCashFlow,
      format: 'currency',
      trend: summary.averageNetCashFlow > 0 ? 'positive' : 'negative',
      tooltip: 'Income minus expenses on average'
    },
    {
      label: 'Cash Flow Volatility',
      value: summary.volatility,
      format: 'percentage',
      trend: summary.volatility < 30 ? 'positive' : summary.volatility < 40 ? 'neutral' : 'negative',
      tooltip: 'How much your cash flow varies month to month'
    }
  ];

  const formatValue = (value, format) => {
    switch (format) {
      case 'currency':
        return `€${new Intl.NumberFormat('de-DE').format(Math.abs(value))}`;
      case 'percentage':
        return `${value}%`;
      default:
        return value;
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'positive':
        return (
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      case 'negative':
        return (
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
          </svg>
        );
    }
  };

  const getTrendColor = (trend, value) => {
    if (value < 0 && trend !== 'negative') return 'text-red-600';
    switch (trend) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-gray-900';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Cash Flow Summary</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="relative group">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">{metric.label}</p>
                <p className={`text-2xl font-bold ${getTrendColor(metric.trend, metric.value)}`}>
                  {formatValue(metric.value, metric.format)}
                </p>
              </div>
              <div className="ml-4 mt-1">
                {getTrendIcon(metric.trend)}
              </div>
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-10">
              <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                {metric.tooltip}
                <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Positive Cash Flow Months</p>
            <p className="text-lg font-semibold text-gray-900">
              {summary.positiveCashFlowMonths} out of {summary.totalMonths}
            </p>
          </div>
          <div className="flex items-center">
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(summary.positiveCashFlowMonths / summary.totalMonths) * 100}%` }}
              ></div>
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {Math.round((summary.positiveCashFlowMonths / summary.totalMonths) * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* Business Health Indicator */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Business Health Score</span>
          <div className="flex items-center">
            {summary.averageNetCashFlow > 0 && summary.volatility < 40 ? (
              <>
                <span className="text-green-600 font-semibold mr-2">Good</span>
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </>
            ) : summary.averageNetCashFlow > 0 || summary.volatility < 50 ? (
              <>
                <span className="text-yellow-600 font-semibold mr-2">Fair</span>
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </>
            ) : (
              <>
                <span className="text-red-600 font-semibold mr-2">Needs Improvement</span>
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashFlowSummary;