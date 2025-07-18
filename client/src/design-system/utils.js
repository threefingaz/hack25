// Design System Utilities
// Helper functions for applying design system styles

import { designTokens, componentStyles } from './index.js';

/**
 * Converts design system styles to CSS-in-JS format
 * @param {Object} styles - Style object from design system
 * @returns {Object} CSS-in-JS compatible styles
 */
export const toCSSInJS = (styles) => {
  const result = {};
  
  for (const [key, value] of Object.entries(styles)) {
    if (typeof value === 'object' && value !== null) {
      // Handle nested objects (pseudo-selectors, media queries)
      if (key.startsWith('&') || key.startsWith('@')) {
        result[key] = toCSSInJS(value);
      } else {
        // Convert kebab-case to camelCase for CSS properties
        const camelKey = key.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
        result[camelKey] = value;
      }
    } else {
      // Convert kebab-case to camelCase for CSS properties
      const camelKey = key.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
      result[camelKey] = value;
    }
  }
  
  return result;
};

/**
 * Converts design system styles to Tailwind CSS classes
 * @param {Object} styles - Style object from design system
 * @returns {string} Tailwind class string
 */
export const toTailwindClasses = (styles) => {
  const classMap = {
    // Display
    'display': {
      'flex': 'flex',
      'inline-flex': 'inline-flex',
      'grid': 'grid',
      'block': 'block',
      'inline-block': 'inline-block'
    },
    
    // Flex
    'alignItems': {
      'center': 'items-center',
      'flex-start': 'items-start',
      'flex-end': 'items-end',
      'stretch': 'items-stretch'
    },
    
    'justifyContent': {
      'center': 'justify-center',
      'flex-start': 'justify-start',
      'flex-end': 'justify-end',
      'space-between': 'justify-between',
      'space-around': 'justify-around'
    },
    
    'flexDirection': {
      'column': 'flex-col',
      'row': 'flex-row',
      'column-reverse': 'flex-col-reverse',
      'row-reverse': 'flex-row-reverse'
    },
    
    // Spacing
    'padding': (value) => {
      const spacingMap = {
        [designTokens.spacing[2]]: 'p-2',
        [designTokens.spacing[3]]: 'p-3',
        [designTokens.spacing[4]]: 'p-4',
        [designTokens.spacing[6]]: 'p-6',
        [designTokens.spacing[8]]: 'p-8'
      };
      return spacingMap[value] || '';
    },
    
    'margin': (value) => {
      const spacingMap = {
        [designTokens.spacing[2]]: 'm-2',
        [designTokens.spacing[3]]: 'm-3',
        [designTokens.spacing[4]]: 'm-4',
        [designTokens.spacing[6]]: 'm-6',
        [designTokens.spacing[8]]: 'm-8'
      };
      return spacingMap[value] || '';
    },
    
    // Colors
    'backgroundColor': (value) => {
      const colorMap = {
        [designTokens.colors.neutral[0]]: 'bg-white',
        [designTokens.colors.neutral[50]]: 'bg-gray-50',
        [designTokens.colors.neutral[100]]: 'bg-gray-100',
        [designTokens.colors.primary[500]]: 'bg-blue-500',
        [designTokens.colors.primary[600]]: 'bg-blue-600',
        [designTokens.colors.secondary[500]]: 'bg-green-500'
      };
      return colorMap[value] || '';
    },
    
    'color': (value) => {
      const colorMap = {
        [designTokens.colors.neutral[0]]: 'text-white',
        [designTokens.colors.neutral[600]]: 'text-gray-600',
        [designTokens.colors.neutral[700]]: 'text-gray-700',
        [designTokens.colors.neutral[900]]: 'text-gray-900'
      };
      return colorMap[value] || '';
    },
    
    // Border
    'borderRadius': (value) => {
      const radiusMap = {
        [designTokens.borderRadius.md]: 'rounded-md',
        [designTokens.borderRadius.lg]: 'rounded-lg',
        [designTokens.borderRadius.xl]: 'rounded-xl',
        [designTokens.borderRadius['2xl']]: 'rounded-2xl'
      };
      return radiusMap[value] || '';
    },
    
    // Typography
    'fontSize': (value) => {
      const sizeMap = {
        [designTokens.typography.fontSize.sm]: 'text-sm',
        [designTokens.typography.fontSize.base]: 'text-base',
        [designTokens.typography.fontSize.lg]: 'text-lg',
        [designTokens.typography.fontSize.xl]: 'text-xl',
        [designTokens.typography.fontSize['2xl']]: 'text-2xl',
        [designTokens.typography.fontSize['3xl']]: 'text-3xl',
        [designTokens.typography.fontSize['4xl']]: 'text-4xl'
      };
      return sizeMap[value] || '';
    },
    
    'fontWeight': (value) => {
      const weightMap = {
        [designTokens.typography.fontWeight.normal]: 'font-normal',
        [designTokens.typography.fontWeight.medium]: 'font-medium',
        [designTokens.typography.fontWeight.semibold]: 'font-semibold',
        [designTokens.typography.fontWeight.bold]: 'font-bold'
      };
      return weightMap[value] || '';
    }
  };
  
  const classes = [];
  
  for (const [property, value] of Object.entries(styles)) {
    if (classMap[property]) {
      if (typeof classMap[property] === 'function') {
        const className = classMap[property](value);
        if (className) classes.push(className);
      } else if (classMap[property][value]) {
        classes.push(classMap[property][value]);
      }
    }
  }
  
  return classes.join(' ');
};

/**
 * Get component styles with variant and size
 * @param {string} component - Component name (e.g., 'button', 'input')
 * @param {string} variant - Variant name (e.g., 'primary', 'secondary')
 * @param {string} size - Size name (e.g., 'sm', 'md', 'lg')
 * @returns {Object} Combined styles object
 */
export const getComponentStyles = (component, variant = 'default', size = 'md') => {
  const componentStyle = componentStyles[component];
  if (!componentStyle) return {};
  
  const baseStyles = componentStyle.base || {};
  const variantStyles = componentStyle.variants?.[variant] || {};
  const sizeStyles = componentStyle.sizes?.[size] || {};
  
  return {
    ...baseStyles,
    ...variantStyles,
    ...sizeStyles
  };
};

/**
 * Get button classes for Tailwind CSS
 * @param {string} variant - Button variant
 * @param {string} size - Button size
 * @param {string} additionalClasses - Additional CSS classes
 * @returns {string} Combined class string
 */
export const getButtonClasses = (variant = 'primary', size = 'md', additionalClasses = '') => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer border-none outline-none select-none focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-px hover:shadow-md active:translate-y-0 active:shadow-sm focus:ring-blue-500',
    secondary: 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 hover:border-gray-300 focus:ring-gray-500',
    success: 'bg-green-500 text-white hover:bg-green-600 hover:-translate-y-px hover:shadow-md focus:ring-green-500',
    outline: 'bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-50 hover:border-blue-700 hover:text-blue-700 focus:ring-blue-500',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-700 focus:ring-gray-500'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm min-h-8 rounded-lg',
    md: 'px-4 py-3 text-base min-h-10 rounded-lg',
    lg: 'px-6 py-4 text-lg min-h-12 rounded-lg',
    xl: 'px-8 py-5 text-xl min-h-14 rounded-lg'
  };
  
  return [
    baseClasses,
    variantClasses[variant] || variantClasses.primary,
    sizeClasses[size] || sizeClasses.md,
    additionalClasses
  ].filter(Boolean).join(' ');
};

/**
 * Get input classes for Tailwind CSS
 * @param {string} variant - Input variant
 * @param {string} additionalClasses - Additional CSS classes
 * @returns {string} Combined class string
 */
export const getInputClasses = (variant = 'default', additionalClasses = '') => {
  const baseClasses = 'w-full px-4 py-3 text-base leading-normal text-gray-900 bg-white border border-gray-300 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed placeholder:text-gray-400';
  
  const variantClasses = {
    default: 'focus:border-blue-500 focus:ring-blue-200',
    error: 'border-red-500 focus:border-red-500 focus:ring-red-200',
    success: 'border-green-500 focus:border-green-500 focus:ring-green-200'
  };
  
  return [
    baseClasses,
    variantClasses[variant] || variantClasses.default,
    additionalClasses
  ].filter(Boolean).join(' ');
};

/**
 * Get card classes for Tailwind CSS
 * @param {string} variant - Card variant
 * @param {string} padding - Card padding size
 * @param {string} additionalClasses - Additional CSS classes
 * @returns {string} Combined class string
 */
export const getCardClasses = (variant = 'default', padding = 'md', additionalClasses = '') => {
  const baseClasses = 'bg-white rounded-xl border border-gray-200 transition-all duration-200';
  
  const variantClasses = {
    default: 'shadow-sm',
    elevated: 'shadow-md hover:shadow-lg hover:-translate-y-0.5',
    flat: 'shadow-none',
    outline: 'bg-transparent shadow-none'
  };
  
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  
  return [
    baseClasses,
    variantClasses[variant] || variantClasses.default,
    paddingClasses[padding] || paddingClasses.md,
    additionalClasses
  ].filter(Boolean).join(' ');
};

/**
 * Get responsive container classes
 * @param {string} additionalClasses - Additional CSS classes
 * @returns {string} Container class string
 */
export const getContainerClasses = (additionalClasses = '') => {
  const containerClasses = 'max-w-6xl mx-auto px-4 md:px-6';
  
  return [containerClasses, additionalClasses].filter(Boolean).join(' ');
};

/**
 * Generate CSS custom properties from design tokens
 * @returns {Object} CSS custom properties object
 */
export const generateCSSCustomProperties = () => {
  const properties = {};
  
  // Colors
  Object.entries(designTokens.colors).forEach(([colorName, colorValue]) => {
    if (typeof colorValue === 'object') {
      Object.entries(colorValue).forEach(([shade, value]) => {
        properties[`--color-${colorName}-${shade}`] = value;
      });
    } else {
      properties[`--color-${colorName}`] = colorValue;
    }
  });
  
  // Spacing
  Object.entries(designTokens.spacing).forEach(([key, value]) => {
    properties[`--spacing-${key}`] = value;
  });
  
  // Typography
  Object.entries(designTokens.typography.fontSize).forEach(([key, value]) => {
    properties[`--font-size-${key}`] = value;
  });
  
  return properties;
};

export default {
  toCSSInJS,
  toTailwindClasses,
  getComponentStyles,
  getButtonClasses,
  getInputClasses,
  getCardClasses,
  getContainerClasses,
  generateCSSCustomProperties
};