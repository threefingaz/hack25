import React, { useState, useEffect } from 'react';

const messages = [
  'Securing connection...',
  'Verifying credentials...',
  'Accessing account...',
  'Retrieving transaction data...',
  'Analyzing cash flow...'
];

const ProgressMessage = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => 
        prevIndex < messages.length - 1 ? prevIndex + 1 : prevIndex
      );
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center">
      <p className="text-lg text-gray-700 animate-pulse">
        {messages[currentMessageIndex]}
      </p>
    </div>
  );
};

export default ProgressMessage;