import React, { useState, useEffect } from 'react';
import CashFlowChart from './CashFlowChart';
import CashFlowSummary from './CashFlowSummary';
import { getCardClasses, getTextClasses } from '../design-system/utils';

const DashboardCashFlow = ({ loanData }) => {
  const [cashFlowData, setCashFlowData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Generate cash flow data based on the approved loan's persona
    generateCashFlowData();
  }, [loanData]);
  
  const generateCashFlowData = () => {
    const selectedPersona = localStorage.getItem('selectedPersona') || 'anna';
    console.log('Dashboard generating cash flow data for persona:', selectedPersona);
    
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
          { month: '2024-10', income: 1600, expenses: 1400 },
          { month: '2024-11', income: 1800, expenses: 1600 },
          { month: '2024-12', income: 2000, expenses: 1800 }
        ],
        summary: {
          averageMonthlyIncome: 1800,
          averageMonthlyExpenses: 1600,
          averageNetCashFlow: 200,
          volatility: 25,
          positiveCashFlowMonths: 3,
          totalMonths: 3
        }
      }
    };
    
    const persona = personas[selectedPersona] || personas.anna;
    
    const data = {
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
        weeklyPattern: 'Strong',
        competitivePosition: 'Approved for weekly credit'
      }
    };
    
    setCashFlowData(data);
    setIsLoading(false);
  };
  
  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
        <div className="h-64 bg-gray-200 rounded mb-6"></div>
        <div className="h-48 bg-gray-200 rounded"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-green-900 mb-2">Your Approved Cash Flow Analysis</h2>
            <p className="text-green-700">
              This analysis from your application shows why you qualified for weekly credit
            </p>
          </div>
          <div className="flex items-center bg-green-100 rounded-full px-4 py-2">
            <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-green-800 font-medium">Approved</span>
          </div>
        </div>
      </div>
      
      {/* Account Info */}
      {cashFlowData?.persona && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Connected Account</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Account Holder</p>
              <p className="text-sm font-semibold text-gray-900">{cashFlowData.persona.name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Account Type</p>
              <p className="text-sm font-semibold text-gray-900">{cashFlowData.persona.accountType}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Bank</p>
              <p className="text-sm font-semibold text-gray-900">{cashFlowData.persona.bankName}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">IBAN</p>
              <p className="text-sm font-mono text-gray-700">{cashFlowData.persona.iban}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Account Since</p>
              <p className="text-sm font-semibold text-gray-900">
                {new Date(cashFlowData.persona.accountOpened).toLocaleDateString('en-GB', { 
                  year: 'numeric', 
                  month: 'long' 
                })}
              </p>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Account Active</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Cash Flow Chart */}
      {cashFlowData?.monthlyFlows && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <CashFlowChart monthlyFlows={cashFlowData.monthlyFlows} />
        </div>
      )}
      
      {/* Cash Flow Summary */}
      {cashFlowData?.summary && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <CashFlowSummary summary={cashFlowData.summary} isDashboard={true} />
        </div>
      )}
      
      {/* Approval Factors */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Why You Were Approved</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start">
            <div className="w-6 h-6 bg-slate-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">Strong Weekly Revenue</p>
              <p className="text-xs text-slate-700">€{Math.round(cashFlowData.summary.averageMonthlyIncome / 4.33)}/week average</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 bg-slate-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">Positive Cash Flow</p>
              <p className="text-xs text-slate-700">€{cashFlowData.summary.averageNetCashFlow}/month net</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 bg-slate-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">Low Volatility</p>
              <p className="text-xs text-slate-700">{cashFlowData.summary.volatility}% variation</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 bg-slate-600 rounded-full flex items-center justify-center mr-3 mt-0.5">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">Consistent Performance</p>
              <p className="text-xs text-slate-700">{cashFlowData.summary.positiveCashFlowMonths}/{cashFlowData.summary.totalMonths} positive months</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCashFlow;