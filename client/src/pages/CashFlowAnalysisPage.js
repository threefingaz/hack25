import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CashFlowChart from '../components/CashFlowChart';
import CashFlowSummary from '../components/CashFlowSummary';
import LoadingSkeleton from '../components/LoadingSkeleton';
import CashFlowTips from '../components/tips/CashFlowTips';
import { getButtonClasses, getContainerClasses, getCardClasses, getTextClasses, getBackgroundClasses } from '../design-system/utils';

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
      console.log('CashFlowAnalysisPage - fetchCashFlowData - accountId:', accountId);
      console.log('CashFlowAnalysisPage - fetchCashFlowData - localStorage selectedPersona:', localStorage.getItem('selectedPersona'));
      if (!accountId) {
        navigate('/connect');
        return;
      }

      let apiData = null;
      // Temporarily disable API to ensure demo data is used for persona testing
      // try {
      //   const response = await fetch(`http://localhost:3001/api/cash-flow/${accountId}`);
      //   if (response.ok) {
      //     apiData = await response.json();
      //   }
      // } catch (apiError) {
      //   console.log('API not available, using demo data');
      // }

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
    const selectedPersona = localStorage.getItem('selectedPersona');
    console.log('CashFlowAnalysisPage - selectedPersona from localStorage:', selectedPersona);
    
    const personas = {
      anna: { 
        name: 'Anna Schmidt', 
        accountType: 'Business Current Account', 
        iban: 'DE89 1001 0010 0532 0130 00',
        bic: 'DEUTDEFFXXX',
        accountNumber: '0532013000',
        bankCode: '10010010',
        bankName: 'Deutsche Bank AG',
        accountOpened: '2019-03-15',
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
      },
      mehmet: { 
        name: 'Mehmet Özkan', 
        accountType: 'Business Premium Account', 
        iban: 'DE89 1001 0010 9012 3456 78',
        bic: 'DEUTDEFFXXX',
        accountNumber: '9012345678',
        bankCode: '10010010',
        bankName: 'Deutsche Bank AG',
        accountOpened: '2020-07-22',
        monthlyFlows: [
          { month: '2024-10', income: 3200, expenses: 2800 },
          { month: '2024-11', income: 3500, expenses: 3000 },
          { month: '2024-12', income: 3800, expenses: 3200 }
        ],
        summary: {
          averageMonthlyIncome: 3500,
          averageMonthlyExpenses: 3000,
          averageNetCashFlow: 500,
          volatility: 20,
          positiveCashFlowMonths: 3,
          totalMonths: 3
        }
      },
      maria: { 
        name: 'Maria Rodriguez', 
        accountType: 'Business Current Account', 
        iban: 'DE89 1001 0010 1098 7654 32',
        bic: 'DEUTDEFFXXX',
        accountNumber: '1098765432',
        bankCode: '10010010',
        bankName: 'Deutsche Bank AG',
        accountOpened: '2018-11-08',
        monthlyFlows: [
          { month: '2024-10', income: 2000, expenses: 1700 },
          { month: '2024-11', income: 2200, expenses: 1900 },
          { month: '2024-12', income: 2400, expenses: 2100 }
        ],
        summary: {
          averageMonthlyIncome: 2200,
          averageMonthlyExpenses: 1900,
          averageNetCashFlow: 300,
          volatility: 18,
          positiveCashFlowMonths: 3,
          totalMonths: 3
        }
      },
      thomas: { 
        name: 'Thomas Mueller', 
        accountType: 'Business Current Account', 
        iban: 'DE89 1001 0010 0432 1234 56',
        bic: 'DEUTDEFFXXX',
        accountNumber: '0432123456',
        bankCode: '10010010',
        bankName: 'Deutsche Bank AG',
        accountOpened: '2024-08-15',
        monthlyFlows: [
          { month: '2024-10', income: 400, expenses: 650 },
          { month: '2024-11', income: 600, expenses: 700 },
          { month: '2024-12', income: 800, expenses: 750 }
        ],
        summary: {
          averageMonthlyIncome: 600,
          averageMonthlyExpenses: 700,
          averageNetCashFlow: -100,
          volatility: 60,
          positiveCashFlowMonths: 1,
          totalMonths: 3
        }
      },
      stefan: { 
        name: 'Stefan Weber', 
        accountType: 'Business Current Account', 
        iban: 'DE89 1001 0010 0856 7890 12',
        bic: 'DEUTDEFFXXX',
        accountNumber: '0856789012',
        bankCode: '10010010',
        bankName: 'Deutsche Bank AG',
        accountOpened: '2019-06-10',
        monthlyFlows: [
          { month: '2024-10', income: 1800, expenses: 2000 },
          { month: '2024-11', income: 1400, expenses: 1800 },
          { month: '2024-12', income: 1000, expenses: 1600 }
        ],
        summary: {
          averageMonthlyIncome: 1400,
          averageMonthlyExpenses: 1800,
          averageNetCashFlow: -400,
          volatility: 35,
          positiveCashFlowMonths: 0,
          totalMonths: 3
        }
      }
    };
    
    const persona = personas[selectedPersona] || personas.anna;
    console.log('CashFlowAnalysisPage - Using persona:', selectedPersona, persona.name);
    
    return {
      accountId,
      persona: {
        name: persona.name,
        accountType: persona.accountType,
        iban: persona.iban,
        bic: persona.bic,
        accountNumber: persona.accountNumber,
        bankCode: persona.bankCode,
        bankName: persona.bankName,
        accountOpened: persona.accountOpened
      },
      monthlyFlows: persona.monthlyFlows,
      summary: {
        ...persona.summary,
        averageWeeklyIncome: Math.round(persona.summary.averageMonthlyIncome / 4.33),
        weeklyPattern: persona.summary.averageNetCashFlow > 0 ? 'Strong' : 'Declining',
        competitivePosition: persona.summary.averageMonthlyIncome < 2000 ? 'Below requirements' : 'Perfect for weekly credit'
      }
    };
  };

  const handleProceedToOffer = async () => {
    setIsLoading(true);
    try {
      let offerData = null;
      
      // Temporarily disable API to ensure demo data is used for persona testing
      // try {
      //   const response = await fetch('http://localhost:3001/api/credit-decision', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       accountId: localStorage.getItem('accountId'),
      //       cashFlowSummary: cashFlowData.summary
      //     }),
      //   });

      //   if (response.ok) {
      //     offerData = await response.json();
      //   }
      // } catch (apiError) {
      //   console.log('API not available, using demo credit decision');
      // }

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

  // Generate demo credit offer for weekly model
  const generateDemoCreditOffer = (summary) => {
    const weeklyIncome = Math.round(summary.averageMonthlyIncome / 4.33);
    console.log('generateDemoCreditOffer - summary:', summary);
    console.log('generateDemoCreditOffer - averageMonthlyIncome:', summary.averageMonthlyIncome);
    console.log('generateDemoCreditOffer - weeklyIncome:', weeklyIncome);
    
    // Check rejection criteria - Different scenarios
    // 1. Very low income (below €1000/month) - early stage business
    if (summary.averageMonthlyIncome < 1000) {
      console.log('REJECTING: Very low income (early stage)', summary.averageMonthlyIncome);
      return {
        offerId: `demo_rejection_${Math.random().toString(36).substr(2, 9)}`,
        approved: false,
        reason: 'Business too early-stage for credit',
        referral: {
          partner: 'StartUp Accelerator Program',
          reason: 'Your business is too early-stage for credit. Focus on fundamentals first.',
          actionable: 'Improve pricing, reduce costs, and grow revenue to €2K+/month',
          alternativeAction: 'Consider business mentoring or startup incubator programs'
        }
      };
    }
    
    // 2. Medium income but below stability threshold (€1000-€2000) - growth stage
    if (summary.averageMonthlyIncome < 2000) {
      console.log('REJECTING: Income below stability threshold', summary.averageMonthlyIncome);
      return {
        offerId: `demo_rejection_${Math.random().toString(36).substr(2, 9)}`,
        approved: false,
        reason: 'Insufficient monthly income stability',
        referral: {
          partner: 'Silvr',
          reason: 'Your business is growing! Once you reach €5K+ monthly revenue, Silvr offers great terms.',
          actionable: 'Focus on growth for 3-6 months',
          alternativeAction: 'Come back when you hit €2K monthly'
        }
      };
    }
    
    if (summary.averageNetCashFlow <= 0) {
      return {
        offerId: `demo_rejection_${Math.random().toString(36).substr(2, 9)}`,
        approved: false,
        reason: 'Negative average net cash flow',
        referral: {
          partner: 'Business Turnaround Consultant',
          reason: 'Credit won\'t help negative cash flow. You need strategic changes first.',
          actionable: 'Cut costs by 20% or increase prices',
          alternativeAction: 'Consider pivoting your business model'
        }
      };
    }
    
    if (summary.volatility > 50) {
      return {
        offerId: `demo_rejection_${Math.random().toString(36).substr(2, 9)}`,
        approved: false,
        reason: 'Cash flow too volatile for weekly credit',
        referral: {
          partner: 'iwoca',
          reason: 'Your revenue is strong but variable. iwoca specializes in seasonal businesses.',
          actionable: 'They offer monthly terms up to €200K',
          alternativeAction: 'Try smoothing revenue with subscriptions'
        }
      };
    }
    
    // If approved, generate offer
    const loanAmount = Math.min(Math.round(weeklyIncome * 0.5), 5000);
    const weeklyInterest = Math.round(loanAmount * 0.012 * 100) / 100;
    const totalWeeklyPayment = loanAmount + weeklyInterest;
    
    return {
      offerId: `demo_offer_${Math.random().toString(36).substr(2, 9)}`,
      approved: true,
      loanAmount: loanAmount,
      currency: 'EUR',
      weeklyInterestRate: 1.2,
      repaymentTerms: {
        weeklyPayment: loanAmount,
        weeklyInterest: weeklyInterest,
        totalWeeklyPayment: totalWeeklyPayment,
        renewalDate: 'Every Monday',
        effectiveAPR: 65.0,
        flexibleTerms: 'Skip a week anytime with 24hr notice'
      },
      explanation: {
        summary: `Based on your average weekly revenue of €${weeklyIncome}, you qualify for a €${loanAmount} weekly credit line.`,
        calculation: `This is ${Math.round((loanAmount / weeklyIncome) * 100)}% of your weekly revenue - designed to match your business cycle perfectly.`,
        strengths: ['Strong weekly revenue', 'Predictable weekly patterns', 'Perfect fit for weekly credit'],
        weeklyBenefit: 'Renews every Monday morning, giving you fresh working capital exactly when you need it.',
        comparison: 'Unlike monthly loans, our weekly credit matches your cash flow pattern - pay back what you earned, keep what you need.'
      },
      competitiveAdvantage: {
        title: 'Perfect for micro-businesses',
        points: [
          `€${loanAmount} weekly - below Silvr's €5K minimum`,
          'Weekly terms vs iwoca\'s monthly only',
          'No fixed monthly payments like traditional banks',
          'Renews automatically every Monday'
        ]
      },
      offerValidUntil: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };
  };

  if (isLoading) {
    return (
      <div className={"min-h-screen " + getBackgroundClasses('default')}>
        <div className={getContainerClasses('py-8')}>
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
          <div className={getCardClasses('outline', 'md') + ' bg-red-50 border-red-200 max-w-md'}>
            <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className={getTextClasses('body') + ' text-red-600 mb-4'}>{error}</p>
            <button
              onClick={fetchCashFlowData}
              className={getButtonClasses('outline', 'md') + ' !border-red-600 !text-red-600 hover:!bg-red-50'}
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
            <h1 className={getTextClasses('h1') + ' text-2xl sm:text-3xl mb-6'}>Weekly Cash Flow Analysis</h1>
            <div className="mb-6">
              <p className={getTextClasses('caption') + ' mb-2'}>Germany's First Weekly Credit Line</p>
              <p className={getTextClasses('body') + ' text-base'}>Analyzing your patterns for weekly credit that renews every Monday</p>
            </div>
            {cashFlowData?.persona && (
              <div>
                {/* Account Holder */}
                <div className="pb-4 border-b border-gray-200 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className={getTextClasses('h3')}>{cashFlowData.persona.name || 'Maria Rodriguez'}</h2>
                      <p className={getTextClasses('body')}>{cashFlowData.persona.accountType || 'Business Current Account'}</p>
                    </div>
                    <div className="text-right">
                      <p className={getTextClasses('caption') + ' uppercase tracking-wide'}>Account Since</p>
                      <p className={getTextClasses('body') + ' font-semibold'}>
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
                      <p className={getTextClasses('caption') + ' uppercase tracking-wide mb-1'}>Bank</p>
                      <p className={getTextClasses('body') + ' font-semibold text-slate-900'}>{cashFlowData.persona.bankName || 'Deutsche Bank AG'}</p>
                    </div>
                    <div>
                      <p className={getTextClasses('caption') + ' uppercase tracking-wide mb-1'}>IBAN</p>
                      <p className={getTextClasses('mono') + ' text-gray-700'}>{cashFlowData.persona.iban || 'DE89 1001 0010 1098 7654 32'}</p>
                    </div>
                    <div>
                      <p className={getTextClasses('caption') + ' uppercase tracking-wide mb-1'}>BIC/SWIFT</p>
                      <p className={getTextClasses('mono') + ' text-gray-700'}>{cashFlowData.persona.bic || 'DEUTDEFFXXX'}</p>
                    </div>
                    <div>
                      <p className={getTextClasses('caption') + ' uppercase tracking-wide mb-1'}>Account Number</p>
                      <p className={getTextClasses('mono') + ' text-gray-700'}>{cashFlowData.persona.accountNumber || '1098765432'}</p>
                    </div>
                    <div>
                      <p className={getTextClasses('caption') + ' uppercase tracking-wide mb-1'}>Bank Code</p>
                      <p className={getTextClasses('mono') + ' text-gray-700'}>{cashFlowData.persona.bankCode || '10010010'}</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span className={getTextClasses('body')}>Account Active</span>
                    </div>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="pb-6 border-b border-gray-200">
                  <p className={getTextClasses('caption')}>Read-only access • Bank-grade encryption • No transaction capability</p>
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

            {/* Cash Flow Tips */}
            {cashFlowData?.summary && (
              <CashFlowTips 
                cashFlowSummary={cashFlowData.summary}
                persona={localStorage.getItem('selectedPersona')}
                layout="cards"
                theme="light"
                maxTips={4}
                className="mt-8"
              />
            )}
          </div>

          {/* Conditional Action Button - Sticky at bottom */}
          {cashFlowData?.summary && 
           cashFlowData.summary.averageMonthlyIncome >= 2000 && 
           cashFlowData.summary.averageNetCashFlow > 0 && 
           cashFlowData.summary.volatility <= 50 ? (
            <div className="mt-12 sticky bottom-8 z-10">
              <div className={getCardClasses('elevated', 'md') + ' shadow-2xl border-2 border-slate-200'}>
                <div className="flex flex-col sm:flex-row items-center justify-between">
                  <div className="text-center sm:text-left mb-4 sm:mb-0">
                    <h3 className={getTextClasses('h4') + ' mb-1'}>
                      Get Your Weekly Credit Line
                    </h3>
                    <p className={getTextClasses('body')}>
                      Instant weekly credit decision • Renews every Monday
                    </p>
                  </div>
                  <button
                    onClick={handleProceedToOffer}
                    className={getButtonClasses('primary', 'lg') + ' shadow-lg transform hover:scale-105 w-full sm:w-auto font-bold'}
                  >
                    GET WEEKLY CREDIT →
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-12 sticky bottom-8 z-10">
              <div className={getCardClasses('elevated', 'md') + ' bg-amber-50 shadow-2xl border-2 border-amber-200'}>
                <div className="flex flex-col sm:flex-row items-center justify-between">
                  <div className="text-center sm:text-left mb-4 sm:mb-0">
                    <h3 className={getTextClasses('h4') + ' text-amber-900 mb-1'}>
                      Ready for Credit Assessment
                    </h3>
                    <p className={getTextClasses('body') + ' text-amber-700'}>
                      See if you qualify for weekly credit • Instant decision
                    </p>
                  </div>
                  <button
                    onClick={handleProceedToOffer}
                    className={getButtonClasses('outline', 'lg') + ' !bg-amber-600 !text-white !border-amber-600 hover:!bg-amber-700 shadow-lg transform hover:scale-105 w-full sm:w-auto font-bold'}
                  >
                    CHECK ELIGIBILITY →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CashFlowAnalysisPage;