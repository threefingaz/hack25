// Credit decision engine for CashFlow Bridge

class CreditEngine {
  constructor() {
    // Configuration parameters
    this.config = {
      minMonthlyIncome: 2000,
      maxVolatility: 40,
      minPositiveMonths: 2,
      baseRate: 0.05, // 0.05% daily interest
      maxLoanAmount: 2500,
      loanPercentageOfIncome: 0.25, // 25% of monthly income
      repaymentDailyRate: 0.1 // 10% of loan amount per day
    };
  }

  // Main credit decision function
  assessCreditworthiness(cashFlowSummary) {
    const eligibility = this.checkEligibility(cashFlowSummary);
    
    if (!eligibility.isEligible) {
      return {
        approved: false,
        reason: eligibility.reason,
        factors: eligibility.factors
      };
    }

    // Calculate loan offer
    const loanAmount = this.calculateLoanAmount(cashFlowSummary);
    const repaymentTerms = this.calculateRepaymentTerms(loanAmount);
    const riskScore = this.calculateRiskScore(cashFlowSummary);

    return {
      approved: true,
      loanAmount,
      dailyInterestRate: this.config.baseRate,
      repaymentTerms,
      riskScore,
      factors: this.getPositiveFactors(cashFlowSummary),
      explanation: this.generateExplanation(cashFlowSummary, loanAmount)
    };
  }

  // Check basic eligibility criteria
  checkEligibility(summary) {
    const factors = [];
    let isEligible = true;
    let reason = '';

    // Check average monthly income
    if (summary.averageMonthlyIncome < this.config.minMonthlyIncome) {
      isEligible = false;
      reason = 'Insufficient average monthly income';
      factors.push({
        factor: 'Average Monthly Income',
        value: `€${summary.averageMonthlyIncome}`,
        required: `€${this.config.minMonthlyIncome}`,
        status: 'failed'
      });
    } else {
      factors.push({
        factor: 'Average Monthly Income',
        value: `€${summary.averageMonthlyIncome}`,
        required: `€${this.config.minMonthlyIncome}`,
        status: 'passed'
      });
    }

    // Check volatility
    if (summary.volatility > this.config.maxVolatility) {
      // Not a hard fail, but affects loan amount
      factors.push({
        factor: 'Cash Flow Volatility',
        value: `${summary.volatility}%`,
        required: `< ${this.config.maxVolatility}%`,
        status: 'warning'
      });
    } else {
      factors.push({
        factor: 'Cash Flow Volatility',
        value: `${summary.volatility}%`,
        required: `< ${this.config.maxVolatility}%`,
        status: 'passed'
      });
    }

    // Check positive cash flow months
    if (summary.positiveCashFlowMonths < this.config.minPositiveMonths) {
      isEligible = false;
      reason = 'Too few months with positive cash flow';
      factors.push({
        factor: 'Positive Cash Flow Months',
        value: `${summary.positiveCashFlowMonths} of ${summary.totalMonths}`,
        required: `At least ${this.config.minPositiveMonths}`,
        status: 'failed'
      });
    } else {
      factors.push({
        factor: 'Positive Cash Flow Months',
        value: `${summary.positiveCashFlowMonths} of ${summary.totalMonths}`,
        required: `At least ${this.config.minPositiveMonths}`,
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

  // Calculate loan amount based on cash flow
  calculateLoanAmount(summary) {
    let baseAmount = summary.averageMonthlyIncome * this.config.loanPercentageOfIncome;
    
    // Apply volatility adjustment
    if (summary.volatility > 30) {
      const volatilityPenalty = (summary.volatility - 30) / 100;
      baseAmount *= (1 - volatilityPenalty * 0.5); // Reduce by up to 50% for high volatility
    }
    
    // Apply positive months bonus
    const positiveMonthsRatio = summary.positiveCashFlowMonths / summary.totalMonths;
    if (positiveMonthsRatio === 1) {
      baseAmount *= 1.2; // 20% bonus for perfect record
    }
    
    // Cap at maximum
    const finalAmount = Math.min(baseAmount, this.config.maxLoanAmount);
    
    // Round to nearest 50
    return Math.round(finalAmount / 50) * 50;
  }

  // Calculate repayment terms
  calculateRepaymentTerms(loanAmount) {
    const dailyPayment = Math.ceil(loanAmount * this.config.repaymentDailyRate);
    const numberOfDays = Math.ceil(loanAmount / dailyPayment);
    const totalInterest = (loanAmount * this.config.baseRate / 100) * numberOfDays;
    const totalRepayment = loanAmount + totalInterest;
    
    return {
      dailyPayment,
      numberOfDays,
      totalInterest: Math.round(totalInterest * 100) / 100,
      totalRepayment: Math.round(totalRepayment * 100) / 100,
      effectiveAPR: this.calculateAPR(loanAmount, totalInterest, numberOfDays)
    };
  }

  // Calculate annual percentage rate
  calculateAPR(principal, totalInterest, days) {
    const rate = (totalInterest / principal) * (365 / days) * 100;
    return Math.round(rate * 100) / 100;
  }

  // Calculate risk score (0-100, higher is better)
  calculateRiskScore(summary) {
    let score = 50; // Base score
    
    // Income factor (up to 20 points)
    const incomeScore = Math.min(20, (summary.averageMonthlyIncome / 5000) * 20);
    score += incomeScore;
    
    // Volatility factor (up to 20 points)
    const volatilityScore = Math.max(0, 20 - (summary.volatility / 2));
    score += volatilityScore;
    
    // Positive months factor (up to 10 points)
    const positiveMonthsScore = (summary.positiveCashFlowMonths / summary.totalMonths) * 10;
    score += positiveMonthsScore;
    
    return Math.round(score);
  }

  // Get positive factors for the decision
  getPositiveFactors(summary) {
    const factors = [];
    
    if (summary.averageMonthlyIncome >= 2500) {
      factors.push('Strong monthly income');
    } else if (summary.averageMonthlyIncome >= 2000) {
      factors.push('Steady monthly income');
    }
    
    if (summary.volatility < 25) {
      factors.push('Very stable cash flow');
    } else if (summary.volatility < 35) {
      factors.push('Stable cash flow');
    }
    
    if (summary.positiveCashFlowMonths === summary.totalMonths) {
      factors.push('Consistent positive cash flow');
    }
    
    if (summary.averageNetCashFlow > 500) {
      factors.push('Strong net cash position');
    }
    
    return factors;
  }

  // Generate explanation for the credit decision
  generateExplanation(summary, loanAmount) {
    const incomeRatio = (loanAmount / summary.averageMonthlyIncome * 100).toFixed(1);
    
    return {
      summary: `Based on your average monthly income of €${summary.averageMonthlyIncome} and ${summary.volatility}% cash flow volatility, you qualify for a €${loanAmount} loan.`,
      calculation: `This represents ${incomeRatio}% of your monthly income, ensuring comfortable repayment.`,
      strengths: this.getPositiveFactors(summary),
      comparison: 'Traditional banks would typically take 14-21 days for this decision. We did it in seconds using your real cash flow data.'
    };
  }
}

module.exports = new CreditEngine();