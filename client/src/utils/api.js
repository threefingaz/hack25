// API utility with error handling and retries

const API_BASE_URL = 'http://localhost:3001/api';

// Retry configuration
const RETRY_CONFIG = {
  maxRetries: 3,
  retryDelay: 1000, // 1 second
  retryDelayMultiplier: 1.5
};

// API Error class
class APIError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
  }
}

// Sleep utility for retries
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Enhanced fetch with error handling and retries
const apiRequest = async (endpoint, options = {}, retryConfig = RETRY_CONFIG) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const { maxRetries, retryDelay, retryDelayMultiplier } = retryConfig;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  };

  let lastError;
  let currentDelay = retryDelay;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      console.log(`API Request (attempt ${attempt + 1}/${maxRetries + 1}):`, url);
      
      const response = await fetch(url, defaultOptions);
      
      // Handle HTTP errors
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new APIError(
          errorData.error || `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          errorData
        );
      }
      
      const data = await response.json();
      console.log(`API Success:`, endpoint, data);
      return data;
      
    } catch (error) {
      lastError = error;
      
      // Don't retry for certain error types
      if (error instanceof APIError && [400, 401, 403, 404].includes(error.status)) {
        console.error(`API Error (no retry):`, error);
        throw error;
      }
      
      // Don't retry on the last attempt
      if (attempt === maxRetries) {
        console.error(`API Error (final attempt):`, error);
        break;
      }
      
      console.warn(`API retry ${attempt + 1}/${maxRetries} after ${currentDelay}ms:`, error.message);
      await sleep(currentDelay);
      currentDelay *= retryDelayMultiplier;
    }
  }
  
  throw lastError;
};

// Specific API methods
export const apiClient = {
  // Bank connection
  connectBank: async (bankData) => {
    return apiRequest('/connect-bank', {
      method: 'POST',
      body: JSON.stringify(bankData)
    });
  },

  // Get cash flow data
  getCashFlow: async (accountId) => {
    return apiRequest(`/cash-flow/${accountId}`);
  },

  // Get credit decision
  getCreditDecision: async (creditData) => {
    return apiRequest('/credit-decision', {
      method: 'POST',
      body: JSON.stringify(creditData)
    });
  },

  // Accept loan
  acceptLoan: async (acceptanceData) => {
    return apiRequest('/accept-loan', {
      method: 'POST',
      body: JSON.stringify(acceptanceData)
    });
  },

  // Health check
  healthCheck: async () => {
    return apiRequest('/health');
  }
};

// Error handling for React components
export const withErrorHandling = (apiCall, fallbackData = null) => {
  return async (...args) => {
    try {
      return await apiCall(...args);
    } catch (error) {
      console.error('API call failed:', error);
      
      // Show user-friendly error message
      const userMessage = getUserFriendlyError(error);
      
      // Return fallback data if API fails
      if (fallbackData) {
        console.log('Using fallback data due to API error');
        return fallbackData;
      }
      
      // Re-throw with user-friendly message
      throw new Error(userMessage);
    }
  };
};

// Convert technical errors to user-friendly messages
const getUserFriendlyError = (error) => {
  if (error instanceof APIError) {
    switch (error.status) {
      case 400:
        return 'Invalid request. Please check your information and try again.';
      case 401:
        return 'Authentication failed. Please try connecting your bank again.';
      case 403:
        return 'Access denied. Please check your permissions.';
      case 404:
        return 'The requested resource was not found.';
      case 429:
        return 'Too many requests. Please wait a moment and try again.';
      case 500:
        return 'Server error. Please try again in a few moments.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  }
  
  if (error.message.includes('fetch')) {
    return 'Unable to connect to the server. Please check your internet connection and try again.';
  }
  
  return 'An unexpected error occurred. Please try again.';
};

// Timeout wrapper
export const withTimeout = (promise, timeoutMs = 10000) => {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Request timeout')), timeoutMs);
  });
  
  return Promise.race([promise, timeoutPromise]);
};

export default apiClient;