import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Store error details
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Log to error reporting service in production
    if (process.env.NODE_ENV === 'production') {
      // Here you would send to your error tracking service
      // trackError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Oops! Something went wrong
            </h2>
            
            <p className="text-gray-600 mb-6">
              We're sorry for the inconvenience. The application encountered an unexpected error.
            </p>

            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Reload Page
              </button>
              
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.href = '/';
                }}
                className="w-full bg-gray-100 text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Start Over
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                  Error Details (Development)
                </summary>
                <div className="mt-2 p-3 bg-gray-50 rounded text-xs text-gray-700 font-mono overflow-auto max-h-32">
                  <div className="mb-2">
                    <strong>Error:</strong> {this.state.error && this.state.error.toString()}
                  </div>
                  <div>
                    <strong>Stack:</strong>
                    <pre className="whitespace-pre-wrap">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </div>
                </div>
              </details>
            )}

            <div className="mt-4 text-xs text-gray-500">
              Error ID: {Date.now().toString(36)}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for wrapping components with error boundary
export const withErrorBoundary = (Component, fallback) => {
  const WrappedComponent = (props) => {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
  
  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  return WrappedComponent;
};

export default ErrorBoundary;