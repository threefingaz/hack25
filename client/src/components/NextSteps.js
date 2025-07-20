import React, { useState } from 'react';
import CashFlowTips from './tips/CashFlowTips';

const NextSteps = ({ loanData }) => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  
  const getPersonaSpecificSuggestions = () => {
    const selectedPersona = localStorage.getItem('selectedPersona') || 'anna';
    const suggestionsByPersona = {
      anna: [
        {
          title: 'Invest in Food Truck Equipment',
          description: 'Upgrade your mobile kitchen setup for better efficiency',
          savings: 'Serve 30% more customers per hour'
        },
        {
          title: 'Stock Premium Ingredients',
          description: 'Offer higher-margin specialty items',
          savings: 'Increase profit margins by 25%'
        },
        {
          title: 'Weekend Location Expansion',
          description: 'Scout and secure profitable weekend spots',
          savings: 'Double weekend revenue potential'
        }
      ],
      mehmet: [
        {
          title: 'Inventory Investment',
          description: 'Stock up on fast-moving products for better turnover',
          savings: 'Reduce stockouts by 40%'
        },
        {
          title: 'Digital Marketing Campaign',
          description: 'Boost online visibility and customer acquisition',
          savings: 'Average ROI of 300% on targeted ads'
        },
        {
          title: 'Warehouse Optimization',
          description: 'Improve storage and fulfillment efficiency',
          savings: 'Reduce operational costs by 20%'
        }
      ],
      maria: [
        {
          title: 'Event Planning Software',
          description: 'Streamline operations with professional tools',
          savings: 'Handle 50% more events efficiently'
        },
        {
          title: 'Marketing Materials',
          description: 'Professional branding and portfolio development',
          savings: 'Increase booking rates by 35%'
        },
        {
          title: 'Vendor Network Expansion',
          description: 'Build relationships with premium suppliers',
          savings: 'Improve margins on high-end events'
        }
      ]
    };
    return suggestionsByPersona[selectedPersona] || suggestionsByPersona.anna;
  };
  
  // Get cash flow data for personalized tips
  const getCashFlowData = () => {
    const selectedPersona = localStorage.getItem('selectedPersona') || 'anna';
    const personas = {
      anna: {
        averageMonthlyIncome: 2300,
        averageMonthlyExpenses: 1967,
        averageNetCashFlow: 333,
        volatility: 15,
        positiveCashFlowMonths: 3,
        totalMonths: 3
      },
      mehmet: {
        averageMonthlyIncome: 3500,
        averageMonthlyExpenses: 3000,
        averageNetCashFlow: 500,
        volatility: 20,
        positiveCashFlowMonths: 3,
        totalMonths: 3
      },
      maria: {
        averageMonthlyIncome: 2200,
        averageMonthlyExpenses: 1900,
        averageNetCashFlow: 300,
        volatility: 18,
        positiveCashFlowMonths: 3,
        totalMonths: 3
      }
    };
    return personas[selectedPersona] || personas.anna;
  };
  
  const successStories = [
    {
      business: 'Berlin Bakery',
      growth: '+45% revenue',
      story: 'Used €1,500 to buy a commercial oven, doubled production capacity'
    },
    {
      business: 'Tech Solutions GmbH',
      growth: '+3 new clients',
      story: 'Invested €2,000 in marketing, landed enterprise contracts'
    },
    {
      business: 'Green Grocer Munich',
      growth: '+30% foot traffic',
      story: 'Renovated storefront with €1,200, attracted more customers'
    }
  ];
  
  const handleFeedback = (e) => {
    e.preventDefault();
    setFeedbackSubmitted(true);
    setTimeout(() => setFeedbackSubmitted(false), 3000);
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-start">
          <svg className="w-6 h-6 text-green-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="text-lg font-semibold text-green-900 mb-1">
              Funds Successfully Transferred!
            </h3>
            <p className="text-green-800">
              €{loanData?.amount || '1,000'} has been deposited to your linked bank account. 
              The funds should be available within 1-2 business hours.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Smart Ways to Use Your Funds
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {getPersonaSpecificSuggestions().map((suggestion, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
              <h3 className="font-semibold text-gray-800 mb-1">{suggestion.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{suggestion.description}</p>
              <p className="text-xs font-medium text-green-600">{suggestion.savings}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <CashFlowTips 
          cashFlowSummary={getCashFlowData()}
          persona={localStorage.getItem('selectedPersona')}
          layout="default"
          theme="light"
          maxTips={4}
          headerText="Personalized Growth Recommendations"
          className=""
        />
      </div>
      
      <div className="bg-indigo-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Complete Your Business Profile
        </h2>
        
        <div className="space-y-4">
          <p className="text-gray-700">
            Unlock additional features and higher credit limits by completing your profile:
          </p>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">Bank account connected</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-700">Add business documentation</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-700">Connect accounting software</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-700">Verify business identity</span>
            </div>
          </div>
          
          <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            Complete Profile
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Success Stories Like Yours
        </h2>
        
        <div className="space-y-4">
          {successStories.map((story, index) => (
            <div key={index} className="border-l-4 border-indigo-500 pl-4 py-2">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-gray-800">{story.business}</h3>
                <span className="text-sm font-medium text-green-600">{story.growth}</span>
              </div>
              <p className="text-sm text-gray-600">{story.story}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700 mb-3">
            Your success story could be here! Share how CashFlow Bridge helped your business grow.
          </p>
          <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
            Share Your Story →
          </button>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Help Us Improve
        </h2>
        
        {!feedbackSubmitted ? (
          <form onSubmit={handleFeedback} className="space-y-4">
            <p className="text-gray-700">
              How was your experience with CashFlow Bridge?
            </p>
            
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <svg className="w-8 h-8 text-gray-400 hover:text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                </button>
              ))}
            </div>
            
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              rows="3"
              placeholder="Tell us more about your experience (optional)"
            />
            
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Submit Feedback
            </button>
          </form>
        ) : (
          <div className="text-center py-8">
            <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-700 font-medium">Thank you for your feedback!</p>
          </div>
        )}
      </div>
      
      <div className="text-center py-6">
        <p className="text-gray-600 mb-4">
          Ready to grow even more?
        </p>
        <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-colors">
          Apply for Credit Line Increase
        </button>
        <p className="text-sm text-gray-500 mt-2">
          Based on your repayment history
        </p>
      </div>
    </div>
  );
};

export default NextSteps;