const express = require('express');
const router = express.Router();

// In-memory storage for accepted loans
const acceptedLoans = new Map();
const offerStorage = new Map(); // Assuming this exists from credit decision

// POST /api/accept-loan - Accept loan offer
router.post('/accept-loan', async (req, res) => {
  try {
    const { offerId, signature, termsAccepted } = req.body;

    // Validate request body
    if (!offerId) {
      return res.status(400).json({ 
        error: 'Offer ID is required' 
      });
    }

    if (!signature || !signature.fullName || signature.verified !== true) {
      console.error('Signature validation failed:', { 
        hasSignature: !!signature, 
        hasFullName: signature?.fullName, 
        isVerified: signature?.verified 
      });
      return res.status(400).json({ 
        error: 'Valid signature is required',
        details: 'Signature must include full name and be verified'
      });
    }

    if (!termsAccepted || termsAccepted.gdprConsent !== true) {
      console.error('Terms validation failed:', { 
        hasTerms: !!termsAccepted, 
        gdprConsent: termsAccepted?.gdprConsent 
      });
      return res.status(400).json({ 
        error: 'GDPR consent is required',
        details: 'You must accept the terms and conditions and provide GDPR consent'
      });
    }

    // Check if offer exists and is not expired
    let offer = offerStorage.get(offerId);
    
    // For demo mode: create mock offer if it's the demo offer ID or if no offer exists
    if (!offer && (offerId === 'demo_offer_123' || offerId.startsWith('demo_'))) {
      offer = {
        offerId: offerId,
        amount: 1500,
        dailyRate: 0.0005,
        totalRepayment: 1578.75,
        dailyPayment: 52.63,
        repaymentDays: 30,
        createdAt: new Date().toISOString()
      };
      console.log('Demo offer created for testing:', offerId);
    }
    
    // Additional fallback: if still no offer, create one for any request (demo mode)
    if (!offer && process.env.NODE_ENV !== 'production') {
      offer = {
        offerId: offerId,
        amount: 1500,
        dailyRate: 0.0005,
        totalRepayment: 1578.75,
        dailyPayment: 52.63,
        repaymentDays: 30,
        createdAt: new Date().toISOString()
      };
      console.log('Fallback demo offer created for development:', offerId);
    }
    
    if (!offer) {
      return res.status(404).json({ 
        error: 'Offer not found or expired' 
      });
    }

    // Check if offer is still valid (not expired)
    const now = new Date();
    const offerExpiry = new Date(offer.createdAt);
    offerExpiry.setHours(offerExpiry.getHours() + 24); // 24 hour expiry
    
    if (now > offerExpiry) {
      return res.status(400).json({ 
        error: 'Offer has expired' 
      });
    }

    // Generate unique loan ID
    const loanId = `LOAN_${Date.now()}_${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    
    // Calculate first payment date (tomorrow)
    const firstPaymentDate = new Date();
    firstPaymentDate.setDate(firstPaymentDate.getDate() + 1);
    
    // Create loan record
    const loanRecord = {
      loanId,
      offerId,
      amount: offer.amount,
      dailyRate: offer.dailyRate,
      totalRepayment: offer.totalRepayment,
      dailyPayment: offer.dailyPayment,
      repaymentDays: offer.repaymentDays,
      status: 'active',
      createdAt: new Date().toISOString(),
      acceptedAt: new Date().toISOString(),
      firstPaymentDate: firstPaymentDate.toISOString(),
      signature: {
        fullName: signature.fullName,
        method: signature.method,
        timestamp: signature.timestamp,
        verified: signature.verified
      },
      consent: {
        gdprConsent: termsAccepted.gdprConsent,
        marketingConsent: termsAccepted.marketingConsent || false,
        acceptedAt: new Date().toISOString()
      },
      disbursementStatus: 'pending', // Will be updated to 'completed' after processing
      paymentsRemaining: offer.repaymentDays,
      nextPaymentDate: firstPaymentDate.toISOString()
    };

    // Store loan in memory
    acceptedLoans.set(loanId, loanRecord);
    
    // Remove offer from storage (it's now consumed)
    offerStorage.delete(offerId);

    // Simulate disbursement processing (2 second delay)
    setTimeout(() => {
      if (acceptedLoans.has(loanId)) {
        const loan = acceptedLoans.get(loanId);
        loan.disbursementStatus = 'completed';
        loan.disbursedAt = new Date().toISOString();
        acceptedLoans.set(loanId, loan);
      }
    }, 2000);

    // Mock email confirmation
    const emailConfirmation = {
      sent: true,
      recipient: 'customer@business.com', // In real app, would use actual email
      subject: `Loan Approved - €${offer.amount} disbursed`,
      timestamp: new Date().toISOString()
    };

    // Log acceptance for demo metrics
    console.log(`Loan accepted: ${loanId} for €${offer.amount}`);

    res.json({
      success: true,
      message: 'Loan accepted successfully',
      loanId,
      amount: offer.amount,
      disbursementStatus: 'pending',
      firstPaymentDate: firstPaymentDate.toISOString(),
      estimatedDisbursement: '2-3 minutes',
      emailConfirmation,
      nextSteps: [
        'Funds will be transferred to your account within 2-3 minutes',
        'First payment will be automatically deducted tomorrow',
        'You will receive email confirmations for all transactions',
        'Access your loan dashboard for payment tracking'
      ]
    });

  } catch (error) {
    console.error('Error processing loan acceptance:', error);
    res.status(500).json({ 
      error: 'Failed to process loan acceptance',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/loan/:loanId - Get loan details
router.get('/loan/:loanId', (req, res) => {
  try {
    const { loanId } = req.params;
    
    const loan = acceptedLoans.get(loanId);
    if (!loan) {
      return res.status(404).json({ 
        error: 'Loan not found' 
      });
    }

    res.json({
      success: true,
      loan
    });

  } catch (error) {
    console.error('Error fetching loan details:', error);
    res.status(500).json({ 
      error: 'Failed to fetch loan details' 
    });
  }
});

// GET /api/loans - Get all loans (for demo dashboard)
router.get('/loans', (req, res) => {
  try {
    const loans = Array.from(acceptedLoans.values());
    
    res.json({
      success: true,
      loans,
      totalLoans: loans.length,
      totalDisbursed: loans.reduce((sum, loan) => sum + loan.amount, 0)
    });

  } catch (error) {
    console.error('Error fetching loans:', error);
    res.status(500).json({ 
      error: 'Failed to fetch loans' 
    });
  }
});

// Export both router and storage for cross-route access
module.exports = { router, acceptedLoans, setOfferStorage: (storage) => { offerStorage.clear(); storage.forEach((v, k) => offerStorage.set(k, v)); } };