const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const creditEngine = require('../services/creditEngine');

// In-memory storage for offers
const creditOffers = {};

// Credit decision endpoint
router.post('/credit-decision', async (req, res) => {
  try {
    const { accountId, cashFlowSummary } = req.body;

    // Validate request
    if (!accountId || !cashFlowSummary) {
      return res.status(400).json({ 
        error: 'Missing required fields: accountId and cashFlowSummary' 
      });
    }

    console.log(`Processing credit decision for account: ${accountId}`);

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Run credit engine
    const creditDecision = creditEngine.assessCreditworthiness(cashFlowSummary);

    if (!creditDecision.approved) {
      return res.json({
        approved: false,
        reason: creditDecision.reason,
        factors: creditDecision.factors,
        alternatives: [
          'Improve your average monthly income',
          'Reduce cash flow volatility',
          'Maintain positive cash flow for more months'
        ]
      });
    }

    // Generate offer details
    const offerId = `offer_${crypto.randomBytes(8).toString('hex')}`;
    const offerExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    const offer = {
      offerId,
      accountId,
      approved: true,
      loanAmount: creditDecision.loanAmount,
      currency: 'EUR',
      dailyInterestRate: creditDecision.dailyInterestRate,
      repaymentTerms: creditDecision.repaymentTerms,
      riskScore: creditDecision.riskScore,
      factors: creditDecision.factors,
      explanation: creditDecision.explanation,
      offerValidUntil: offerExpiry.toISOString(),
      createdAt: new Date().toISOString()
    };

    // Store offer in memory
    creditOffers[offerId] = offer;

    // Clean up expired offers
    setTimeout(() => {
      delete creditOffers[offerId];
    }, 24 * 60 * 60 * 1000);

    res.json(offer);

  } catch (error) {
    console.error('Credit decision error:', error);
    res.status(500).json({ 
      error: 'Failed to process credit decision. Please try again.' 
    });
  }
});

// Get offer details endpoint
router.get('/offer/:offerId', (req, res) => {
  const { offerId } = req.params;
  
  const offer = creditOffers[offerId];
  if (!offer) {
    return res.status(404).json({ error: 'Offer not found or expired' });
  }

  // Check if offer is still valid
  if (new Date() > new Date(offer.offerValidUntil)) {
    delete creditOffers[offerId];
    return res.status(410).json({ error: 'Offer has expired' });
  }

  res.json(offer);
});

// Accept offer endpoint
router.post('/accept-offer', async (req, res) => {
  try {
    const { offerId, signature, acceptedTerms } = req.body;

    // Validate request
    if (!offerId || !signature || !acceptedTerms) {
      return res.status(400).json({ 
        error: 'Missing required fields: offerId, signature, and acceptedTerms' 
      });
    }

    const offer = creditOffers[offerId];
    if (!offer) {
      return res.status(404).json({ error: 'Offer not found or expired' });
    }

    // Check if offer is still valid
    if (new Date() > new Date(offer.offerValidUntil)) {
      delete creditOffers[offerId];
      return res.status(410).json({ error: 'Offer has expired' });
    }

    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create loan record
    const loanId = `loan_${crypto.randomBytes(8).toString('hex')}`;
    const firstPaymentDate = new Date();
    firstPaymentDate.setDate(firstPaymentDate.getDate() + 1); // Tomorrow

    const loan = {
      loanId,
      offerId,
      accountId: offer.accountId,
      loanAmount: offer.loanAmount,
      disbursementStatus: 'completed',
      disbursementDate: new Date().toISOString(),
      repaymentSchedule: generateRepaymentSchedule(
        offer.loanAmount,
        offer.repaymentTerms.dailyPayment,
        offer.repaymentTerms.numberOfDays,
        firstPaymentDate
      ),
      signature,
      acceptedAt: new Date().toISOString(),
      status: 'active'
    };

    // Mark offer as used
    offer.status = 'accepted';

    res.json({
      success: true,
      loanId,
      loan,
      message: 'Loan successfully created and funds disbursed'
    });

  } catch (error) {
    console.error('Accept offer error:', error);
    res.status(500).json({ 
      error: 'Failed to accept offer. Please try again.' 
    });
  }
});

// Helper function to generate repayment schedule
function generateRepaymentSchedule(loanAmount, dailyPayment, numberOfDays, startDate) {
  const schedule = [];
  let remainingBalance = loanAmount;
  const currentDate = new Date(startDate);

  for (let day = 1; day <= numberOfDays; day++) {
    const payment = Math.min(dailyPayment, remainingBalance);
    remainingBalance -= payment;

    schedule.push({
      dayNumber: day,
      date: new Date(currentDate).toISOString(),
      amount: payment,
      remainingBalance: Math.round(remainingBalance * 100) / 100,
      status: 'scheduled'
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return schedule;
}

module.exports = router;