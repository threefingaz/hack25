# Product Requirements Document: CashFlow Bridge MVP

**Hackathon Version - 8-12 Hour Development Sprint**

Version 1.0 | Date: January 2025 | Status: Hackathon MVP

---

## Executive Summary

This PRD defines the minimal viable product for CashFlow Bridge to be built during an 8-12 hour hackathon sprint. The scope is intentionally limited to demonstrate core value proposition: **instant credit approval based on cash flow analysis**.

**Core Demo Flow**: Anna connects her bank account → System analyzes cash flow → Instant credit offer → Digital acceptance → Success confirmation

---

## 1. Feature Definition & Prioritization (Kano Model)

### Feature Breakdown for 8-12 Hour Sprint

| Feature ID | Feature Name            | Kano Category | Build vs Mock        | Time Estimate |
| ---------- | ----------------------- | ------------- | -------------------- | ------------- |
| F001       | Bank Account Connection | Basic         | Mock UI, Real OAuth  | 2 hours       |
| F002       | Cash Flow Visualization | Performance   | Build                | 2 hours       |
| F003       | Instant Credit Decision | Basic         | Build (Simple Rules) | 2 hours       |
| F004       | Loan Offer Display      | Basic         | Build                | 1 hour        |
| F005       | Digital Acceptance      | Basic         | Mock                 | 0.5 hours     |
| F006       | Success Dashboard       | Performance   | Build                | 1.5 hours     |
| F007       | Demo Data Generator     | Excitement    | Build                | 1 hour        |
| F008       | Impact Metrics Display  | Excitement    | Build                | 1 hour        |
| F009       | Responsive Design       | Performance   | Partial              | 1 hour        |

**Total Estimated Time**: 12 hours (allows for integration and debugging)

### Kano Analysis Rationale

**Basic (Must-Have for Demo):**

- Bank connection, credit decision, and loan offer are essential to demonstrate value
- Without these, the demo fails

**Performance (Linear Satisfaction):**

- Cash flow visualization and dashboard improve demo quality proportionally
- Nice to have but can be simplified if time runs short

**Excitement (Delighters):**

- Demo data generator and impact metrics create "wow" moments
- Build only if core features are complete

---

## 2. Functional & Non-Functional Requirements

### Functional Requirements by Feature

**F001: Bank Account Connection**

- FR001.1: Display bank selection screen with 3 German banks (Deutsche Bank, Commerzbank, Sparkasse)
- FR001.2: Simulate OAuth flow with mock credentials (username: demo, password: demo)
- FR001.3: Show loading animation for 2-3 seconds to simulate API call
- FR001.4: Display success message with connected account details

**F002: Cash Flow Visualization**

- FR002.1: Display last 3 months of transaction data in graph format
- FR002.2: Show income (green) vs expenses (red) as stacked bar chart
- FR002.3: Calculate and display average monthly cash flow
- FR002.4: Highlight cash flow patterns (weekly/monthly cycles)

**F003: Instant Credit Decision**

- FR003.1: Calculate creditworthiness based on simple rules:
  - Average monthly income > €2,000: Eligible
  - Cash flow volatility < 40%: Bonus points
  - Positive cash flow 2 of 3 months: Required
- FR003.2: Generate loan offer: 25% of average monthly income (max €2,500)
- FR003.3: Set interest rate: 0.05% daily (fixed for demo)
- FR003.4: Display decision in <2 seconds after analysis

**F004: Loan Offer Display**

- FR004.1: Show loan amount in large, clear text
- FR004.2: Display key terms: amount, daily rate, repayment period
- FR004.3: Include "Why this offer?" explanation based on cash flow
- FR004.4: Provide accept/decline buttons

**F005: Digital Acceptance (Mock)**

- FR005.1: Show terms & conditions (Lorem ipsum fine)
- FR005.2: Display checkbox for consent
- FR005.3: Simulate e-signature with typed name field
- FR005.4: Show success animation upon acceptance

**F006: Success Dashboard**

- FR006.1: Display loan status (Approved, Amount, Next Payment)
- FR006.2: Show simplified repayment schedule
- FR006.3: Include "Share Your Success" social proof element
- FR006.4: Display next steps for the user

**F007: Demo Data Generator**

- FR007.1: Create 3 pre-built personas with realistic transaction data
- FR007.2: Generate random variations for live demos
- FR007.3: Ensure all personas qualify for different loan amounts
- FR007.4: Include edge cases (one rejection scenario)

**F008: Impact Metrics Display**

- FR008.1: Show "Time Saved: 13 days vs traditional bank"
- FR008.2: Display "Businesses Helped: 1,247" (static but impressive)
- FR008.3: Include "Economic Impact: €2.4M enabled" counter
- FR008.4: Add testimonial carousel (3 static testimonials)

### Non-Functional Requirements (Hackathon Adjusted)

**Performance:**

- NFR001: Page load time < 3 seconds (local development)
- NFR002: Credit decision calculation < 2 seconds
- NFR003: Smooth animations (30fps minimum)

**Security (Demo Level):**

- NFR004: HTTPS not required for hackathon
- NFR005: Use localStorage for session management
- NFR006: Mock authentication acceptable

**Scalability (Not Required):**

- NFR007: Support 1 concurrent user (presenter)
- NFR008: In-memory data storage acceptable

**Compliance (Simulated):**

- NFR009: Display GDPR consent checkbox (non-functional)
- NFR010: Show "BaFin regulated" badge (mock)

---

## 3. User Workflows & Journeys

### Primary User Journey: Anna's Loan Application

```
Start
  |
  v
Landing Page (30 sec)
  ├─ View impact metrics
  ├─ Read value proposition
  └─ Click "Get Started"
  |
  v
Bank Connection (45 sec)
  ├─ Select "Sparkasse"
  ├─ Enter demo credentials
  └─ Authorize connection
  |
  v
Cash Flow Analysis (30 sec)
  ├─ View transaction visualization
  ├─ See income/expense patterns
  └─ Click "Get Credit Offer"
  |
  v
Credit Decision (15 sec)
  ├─ View approved amount
  ├─ Understand terms
  └─ Click "Accept Offer"
  |
  v
Digital Acceptance (20 sec)
  ├─ Check consent box
  ├─ Type name for signature
  └─ Click "Finalize"
  |
  v
Success Dashboard (20 sec)
  ├─ View loan details
  ├─ See next steps
  └─ [Demo Complete]
```

**Total Journey Time**: 2.5 minutes (perfect for demo)

### Identified Friction Points & Solutions

1. **Bank Selection Confusion**
   - Solution: Pre-select most common bank
   - Add tooltip explaining this is a demo

2. **Analysis Wait Time**
   - Solution: Use progress bar with explanatory text
   - "Analyzing 847 transactions..."

3. **Terms Understanding**
   - Solution: Use simple language and visuals
   - "You pay back €25 per day for 20 days"

---

## 4. Technical Feasibility & Architecture

### Hackathon Architecture (Simplified Monolith)

```
┌─────────────────┐
│   React SPA     │
│  (Single Page)  │
└────────┬────────┘
         │
         v
┌─────────────────┐
│  Express Server │
│   (Node.js)     │
├─────────────────┤
│ In-Memory Data  │
│ Business Logic  │
│ Mock Services   │
└─────────────────┘
```

### Component Breakdown

**Frontend (React):**

- `App.js` - Main routing and state management
- `BankConnection.js` - OAuth mock component
- `CashFlowChart.js` - Chart.js visualization
- `CreditOffer.js` - Offer display component
- `Dashboard.js` - Success state display

**Backend (Express):**

- `server.js` - Main server file
- `mockData.js` - Pre-built transaction data
- `creditEngine.js` - Simple rule-based logic
- `routes.js` - API endpoints

**Key Technical Decisions:**

1. **No Database**: Use in-memory JavaScript objects
2. **No Real APIs**: Mock all external services
3. **No Authentication**: Simple session ID in localStorage
4. **Chart Library**: Use Chart.js for quick visualizations
5. **CSS Framework**: Use Tailwind for rapid styling

### API Endpoints (Internal)

```
POST /api/connect-bank
  Request: { bank: "sparkasse", credentials: {...} }
  Response: { success: true, accountId: "demo123" }

GET /api/cash-flow/:accountId
  Response: { transactions: [...], summary: {...} }

POST /api/credit-decision
  Request: { accountId: "demo123", cashFlowSummary: {...} }
  Response: { approved: true, amount: 2000, terms: {...} }

POST /api/accept-loan
  Request: { offerId: "offer123", signature: "Anna Schmidt" }
  Response: { loanId: "loan123", status: "active" }
```

---

## 5. Acceptance Criteria (Gherkin Syntax)

### Feature: Bank Account Connection

```gherkin
Scenario: Successful bank connection
  Given I am on the bank selection page
  When I select "Sparkasse" from the dropdown
  And I enter "demo" as username
  And I enter "demo" as password
  And I click "Connect Account"
  Then I should see "Account successfully connected"
  And I should be redirected to cash flow analysis

Scenario: Visual feedback during connection
  Given I have entered valid credentials
  When I click "Connect Account"
  Then I should see a loading spinner
  And I should see "Securely connecting to your bank..."
  And the process should complete within 3 seconds
```

### Feature: Cash Flow Visualization

```gherkin
Scenario: Display transaction analysis
  Given my bank account is connected
  When the cash flow page loads
  Then I should see a bar chart with 3 months of data
  And income bars should be green
  And expense bars should be red
  And I should see "Average Monthly Cash Flow: €1,847"

Scenario: Interactive chart elements
  Given the cash flow chart is displayed
  When I hover over a specific month
  Then I should see a tooltip with exact amounts
  And the tooltip should show "Income: €4,200, Expenses: €2,950"
```

### Feature: Instant Credit Decision

```gherkin
Scenario: Eligible user receives offer
  Given my average monthly income is €4,000
  And my cash flow volatility is 25%
  When I click "Get Credit Offer"
  Then I should see a credit offer within 2 seconds
  And the offered amount should be €1,000
  And the daily rate should be "0.05%"

Scenario: Clear offer presentation
  Given I have received a credit offer
  When the offer is displayed
  Then I should see the amount in large text (48px+)
  And I should see "You're approved for"
  And I should see a breakdown of repayment terms
  And I should see why I qualified
```

### Feature: Demo Data Generator

```gherkin
Scenario: Multiple persona options
  Given I am on the landing page
  When I click "Try Demo"
  Then I should see persona selection options
  And I should see "Anna - Food Truck Owner"
  And I should see "Mehmet - Online Retailer"
  And I should see "Maria - Event Planner"

Scenario: Consistent persona data
  Given I select "Anna - Food Truck Owner"
  When I complete the flow
  Then her data should show weekly income patterns
  And her average income should be €2,100/month
  And she should qualify for a €525 loan
```

---

## 6. Release Strategy & Timeline (8-12 Hour Sprint)

### Hour-by-Hour Development Plan

**Hours 0-2: Foundation Setup**

- Set up React app with routing
- Create Express server skeleton
- Implement mock data structure
- Build basic component shells

**Hours 2-4: Bank Connection Flow**

- Implement bank selection UI
- Create mock OAuth flow
- Add loading states
- Connect to backend endpoints

**Hours 4-6: Core Features**

- Build cash flow visualization
- Implement credit decision engine
- Create offer display component
- Wire up data flow

**Hours 6-8: Polish & Integration**

- Add animations and transitions
- Implement success dashboard
- Create demo data variations
- Style with Tailwind

**Hours 8-10: Testing & Refinement**

- Test complete user journey
- Fix critical bugs
- Optimize performance
- Prepare demo scenarios

**Hours 10-12: Demo Preparation**

- Create landing page with impact metrics
- Add testimonials and social proof
- Practice demo flow
- Prepare backup plans

### Critical Path Items

1. **Must Complete by Hour 6**: Core flow (connect → analyze → offer)
2. **Must Complete by Hour 8**: All visual components
3. **Must Complete by Hour 10**: Bug-free demo flow

---

## 7. Risk Management & Assumptions (RAID Log)

### Risks

| Risk                               | Impact   | Probability | Mitigation                                      | Owner    |
| ---------------------------------- | -------- | ----------- | ----------------------------------------------- | -------- |
| Chart library integration issues   | High     | Medium      | Pre-test Chart.js setup; Have table backup      | Dev1     |
| Styling takes longer than expected | Medium   | High        | Use Tailwind templates; Simplify design         | Designer |
| Demo crashes during presentation   | Critical | Low         | Practice multiple times; Have video backup      | All      |
| Credit logic too complex           | Medium   | Medium      | Start with simple rules; Add complexity if time | Dev2     |

### Assumptions

| Assumption                          | Validation          | Impact if False           |
| ----------------------------------- | ------------------- | ------------------------- |
| Team familiar with React/Node       | Pre-hackathon check | Switch to vanilla JS      |
| Chart.js works with our data format | Hour 1 spike        | Use simple CSS bars       |
| 8-12 hours is sufficient            | Hourly checkpoints  | Cut features per priority |
| Demo environment is stable          | Test setup early    | Run locally instead       |

### Issues

| Issue                    | Severity | Resolution               |
| ------------------------ | -------- | ------------------------ |
| No real bank API access  | Low      | Use mock data as planned |
| Limited time for testing | Medium   | Focus on happy path only |

### Dependencies

| Dependency        | Required By | Status       | Fallback   |
| ----------------- | ----------- | ------------ | ---------- |
| React setup       | Hour 1      | Must have    | Vanilla JS |
| Chart.js CDN      | Hour 4      | Should have  | CSS charts |
| Tailwind CDN      | Hour 6      | Nice to have | Basic CSS  |
| Team availability | All hours   | Must have    | None       |

---

## Appendix: Quick Start Checklist

### Pre-Hackathon Setup (Do Now)

- [ ] Install Node.js, npm, Git
- [ ] Create React app template
- [ ] Set up GitHub repository
- [ ] Test Chart.js in sandbox
- [ ] Prepare demo transaction data

### Hour 0 Checklist

- [ ] All team members connected
- [ ] Development environment ready
- [ ] Roles clearly assigned
- [ ] Communication channel established
- [ ] Timer started

### Demo Day Checklist

- [ ] Demo tested 3+ times
- [ ] Backup video recorded
- [ ] All personas data verified
- [ ] Presentation mode ready
- [ ] Team roles for demo defined

This PRD provides a realistic, achievable specification for building CashFlow Bridge MVP in 8-12 hours, with clear priorities and fallback options for hackathon success.
