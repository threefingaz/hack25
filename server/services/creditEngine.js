// Credit decision engine for CashFlow Bridge - Weekly Micro-Credit

class CreditEngine {
  constructor() {
    // Configuration parameters for weekly credit
    this.config = {
      minWeeklyIncome: 500, // €500 minimum weekly income
      minMonthlyIncome: 2000, // Still check monthly for stability
      maxVolatility: 40,
      minPositiveWeeks: 3, // At least 3 positive weeks in last 8
      baseRate: 0.012, // 1.2% weekly interest (competitive with daily lenders)
      minLoanAmount: 500,
      maxLoanAmount: 5000,
      loanPercentageOfWeeklyIncome: 0.5, // 50% of weekly income
      weeklyRepaymentRate: 1.0, // Full repayment each week
      analysisWeeks: 8 // Look at 8 weeks of history
    };
  }

  // Main credit decision function
  assessCreditworthiness(cashFlowSummary) {
    console.log('CreditEngine - assessCreditworthiness - cashFlowSummary:', cashFlowSummary);
    const eligibility = this.checkEligibility(cashFlowSummary);
    
    if (!eligibility.isEligible) {
      return {
        approved: false,
        reason: eligibility.reason,
        factors: eligibility.factors,
        referral: this.getSmartReferral(cashFlowSummary, eligibility.reason)
      };
    }

    // Calculate weekly loan offer
    const loanAmount = this.calculateWeeklyLoanAmount(cashFlowSummary);
    const repaymentTerms = this.calculateWeeklyRepaymentTerms(loanAmount);
    const riskScore = this.calculateRiskScore(cashFlowSummary);

    return {
      approved: true,
      loanAmount,
      weeklyInterestRate: this.config.baseRate,
      repaymentTerms,
      riskScore,
      factors: this.getPositiveFactors(cashFlowSummary),
      explanation: this.generateExplanation(cashFlowSummary, loanAmount),
      competitiveAdvantage: this.getCompetitiveAdvantage(loanAmount)
    };
  }

  // Check basic eligibility criteria
  checkEligibility(summary) {
    console.log('CreditEngine - checkEligibility - summary:', summary);
    const factors = [];
    let isEligible = true;
    let reason = '';

    // Check average weekly income
    const averageWeeklyIncome = summary.averageMonthlyIncome / 4.33;
    console.log('CreditEngine - averageWeeklyIncome:', averageWeeklyIncome, 'minWeeklyIncome:', this.config.minWeeklyIncome);
    if (averageWeeklyIncome < this.config.minWeeklyIncome) {
      isEligible = false;
      reason = 'Insufficient average weekly income';
      factors.push({
        factor: 'Average Weekly Income',
        value: `€${Math.round(averageWeeklyIncome)}`,
        required: `€${this.config.minWeeklyIncome}`,
        status: 'failed'
      });
    } else {
      factors.push({
        factor: 'Average Weekly Income',
        value: `€${Math.round(averageWeeklyIncome)}`,
        required: `€${this.config.minWeeklyIncome}`,
        status: 'passed'
      });
    }

    // Check monthly income for stability
    if (summary.averageMonthlyIncome < this.config.minMonthlyIncome) {
      isEligible = false;
      reason = 'Insufficient monthly income stability';
      factors.push({
        factor: 'Monthly Income Stability',
        value: `€${summary.averageMonthlyIncome}`,
        required: `€${this.config.minMonthlyIncome}`,
        status: 'failed'
      });
    } else {
      factors.push({
        factor: 'Monthly Income Stability',
        value: `€${summary.averageMonthlyIncome}`,
        required: `€${this.config.minMonthlyIncome}`,
        status: 'passed'
      });
    }

    // Check weekly pattern volatility
    if (summary.volatility > this.config.maxVolatility) {
      factors.push({
        factor: 'Weekly Pattern Volatility',
        value: `${summary.volatility}%`,
        required: `< ${this.config.maxVolatility}%`,
        status: 'warning'
      });
    } else {
      factors.push({
        factor: 'Weekly Pattern Volatility',
        value: `${summary.volatility}%`,
        required: `< ${this.config.maxVolatility}%`,
        status: 'passed'
      });
    }

    // Check positive cash flow weeks (simulated from monthly data)
    const positiveWeeks = Math.round((summary.positiveCashFlowMonths / summary.totalMonths) * this.config.analysisWeeks);
    if (positiveWeeks < this.config.minPositiveWeeks) {
      isEligible = false;
      reason = 'Insufficient positive cash flow weeks';
      factors.push({
        factor: 'Positive Cash Flow Weeks',
        value: `${positiveWeeks} of ${this.config.analysisWeeks}`,
        required: `At least ${this.config.minPositiveWeeks}`,
        status: 'failed'
      });
    } else {
      factors.push({
        factor: 'Positive Cash Flow Weeks',
        value: `${positiveWeeks} of ${this.config.analysisWeeks}`,
        required: `At least ${this.config.minPositiveWeeks}`,
        status: 'passed'
      });
    }

    // Check if net cash flow is positive
    if (summary.averageNetCashFlow <= 0) {
      isEligible = false;
      reason = 'Negative average net cash flow';
      factors.push({
        factor: 'Average Net Cash Flow',
        value: `€${summary.averageNetCashFlow}`,
        required: 'Positive',
        status: 'failed'
      });
    } else {
      factors.push({
        factor: 'Average Net Cash Flow',
        value: `€${summary.averageNetCashFlow}`,
        required: 'Positive',
        status: 'passed'
      });
    }

    return { isEligible, reason, factors };
  }

  // Calculate weekly loan amount
  calculateWeeklyLoanAmount(summary) {
    const weeklyIncome = summary.averageMonthlyIncome / 4.33;
    let baseAmount = weeklyIncome * this.config.loanPercentageOfWeeklyIncome;
    
    // Apply volatility adjustment
    if (summary.volatility > 30) {
      const volatilityPenalty = (summary.volatility - 30) / 100;
      baseAmount *= (1 - volatilityPenalty * 0.3); // Reduce by up to 30% for high volatility
    }
    
    // Apply positive weeks bonus
    const positiveWeeksRatio = summary.positiveCashFlowMonths / summary.totalMonths;
    if (positiveWeeksRatio > 0.9) {
      baseAmount *= 1.15; // 15% bonus for excellent record
    }
    
    // Weekly business pattern bonus (for food trucks, market vendors)
    if (weeklyIncome >= 600 && weeklyIncome <= 1500) {
      baseAmount *= 1.1; // 10% bonus for target segment
    }
    
    // Ensure within bounds
    const finalAmount = Math.max(
      this.config.minLoanAmount,
      Math.min(baseAmount, this.config.maxLoanAmount)
    );
    
    // Round to nearest 100
    return Math.round(finalAmount / 100) * 100;
  }

  // Calculate weekly repayment terms
  calculateWeeklyRepaymentTerms(loanAmount) {
    const weeklyPayment = loanAmount; // Full repayment each week
    const weeklyInterest = loanAmount * this.config.baseRate;
    const totalWeeklyPayment = weeklyPayment + weeklyInterest;
    
    return {
      loanAmount,
      weeklyPayment,
      weeklyInterest: Math.round(weeklyInterest * 100) / 100,
      totalWeeklyPayment: Math.round(totalWeeklyPayment * 100) / 100,
      effectiveAPR: this.calculateAPR(loanAmount, weeklyInterest),
      renewalDate: 'Every Monday',
      flexibleTerms: 'Skip a week anytime with 24hr notice'
    };
  }

  // Calculate annual percentage rate for weekly loans
  calculateAPR(principal, weeklyInterest) {
    const weeklyRate = weeklyInterest / principal;
    const apr = Math.pow(1 + weeklyRate, 52) - 1;
    return Math.round(apr * 10000) / 100; // Return as percentage
  }

  // Calculate risk score (0-100, higher is better)
  calculateRiskScore(summary) {
    let score = 50; // Base score
    
    // Weekly income factor (up to 25 points)
    const weeklyIncome = summary.averageMonthlyIncome / 4.33;
    const incomeScore = Math.min(25, (weeklyIncome / 1500) * 25);
    score += incomeScore;
    
    // Volatility factor (up to 20 points)
    const volatilityScore = Math.max(0, 20 - (summary.volatility / 2));
    score += volatilityScore;
    
    // Consistency factor (up to 5 points)
    const consistencyScore = (summary.positiveCashFlowMonths / summary.totalMonths) * 5;
    score += consistencyScore;
    
    return Math.round(score);
  }

  // Get positive factors for the decision
  getPositiveFactors(summary) {
    const factors = [];
    const weeklyIncome = summary.averageMonthlyIncome / 4.33;
    
    if (weeklyIncome >= 800) {
      factors.push('Strong weekly revenue');
    } else if (weeklyIncome >= 600) {
      factors.push('Steady weekly cash flow');
    }
    
    if (summary.volatility < 25) {
      factors.push('Predictable weekly patterns');
    } else if (summary.volatility < 35) {
      factors.push('Stable business cycle');
    }
    
    if (summary.positiveCashFlowMonths === summary.totalMonths) {
      factors.push('Consistent positive performance');
    }
    
    if (summary.averageNetCashFlow > 500) {
      factors.push('Healthy profit margins');
    }
    
    factors.push('Perfect fit for weekly credit');
    
    return factors;
  }

  // Generate explanation for the credit decision
  generateExplanation(summary, loanAmount) {
    const weeklyIncome = Math.round(summary.averageMonthlyIncome / 4.33);
    const incomeRatio = (loanAmount / weeklyIncome * 100).toFixed(1);
    
    return {
      summary: `Based on your average weekly revenue of €${weeklyIncome}, you qualify for a €${loanAmount} weekly credit line.`,
      calculation: `This is ${incomeRatio}% of your weekly revenue - designed to match your business cycle perfectly.`,
      strengths: this.getPositiveFactors(summary),
      weeklyBenefit: 'Renews every Monday morning, giving you fresh working capital exactly when you need it.',
      comparison: 'Unlike monthly loans, our weekly credit matches your cash flow pattern - pay back what you earned, keep what you need.'
    };
  }

  // Get competitive advantage messaging
  getCompetitiveAdvantage(loanAmount) {
    if (loanAmount < 5000) {
      return {
        title: 'Perfect for micro-businesses',
        points: [
          `€${loanAmount} weekly - below Silvr's €5K minimum`,
          'Weekly terms vs iwoca\'s monthly only',
          'No fixed monthly payments like traditional banks',
          'Renews automatically every Monday'
        ]
      };
    }
    return {
      title: 'Maximum weekly credit line',
      points: [
        'Full €5,000 available each week',
        'Most flexible terms in Germany',
        'Skip weeks without penalty',
        'Lower rates than daily lenders'
      ]
    };
  }

  // Smart referral system for rejections
  getSmartReferral(summary, rejectionReason) {
    const monthlyIncome = summary.averageMonthlyIncome;
    const hasPositiveCashFlow = summary.averageNetCashFlow > 0;
    
    // Too small for us, but growing
    if (monthlyIncome < 2000 && monthlyIncome > 1000 && hasPositiveCashFlow) {
      return {
        partner: 'Silvr',
        reason: 'Your business is growing! Once you reach €5K+ monthly revenue, Silvr offers great terms.',
        actionable: 'Focus on growth for 3-6 months',
        alternativeAction: 'Come back when you hit €2K monthly'
      };
    }
    
    // Too volatile for us
    if (summary.volatility > 40 && monthlyIncome > 3000) {
      return {
        partner: 'iwoca',
        reason: 'Your revenue is strong but variable. iwoca specializes in seasonal businesses.',
        actionable: 'They offer monthly terms up to €200K',
        alternativeAction: 'Try smoothing revenue with subscriptions'
      };
    }
    
    // Negative cash flow
    if (summary.averageNetCashFlow <= 0) {
      return {
        partner: 'Business Turnaround Consultant',
        reason: 'Credit won\'t help negative cash flow. You need strategic changes first.',
        actionable: 'Cut costs by 20% or increase prices',
        alternativeAction: 'Consider pivoting your business model'
      };
    }
    
    // Too early stage
    if (monthlyIncome < 1000) {
      return {
        partner: 'Gründungszuschuss',
        reason: 'You\'re too early for credit. Government startup grants might help.',
        actionable: 'Apply for founder grants up to €300/month',
        alternativeAction: 'Join an incubator program'
      };
    }
    
    // Default referral
    return {
      partner: 'Traditional Bank',
      reason: 'Your profile doesn\'t match our weekly credit model.',
      actionable: 'Try your local Sparkasse for a business loan',
      alternativeAction: 'Build 6 months of stable revenue first'
    };
  }
}

module.exports = new CreditEngine();