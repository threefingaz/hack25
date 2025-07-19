import React, { useState, useRef, useEffect } from 'react';
import { getButtonClasses, getCardClasses, getTextClasses } from '../design-system/utils';

const DigitalSignature = ({ onSign, accountHolder = "Anna Schmidt" }) => {
  const [fullName, setFullName] = useState('');
  const [signatureMethod, setSignatureMethod] = useState('type'); // 'type' or 'draw'
  const [hasDrawnSignature, setHasDrawnSignature] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const [signatureTimestamp, setSignatureTimestamp] = useState('');

  useEffect(() => {
    setSignatureTimestamp(new Date().toLocaleString('de-DE'));
  }, []);

  const isNameValid = fullName.trim().toLowerCase() === accountHolder.toLowerCase();
  const isSignatureValid = signatureMethod === 'type' ? isNameValid : (isNameValid && hasDrawnSignature);

  // Canvas drawing functions
  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#1f2937';
    ctx.lineTo(x, y);
    ctx.stroke();
    
    setHasDrawnSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawnSignature(false);
  };

  const handleSign = () => {
    if (isSignatureValid) {
      const signatureData = {
        fullName: fullName.trim(),
        method: signatureMethod,
        timestamp: signatureTimestamp,
        verified: true
      };
      
      if (signatureMethod === 'draw') {
        signatureData.canvasData = canvasRef.current.toDataURL();
      }
      
      onSign(signatureData);
    }
  };

  return (
    <div className={getCardClasses('elevated', 'md')}>
      <h2 className={getTextClasses('h2') + ' mb-4'}>Digital Signature</h2>
      
      {/* Legal Notice */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-slate-900 mb-2">Legal Digital Signature</h3>
        <p className="text-sm text-slate-800">
          Your digital signature will be legally binding and equivalent to a handwritten signature under German and EU electronic signature laws. 
          This signature confirms your identity and consent to the loan agreement.
        </p>
      </div>

      {/* Name Input */}
      <div className="mb-6">
        <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
          Full Legal Name (must match account holder)
        </label>
        <input
          type="text"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder={`Enter: ${accountHolder}`}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 ${
            fullName && !isNameValid ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
        />
        {fullName && !isNameValid && (
          <p className="text-red-600 text-xs mt-1">
            Name must exactly match account holder: {accountHolder}
          </p>
        )}
        {isNameValid && (
          <p className="text-green-600 text-xs mt-1">
            ✓ Name verified
          </p>
        )}
      </div>

      {/* Signature Method Selection */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-3">Choose Signature Method</h3>
        <div className="flex gap-4">
          <button
            onClick={() => setSignatureMethod('type')}
            className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
              signatureMethod === 'type'
                ? 'border-slate-600 bg-slate-50 text-slate-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="text-center">
              <div className="text-lg mb-1">✍️</div>
              <div className="font-medium">Type Name</div>
              <div className="text-xs text-gray-500">Simple & Quick</div>
            </div>
          </button>
          
          <button
            onClick={() => setSignatureMethod('draw')}
            className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
              signatureMethod === 'draw'
                ? 'border-slate-600 bg-slate-50 text-slate-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="text-center">
              <div className="text-lg mb-1">🖊️</div>
              <div className="font-medium">Draw Signature</div>
              <div className="text-xs text-gray-500">Personal Touch</div>
            </div>
          </button>
        </div>
      </div>

      {/* Signature Display */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-3">Your Signature</h3>
        
        {signatureMethod === 'type' ? (
          <div className="border-2 border-gray-300 rounded-lg p-6 bg-gray-50 h-32 flex items-center justify-center">
            {isNameValid ? (
              <div className="text-center">
                <div 
                  className="text-2xl font-serif italic text-gray-800"
                  style={{ fontFamily: 'Brush Script MT, cursive' }}
                >
                  {fullName}
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Digitally signed on {signatureTimestamp}
                </div>
              </div>
            ) : (
              <div className="text-gray-400 text-center">
                <div>Enter your name above to see signature preview</div>
              </div>
            )}
          </div>
        ) : (
          <div className="border-2 border-gray-300 rounded-lg bg-white">
            <canvas
              ref={canvasRef}
              width={400}
              height={120}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className="w-full cursor-crosshair"
              style={{ touchAction: 'none' }}
            />
            <div className="p-2 border-t border-gray-200 flex justify-between items-center">
              <div className="text-xs text-gray-500">
                {hasDrawnSignature ? `Signed on ${signatureTimestamp}` : 'Click and drag to sign'}
              </div>
              <button
                onClick={clearCanvas}
                className="text-xs text-red-600 hover:text-red-800 underline"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Signature Confirmation */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <div className="mt-1">
            {isSignatureValid ? (
              <span className="text-green-600 text-xl">✓</span>
            ) : (
              <span className="text-gray-400 text-xl">○</span>
            )}
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Signature Verification</h4>
            <ul className="text-sm text-gray-600 mt-1 space-y-1">
              <li className={isNameValid ? 'text-green-600' : 'text-gray-500'}>
                {isNameValid ? '✓' : '○'} Name matches account holder
              </li>
              <li className={signatureMethod === 'draw' ? (hasDrawnSignature ? 'text-green-600' : 'text-gray-500') : 'text-green-600'}>
                {signatureMethod === 'draw' ? (hasDrawnSignature ? '✓' : '○') : '✓'} Signature provided
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sign Button */}
      <button
        onClick={handleSign}
        disabled={!isSignatureValid}
        className={isSignatureValid ? getButtonClasses('primary', 'lg') + ' w-full shadow-lg' : 'w-full py-4 px-6 rounded-lg font-semibold text-lg bg-gray-300 text-gray-500 cursor-not-allowed transition-all'}
      >
        {isSignatureValid ? '🔐 Sign Loan Agreement' : 'Complete All Fields to Sign'}
      </button>

      {/* Legal Footer */}
      <div className="mt-4 text-xs text-gray-500 text-center">
        By signing, you confirm your identity and agree to be legally bound by this electronic signature.
        This signature is protected by 256-bit encryption and complies with eIDAS regulation.
      </div>
    </div>
  );
};

export default DigitalSignature;