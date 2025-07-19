import React, { useState, useEffect } from 'react';
import { getCardClasses, getTextClasses } from '../design-system/utils';

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: 'Stefan Mueller',
      business: 'Digital Marketing Agency',
      category: 'Marketing',
      loanAmount: '€2,200',
      useCase: 'Equipment upgrade',
      text: 'CashFlow Bridge approved my loan in under 3 minutes. I used the funds to upgrade our video equipment and landed three new clients within a week. The ROI has been incredible.',
      rating: 5,
      location: 'Berlin, Germany'
    },
    {
      id: 2,
      name: 'Elena Vasquez',
      business: 'Organic Bakery',
      category: 'Food & Beverage',
      loanAmount: '€1,800',
      useCase: 'Inventory expansion',
      text: 'Traditional banks wanted 6 weeks for approval. CashFlow Bridge analyzed my cash flow and approved me instantly. Now I can stock up for the holiday season without missing opportunities.',
      rating: 5,
      location: 'Madrid, Spain'
    },
    {
      id: 3,
      name: 'Thomas Andersen',
      business: 'Freelance Web Developer',
      category: 'Technology',
      loanAmount: '€1,500',
      useCase: 'Client project advance',
      text: 'As a freelancer, my income varies monthly. CashFlow Bridge understood my business model and gave me working capital to take on a bigger project. Game changer for my business.',
      rating: 5,
      location: 'Copenhagen, Denmark'
    }
  ];

  // Auto-rotation every 5 seconds
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [currentIndex, isPaused, testimonials.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600">
              Real stories from businesses that transformed their cash flow
            </p>
          </div>

          <div 
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Main testimonial display */}
            <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 shadow-lg border border-slate-100 min-h-[400px] flex flex-col justify-between">
              <div>
                {/* Quote icon */}
                <div className="text-slate-600 mb-6">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                  </svg>
                </div>

                {/* Testimonial text */}
                <blockquote className="text-lg text-gray-800 mb-6 leading-relaxed">
                  {testimonials[currentIndex].text}
                </blockquote>

                {/* Rating */}
                <div className="flex items-center mb-6">
                  <div className="flex mr-2">
                    {renderStars(testimonials[currentIndex].rating)}
                  </div>
                  <span className="text-sm text-gray-600">
                    ({testimonials[currentIndex].rating}/5)
                  </span>
                </div>
              </div>

              {/* Author info */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-gray-900 text-lg">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-slate-700 font-medium">
                      {testimonials[currentIndex].business}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonials[currentIndex].location}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
                      {testimonials[currentIndex].category}
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      {testimonials[currentIndex].loanAmount}
                    </div>
                    <div className="text-sm text-gray-500">
                      for {testimonials[currentIndex].useCase}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-slate-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Auto-rotation indicator */}
          <div className="text-center mt-4">
            <div className="text-xs text-gray-500 flex items-center justify-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${isPaused ? 'bg-gray-400' : 'bg-green-400 animate-pulse'}`}></div>
              {isPaused ? 'Paused' : 'Auto-rotating every 5 seconds'}
            </div>
          </div>

          {/* Call to action */}
          <div className="text-center mt-12">
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
              <p className="text-slate-800 font-medium mb-4">
                Join {testimonials.length > 1000 ? '1,000+' : '100+'} businesses already growing with CashFlow Bridge
              </p>
              <div className="flex items-center justify-center text-sm text-slate-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Average approval time: 2.5 minutes
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;