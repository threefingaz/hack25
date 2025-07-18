import React from 'react';

const CashFlowSummary = ({ summary, isDashboard = false }) => {
  if (!summary) return null;

  const weeklyIncome = Math.round(summary.averageMonthlyIncome / 4.33);
  const weeklyExpenses = Math.round(summary.averageMonthlyExpenses / 4.33);
  const weeklyNetCashFlow = Math.round(summary.averageNetCashFlow / 4.33);

  const metrics = [
    {
      label: 'Average Weekly Income',
      value: weeklyIncome,
      format: 'currency',
      trend: weeklyIncome > 500 ? 'positive' : 'neutral',
      tooltip: 'Your average weekly revenue - perfect for weekly credit assessment',
      highlight: true
    },
    {
      label: 'Average Weekly Expenses',
      value: weeklyExpenses,
      format: 'currency',
      trend: 'neutral',
      tooltip: 'Your average weekly costs'
    },
    {
      label: 'Weekly Net Cash Flow',
      value: weeklyNetCashFlow,
      format: 'currency',
      trend: weeklyNetCashFlow > 0 ? 'positive' : 'negative',
      tooltip: 'Weekly income minus expenses - shows your repayment capacity',
      highlight: true
    },
    {
      label: 'Weekly Pattern Volatility',
      value: summary.volatility,
      format: 'percentage',
      trend: summary.volatility < 30 ? 'positive' : summary.volatility < 40 ? 'neutral' : 'negative',
      tooltip: 'How stable your weekly cash flow patterns are'
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

  const getWeeklyCreditEligibility = () => {
    if (weeklyIncome >= 500 && weeklyNetCashFlow > 0 && summary.volatility < 40) {
      return {
        status: 'excellent',
        message: 'Perfect for weekly credit',
        color: 'green'
      };
    } else if (weeklyIncome >= 400 && weeklyNetCashFlow > 0) {
      return {
        status: 'good',
        message: 'Good for weekly credit',
        color: 'yellow'
      };
    } else {
      return {
        status: 'fair',
        message: 'May need improvement',
        color: 'red'
      };
    }
  };

  const creditEligibility = getWeeklyCreditEligibility();

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        {isDashboard ? 'Your Cash Flow Metrics' : 'Weekly Cash Flow Analysis'}
      </h3>
      
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric, index) => (
          <div 
            key={index} 
            className={`text-center p-4 bg-white rounded-lg border transition-shadow ${
              metric.highlight 
                ? 'border-blue-300 bg-blue-50 hover:shadow-lg' 
                : 'border-gray-200 hover:shadow-md'
            }`}
          >
            <div className="flex items-center justify-center mb-2">
              {getTrendIcon(metric.trend)}
            </div>
            <p className={`text-lg font-bold ${getTrendColor(metric.trend, metric.value)} mb-1`}>
              {formatValue(metric.value, metric.format)}
            </p>
            <p className="text-xs text-gray-600 leading-tight">{metric.label}</p>
            {metric.highlight && (
              <div className="mt-2">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  Weekly Focus
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Weekly Credit Readiness */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-900">Weekly Credit Readiness</h4>
          <div className="flex items-center">
            <span className={`text-${creditEligibility.color}-600 font-semibold mr-2 capitalize`}>
              {creditEligibility.status}
            </span>
            <div className={`w-3 h-3 bg-${creditEligibility.color}-500 rounded-full`}></div>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">{creditEligibility.message}</p>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Weekly Income Target</span>
            <div className="flex items-center">
              <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((weeklyIncome / 500) * 100, 100)}%` }}
                ></div>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                €{weeklyIncome}/€500
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Positive Cash Flow Weeks</span>
            <div className="flex items-center">
              <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(summary.positiveCashFlowMonths / summary.totalMonths) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {Math.round((summary.positiveCashFlowMonths / summary.totalMonths) * 8)}/8 weeks
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Competitive Advantage - Only show during application flow */}
      {!isDashboard && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Why Weekly Credit Works for You</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Perfect Size</p>
              <p className="text-xs text-gray-600">€{weeklyIncome} weekly - below Silvr's €5K minimum</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Perfect Timing</p>
              <p className="text-xs text-gray-600">Weekly terms vs iwoca's monthly only</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Flexible</p>
              <p className="text-xs text-gray-600">Renews every Monday, skip weeks anytime</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Instant</p>
              <p className="text-xs text-gray-600">No fixed monthly payments like traditional banks</p>
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default CashFlowSummary;