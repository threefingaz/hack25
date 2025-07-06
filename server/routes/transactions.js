const express = require('express');
const router = express.Router();
const { personas, calculateCashFlowMetrics } = require('../data/personas');

// Get transactions for connected account
router.get('/transactions/:accountId', (req, res) => {
  try {
    const { accountId } = req.params;
    
    // For demo, we'll map account IDs to personas based on selection
    // In real app, this would fetch from database
    const selectedBank = req.query.bank || 'sparkasse';
    
    // For demo purposes, rotate through personas
    const personaKeys = Object.keys(personas);
    const personaIndex = Math.abs(accountId.charCodeAt(4)) % personaKeys.length;
    const selectedPersona = personas[personaKeys[personaIndex]];
    
    if (!selectedPersona) {
      return res.status(404).json({ error: 'Account not found' });
    }
    
    // Get last 90 days of transactions
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 90);
    
    const relevantTransactions = selectedPersona.transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate >= startDate && transactionDate <= endDate;
    });
    
    // Calculate metrics
    const metrics = calculateCashFlowMetrics(relevantTransactions);
    
    res.json({
      accountId,
      persona: {
        name: selectedPersona.name,
        business: selectedPersona.business,
        description: selectedPersona.description
      },
      transactions: relevantTransactions,
      summary: {
        totalTransactions: relevantTransactions.length,
        dateRange: {
          start: startDate.toISOString().split('T')[0],
          end: endDate.toISOString().split('T')[0]
        },
        ...metrics
      }
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// Get cash flow analysis
router.get('/cash-flow/:accountId', (req, res) => {
  try {
    const { accountId } = req.params;
    
    // Get persona based on account ID
    const personaKeys = Object.keys(personas);
    const personaIndex = Math.abs(accountId.charCodeAt(4)) % personaKeys.length;
    const selectedPersona = personas[personaKeys[personaIndex]];
    
    if (!selectedPersona) {
      return res.status(404).json({ error: 'Account not found' });
    }
    
    // Calculate monthly cash flow for charting
    const monthlyData = {};
    
    selectedPersona.transactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const monthKey = date.toISOString().substring(0, 7); // YYYY-MM
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {
          month: monthKey,
          income: 0,
          expenses: 0,
          transactions: []
        };
      }
      
      if (transaction.type === 'income') {
        monthlyData[monthKey].income += transaction.amount;
      } else {
        monthlyData[monthKey].expenses += Math.abs(transaction.amount);
      }
      
      monthlyData[monthKey].transactions.push(transaction);
    });
    
    // Convert to array and sort by month
    const monthlyFlows = Object.values(monthlyData)
      .sort((a, b) => a.month.localeCompare(b.month))
      .slice(-3) // Last 3 months
      .map(month => ({
        month: month.month,
        income: Math.round(month.income * 100) / 100,
        expenses: Math.round(month.expenses * 100) / 100,
        netFlow: Math.round((month.income - month.expenses) * 100) / 100
        // Removed transactions array to reduce payload size
      }));
    
    // Calculate summary metrics
    const metrics = calculateCashFlowMetrics(selectedPersona.transactions);
    
    res.json({
      accountId,
      persona: {
        name: selectedPersona.name,
        business: selectedPersona.business,
        type: selectedPersona.description
      },
      monthlyFlows,
      summary: {
        averageMonthlyIncome: metrics.averageIncome,
        averageMonthlyExpenses: metrics.averageExpenses,
        averageNetCashFlow: metrics.averageNetCashFlow,
        volatility: metrics.volatility,
        positiveCashFlowMonths: metrics.positiveCashFlowMonths,
        totalMonths: monthlyFlows.length
      }
    });
  } catch (error) {
    console.error('Error calculating cash flow:', error);
    res.status(500).json({ error: 'Failed to calculate cash flow' });
  }
});

module.exports = router;