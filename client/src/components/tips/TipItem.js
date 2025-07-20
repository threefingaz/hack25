import React from 'react';
import { combineTipStyles } from './styles';

const TipItem = ({ 
  tip, 
  layout = 'default', 
  theme = 'light', 
  showPriority = true, 
  showCategory = true,
  showImpact = true,
  className = ''
}) => {
  const styles = combineTipStyles(layout, tip.priority, tip.category, theme);
  
  const getPriorityLabel = (priority) => {
    switch(priority) {
      case 'high': return 'High Priority';
      case 'medium': return 'Medium Priority';
      case 'low': return 'Low Priority';
      default: return 'Priority';
    }
  };
  
  const getCategoryIcon = (category) => {
    const icons = {
      revenue: 'Revenue',
      expenses: 'Expenses',
      timing: 'Timing',
      growth: 'Growth',
      stability: 'Stability'
    };
    return icons[category] || 'Tip';
  };
  
  return (
    <div className={`${styles.item} ${className}`}>
      {/* Header with category and priority */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          {showCategory && (
            <span className="text-xs text-gray-500 uppercase tracking-wide">{getCategoryIcon(tip.category)}</span>
          )}
          {showPriority && (
            <span className={styles.badge}>
              {getPriorityLabel(tip.priority)}
            </span>
          )}
        </div>
        
      </div>
      
      {/* Title */}
      <h3 className={styles.title}>{tip.title}</h3>
      
      {/* Description */}
      <p className={styles.description}>{tip.description}</p>
      
      {/* Impact (if available and should be shown) */}
      {showImpact && tip.impact && (
        <div className="mt-2">
          <p className={styles.impact}>Impact: {tip.impact}</p>
        </div>
      )}
      
      {/* Action indicator */}
      {tip.actionable && (
        <div className="mt-2">
          <p className="text-xs text-gray-500">Actionable now</p>
        </div>
      )}
    </div>
  );
};

export default TipItem;