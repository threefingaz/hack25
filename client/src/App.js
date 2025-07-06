import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import BankConnectionPage from './pages/BankConnectionPage';
import CashFlowAnalysisPage from './pages/CashFlowAnalysisPage';
import CreditOfferPage from './pages/CreditOfferPage';
import AcceptancePage from './pages/AcceptancePage';
import TestAcceptance from './pages/TestAcceptance';
import TestDashboard from './pages/TestDashboard';
import SuccessDashboardPage from './pages/SuccessDashboardPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
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
          <Route path="/test-accept" element={<TestAcceptance />} />
          <Route path="/test-dashboard" element={<TestDashboard />} />
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
  );
}

export default App;
