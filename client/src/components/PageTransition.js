import React, { useState, useEffect } from 'react';

const PageTransition = ({ children, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`transition-all duration-500 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-4'
      } ${className}`}
    >
      {children}
    </div>
  );
};

// Staggered animation for lists
export const StaggeredList = ({ children, staggerDelay = 100 }) => {
  const [visibleItems, setVisibleItems] = useState(new Set());

  useEffect(() => {
    const items = React.Children.toArray(children);
    
    items.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems(prev => new Set([...prev, index]));
      }, index * staggerDelay);
    });
  }, [children, staggerDelay]);

  return (
    <>
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          className={`transition-all duration-500 ease-out ${
            visibleItems.has(index)
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          {child}
        </div>
      ))}
    </>
  );
};

// Fade transition
export const FadeTransition = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`transition-opacity duration-700 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {children}
    </div>
  );
};

// Scale transition for buttons and cards
export const ScaleTransition = ({ children, className = "" }) => {
  return (
    <div 
      className={`transition-transform duration-200 ease-out hover:scale-105 ${className}`}
    >
      {children}
    </div>
  );
};

export default PageTransition;