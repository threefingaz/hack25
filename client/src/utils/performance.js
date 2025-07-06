// Performance optimization utilities

// Debounce function for API calls
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function for scroll events
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Lazy image loading
export const lazyLoadImage = (src, placeholder = '/placeholder.svg') => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => resolve(placeholder);
    img.src = src;
  });
};

// Preload critical resources
export const preloadResource = (href, as = 'script') => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  document.head.appendChild(link);
};

// Memory management for large datasets
export const chunkArray = (array, size) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

// Optimize API payloads by removing unnecessary fields
export const minimizePayload = (data, allowedFields) => {
  if (Array.isArray(data)) {
    return data.map(item => minimizePayload(item, allowedFields));
  }
  
  if (typeof data === 'object' && data !== null) {
    const optimized = {};
    allowedFields.forEach(field => {
      if (data.hasOwnProperty(field)) {
        optimized[field] = data[field];
      }
    });
    return optimized;
  }
  
  return data;
};

// Local storage with expiration
export const cacheWithExpiry = {
  set: (key, value, ttl = 300000) => { // 5 minutes default
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  },
  
  get: (key) => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    
    const item = JSON.parse(itemStr);
    const now = new Date();
    
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    
    return item.value;
  },
  
  remove: (key) => {
    localStorage.removeItem(key);
  }
};

// Performance monitoring
export const performanceMonitor = {
  mark: (name) => {
    if (performance.mark) {
      performance.mark(name);
    }
  },
  
  measure: (name, startMark, endMark) => {
    if (performance.measure) {
      performance.measure(name, startMark, endMark);
      const measures = performance.getEntriesByName(name);
      if (measures.length > 0) {
        console.log(`${name}: ${measures[0].duration.toFixed(2)}ms`);
      }
    }
  },
  
  logPageLoad: () => {
    window.addEventListener('load', () => {
      const perfData = performance.getEntriesByType('navigation')[0];
      console.log('Page Load Performance:', {
        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
        loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
        totalTime: perfData.loadEventEnd - perfData.navigationStart
      });
    });
  }
};

// Image optimization for different screen sizes
export const getOptimizedImageSrc = (baseSrc, width = 400) => {
  // This would integrate with a CDN or image optimization service
  // For demo purposes, return original
  return baseSrc;
};

// Bundle size optimization - dynamic imports
export const loadComponent = (componentPath) => {
  return React.lazy(() => import(componentPath));
};