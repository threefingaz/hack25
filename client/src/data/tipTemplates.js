// Cash Flow Tip Templates - Structured tip content for different scenarios

export const tipTemplates = {
  // Revenue optimization tips
  revenue: {
    lowIncome: {
      title: 'Boost Weekly Revenue',
      templates: [
        'Consider premium services - add 15-20% to current pricing',
        'Expand operating hours during peak demand periods',
        'Partner with complementary businesses for cross-promotion',
        'Introduce loyalty programs to increase repeat customers'
      ]
    },
    volatile: {
      title: 'Stabilize Income Streams',
      templates: [
        'Develop subscription or retainer-based services',
        'Create package deals to encourage advance bookings',
        'Build corporate client relationships for predictable revenue',
        'Diversify services to reduce dependency on single income source'
      ]
    },
    seasonal: {
      title: 'Smooth Seasonal Variations',
      templates: [
        'Offer counter-seasonal services or products',
        'Build cash reserves during peak seasons',
        'Create off-season maintenance or preparation services',
        'Partner with businesses that have opposite seasonal patterns'
      ]
    }
  },

  // Expense optimization tips
  expenses: {
    highRatio: {
      title: 'Optimize Operating Costs',
      templates: [
        'Negotiate better rates with suppliers - even 5% saves significant money',
        'Review and eliminate unused subscriptions or services',
        'Consider shared resources or co-working arrangements',
        'Implement energy-efficient practices to reduce utility costs'
      ]
    },
    timing: {
      title: 'Improve Payment Timing',
      templates: [
        'Negotiate 30-day payment terms with suppliers',
        'Align major expenses with high-revenue periods',
        'Use weekly credit for time-sensitive purchases',
        'Schedule fixed costs for beginning of strong cash flow weeks'
      ]
    },
    variable: {
      title: 'Control Variable Costs',
      templates: [
        'Track cost per unit/service to identify efficiency opportunities',
        'Bulk purchase during high cash flow periods',
        'Negotiate volume discounts with regular suppliers',
        'Implement just-in-time inventory management'
      ]
    }
  },

  // Growth and scaling tips
  growth: {
    nextTier: {
      title: 'Scale to Next Credit Tier',
      templates: [
        'Focus on customer acquisition - track cost per acquisition',
        'Increase average transaction value through upselling',
        'Expand service offerings to existing customers',
        'Invest in marketing during high cash flow weeks'
      ]
    },
    efficiency: {
      title: 'Improve Operational Efficiency',
      templates: [
        'Automate repetitive tasks to save time and money',
        'Standardize processes to reduce errors and waste',
        'Invest in tools that increase productivity',
        'Train team members to handle multiple responsibilities'
      ]
    },
    market: {
      title: 'Expand Market Reach',
      templates: [
        'Explore adjacent markets or customer segments',
        'Develop online presence to reach wider audience',
        'Create referral programs to leverage existing customers',
        'Partner with businesses that serve similar customers'
      ]
    }
  },

  // Stability and risk management tips
  stability: {
    consistency: {
      title: 'Maintain Consistent Performance',
      templates: [
        'Track key metrics weekly to spot trends early',
        'Create standard operating procedures for consistent quality',
        'Build relationships with multiple suppliers for reliability',
        'Maintain 2-3 weeks of operating expenses in reserve'
      ]
    },
    risk: {
      title: 'Reduce Business Risk',
      templates: [
        'Diversify customer base - avoid dependency on single client',
        'Create multiple revenue streams within your expertise',
        'Build strong relationships with 2-3 key suppliers',
        'Develop contingency plans for common business disruptions'
      ]
    },
    planning: {
      title: 'Improve Financial Planning',
      templates: [
        'Create weekly cash flow forecasts',
        'Plan major purchases for high cash flow periods',
        'Set aside money for tax obligations weekly',
        'Track profit margins by service/product line'
      ]
    }
  },

  // Industry-specific tips
  industry: {
    foodTruck: {
      title: 'Food Truck Optimization',
      templates: [
        'Track location performance - focus on high-profit spots',
        'Offer catering services for consistent weekday revenue',
        'Partner with local businesses for lunchtime contracts',
        'Create loyalty programs for regular customers'
      ]
    },
    retail: {
      title: 'Retail Cash Flow Tips',
      templates: [
        'Use weekly credit for inventory during high-demand periods',
        'Implement inventory turnover targets - buy Monday, sell Friday',
        'Negotiate with suppliers for weekly delivery schedules',
        'Track profit margins by product category'
      ]
    },
    services: {
      title: 'Service Business Tips',
      templates: [
        'Request deposits upfront to improve cash flow timing',
        'Create service packages for predictable revenue',
        'Develop long-term contracts with key clients',
        'Offer premium rush services for higher margins'
      ]
    },
    events: {
      title: 'Event Planning Optimization',
      templates: [
        'Structure payments: 50% deposit, 30% one week before, 20% day of',
        'Build relationships with reliable vendors for consistent pricing',
        'Create event packages to simplify pricing and planning',
        'Offer planning services for corporate recurring events'
      ]
    }
  },

  // Credit-specific tips
  credit: {
    optimization: {
      title: 'Optimize Credit Usage',
      templates: [
        'Use weekly credit for inventory that turns over quickly',
        'Time credit usage with your strongest revenue days',
        'Pay back early when possible to improve credit terms',
        'Track ROI on credit-funded purchases'
      ]
    },
    building: {
      title: 'Build Credit Relationship',
      templates: [
        'Consistent repayment builds trust for limit increases',
        'Document how credit improves your business performance',
        'Use credit strategically - not for covering losses',
        'Track correlation between credit usage and revenue growth'
      ]
    }
  }
};

// Helper function to get relevant tips based on business profile
export const getTipsByProfile = (profile) => {
  const { monthlyIncome, volatility, netCashFlow, industry } = profile;
  const relevantTips = [];
  
  // Add tips based on income level
  if (monthlyIncome < 2000) {
    relevantTips.push(...tipTemplates.revenue.lowIncome.templates);
  }
  
  // Add tips based on volatility
  if (volatility > 30) {
    relevantTips.push(...tipTemplates.revenue.volatile.templates);
  }
  
  // Add tips based on cash flow
  if (netCashFlow < 300) {
    relevantTips.push(...tipTemplates.expenses.highRatio.templates);
  }
  
  // Add industry-specific tips
  if (industry && tipTemplates.industry[industry]) {
    relevantTips.push(...tipTemplates.industry[industry].templates);
  }
  
  return relevantTips;
};

export default tipTemplates;