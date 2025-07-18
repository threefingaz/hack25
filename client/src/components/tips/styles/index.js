// Cash Flow Tips Styles - Centralized styling for all tip components

export const tipStyles = {
  // Layout variants
  layouts: {
    default: {
      container: 'space-y-4',
      item: 'py-4 border-b border-gray-200 last:border-b-0',
      title: 'text-base font-semibold mb-2 text-gray-900',
      description: 'text-sm text-gray-700 leading-relaxed mb-3',
      impact: 'text-xs text-gray-600'
    },
    compact: {
      container: 'space-y-4',
      item: 'p-4 rounded border',
      title: 'text-base font-semibold mb-2',
      description: 'text-sm text-gray-600 mb-3',
      impact: 'text-xs text-blue-600'
    },
    cards: {
      container: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
      item: 'p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow',
      title: 'text-lg font-bold mb-3',
      description: 'text-gray-700 mb-4',
      impact: 'text-sm text-blue-600 font-medium'
    },
    minimal: {
      container: 'space-y-3',
      item: 'p-4',
      title: 'text-base font-semibold text-gray-900 mb-2',
      description: 'text-sm text-gray-600 mb-2',
      impact: 'text-xs text-blue-600'
    }
  },

  // Priority-based styling
  priorities: {
    high: {
      item: '',
      title: 'text-gray-900',
      icon: 'text-gray-600',
      badge: 'text-xs text-gray-500 uppercase tracking-wide'
    },
    medium: {
      item: '',
      title: 'text-gray-900',
      icon: 'text-gray-600',
      badge: 'text-xs text-gray-500 uppercase tracking-wide'
    },
    low: {
      item: '',
      title: 'text-gray-900',
      icon: 'text-gray-600',
      badge: 'text-xs text-gray-500 uppercase tracking-wide'
    }
  },

  // Category-based styling
  categories: {
    revenue: {
      icon: '💰',
      color: 'text-green-600',
      background: 'bg-green-50 border-green-200'
    },
    expenses: {
      icon: '📊',
      color: 'text-red-600',
      background: 'bg-red-50 border-red-200'
    },
    timing: {
      icon: '⏰',
      color: 'text-blue-600',
      background: 'bg-blue-50 border-blue-200'
    },
    growth: {
      icon: '📈',
      color: 'text-purple-600',
      background: 'bg-purple-50 border-purple-200'
    },
    stability: {
      icon: '🛡️',
      color: 'text-gray-600',
      background: 'bg-gray-50 border-gray-200'
    }
  },

  // Theme variants
  themes: {
    light: {
      container: 'bg-white',
      text: 'text-gray-900',
      border: 'border-gray-200'
    },
    dark: {
      container: 'bg-gray-900',
      text: 'text-white',
      border: 'border-gray-700'
    },
    blue: {
      container: 'bg-blue-50',
      text: 'text-blue-900',
      border: 'border-blue-200'
    }
  },

  // Interactive states
  states: {
    hover: 'hover:bg-gray-50 transition-colors duration-200',
    focus: 'focus:ring-2 focus:ring-blue-500 focus:outline-none',
    active: 'transform active:scale-95'
  },

  // Responsive classes
  responsive: {
    mobile: 'px-4 py-3',
    tablet: 'md:px-6 md:py-4',
    desktop: 'lg:px-8 lg:py-6'
  }
};

// Helper function to combine styles
export const combineTipStyles = (layout = 'default', priority = 'medium', category = null, theme = 'light') => {
  const layoutStyles = tipStyles.layouts[layout];
  const priorityStyles = tipStyles.priorities[priority];
  const categoryStyles = category ? tipStyles.categories[category] : null;
  const themeStyles = tipStyles.themes[theme];
  
  return {
    container: `${layoutStyles.container} ${themeStyles.container}`,
    item: `${layoutStyles.item} ${priorityStyles.item} ${categoryStyles?.background || ''} ${tipStyles.states.hover}`,
    title: `${layoutStyles.title} ${priorityStyles.title}`,
    description: `${layoutStyles.description} ${themeStyles.text}`,
    impact: `${layoutStyles.impact}`,
    icon: `${priorityStyles.icon} ${categoryStyles?.color || ''}`,
    badge: `${priorityStyles.badge} px-2 py-1 rounded-full text-xs font-medium`
  };
};

export default tipStyles;