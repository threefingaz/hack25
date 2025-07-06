import React, { useState } from 'react';

const RepaymentSchedule = ({ loanData }) => {
  const [expandedView, setExpandedView] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  
  const generateRepaymentSchedule = () => {
    const schedule = [];
    const startDate = new Date(loanData?.acceptedAt || new Date());
    const totalDays = Math.ceil((loanData?.totalRepayment || 1500) / 50);
    const currentDate = new Date();
    
    for (let i = 0; i < totalDays; i++) {
      const paymentDate = new Date(startDate);
      paymentDate.setDate(paymentDate.getDate() + i + 1);
      
      const isPaid = paymentDate < currentDate;
      const isNext = !isPaid && schedule.filter(p => !p.isPaid).length === 0;
      
      schedule.push({
        id: i + 1,
        date: paymentDate,
        amount: 50,
        principal: 48.50,
        interest: 1.50,
        balance: Math.max(0, (loanData?.totalRepayment || 1500) - ((i + 1) * 50)),
        isPaid,
        isNext,
        status: isPaid ? 'Paid' : isNext ? 'Due' : 'Scheduled'
      });
    }
    
    return schedule;
  };
  
  const schedule = generateRepaymentSchedule();
  const paidPayments = schedule.filter(p => p.isPaid);
  const upcomingPayments = schedule.filter(p => !p.isPaid);
  const nextPayment = schedule.find(p => p.isNext);
  
  const totalPaid = paidPayments.reduce((sum, p) => sum + p.amount, 0);
  const totalInterestPaid = paidPayments.reduce((sum, p) => sum + p.interest, 0);
  const remainingInterest = schedule.filter(p => !p.isPaid).reduce((sum, p) => sum + p.interest, 0);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Repayment Schedule</h2>
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
          <button className="px-3 py-1 text-sm font-medium bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
            Pay Early
          </button>
        </div>
      </div>
      
      {nextPayment && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-indigo-900">Next Payment Due</p>
              <p className="text-lg font-bold text-indigo-900">
                {nextPayment.date.toLocaleDateString('en-GB', { 
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short'
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-indigo-900">€{nextPayment.amount.toFixed(2)}</p>
              <p className="text-xs text-indigo-700">Auto-debit enabled</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">Total Paid</p>
          <p className="text-xl font-bold text-gray-800">€{totalPaid.toFixed(2)}</p>
          <p className="text-xs text-gray-500 mt-1">{paidPayments.length} payments</p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">Remaining Balance</p>
          <p className="text-xl font-bold text-gray-800">
            €{(loanData?.totalRepayment - totalPaid || 0).toFixed(2)}
          </p>
          <p className="text-xs text-gray-500 mt-1">{upcomingPayments.length} payments left</p>
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
            <p className="text-xs text-gray-500">Auto-debit active</p>
          </div>
        </div>
      </div>
      
      {!showCalendar ? (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-700">
              {expandedView ? 'All Payments' : 'Recent & Upcoming Payments'}
            </h3>
            <button
              onClick={() => setExpandedView(!expandedView)}
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              {expandedView ? 'Show Less' : 'Show All'}
            </button>
          </div>
          
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {(expandedView ? schedule : [...paidPayments.slice(-3), ...upcomingPayments.slice(0, 5)])
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
                        Payment #{payment.id}
                      </p>
                      <p className="text-xs text-gray-500">
                        {payment.date.toLocaleDateString('en-GB', { 
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
                      : 'bg-gray-50 text-gray-400'
                  }`}
                >
                  <div>{date.getDate()}</div>
                  {payment && <div className="text-xs mt-1">€50</div>}
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <p className="text-gray-600">
            Save €{(remainingInterest * 0.3).toFixed(2)} by paying off early
          </p>
          <button className="text-indigo-600 hover:text-indigo-700 font-medium">
            Calculate Early Payoff →
          </button>
        </div>
      </div>
    </div>
  );
};

export default RepaymentSchedule;