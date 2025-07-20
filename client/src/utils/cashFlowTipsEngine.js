// Cash Flow Tips Engine - Generates personalized tips based on cash flow patterns

class CashFlowTipsEngine {
  constructor() {
    this.tipCategories = {
      REVENUE: 'revenue',
      EXPENSES: 'expenses',
      TIMING: 'timing',
      GROWTH: 'growth',
      STABILITY: 'stability'
    };

    this.tipPriorities = {
      HIGH: 'high',
      MEDIUM: 'medium',
      LOW: 'low'
    };
  }

  // Main function to generate tips based on cash flow data
  generateTips(cashFlowSummary, persona = null) {
    const tips = [];
    
    // Analyze patterns and generate relevant tips
    tips.push(...this.analyzeRevenuePatterns(cashFlowSummary));
    tips.push(...this.analyzeExpensePatterns(cashFlowSummary));
    tips.push(...this.analyzeCashFlowTiming(cashFlowSummary));
    tips.push(...this.analyzeGrowthOpportunities(cashFlowSummary));
    tips.push(...this.analyzeStabilityFactors(cashFlowSummary));
    
    // Add persona-specific tips if available
    if (persona) {
      tips.push(...this.getPersonaSpecificTips(persona, cashFlowSummary));
    }
    
    // Sort by priority and limit to top tips
    return this.prioritizeAndFilter(tips, 5);
  }

  // Analyze revenue patterns
  analyzeRevenuePatterns(summary) {
    const tips = [];
    const weeklyIncome = Math.round(summary.averageMonthlyIncome / 4.33);
    
    if (weeklyIncome < 600) {
      tips.push({
        id: 'rev-low-1',
        category: this.tipCategories.REVENUE,
        priority: this.tipPriorities.HIGH,
        title: 'Boost Weekly Revenue',
        description: 'Your weekly revenue is below €600. Consider adding premium services or increasing prices by 10-15%.',
        actionable: true,
        impact: 'Could increase credit limit by €100-200/week'
      });
    }
    
    if (summary.volatility > 30) {
      tips.push({
        id: 'rev-volatile-1',
        category: this.tipCategories.REVENUE,
        priority: this.tipPriorities.MEDIUM,
        title: 'Stabilize Income Streams',
        description: 'Your revenue varies by ' + summary.volatility + '%. Consider subscription models or retainer agreements.',
        actionable: true,
        impact: 'More predictable cash flow = better credit terms'
      });
    }
    
    return tips;
  }

  // Analyze expense patterns
  analyzeExpensePatterns(summary) {
    const tips = [];
    const expenseRatio = summary.averageMonthlyExpenses / summary.averageMonthlyIncome;
    
    if (expenseRatio > 0.85) {
      tips.push({
        id: 'exp-high-1',
        category: this.tipCategories.EXPENSES,
        priority: this.tipPriorities.HIGH,
        title: 'Reduce Operating Costs',
        description: 'Your expenses are ' + Math.round(expenseRatio * 100) + '% of revenue. Target 75-80% for healthier margins.',
        actionable: true,
        impact: 'Every €100 saved = €100 more credit capacity'
      });
    }
    
    return tips;
  }

  // Analyze cash flow timing
  analyzeCashFlowTiming(summary) {
    const tips = [];
    
    if (summary.weeklyPattern === 'Strong') {
      tips.push({
        id: 'time-strong-1',
        category: this.tipCategories.TIMING,
        priority: this.tipPriorities.LOW,
        title: 'Optimize Payment Timing',
        description: 'Your weekly pattern is strong. Align major expenses with high-revenue days for better flow.',
        actionable: true,
        impact: 'Reduces need for credit on slow days'
      });
    }
    
    return tips;
  }

  // Analyze growth opportunities
  analyzeGrowthOpportunities(summary) {
    const tips = [];
    const monthlyIncome = summary.averageMonthlyIncome;
    
    if (monthlyIncome >= 1800 && monthlyIncome < 3000) {
      tips.push({
        id: 'growth-mid-1',
        category: this.tipCategories.GROWTH,
        priority: this.tipPriorities.MEDIUM,
        title: 'Scale Your Business',
        description: 'You\'re close to the €3K/month tier. Focus on customer acquisition to unlock €750+ weekly credit.',
        actionable: true,
        impact: 'Next tier = 40% more credit availability'
      });
    }
    
    return tips;
  }

  // Analyze stability factors
  analyzeStabilityFactors(summary) {
    const tips = [];
    
    if (summary.positiveCashFlowMonths < summary.totalMonths) {
      tips.push({
        id: 'stab-neg-1',
        category: this.tipCategories.STABILITY,
        priority: this.tipPriorities.HIGH,
        title: 'Maintain Positive Cash Flow',
        description: 'You had negative cash flow in ' + (summary.totalMonths - summary.positiveCashFlowMonths) + ' months. Consistency improves credit terms.',
        actionable: true,
        impact: 'Consistent positive flow = automatic credit increases'
      });
    }
    
    return tips;
  }

  // Get persona-specific tips
  getPersonaSpecificTips(persona, summary) {
    const tips = [];
    
    switch(persona) {
      case 'anna': // Food truck owner
        tips.push({
          id: 'persona-anna-1',
          category: this.tipCategories.REVENUE,
          priority: this.tipPriorities.MEDIUM,
          title: 'Weekend Revenue Optimization',
          description: 'Food trucks typically earn 60% on weekends. Consider catering events Monday-Thursday.',
          actionable: true,
          impact: 'Could add €300-500 weekly revenue'
        });
        break;
        
      case 'mehmet': // Online retailer
        tips.push({
          id: 'persona-mehmet-1',
          category: this.tipCategories.GROWTH,
          priority: this.tipPriorities.MEDIUM,
          title: 'Inventory Turnover',
          description: 'Weekly credit is perfect for inventory purchases. Buy Monday, sell by Friday, repeat.',
          actionable: true,
          impact: 'Faster turnover = more profit per credit cycle'
        });
        break;
        
      case 'maria': // Event planner
        tips.push({
          id: 'persona-maria-1',
          category: this.tipCategories.TIMING,
          priority: this.tipPriorities.MEDIUM,
          title: 'Deposit Structure',
          description: 'Request 50% deposits upfront to reduce credit needs for event supplies.',
          actionable: true,
          impact: 'Better cash flow timing = less credit dependency'
        });
        break;
    }
    
    return tips;
  }

  // Prioritize and filter tips
  prioritizeAndFilter(tips, maxTips = 5) {
    // Sort by priority
    const priorityOrder = {
      [this.tipPriorities.HIGH]: 3,
      [this.tipPriorities.MEDIUM]: 2,
      [this.tipPriorities.LOW]: 1
    };
    
    tips.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    
    // Return top tips
    return tips.slice(0, maxTips);
  }

  // Get tips for rejected users
  getRejectionTips(rejectionReason) {
    const tips = [];
    
    if (rejectionReason.includes('income')) {
      tips.push({
        id: 'reject-income-1',
        category: this.tipCategories.REVENUE,
        priority: this.tipPriorities.HIGH,
        title: 'Reach €2,000 Monthly Revenue',
        description: 'Focus on increasing prices or adding services. Track progress weekly.',
        actionable: true,
        impact: 'Qualify for €500+ weekly credit'
      });
    }
    
    if (rejectionReason.includes('negative cash flow')) {
      tips.push({
        id: 'reject-flow-1',
        category: this.tipCategories.EXPENSES,
        priority: this.tipPriorities.HIGH,
        title: 'Fix Your Cash Flow First',
        description: 'Cut expenses by 20% or increase revenue. Credit won\'t solve negative flow.',
        actionable: true,
        impact: 'Positive flow required for any credit'
      });
    }
    
    return tips;
  }
}

export default new CashFlowTipsEngine();