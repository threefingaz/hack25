# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CashFlow Bridge is a fintech hackathon MVP that provides instant credit approval based on real-time cash flow analysis. The application simulates connecting to a user's bank account, analyzes their transaction history, and provides immediate credit offers with digital acceptance flow.

## Architecture

This is a full-stack application with a React frontend and Express.js backend:

- **Frontend**: React SPA (Single Page Application) on port 3002
- **Backend**: Express.js API server on port 3001
- **Data**: In-memory storage with mock data (no database)
- **Deployment**: Local development only

## Development Commands

### Starting the application
```bash
# Start both client and server (recommended)
npm run dev:all
# or
./start-simple.sh

# Start individual components
npm run client    # React app on port 3002
npm run server    # Express API on port 3001
```

### Build and test
```bash
# Build client
npm run build

# Run tests (client only)
cd client && npm test

# Health check
npm run health    # Check both servers are running
```

### Process management
```bash
npm run stop      # Kill all processes
npm run restart   # Stop and restart everything
```

## Code Structure

### Frontend (`/client/src/`)
- **pages/**: Main application pages following the user flow
  - `HomePage.js` - Landing page with personas and demo entry
  - `BankConnectionPage.js` - Mock bank OAuth flow
  - `CashFlowAnalysisPage.js` - Transaction visualization with Chart.js
  - `CreditOfferPage.js` - Loan offer display and terms
  - `AcceptancePage.js` - Digital signature and acceptance
  - `SuccessDashboardPage.js` - Post-acceptance dashboard
- **components/**: Reusable UI components
- **utils/**: API client and performance utilities

### Backend (`/server/`)
- **server.js**: Main server file with middleware and routes
- **routes/**: API endpoints for bank connection, transactions, credit decisions, loan acceptance
- **services/**: Business logic (credit engine)
- **data/**: Mock data and personas

### Key Files
- `start-simple.sh`: Development startup script with process management
- `docs/prd.md`: Complete product requirements and feature specifications
- Both `package.json` files contain all dependencies and scripts

## Demo Flow

The application follows a specific user journey:
1. **Landing**: Persona selection (Anna, Mehmet, Maria)
2. **Bank Connection**: Mock OAuth with demo credentials
3. **Cash Flow Analysis**: Chart.js visualization of transactions
4. **Credit Decision**: Rule-based approval (25% of avg monthly income)
5. **Digital Acceptance**: Terms and e-signature simulation
6. **Success Dashboard**: Loan details and repayment schedule

## Development Notes

- Mock data is pre-generated for consistent demos
- Credit decisions use simple rules (avg income >€2k, positive cash flow)
- All external APIs are mocked for hackathon constraints
- Frontend uses Chart.js for visualizations
- Protected routes require account connection flow
- Error boundaries handle React crashes gracefully

## API Endpoints

- `POST /api/connect-bank` - Mock bank OAuth
- `GET /api/cash-flow/:accountId` - Transaction data
- `POST /api/credit-decision` - Loan approval logic
- `POST /api/accept-loan` - Digital acceptance
- `GET /api/health` - Server health check

## Testing

React Testing Library is configured for component testing. Run tests with:
```bash
cd client && npm test
```

No backend tests are implemented (hackathon scope).

## Musts
Do not use emojis
Do not run dev servers yourself, ask me i will run it in separate terminal
