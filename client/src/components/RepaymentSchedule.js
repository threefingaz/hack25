import React, { useState } from 'react';

const RepaymentSchedule = ({ loanData }) => {
  const [expandedView, setExpandedView] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  
  const generateWeeklyRepaymentSchedule = () => {
    const schedule = [];
    const startDate = new Date(loanData?.acceptedAt || new Date());
    const loanAmount = loanData?.amount || loanData?.loanAmount || 1500;
    const weeklyInterestRate = 0.012; // 1.2% weekly
    const totalWeeks = 8; // Show 8 weeks of schedule
    const currentDate = new Date();
    
    // Find the next Monday
    const nextMonday = new Date(startDate);
    const daysToMonday = (1 - nextMonday.getDay() + 7) % 7;
    nextMonday.setDate(nextMonday.getDate() + daysToMonday);
    
    for (let i = 0; i < totalWeeks; i++) {
      const paymentDate = new Date(nextMonday);
      paymentDate.setDate(paymentDate.getDate() + (i * 7));
      
      const isPaid = paymentDate < currentDate;
      const isNext = !isPaid && schedule.filter(p => !p.isPaid).length === 0;
      const weeklyInterest = loanAmount * weeklyInterestRate;
      const totalWeeklyPayment = loanAmount + weeklyInterest;
      
      schedule.push({
        id: i + 1,
        date: paymentDate,
        amount: totalWeeklyPayment,
        principal: loanAmount,
        interest: weeklyInterest,
        balance: loanAmount, // Credit line available each week
        isPaid,
        isNext,
        isSkipped: false, // Can be skipped with 24hr notice
        status: isPaid ? 'Paid' : isNext ? 'Due' : 'Scheduled'
      });
    }
    
    return schedule;
  };
  
  const schedule = generateWeeklyRepaymentSchedule();
  const paidPayments = schedule.filter(p => p.isPaid);
  const upcomingPayments = schedule.filter(p => !p.isPaid);
  const nextPayment = schedule.find(p => p.isNext);
  
  const totalPaid = paidPayments.reduce((sum, p) => sum + p.amount, 0);
  const totalInterestPaid = paidPayments.reduce((sum, p) => sum + p.interest, 0);
  const remainingInterest = schedule.filter(p => !p.isPaid).reduce((sum, p) => sum + p.interest, 0);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Weekly Credit Schedule</h2>
          <p className="text-sm text-gray-600">Renews every Monday</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
              showCalendar 
                ? 'bg-indigo-100 text-indigo-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {showCalendar ? 'List View' : 'Calendar View'}
          </button>
          <button className="px-3 py-1 text-sm font-medium bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors">
            Skip Week
          </button>
        </div>
      </div>
      
      {nextPayment && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-indigo-900">Next Payment Due</p>
              <p className="text-lg font-bold text-indigo-900">
                Monday, {nextPayment.date.toLocaleDateString('en-GB', { 
                  day: 'numeric',
                  month: 'short'
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-indigo-900">€{nextPayment.amount.toFixed(2)}</p>
              <p className="text-xs text-indigo-700">Credit renews after payment</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">Total Paid</p>
          <p className="text-xl font-bold text-gray-800">€{totalPaid.toFixed(2)}</p>
          <p className="text-xs text-gray-500 mt-1">{paidPayments.length} weeks</p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">Weekly Credit Line</p>
          <p className="text-xl font-bold text-gray-800">
            €{(loanData?.amount || loanData?.loanAmount || 1500).toFixed(2)}
          </p>
          <p className="text-xs text-gray-500 mt-1">Available each Monday</p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">Total Interest</p>
          <p className="text-xl font-bold text-gray-800">
            €{(totalInterestPaid + remainingInterest).toFixed(2)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            €{totalInterestPaid.toFixed(2)} paid
          </p>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-700">Payment Method</h3>
          <button className="text-sm text-indigo-600 hover:text-indigo-700">Change</button>
        </div>
        <div className="flex items-center bg-gray-50 rounded-lg p-3">
          <svg className="w-8 h-8 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-gray-800">•••• •••• •••• 4242</p>
            <p className="text-xs text-gray-500">Auto-debit every Monday</p>
          </div>
        </div>
      </div>
      
      {!showCalendar ? (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700">
              {expandedView ? 'All Weeks' : 'Recent & Upcoming Weeks'}
            </h3>
            <button
              onClick={() => setExpandedView(!expandedView)}
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              {expandedView ? 'Show Less' : 'Show All'}
            </button>
          </div>
          
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {(expandedView ? schedule : [...paidPayments.slice(-2), ...upcomingPayments.slice(0, 6)])
              .map((payment) => (
                <div
                  key={payment.id}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    payment.isPaid 
                      ? 'bg-gray-50 border-gray-200' 
                      : payment.isNext
                      ? 'bg-indigo-50 border-indigo-300'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      payment.isPaid ? 'bg-green-500' : payment.isNext ? 'bg-indigo-500' : 'bg-gray-300'
                    }`} />
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        Week #{payment.id}
                      </p>
                      <p className="text-xs text-gray-500">
                        Monday, {payment.date.toLocaleDateString('en-GB', { 
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-800">
                      €{payment.amount.toFixed(2)}
                    </p>
                    <p className={`text-xs font-medium ${
                      payment.isPaid 
                        ? 'text-green-600' 
                        : payment.isNext 
                        ? 'text-indigo-600' 
                        : 'text-gray-500'
                    }`}>
                      {payment.status}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div className="calendar-view">
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-700 mb-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <div key={day} className="p-2">{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 35 }, (_, i) => {
              const date = new Date();
              date.setDate(date.getDate() - date.getDay() + 1 + i);
              const payment = schedule.find(p => 
                p.date.toDateString() === date.toDateString()
              );
              
              return (
                <div
                  key={i}
                  className={`p-2 text-center rounded-lg text-xs ${
                    payment
                      ? payment.isPaid
                        ? 'bg-green-100 text-green-800 font-medium'
                        : payment.isNext
                        ? 'bg-indigo-100 text-indigo-800 font-medium'
                        : 'bg-orange-100 text-orange-800 font-medium'
                      : date.getDay() === 1 // Monday
                      ? 'bg-blue-50 text-blue-600'
                      : 'bg-gray-50 text-gray-400'
                  }`}
                >
                  <div>{date.getDate()}</div>
                  {payment && <div className="text-xs mt-1">€{payment.amount.toFixed(0)}</div>}
                  {!payment && date.getDay() === 1 && <div className="text-xs mt-1">MON</div>}
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Weekly Credit Features</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center">
              <svg className="w-4 h-4 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-blue-800">Full credit line available each Monday</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-blue-800">Skip any week with 24hr notice</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="text-blue-800">Automatic renewal every Monday</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-blue-800">1.2% weekly interest rate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepaymentSchedule;