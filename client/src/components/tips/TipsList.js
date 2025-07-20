import React from 'react';
import TipItem from './TipItem';
import { tipStyles } from './styles';

const TipsList = ({ 
  tips = [], 
  layout = 'default', 
  theme = 'light',
  showHeader = true,
  headerText = 'Cash Flow Optimization Tips',
  showPriority = true,
  showCategory = true,
  showImpact = true,
  className = '',
  maxTips = null
}) => {
  if (!tips || tips.length === 0) {
    return null;
  }
  
  const displayTips = maxTips ? tips.slice(0, maxTips) : tips;
  const containerStyles = tipStyles.layouts[layout];
  
  return (
    <div className={`${className}`}>
      {showHeader && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">{headerText}</h2>
          <p className="text-sm text-gray-600">
            Personalized recommendations based on your cash flow patterns
          </p>
        </div>
      )}
      
      <div className={containerStyles.container}>
        {displayTips.map((tip) => (
          <TipItem
            key={tip.id}
            tip={tip}
            layout={layout}
            theme={theme}
            showPriority={showPriority}
            showCategory={showCategory}
            showImpact={showImpact}
          />
        ))}
      </div>
      
      {tips.length > displayTips.length && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            {tips.length - displayTips.length} more tips available
          </p>
        </div>
      )}
    </div>
  );
};

export default TipsList;