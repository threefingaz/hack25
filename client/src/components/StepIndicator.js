import React from 'react';

const StepIndicator = ({ currentStep }) => {
  const steps = [
    { id: 1, name: 'Select Bank' },
    { id: 2, name: 'Login' },
    { id: 3, name: 'Authorize' }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  currentStep >= step.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {currentStep > step.id ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.id
                )}
              </div>
              <span className={`mt-2 text-sm font-medium ${
                currentStep >= step.id ? 'text-slate-900' : 'text-gray-500'
              }`}>
                {step.name}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-1 mx-4 transition-all duration-300 ${
                currentStep > step.id ? 'bg-slate-900' : 'bg-gray-200'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;