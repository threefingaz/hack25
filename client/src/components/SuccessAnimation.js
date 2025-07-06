import React, { useState, useEffect } from 'react';

const SuccessAnimation = ({ amount, onContinue, autoRedirect = true }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // Sequence the animations
    const timer1 = setTimeout(() => setShowCheckmark(true), 300);
    const timer2 = setTimeout(() => setShowConfetti(true), 600);
    const timer3 = setTimeout(() => setShowMessage(true), 1000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  useEffect(() => {
    if (autoRedirect && showMessage) {
      const interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            onContinue();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [showMessage, autoRedirect, onContinue]);

  // Generate confetti particles
  const generateConfetti = () => {
    const particles = [];
    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
    
    for (let i = 0; i < 50; i++) {
      particles.push({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        left: Math.random() * 100,
        animationDelay: Math.random() * 3,
        size: Math.random() * 10 + 5
      });
    }
    return particles;
  };

  const confettiParticles = generateConfetti();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Confetti */}
      {showConfetti && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {confettiParticles.map(particle => (
            <div
              key={particle.id}
              className="absolute animate-bounce"
              style={{
                left: `${particle.left}%`,
                animationDelay: `${particle.animationDelay}s`,
                animationDuration: '3s',
                animationIterationCount: 'infinite'
              }}
            >
              <div
                className="rounded-full opacity-80"
                style={{
                  backgroundColor: particle.color,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  animation: `fall 3s linear infinite ${particle.animationDelay}s`
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 text-center relative">
        {/* Checkmark Animation */}
        <div className="mb-6">
          <div 
            className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center transition-all duration-1000 ${
              showCheckmark 
                ? 'bg-green-500 scale-100 opacity-100' 
                : 'bg-gray-300 scale-50 opacity-0'
            }`}
          >
            <svg 
              className={`w-10 h-10 text-white transition-all duration-500 ${
                showCheckmark ? 'scale-100' : 'scale-0'
              }`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={3} 
                d="M5 13l4 4L19 7"
                className={showCheckmark ? 'animate-pulse' : ''}
              />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <div className={`transition-all duration-1000 ${showMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🎉 Congratulations!
          </h1>
          
          <p className="text-gray-600 mb-4">
            Your loan has been approved and processed successfully.
          </p>

          {/* Loan Amount Display */}
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-6">
            <div className="text-sm text-green-700 mb-1">Approved Amount</div>
            <div className="text-4xl font-bold text-green-800">
              €{amount?.toLocaleString('de-DE') || '0'}
            </div>
            <div className="text-sm text-green-600 mt-1">
              Being transferred to your account now
            </div>
          </div>

          {/* Key Benefits */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold text-blue-800">⚡ Instant</div>
                <div className="text-blue-600">Approval</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-blue-800">💰 No Fees</div>
                <div className="text-blue-600">Hidden Costs</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-blue-800">📱 Digital</div>
                <div className="text-blue-600">Process</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-blue-800">🔒 Secure</div>
                <div className="text-blue-600">Platform</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={onContinue}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Continue to Dashboard
            </button>
            
            {autoRedirect && (
              <div className="text-sm text-gray-500">
                Auto-redirecting in {countdown} seconds...
              </div>
            )}
          </div>

          {/* Trust Indicators */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-center items-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center">
                <span className="text-green-500 mr-1">🔒</span>
                256-bit SSL
              </div>
              <div className="flex items-center">
                <span className="text-blue-500 mr-1">🏛️</span>
                BaFin Regulated
              </div>
              <div className="flex items-center">
                <span className="text-purple-500 mr-1">🛡️</span>
                GDPR Compliant
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for confetti fall animation */}
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default SuccessAnimation;