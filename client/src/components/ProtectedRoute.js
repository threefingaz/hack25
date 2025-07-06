import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiresAccountId = false, requiresOffer = false }) => {
  const accountId = localStorage.getItem('accountId');
  const offerId = localStorage.getItem('offerId');
  const loanId = localStorage.getItem('loanId');

  // Check if user is trying to access dashboard without completing the flow
  if (children.type?.name === 'SuccessDashboardPage' && !loanId) {
    return <Navigate to="/" replace />;
  }

  // Check if user is trying to access acceptance page without an offer
  if (children.type?.name === 'AcceptancePage' && !offerId) {
    return <Navigate to="/" replace />;
  }

  // Check if user is trying to access offer page without cash flow analysis
  if (children.type?.name === 'CreditOfferPage' && !accountId) {
    return <Navigate to="/connect" replace />;
  }

  // Check if user is trying to access cash flow analysis without bank connection
  if (requiresAccountId && !accountId) {
    return <Navigate to="/connect" replace />;
  }

  return children;
};

export default ProtectedRoute;