import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import BankConnectionPage from './pages/BankConnectionPage';
import CashFlowAnalysisPage from './pages/CashFlowAnalysisPage';
import CreditOfferPage from './pages/CreditOfferPage';
import AcceptancePage from './pages/AcceptancePage';
import SuccessDashboardPage from './pages/SuccessDashboardPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/connect" element={<BankConnectionPage />} />
          <Route path="/analysis" element={<CashFlowAnalysisPage />} />
          <Route path="/offer" element={<CreditOfferPage />} />
          <Route path="/accept" element={<AcceptancePage />} />
          <Route path="/dashboard" element={<SuccessDashboardPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
