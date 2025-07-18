// CashFlow Bridge Design System
// A comprehensive design system for professional fintech interfaces

/**
 * DESIGN PHILOSOPHY
 * 
 * CashFlow Bridge follows a professional, trustworthy design approach that builds confidence
 * in financial decisions. The system emphasizes clarity, data integrity, and user empowerment.
 * 
 * Core Principles:
 * - Information clarity over decoration
 * - Professional trustworthiness
 * - Data-driven design decisions
 * - Accessible by default
 * - Consistent interaction patterns
 */

// ============================================================================
// DESIGN TOKENS
// ============================================================================

export const designTokens = {
  // Color System
  colors: {
    // Primary brand colors - trust and professionalism
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',  // Primary brand blue
      600: '#0284c7',  // Primary dark
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e'
    },
    
    // Secondary colors - success and growth
    secondary: {
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981',  // Success green
      600: '#059669',
      700: '#047857',
      800: '#065f46',
      900: '#064e3b'
    },
    
    // Neutral colors - professional and readable
    neutral: {
      0: '#ffffff',
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
      950: '#0f172a'
    },
    
    // Semantic colors
    semantic: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#0ea5e9'
    },
    
    // Financial data colors
    financial: {
      positive: '#10b981',
      negative: '#ef4444',
      neutral: '#6b7280',
      pending: '#f59e0b'
    }
  },
  
  // Typography System
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace']
    },
    
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
      '6xl': '3.75rem'  // 60px
    },
    
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75
    },
    
    letterSpacing: {
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em'
    }
  },
  
  // Spacing System (8px base grid)
  spacing: {
    0: '0px',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
    32: '8rem',     // 128px
    40: '10rem',    // 160px
    48: '12rem',    // 192px
    56: '14rem',    // 224px
    64: '16rem'     // 256px
  },
  
  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',   // 2px
    DEFAULT: '0.25rem', // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px'
  },
  
  // Shadow System
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
  },
  
  // Animation & Transitions
  animation: {
    duration: {
      fast: '150ms',
      normal: '200ms',
      slow: '300ms'
    },
    
    easing: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  },
  
  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
};

// ============================================================================
// COMPONENT STYLES
// ============================================================================

export const componentStyles = {
  // Button Variants
  button: {
    base: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: designTokens.typography.fontWeight.medium,
      fontSize: designTokens.typography.fontSize.base,
      lineHeight: designTokens.typography.lineHeight.normal,
      borderRadius: designTokens.borderRadius.lg,
      transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      border: 'none',
      outline: 'none',
      textDecoration: 'none',
      userSelect: 'none',
      '&:focus': {
        outline: '2px solid transparent',
        outlineOffset: '2px',
        boxShadow: '0 0 0 2px rgba(14, 165, 233, 0.5)'
      },
      '&:disabled': {
        opacity: 0.6,
        cursor: 'not-allowed'
      }
    },
    
    variants: {
      primary: {
        backgroundColor: designTokens.colors.primary[600],
        color: designTokens.colors.neutral[0],
        '&:hover': {
          backgroundColor: designTokens.colors.primary[700],
          transform: 'translateY(-1px)',
          boxShadow: designTokens.shadows.md
        },
        '&:active': {
          transform: 'translateY(0)',
          boxShadow: designTokens.shadows.sm
        }
      },
      
      secondary: {
        backgroundColor: designTokens.colors.neutral[100],
        color: designTokens.colors.neutral[700],
        border: `1px solid ${designTokens.colors.neutral[200]}`,
        '&:hover': {
          backgroundColor: designTokens.colors.neutral[200],
          borderColor: designTokens.colors.neutral[300]
        }
      },
      
      success: {
        backgroundColor: designTokens.colors.secondary[500],
        color: designTokens.colors.neutral[0],
        '&:hover': {
          backgroundColor: designTokens.colors.secondary[600],
          transform: 'translateY(-1px)',
          boxShadow: designTokens.shadows.md
        }
      },
      
      outline: {
        backgroundColor: 'transparent',
        color: designTokens.colors.primary[600],
        border: `1px solid ${designTokens.colors.primary[600]}`,
        '&:hover': {
          backgroundColor: designTokens.colors.primary[50],
          borderColor: designTokens.colors.primary[700],
          color: designTokens.colors.primary[700]
        }
      },
      
      ghost: {
        backgroundColor: 'transparent',
        color: designTokens.colors.neutral[600],
        '&:hover': {
          backgroundColor: designTokens.colors.neutral[100],
          color: designTokens.colors.neutral[700]
        }
      }
    },
    
    sizes: {
      sm: {
        padding: `${designTokens.spacing[2]} ${designTokens.spacing[3]}`,
        fontSize: designTokens.typography.fontSize.sm,
        minHeight: '32px'
      },
      md: {
        padding: `${designTokens.spacing[3]} ${designTokens.spacing[4]}`,
        fontSize: designTokens.typography.fontSize.base,
        minHeight: '40px'
      },
      lg: {
        padding: `${designTokens.spacing[4]} ${designTokens.spacing[6]}`,
        fontSize: designTokens.typography.fontSize.lg,
        minHeight: '48px'
      },
      xl: {
        padding: `${designTokens.spacing[5]} ${designTokens.spacing[8]}`,
        fontSize: designTokens.typography.fontSize.xl,
        minHeight: '56px'
      }
    }
  },
  
  // Input Variants
  input: {
    base: {
      width: '100%',
      padding: `${designTokens.spacing[3]} ${designTokens.spacing[4]}`,
      fontSize: designTokens.typography.fontSize.base,
      lineHeight: designTokens.typography.lineHeight.normal,
      color: designTokens.colors.neutral[900],
      backgroundColor: designTokens.colors.neutral[0],
      border: `1px solid ${designTokens.colors.neutral[300]}`,
      borderRadius: designTokens.borderRadius.md,
      transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
      '&:focus': {
        outline: 'none',
        borderColor: designTokens.colors.primary[500],
        boxShadow: '0 0 0 2px rgba(14, 165, 233, 0.2)'
      },
      '&:disabled': {
        backgroundColor: designTokens.colors.neutral[50],
        color: designTokens.colors.neutral[500],
        cursor: 'not-allowed'
      },
      '&::placeholder': {
        color: designTokens.colors.neutral[400]
      }
    },
    
    variants: {
      error: {
        borderColor: designTokens.colors.semantic.error,
        '&:focus': {
          borderColor: designTokens.colors.semantic.error,
          boxShadow: '0 0 0 2px rgba(239, 68, 68, 0.2)'
        }
      },
      
      success: {
        borderColor: designTokens.colors.semantic.success,
        '&:focus': {
          borderColor: designTokens.colors.semantic.success,
          boxShadow: '0 0 0 2px rgba(16, 185, 129, 0.2)'
        }
      }
    }
  },
  
  // Card Component
  card: {
    base: {
      backgroundColor: designTokens.colors.neutral[0],
      borderRadius: designTokens.borderRadius.xl,
      boxShadow: designTokens.shadows.sm,
      border: `1px solid ${designTokens.colors.neutral[200]}`,
      transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)'
    },
    
    variants: {
      elevated: {
        boxShadow: designTokens.shadows.md,
        '&:hover': {
          boxShadow: designTokens.shadows.lg,
          transform: 'translateY(-2px)'
        }
      },
      
      flat: {
        boxShadow: 'none',
        border: `1px solid ${designTokens.colors.neutral[200]}`
      },
      
      outline: {
        backgroundColor: 'transparent',
        border: `1px solid ${designTokens.colors.neutral[200]}`,
        boxShadow: 'none'
      }
    },
    
    padding: {
      sm: designTokens.spacing[4],
      md: designTokens.spacing[6],
      lg: designTokens.spacing[8]
    }
  },
  
  // Typography Components
  text: {
    h1: {
      fontSize: designTokens.typography.fontSize['4xl'],
      fontWeight: designTokens.typography.fontWeight.bold,
      lineHeight: designTokens.typography.lineHeight.tight,
      color: designTokens.colors.neutral[900],
      marginBottom: designTokens.spacing[6]
    },
    
    h2: {
      fontSize: designTokens.typography.fontSize['3xl'],
      fontWeight: designTokens.typography.fontWeight.semibold,
      lineHeight: designTokens.typography.lineHeight.tight,
      color: designTokens.colors.neutral[900],
      marginBottom: designTokens.spacing[4]
    },
    
    h3: {
      fontSize: designTokens.typography.fontSize['2xl'],
      fontWeight: designTokens.typography.fontWeight.semibold,
      lineHeight: designTokens.typography.lineHeight.tight,
      color: designTokens.colors.neutral[900],
      marginBottom: designTokens.spacing[3]
    },
    
    body: {
      fontSize: designTokens.typography.fontSize.base,
      fontWeight: designTokens.typography.fontWeight.normal,
      lineHeight: designTokens.typography.lineHeight.normal,
      color: designTokens.colors.neutral[700]
    },
    
    caption: {
      fontSize: designTokens.typography.fontSize.sm,
      fontWeight: designTokens.typography.fontWeight.normal,
      lineHeight: designTokens.typography.lineHeight.normal,
      color: designTokens.colors.neutral[500]
    },
    
    mono: {
      fontFamily: designTokens.typography.fontFamily.mono.join(', '),
      fontSize: designTokens.typography.fontSize.sm,
      fontWeight: designTokens.typography.fontWeight.normal,
      color: designTokens.colors.neutral[700]
    }
  }
};

// ============================================================================
// LAYOUT UTILITIES
// ============================================================================

export const layoutUtils = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `0 ${designTokens.spacing[4]}`,
    '@media (min-width: 768px)': {
      padding: `0 ${designTokens.spacing[6]}`
    }
  },
  
  stack: {
    display: 'flex',
    flexDirection: 'column',
    gap: designTokens.spacing[4]
  },
  
  inline: {
    display: 'flex',
    alignItems: 'center',
    gap: designTokens.spacing[3]
  },
  
  grid: {
    display: 'grid',
    gap: designTokens.spacing[6]
  }
};

// ============================================================================
// THEME VARIANTS
// ============================================================================

export const themes = {
  light: {
    background: designTokens.colors.neutral[50],
    surface: designTokens.colors.neutral[0],
    text: {
      primary: designTokens.colors.neutral[900],
      secondary: designTokens.colors.neutral[600],
      disabled: designTokens.colors.neutral[400]
    },
    border: designTokens.colors.neutral[200]
  },
  
  dark: {
    background: designTokens.colors.neutral[900],
    surface: designTokens.colors.neutral[800],
    text: {
      primary: designTokens.colors.neutral[100],
      secondary: designTokens.colors.neutral[300],
      disabled: designTokens.colors.neutral[500]
    },
    border: designTokens.colors.neutral[700]
  }
};

// ============================================================================
// ACCESSIBILITY UTILITIES
// ============================================================================

export const a11y = {
  screenReaderOnly: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: 0
  },
  
  focusVisible: {
    outline: 'none',
    '&:focus-visible': {
      outline: '2px solid transparent',
      outlineOffset: '2px',
      boxShadow: `0 0 0 2px ${designTokens.colors.primary[500]}`
    }
  }
};

// ============================================================================
// EXPORT DEFAULT DESIGN SYSTEM
// ============================================================================

export default {
  tokens: designTokens,
  components: componentStyles,
  layout: layoutUtils,
  themes,
  a11y
};