# CashFlow Bridge

**Germany's first weekly micro-credit platform - Instant approval based on real-time cash flow analysis**

## Problem Statement

Traditional business lending is broken:
- **Weeks of paperwork** and manual underwriting
- **Credit scores don't reflect cash flow reality**
- **Small businesses struggle** to access working capital quickly
- **Banks miss profitable lending opportunities** due to outdated assessment methods
- **Monthly terms don't match weekly business cycles**

## Our Solution

CashFlow Bridge transforms business lending by analyzing real-time cash flow patterns instead of relying solely on credit scores. Our AI-powered platform provides **instant weekly credit decisions** based on actual business performance.

### Key Features
- **Weekly Credit Lines**: €500-€5,000 that renew every Monday
- **Instant Approval**: Credit decisions in seconds, not weeks
- **Real-time Analysis**: Live cash flow pattern recognition
- **Interactive Demos**: Experience different business scenarios
- **Bank-grade Security**: Read-only account access with BaFin compliance
- **Modern Design**: Clean, minimalist UI with Playfair Display typography
- **Seamless UX**: One-click application process

## Architecture

### Frontend (React SPA)
- **Framework**: React 18 with modern hooks
- **Design System**: Custom utility-based design system with navy/lime/off-white palette
- **Typography**: Playfair Display for headers, system fonts for body
- **Styling**: Tailwind CSS for responsive design
- **Charts**: Chart.js for cash flow visualizations (non-interactive)
- **Routing**: React Router for protected routes

### Backend (Express.js API)
- **Server**: Node.js + Express.js
- **Data**: In-memory storage with mock personas
- **Credit Engine**: Weekly credit algorithm (25-50% of weekly income)
- **Security**: Mock OAuth for bank connections
- **Cash Flow Tips**: AI-powered personalized business recommendations

### Demo Personas
- **Anna Schmidt** - Food Truck Owner (€2,100/month - APPROVED for €525/week)
- **Mehmet Özkan** - Online Retailer (€3,500/month - APPROVED for €875/week)
- **Maria Rodriguez** - Event Planner (€2,200/month - APPROVED for €550/week)
- **Thomas Mueller** - Caterer (€600/month - REJECTED: Income too low)
- **Stefan Weber** - Market Vendor (€800/month - REJECTED: Negative cash flow)

## Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone git@github.com:threefingaz/hack25.git
cd hack25

# Install dependencies
npm install
cd client && npm install && cd ..

# Start the application
npm run dev:all
```

The app will be available at:
- **Frontend**: http://localhost:3002
- **Backend API**: http://localhost:3001

### Alternative Start Methods
```bash
# Using the simple script
./start-simple.sh

# Individual components
npm run client    # Frontend only
npm run server    # Backend only
```

## Demo Flow

1. **Landing Page** - Choose a business persona for demo
2. **Bank Connection** - Mock OAuth flow simulation
3. **Cash Flow Analysis** - Real-time transaction visualization
4. **Credit Decision** - Instant approval based on cash flow patterns
5. **Digital Acceptance** - Terms review and e-signature
6. **Success Dashboard** - Loan details and repayment schedule

## Weekly Credit Decision Engine

Our algorithm analyzes:
- **Average weekly income** (minimum €460/week from €2,000/month)
- **Cash flow consistency** and trend analysis
- **Weekly business cycles** (perfect for food trucks, market vendors)
- **Real-time account balance** fluctuations

**Credit Line**: 25-50% of average weekly income
**Renewal**: Every Monday automatically
**Flexibility**: Skip weeks with 24hr notice
**Decision Time**: < 2 seconds
**Interest**: 1.2% per week (65% APR)

### Why Weekly Credit?
- **Matches cash flow cycles** - Pay after your weekend sales
- **Lower amounts** - €500-€5,000 vs traditional €10K minimums
- **More flexible** - Skip slow weeks without penalty
- **Perfect for micro-businesses** - Food trucks, market vendors, freelancers

## Development

### Project Structure
```
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Main application pages
│   │   ├── components/    # Reusable UI components
│   │   │   └── tips/      # Cash flow tips system
│   │   ├── design-system/ # Custom design utilities
│   │   ├── utils/         # API client & utilities
│   │   └── assets/        # Images and static files
│   └── package.json
├── server/                # Express.js backend
│   ├── routes/           # API endpoints
│   ├── services/         # Business logic
│   ├── data/            # Mock data and personas
│   └── server.js        # Main server file
├── docs/                # Documentation
├── start-simple.sh     # Development startup script
├── CLAUDE.md           # AI assistant instructions
└── package.json        # Root dependencies
```

### Available Scripts
```bash
# Development
npm run dev:all      # Start both frontend and backend
npm run health       # Check server status
npm run restart      # Stop and restart everything
npm run stop         # Kill all processes

# Build & Test
npm run build        # Build frontend for production
cd client && npm test # Run frontend tests
```


## 📄 License

MIT License - Built with passion for the future of business lending

---

**CashFlow Bridge - Where cash flow meets instant credit**

*Transforming how small businesses access capital, one transaction at a time.*

## Troubleshooting

```bash
# Stop all processes
npm run stop

# Check what's running
npm run health

# Restart fresh
npm run dev:all
```

## Project Status

**Project Completion**: 100% - Ready for demo
**Current Focus**: Final polish and demo preparation
