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
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-6">Financial Summary</h3>
      
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric, index) => (
          <div key={index} className="text-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center mb-2">
              {getTrendIcon(metric.trend)}
            </div>
            <p className={`text-lg font-bold ${getTrendColor(metric.trend, metric.value)} mb-1`}>
              {formatValue(metric.value, metric.format)}
            </p>
            <p className="text-xs text-gray-600 leading-tight">{metric.label}</p>
          </div>
        ))}
      </div>

      {/* Cash Flow Health */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-900">Cash Flow Health</h4>
          <div className="flex items-center">
            {summary.averageNetCashFlow > 0 && summary.volatility < 40 ? (
              <>
                <span className="text-green-600 font-semibold mr-2">Excellent</span>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </>
            ) : summary.averageNetCashFlow > 0 || summary.volatility < 50 ? (
              <>
                <span className="text-yellow-600 font-semibold mr-2">Good</span>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              </>
            ) : (
              <>
                <span className="text-red-600 font-semibold mr-2">Fair</span>
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              </>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Positive Cash Flow Months</span>
          <div className="flex items-center">
            <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(summary.positiveCashFlowMonths / summary.totalMonths) * 100}%` }}
              ></div>
            </div>
            <span className="text-sm font-semibold text-gray-900">
              {summary.positiveCashFlowMonths}/{summary.totalMonths}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashFlowSummary;