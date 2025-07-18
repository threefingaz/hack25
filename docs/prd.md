# Product Requirements Document: CashFlow Bridge MVP

**Hackathon Version - 8-12 Hour Development Sprint**

Version 2.0 | Date: January 2025 | Status: Hackathon MVP - Competitive Positioning Update

---

## Executive Summary

This PRD defines the minimal viable product for CashFlow Bridge to be built during an 8-12 hour hackathon sprint. Based on competitive analysis revealing a **69% underserved micro-business segment** and **0% market coverage for weekly credit cycles**, we're repositioning as the first specialized weekly micro-credit solution for German cash-flow businesses.

**Core Value Proposition**: Weekly credit lines (€500-€5K) approved in 2 minutes for food trucks, market vendors, and seasonal businesses - addressing the gap left by competitors like Silvr (€5K+ loans) and iwoca (monthly terms).

**Core Demo Flow**: Max (Berlin food truck owner) connects his bank → System recognizes weekly cash patterns → €800 weekly credit line approved in 2 minutes → Digital acceptance → Weekly credit dashboard activated

---

## 1. Feature Definition & Prioritization (Kano Model)

### Feature Breakdown for 8-12 Hour Sprint

| Feature ID | Feature Name                    | Kano Category | Build vs Mock        | Time Estimate |
| ---------- | ------------------------------- | ------------- | -------------------- | ------------- |
| F001       | Bank Account Connection         | Basic         | Mock UI, Real OAuth  | 2 hours       |
| F002       | Weekly Cash Flow Pattern Viz    | Performance   | Build                | 2 hours       |
| F003       | 2-Minute Credit Decision        | Basic         | Build (Pattern Rules)| 2 hours       |
| F004       | Weekly Credit Line Display      | Basic         | Build                | 1 hour        |
| F005       | Digital Acceptance              | Basic         | Mock                 | 0.5 hours     |
| F006       | Weekly Credit Dashboard         | Excitement    | Build                | 1.5 hours     |
| F007       | Micro-Business Data Generator   | Excitement    | Build                | 1 hour        |
| F008       | Competitive Advantage Display   | Excitement    | Build                | 1 hour        |
| F009       | Mobile-First Design             | Performance   | Partial              | 1 hour        |
| F010       | Smart Rejection Referral Flow   | Excitement    | Build                | 0.5 hours     |

**Total Estimated Time**: 12.5 hours (allows for integration and debugging)

### Kano Analysis Rationale

**Basic (Must-Have for Demo):**

- Bank connection, 2-minute credit decision, and weekly credit line are essential to demonstrate our unique value vs Silvr/iwoca
- Without these, we can't show our competitive advantage

**Performance (Linear Satisfaction):**

- Weekly pattern visualization and mobile design directly address micro-business needs
- Differentiates us from enterprise-focused competitors

**Excitement (Delighters):**

- Weekly credit dashboard shows what NO competitor offers
- Competitive advantage metrics highlight our blue ocean opportunity
- Smart rejection referrals show industry leadership and generate goodwill

---

## 2. Functional & Non-Functional Requirements

### Functional Requirements by Feature

**F001: Bank Account Connection**

- FR001.1: Display bank selection screen with 3 German banks (Deutsche Bank, Commerzbank, Sparkasse)
- FR001.2: Simulate OAuth flow with mock credentials (username: demo, password: demo)
- FR001.3: Show loading animation for 2-3 seconds to simulate API call
- FR001.4: Display success message with connected account details

**F002: Weekly Cash Flow Pattern Visualization**

- FR002.1: Display last 12 weeks of transaction data with weekly grouping
- FR002.2: Show weekly revenue patterns with peak days highlighted (Fri-Sun for food trucks)
- FR002.3: Calculate and display average weekly cash flow with volatility indicator
- FR002.4: Highlight weekly business cycles with pattern recognition (e.g., "Strong weekend sales detected")

**F003: 2-Minute Credit Decision**

- FR003.1: Calculate creditworthiness based on weekly patterns:
  - Average weekly revenue > €500: Eligible
  - Weekly pattern consistency > 60%: Bonus points
  - Positive weekly cash flow 8 of 12 weeks: Required
- FR003.2: Generate weekly credit line: 30% of average weekly revenue (€500-€5,000 range)
- FR003.3: Set daily rate: 0.1% (higher than monthly competitors but justified by flexibility)
- FR003.4: Display decision in <2 seconds with "2 minutes vs 13 days" comparison

**F004: Weekly Credit Line Display**

- FR004.1: Show weekly credit line amount with "renews every Monday" messaging
- FR004.2: Display flexible terms: weekly amount, daily deduction from revenue, no fixed term
- FR004.3: Include "Perfect for your business" with weekly pattern insights
- FR004.4: Show competitor comparison: "Silvr: €5K minimum, iwoca: Monthly terms only"

**F005: Digital Acceptance (Mock)**

- FR005.1: Show terms & conditions (Lorem ipsum fine)
- FR005.2: Display checkbox for consent
- FR005.3: Simulate e-signature with typed name field
- FR005.4: Show success animation upon acceptance

**F006: Weekly Credit Dashboard**

- FR006.1: Display current week's available credit and usage
- FR006.2: Show next 4 weeks forecast based on seasonal patterns
- FR006.3: Include daily revenue tracker with automatic repayment visualization
- FR006.4: Add "Weather Impact" indicator for outdoor businesses (mock)

**F007: Micro-Business Data Generator**

- FR007.1: Create 3 cash-flow business personas:
  - Max: Berlin food truck (€2,800/week, strong Fri-Sun)
  - Ayşe: Munich Christmas market vendor (€4,200/week, seasonal peaks)
  - Carlos: Hamburg festival caterer (€1,500/week, event-based)
- FR007.2: Generate realistic weekly patterns with weather impact
- FR007.3: Ensure personas qualify for €800, €1,200, and €500 weekly lines
- FR007.4: Include rejection personas:
  - Thomas: Traditional retailer (monthly patterns → iwoca referral)
  - Stefan: Restaurant owner (needs €15K → Silvr referral)

**F008: Competitive Advantage Display**

- FR008.1: Show "2 minutes vs 13 days (banks) vs 2 days (iwoca)"
- FR008.2: Display "46% of German micro-businesses underserved"
- FR008.3: Include "First weekly credit solution in Germany" badge
- FR008.4: Add competitor comparison table showing our unique position

**F010: Smart Rejection Referral Flow**

- FR010.1: Detect rejection reason (loan size too large, monthly patterns, etc.)
- FR010.2: Match to appropriate competitor:
  - Large loans (>€5K): Refer to Silvr or Teylor
  - Monthly patterns: Refer to iwoca or Funding Circle
  - Traditional retail: Refer to auxmoney
- FR010.3: Display personalized message: "While weekly credit isn't right for you, our partner [Competitor] specializes in your business type"
- FR010.4: Show referral links with tracking codes (mock for demo)

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

### Primary User Journey: Max's Weekly Credit Line Application

```
Start
  |
  v
Landing Page (30 sec)
  ├─ View "First Weekly Credit in Germany"
  ├─ See competitor comparison
  └─ Select "Max - Berlin Food Truck"
  |
  v
Bank Connection (45 sec)
  ├─ Select "Sparkasse"
  ├─ Enter demo credentials
  └─ Authorize connection
  |
  v
Weekly Pattern Analysis (30 sec)
  ├─ View 12-week revenue patterns
  ├─ See "Strong weekend sales" insight
  └─ Click "Get Weekly Credit Line"
  |
  v
2-Minute Decision (15 sec)
  ├─ View €800/week credit line
  ├─ See "Renews every Monday"
  └─ Click "Activate Credit Line"
  |
  v
Digital Acceptance (20 sec)
  ├─ Check consent box
  ├─ Type name for signature
  └─ Click "Start Using Today"
  |
  v
Weekly Credit Dashboard (20 sec)
  ├─ View current week availability
  ├─ See 4-week forecast
  └─ [Demo Complete]
```

**Total Journey Time**: 2.5 minutes (perfect for demo)

### Alternative Journey: Traditional Retailer Rejection

```
Start → Select "Thomas - Traditional Retailer" → Bank Connection
  |
  v
Monthly Pattern Analysis
  ├─ View steady monthly patterns
  └─ Click "Get Weekly Credit Line"
  |
  v
Rejection with Smart Referral (30 sec)
  ├─ "Your business has monthly patterns"
  ├─ "Perfect for iwoca's flexible terms"
  └─ Show referral link with benefits
  |
  v
Referral Tracking
  └─ [Positive exit experience]
```

### Identified Friction Points & Solutions

1. **Bank Selection Confusion**
   - Solution: Pre-select Sparkasse (most common for micro-businesses)
   - Add "Works with all German banks" reassurance

2. **Weekly Pattern Recognition**
   - Solution: Highlight patterns visually with weekend peaks
   - "Analyzing your Friday-Sunday revenue spikes..."

3. **Weekly vs Monthly Understanding**
   - Solution: Clear comparison graphics
   - "€800 available every Monday vs €3,200 locked for a month"

4. **Rejection Disappointment**
   - Solution: Positive referral messaging
   - "We found the perfect lender for your business type!"

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
- `weeklyMockData.js` - Weekly pattern transaction data
- `weeklyCredItEngine.js` - Pattern recognition logic
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
  Response: { success: true, accountId: "demo123", businessType: "food_truck" }

GET /api/weekly-patterns/:accountId
  Response: { weeklyData: [...], patterns: { peakDays: ["Fri", "Sat", "Sun"], avgWeekly: 2800 } }

POST /api/weekly-credit-decision
  Request: { accountId: "demo123", weeklyPatterns: {...} }
  Response: { approved: true, weeklyAmount: 800, renewalDay: "Monday", competitors: {...} }

POST /api/activate-credit-line
  Request: { creditLineId: "weekly123", signature: "Max Mueller" }
  Response: { creditLineId: "weekly123", status: "active", dashboard: {...} }

POST /api/rejection-referral
  Request: { accountId: "demo123", rejectionReason: "monthly_patterns" }
  Response: { 
    referralPartner: "iwoca", 
    message: "Perfect for monthly cash flows",
    referralUrl: "https://iwoca.de?ref=cashflowbridge&code=CB2025",
    alternativePartners: ["Funding Circle", "auxmoney"]
  }
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

### Feature: Weekly Pattern Visualization

```gherkin
Scenario: Display weekly pattern analysis
  Given my bank account is connected as a food truck
  When the weekly pattern page loads
  Then I should see a line chart with 12 weeks of data
  And Friday-Sunday peaks should be highlighted
  And weekday valleys should be visible
  And I should see "Average Weekly Revenue: €2,800"

Scenario: Pattern recognition display
  Given the weekly pattern chart is displayed
  When I view the pattern insights
  Then I should see "Strong weekend business detected"
  And I should see "78% of revenue from Fri-Sun"
  And I should see "Weather impact: -15% on rainy days"
```

### Feature: 2-Minute Weekly Credit Decision

```gherkin
Scenario: Food truck receives weekly credit line
  Given my average weekly revenue is €2,800
  And my weekend pattern consistency is 78%
  When I click "Get Weekly Credit Line"
  Then I should see approval within 2 seconds
  And the weekly credit line should be €800
  And I should see "Approved in 2 minutes vs 13 days at banks"

Scenario: Competitive advantage display
  Given I have received a weekly credit approval
  When the offer is displayed
  Then I should see "€800 available every Monday"
  And I should see competitor comparison table
  And I should see "Only weekly credit in Germany"
  And I should see automatic repayment visualization
```

### Feature: Micro-Business Persona Selection

```gherkin
Scenario: Cash-flow business persona options
  Given I am on the landing page
  When I view the demo options
  Then I should see persona cards
  And I should see "Max - Berlin Food Truck (Fri-Sun peaks)"
  And I should see "Ayşe - Munich Market Vendor (Seasonal)"
  And I should see "Carlos - Hamburg Caterer (Event-based)"

Scenario: Weekly pattern persona data
  Given I select "Max - Berlin Food Truck"
  When I complete the flow
  Then his data should show strong weekend peaks
  And his average weekly revenue should be €2,800
  And he should qualify for €800 weekly credit line
```

### Feature: Smart Rejection Referral

```gherkin
Scenario: Traditional retailer gets helpful referral
  Given I select "Thomas - Traditional Retailer"
  And his data shows steady monthly patterns
  When the credit decision is made
  Then I should see "Your business fits better with monthly credit"
  And I should see "iwoca specializes in businesses like yours"
  And I should see a referral link with tracking code
  And I should see 2-3 alternative lender options

Scenario: Large loan request gets appropriate referral
  Given a user requests more than €5,000
  When they are rejected for exceeding our limits
  Then they should see "For loans over €5K, we recommend Silvr"
  And they should see benefits of Silvr for larger amounts
  And the referral should include our partner code
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

- Build weekly pattern visualization
- Implement weekly credit decision engine
- Create competitive comparison display
- Wire up data flow

**Hours 6-8: Polish & Integration**

- Add animations and transitions
- Implement weekly credit dashboard
- Create micro-business personas
- Style with mobile-first Tailwind

**Hours 8-10: Testing & Refinement**

- Test complete user journey
- Fix critical bugs
- Optimize performance
- Prepare demo scenarios

**Hours 10-12: Demo Preparation**

- Create landing page with competitive positioning
- Add "First in Germany" messaging
- Practice micro-business demo flow
- Prepare competitor comparison slides

### Critical Path Items

1. **Must Complete by Hour 6**: Weekly pattern recognition → 2-minute decision
2. **Must Complete by Hour 8**: Competitive positioning visuals
3. **Must Complete by Hour 10**: Micro-business persona demos

---

## 7. Risk Management & Assumptions (RAID Log)

### Risks

| Risk                               | Impact   | Probability | Mitigation                                      | Owner    |
| ---------------------------------- | -------- | ----------- | ----------------------------------------------- | -------- |
| Weekly pattern viz complexity      | High     | Medium      | Pre-build sample patterns; Simplify to line chart| Dev1     |
| Mobile responsiveness issues       | Medium   | High        | Test on phones early; Focus on key screens only  | Designer |
| Demo crashes during presentation   | Critical | Low         | Practice multiple times; Have video backup      | All      |
| Competitive messaging unclear      | High     | Medium      | Create clear comparison table; Test with audience| Dev2     |

### Assumptions

| Assumption                          | Validation          | Impact if False           |
| ----------------------------------- | ------------------- | ------------------------- |
| Audience understands weekly credit  | Test pitch early    | Add more education slides |
| Chart.js handles weekly grouping    | Hour 1 spike        | Pre-aggregate data        |
| Mobile demo works on stage          | Test presenter phone| Use laptop for demo       |
| Competitive angle resonates         | Practice with jury  | Focus on speed benefit    |

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
- [ ] Test Chart.js weekly grouping
- [ ] Prepare micro-business transaction patterns

### Hour 0 Checklist

- [ ] All team members connected
- [ ] Development environment ready
- [ ] Roles clearly assigned
- [ ] Communication channel established
- [ ] Timer started

### Demo Day Checklist

- [ ] Demo tested 3+ times
- [ ] Competitive slides ready
- [ ] All micro-business personas verified
- [ ] Mobile demo tested
- [ ] "First in Germany" messaging clear

This PRD positions CashFlow Bridge as the first weekly micro-credit solution in Germany, targeting the 69% underserved micro-business segment with a unique offering that competitors like Silvr (€5K+ minimum) and iwoca (monthly terms only) don't address.
