import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import RepaymentSchedule from '../components/RepaymentSchedule';
import ShareSuccess from '../components/ShareSuccess';
import NextSteps from '../components/NextSteps';

const SuccessDashboardPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [loanData, setLoanData] = useState(null);
  
  console.log('🎯 SuccessDashboardPage rendering...');
  
  useEffect(() => {
    // Get loan data from navigation state or localStorage for demo
    let data = location.state?.loanData;
    let offer = location.state?.offer;
    
    if (!data) {
      try {
        const storedData = localStorage.getItem('activeLoanData');
        data = storedData ? JSON.parse(storedData) : null;
      } catch (e) {
        console.error('Error parsing stored loan data:', e);
      }
    }
    
    if (!offer) {
      try {
        const storedOffer = localStorage.getItem('mockOffer');
        offer = storedOffer ? JSON.parse(storedOffer) : null;
      } catch (e) {
        console.error('Error parsing stored offer:', e);
      }
    }
    
    // Create comprehensive loan data object
    const combinedData = {
      ...data,
      ...offer,
      amount: data?.loanAmount || offer?.loanAmount || 1500,
      totalRepayment: data?.totalRepayment || (offer?.loanAmount * 1.05) || 1575,
      acceptedAt: data?.acceptedAt || new Date().toISOString(),
      personaName: getPersonaName(),
      loanId: data?.loanId || `LOAN_${Date.now()}`
    };
    
    setLoanData(combinedData);
    
    // Store for future reference
    localStorage.setItem('activeLoanData', JSON.stringify(combinedData));
  }, [location.state]);
  
  const getPersonaName = () => {
    const selectedPersona = localStorage.getItem('selectedPersona');
    const personaNames = {
      'anna': 'Anna Schmidt',
      'mehmet': 'Mehmet Özkan', 
      'maria': 'Maria Garcia'
    };
    return personaNames[selectedPersona] || 'Business Owner';
  };
  
  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'schedule', label: 'Payment Schedule', icon: '📅' },
    { id: 'share', label: 'Share & Earn', icon: '🎉' },
    { id: 'nextsteps', label: 'Next Steps', icon: '🚀' }
  ];
  
  if (!loanData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Loading Dashboard...</h2>
          <p className="text-gray-600">Preparing your loan information</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-800">
              Your CashFlow Bridge Dashboard
            </h1>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                ✓ Loan Active
              </span>
              <span className="text-sm text-gray-500">
                ID: {loanData.loanId}
              </span>
            </div>
          </div>
          
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="max-w-6xl mx-auto">
          {activeTab === 'overview' && (
            <DashboardLayout loanData={loanData} />
          )}
          
          {activeTab === 'schedule' && (
            <RepaymentSchedule loanData={loanData} />
          )}
          
          {activeTab === 'share' && (
            <ShareSuccess loanData={loanData} />
          )}
          
          {activeTab === 'nextsteps' && (
            <NextSteps loanData={loanData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessDashboardPage;