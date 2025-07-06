import React, { useState, useEffect } from 'react';

const ShareSuccess = ({ loanData }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [businessCount, setBusinessCount] = useState(1200);
  
  const testimonials = [
    {
      id: 1,
      name: "Sophie Mueller",
      business: "Café Berliner",
      category: "Food & Beverage",
      rating: 5,
      text: "CashFlow Bridge saved my café during a slow month. The application took 5 minutes and I had funds the same day. Traditional banks would have taken weeks!",
      loanAmount: "€1,200",
      useCase: "Inventory restocking"
    },
    {
      id: 2,
      name: "Thomas Wagner",
      business: "Wagner Electronics",
      category: "Retail",
      rating: 5,
      text: "As an online retailer, cash flow gaps between sales and supplier payments were killing me. This daily repayment model is perfect for my business.",
      loanAmount: "€2,100",
      useCase: "Supplier payments"
    },
    {
      id: 3,
      name: "Elena Petrova",
      business: "Bloom Events",
      category: "Event Planning",
      rating: 5,
      text: "Seasonal businesses like mine need flexible financing. CashFlow Bridge understood this and gave me a fair offer based on my actual revenue patterns.",
      loanAmount: "€1,800",
      useCase: "Event deposits"
    }
  ];
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    const countTimer = setInterval(() => {
      setBusinessCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 10000);
    
    return () => {
      clearInterval(timer);
      clearInterval(countTimer);
    };
  }, [testimonials.length]);
  
  const referralCode = `CASH${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  
  const handleShare = (platform) => {
    const shareText = `I just got a €${loanData?.amount || 1000} business loan in 5 minutes with CashFlow Bridge! No paperwork, instant approval. Check it out:`;
    const url = 'https://cashflowbridge.de';
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    };
    
    console.log(`Opening ${platform} share dialog:`, shareUrls[platform]);
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-4">Share Your Success!</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-indigo-100 mb-4">
              Help other business owners discover instant financing. Share your experience and earn rewards!
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={() => handleShare('twitter')}
                className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-colors"
                aria-label="Share on Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                </svg>
              </button>
              
              <button
                onClick={() => handleShare('linkedin')}
                className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-colors"
                aria-label="Share on LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </button>
              
              <button
                onClick={() => handleShare('facebook')}
                className="bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-colors"
                aria-label="Share on Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <h3 className="font-semibold mb-2">Your Referral Code</h3>
            <div className="bg-white/20 rounded p-3 text-center">
              <p className="text-2xl font-mono font-bold">{referralCode}</p>
            </div>
            <p className="text-sm text-indigo-100 mt-2">
              Earn €50 for each friend who gets approved!
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Success Stories</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Auto-rotating</span>
            <div className="flex space-x-1">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-indigo-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute -top-4 -left-2 text-6xl text-gray-200">"</div>
          
          <div className="relative z-10">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {testimonials[currentTestimonial].name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {testimonials[currentTestimonial].business}
                  </p>
                </div>
                <span className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full">
                  {testimonials[currentTestimonial].category}
                </span>
              </div>
              
              <div className="flex items-center mb-3">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
            </div>
            
            <p className="text-gray-700 mb-4 italic">
              "{testimonials[currentTestimonial].text}"
            </p>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">
                  Loan amount: <span className="font-semibold text-gray-800">
                    {testimonials[currentTestimonial].loanAmount}
                  </span>
                </span>
                <span className="text-gray-600">
                  Used for: <span className="font-semibold text-gray-800">
                    {testimonials[currentTestimonial].useCase}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
            Write Your Review →
          </button>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Join {businessCount.toLocaleString()} German Businesses
          </h3>
          <p className="text-gray-600 mb-4">
            Who trust CashFlow Bridge for their financing needs
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">BaFin Licensed</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Bank-Level Security</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Instant Decisions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareSuccess;