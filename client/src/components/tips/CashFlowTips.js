import React, { useState, useEffect } from 'react';
import TipsList from './TipsList';
import cashFlowTipsEngine from '../../utils/cashFlowTipsEngine';

const CashFlowTips = ({ 
  cashFlowSummary,
  persona = null,
  rejectionReason = null,
  layout = 'default',
  theme = 'light',
  showHeader = true,
  maxTips = 5,
  className = '',
}) => {
  const [tips, setTips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    generateTips();
  }, [cashFlowSummary, persona, rejectionReason]);
  
  const generateTips = async () => {
    setIsLoading(true);
    try {
      let generatedTips = [];
      
      if (rejectionReason) {
        // Generate tips for rejected users
        generatedTips = cashFlowTipsEngine.getRejectionTips(rejectionReason);
      } else if (cashFlowSummary) {
        // Generate tips for approved users
        generatedTips = cashFlowTipsEngine.generateTips(cashFlowSummary, persona);
      }
      
      setTips(generatedTips);
    } catch (error) {
      console.error('Error generating tips:', error);
      setTips([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const visibleTips = tips;
  
  if (isLoading) {
    return (
      <div className={`${className}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (visibleTips.length === 0) {
    return null;
  }
  
  const headerText = rejectionReason 
    ? 'Improvement Recommendations' 
    : 'Cash Flow Optimization Tips';
  
  return (
    <div className={`${className}`}>
      <TipsList
        tips={visibleTips}
        layout={layout}
        theme={theme}
        showHeader={showHeader}
        headerText={headerText}
        maxTips={maxTips}
      />
    </div>
  );
};

export default CashFlowTips;