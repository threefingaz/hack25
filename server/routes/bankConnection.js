const express = require('express');
const router = express.Router();
const crypto = require('crypto');

// In-memory storage for sessions (for demo purposes)
const sessions = {};

// Rate limiting storage
const connectionAttempts = {};

// Middleware to check rate limiting
const rateLimiter = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  const maxAttempts = 10;

  if (!connectionAttempts[ip]) {
    connectionAttempts[ip] = [];
  }

  // Remove old attempts
  connectionAttempts[ip] = connectionAttempts[ip].filter(
    timestamp => now - timestamp < windowMs
  );

  if (connectionAttempts[ip].length >= maxAttempts) {
    return res.status(429).json({ 
      error: 'Too many connection attempts. Please try again later.' 
    });
  }

  connectionAttempts[ip].push(now);
  next();
};

// Connect bank endpoint
router.post('/connect-bank', rateLimiter, async (req, res) => {
  try {
    const { bank, credentials } = req.body;

    // Validate request body
    if (!bank || !credentials) {
      return res.status(400).json({ 
        error: 'Missing required fields: bank and credentials' 
      });
    }

    if (!credentials.username || !credentials.password) {
      return res.status(400).json({ 
        error: 'Missing username or password' 
      });
    }

    // Log connection attempt
    console.log(`Bank connection attempt: ${bank} at ${new Date().toISOString()}`);

    // Simulate processing delay for realism
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Check demo credentials
    if (credentials.username !== 'demo' || credentials.password !== 'demo') {
      return res.status(401).json({ 
        error: 'Invalid credentials. Please use demo/demo for this demo.' 
      });
    }

    // Generate session data
    const sessionId = crypto.randomBytes(16).toString('hex');
    const accountId = `acc_${crypto.randomBytes(8).toString('hex')}`;

    // Store session in memory
    sessions[sessionId] = {
      accountId,
      bank,
      connectedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
    };

    // Return success response
    res.json({
      success: true,
      accountId,
      sessionId,
      bank,
      message: 'Bank account successfully connected'
    });

  } catch (error) {
    console.error('Bank connection error:', error);
    res.status(500).json({ 
      error: 'Failed to connect bank account. Please try again.' 
    });
  }
});

// Get session info endpoint (for debugging)
router.get('/session/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  
  if (!sessions[sessionId]) {
    return res.status(404).json({ error: 'Session not found' });
  }

  const session = sessions[sessionId];
  const now = new Date();
  const expiresAt = new Date(session.expiresAt);

  if (now > expiresAt) {
    delete sessions[sessionId];
    return res.status(401).json({ error: 'Session expired' });
  }

  res.json({
    ...session,
    isValid: true
  });
});

module.exports = router;