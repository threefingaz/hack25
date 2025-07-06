import React, { useState, useEffect, useRef } from 'react';

const ImpactMetrics = () => {
  const [animatedValues, setAnimatedValues] = useState({
    timeSaved: 0,
    businessesHelped: 0,
    economicImpact: 0
  });

  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  const targetValues = {
    timeSaved: 13,
    businessesHelped: 1247,
    economicImpact: 2.4
  };

  const formatNumber = (num, isEconomic = false) => {
    if (isEconomic) {
      return num.toFixed(1);
    }
    return Math.floor(num).toLocaleString();
  };

  const animateCounter = (target, setter, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setter(target);
        clearInterval(timer);
      } else {
        setter(start);
      }
    }, 16);

    return timer;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            // Animate all counters with slight delays
            setTimeout(() => {
              animateCounter(targetValues.timeSaved, (val) => 
                setAnimatedValues(prev => ({ ...prev, timeSaved: val }))
              );
            }, 200);

            setTimeout(() => {
              animateCounter(targetValues.businessesHelped, (val) => 
                setAnimatedValues(prev => ({ ...prev, businessesHelped: val }))
              );
            }, 400);

            setTimeout(() => {
              animateCounter(targetValues.economicImpact, (val) => 
                setAnimatedValues(prev => ({ ...prev, economicImpact: val }))
              );
            }, 600);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <div ref={sectionRef} className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Helping Businesses Grow Faster
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Real impact delivered to businesses across Europe through instant cash flow analysis and credit decisions.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {formatNumber(animatedValues.timeSaved)} Days
                </div>
                <p className="text-gray-600 font-medium">Average time saved</p>
                <p className="text-sm text-gray-500 mt-1">vs traditional banks</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {formatNumber(animatedValues.businessesHelped)}
                </div>
                <p className="text-gray-600 font-medium">Businesses funded</p>
                <p className="text-sm text-gray-500 mt-1">this month alone</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  €{formatNumber(animatedValues.economicImpact, true)}M
                </div>
                <p className="text-gray-600 font-medium">Economic impact</p>
                <p className="text-sm text-gray-500 mt-1">created this quarter</p>
              </div>
            </div>
          </div>

          <div className="mt-12 flex items-center justify-center space-x-4">
            <div className="flex items-center text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              Updated in real-time
            </div>
            <div className="text-gray-300">•</div>
            <div className="text-sm text-gray-500">
              Data from our live platform
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center justify-center">
              <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              95% approval rate
            </div>
            <div className="flex items-center justify-center">
              <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              24-hour disbursement
            </div>
            <div className="flex items-center justify-center">
              <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              No hidden fees
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactMetrics;