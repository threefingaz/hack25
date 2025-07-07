import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import BankConnectionPage from './pages/BankConnectionPage';
import CashFlowAnalysisPage from './pages/CashFlowAnalysisPage';
import CreditOfferPage from './pages/CreditOfferPage';
import AcceptancePage from './pages/AcceptancePage';
import SuccessDashboardPage from './pages/SuccessDashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/connect" element={<BankConnectionPage />} />
          <Route 
            path="/cash-flow-analysis" 
            element={
              <ProtectedRoute requiresAccountId={true}>
                <CashFlowAnalysisPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/offer" 
            element={
              <ProtectedRoute>
                <CreditOfferPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/accept" 
            element={<AcceptancePage />}
          />
          <Route path="/success-dashboard" element={<SuccessDashboardPage />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <SuccessDashboardPage />
              </ProtectedRoute>
            } 
          />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
