// CashFlow Bridge Design System
// Modern fintech with minimalist tech execution - inspired by Wealthfront/Betterment

/**
 * DESIGN PHILOSOPHY
 * 
 * CashFlow Bridge follows a modern fintech approach with minimalist tech execution.
 * The system emphasizes trustworthiness, calm confidence, and financial empowerment.
 * 
 * Core Principles:
 * - Trustworthy, calm, and financially empowering
 * - Clean enterprise touches with modern fintech feel
 * - Generous whitespace and breathing room
 * - Professional navy and lime green accents
 * - Data-driven design decisions
 * - Accessible by default
 */

// ============================================================================
// DESIGN TOKENS
// ============================================================================

export const designTokens = {
  // Color System - Modern fintech with navy and lime
  colors: {
    // Primary brand colors - dark navy for trust and authority
    primary: {
      50: '#f8f9fb',
      100: '#f1f3f6',
      200: '#e1e7ed',
      300: '#cbd5e0',
      400: '#a0aec0',
      500: '#718096',
      600: '#4a5568',
      700: '#2d3748',
      800: '#1a202c',
      900: '#101034',  // Dark navy - main brand color
      950: '#0a0b1f'
    },
    
    // Secondary colors - lime green for CTAs and accents
    secondary: {
      50: '#f7fee7',
      100: '#ecfccb',
      200: '#d9f99d',
      300: '#bef264',
      400: '#a3e635',
      500: '#84cc16',
      600: '#65a30d',
      700: '#4d7c0f',
      800: '#365314',
      900: '#1a2e05',
      lime: '#D5EF6E'  // Lime green - CTA color
    },
    
    // Accent colors - deep orange and teal for charts/highlights
    accent: {
      orange: '#ea580c',
      teal: '#0d9488',
      blue: '#0284c7'
    },
    
    // Neutral colors - soft off-whites and clean greys
    neutral: {
      0: '#ffffff',
      50: '#F9F9F6',     // Soft off-white background
      100: '#FAFAFB',    // Alternative off-white
      200: '#E5E7EB',    // Light grey borders
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#444444',    // Dark grey text
      700: '#374151',
      800: '#1f2937',
      900: '#000000',    // Pure black for headings
      950: '#0f172a'
    },
    
    // Semantic colors - clean and professional
    semantic: {
      success: '#10b981',   // Green for charts and success states
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#101034'      // Dark navy for info
    },
    
    // Financial data colors - clean chart colors
    financial: {
      positive: '#10b981',  // Green for positive values
      negative: '#ef4444',  // Red for negative values
      neutral: '#6b7280',   // Grey for neutral
      pending: '#f59e0b',   // Orange for pending
      stocks: '#0284c7'     // Blue for US Stocks category
    }
  },
  
  // Typography System - Clean Inter with display font for headlines
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      display: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],  // Large marketing headlines
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
  
  // Border Radius - Rounded but not overly playful
  borderRadius: {
    none: '0',
    sm: '0.125rem',   // 2px
    DEFAULT: '0.375rem', // 6px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px - main card radius
    xl: '1rem',       // 16px - larger cards
    '2xl': '1.25rem', // 20px
    '3xl': '1.5rem',  // 24px
    full: '9999px'
  },
  
  // Shadow System - Light elevation, subtle shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
    DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px 0 rgba(0, 0, 0, 0.04)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -1px rgba(0, 0, 0, 0.04)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.03)'
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
        backgroundColor: designTokens.colors.secondary.lime,
        color: designTokens.colors.primary[900],
        fontWeight: designTokens.typography.fontWeight.semibold,
        '&:hover': {
          backgroundColor: designTokens.colors.secondary[400],
          transform: 'translateY(-1px)',
          boxShadow: designTokens.shadows.md
        },
        '&:active': {
          transform: 'translateY(0)',
          boxShadow: designTokens.shadows.sm
        }
      },
      
      secondary: {
        backgroundColor: designTokens.colors.neutral[0],
        color: designTokens.colors.primary[900],
        border: `1px solid ${designTokens.colors.neutral[200]}`,
        '&:hover': {
          backgroundColor: designTokens.colors.neutral[50],
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
        color: designTokens.colors.primary[900],
        border: `1px solid ${designTokens.colors.primary[900]}`,
        '&:hover': {
          backgroundColor: designTokens.colors.primary[50],
          borderColor: designTokens.colors.primary[900],
          color: designTokens.colors.primary[900]
        }
      },
      
      ghost: {
        backgroundColor: 'transparent',
        color: designTokens.colors.neutral[600],
        '&:hover': {
          backgroundColor: designTokens.colors.neutral[50],
          color: designTokens.colors.primary[900]
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
        borderColor: designTokens.colors.primary[900],
        boxShadow: '0 0 0 2px rgba(16, 16, 52, 0.2)'
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
      color: designTokens.colors.primary[900],  // Dark navy for headings
      marginBottom: designTokens.spacing[6]
    },
    
    h2: {
      fontSize: designTokens.typography.fontSize['3xl'],
      fontWeight: designTokens.typography.fontWeight.semibold,
      lineHeight: designTokens.typography.lineHeight.tight,
      color: designTokens.colors.primary[900],  // Dark navy for headings
      marginBottom: designTokens.spacing[4]
    },
    
    h3: {
      fontSize: designTokens.typography.fontSize['2xl'],
      fontWeight: designTokens.typography.fontWeight.semibold,
      lineHeight: designTokens.typography.lineHeight.tight,
      color: designTokens.colors.primary[900],  // Dark navy for headings
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
    background: designTokens.colors.neutral[50],  // Soft off-white background
    surface: designTokens.colors.neutral[0],
    text: {
      primary: designTokens.colors.primary[900],   // Dark navy for primary text
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