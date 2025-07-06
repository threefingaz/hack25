const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3002']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const bankConnectionRoutes = require('./routes/bankConnection');
const transactionRoutes = require('./routes/transactions');
const creditDecisionRoutes = require('./routes/creditDecision');
const { router: loanAcceptanceRoutes } = require('./routes/loanAcceptance');

app.use('/api', bankConnectionRoutes);
app.use('/api', transactionRoutes);
app.use('/api', creditDecisionRoutes);
app.use('/api', loanAcceptanceRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'CashFlow Bridge API Server' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});