import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import DashboardCashFlow from '../components/DashboardCashFlow';
import RepaymentSchedule from '../components/RepaymentSchedule';
import NextSteps from '../components/NextSteps';

const SuccessDashboardPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
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

  const handleLogout = () => {
    // Clear all loan-related data
    localStorage.removeItem('activeLoanData');
    localStorage.removeItem('mockOffer');
    localStorage.removeItem('creditOffer');
    localStorage.removeItem('acceptingOffer');
    localStorage.removeItem('offerId');
    localStorage.removeItem('accountId');
    localStorage.removeItem('selectedPersona');
    localStorage.removeItem('selectedPersonaName');
    localStorage.removeItem('selectedPersonaBusiness');
    
    // Navigate back to home page
    navigate('/');
  };
  
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'cashflow', label: 'Cash Flow Analysis' },
    { id: 'schedule', label: 'Payment Schedule' },
    { id: 'nextsteps', label: 'Next Steps' }
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
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Your CashFlow Bridge Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                  ✓ Loan Active
                </span>
                <span className="text-sm text-gray-500">
                  ID: {loanData.loanId}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Log out
              </button>
            </div>
          </div>

          {/* Account Information */}
          <div className="mb-6">
            {/* Account Holder */}
            <div className="pb-4 border-b border-gray-200 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{loanData.personaName || 'Business Owner'}</h2>
                  <p className="text-sm text-gray-600">Business Premium Account</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Account Since</p>
                  <p className="text-sm font-semibold text-gray-700">
                    {(() => {
                      const selectedPersona = localStorage.getItem('selectedPersona');
                      const accountDates = {
                        'anna': '2019-03-15',
                        'mehmet': '2020-07-22',
                        'maria': '2018-11-08'
                      };
                      const accountOpened = accountDates[selectedPersona] || '2020-01-01';
                      return new Date(accountOpened).toLocaleDateString('en-GB', { 
                        year: 'numeric', 
                        month: 'long' 
                      });
                    })()}
                  </p>
                </div>
              </div>
            </div>

            {/* Bank Details */}
            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Bank</p>
                  <p className="text-sm font-semibold text-gray-900">Deutsche Bank AG</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">IBAN</p>
                  <p className="text-sm font-mono text-gray-700">
                    {(() => {
                      const selectedPersona = localStorage.getItem('selectedPersona');
                      const ibans = {
                        'anna': 'DE89 1001 0010 0532 0130 00',
                        'mehmet': 'DE89 1001 0010 9012 3456 78',
                        'maria': 'DE89 1001 0010 1098 7654 32'
                      };
                      return ibans[selectedPersona] || 'DE89 1001 0010 0532 0130 00';
                    })()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">BIC/SWIFT</p>
                  <p className="text-sm font-mono text-gray-700">DEUTDEFFXXX</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Account Number</p>
                  <p className="text-sm font-mono text-gray-700">
                    {(() => {
                      const selectedPersona = localStorage.getItem('selectedPersona');
                      const accountNumbers = {
                        'anna': '0532013000',
                        'mehmet': '9012345678',
                        'maria': '1098765432'
                      };
                      return accountNumbers[selectedPersona] || '0532013000';
                    })()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Bank Code</p>
                  <p className="text-sm font-mono text-gray-700">10010010</p>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-gray-600">Account Active</span>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="pb-6 border-b border-gray-200">
              <p className="text-xs text-gray-500">Read-only access • Bank-grade encryption • No transaction capability</p>
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
          
          {activeTab === 'cashflow' && (
            <DashboardCashFlow loanData={loanData} />
          )}
          
          {activeTab === 'schedule' && (
            <RepaymentSchedule loanData={loanData} />
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