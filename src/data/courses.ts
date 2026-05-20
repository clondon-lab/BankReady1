export interface Lesson {
  id: string;
  title: string;
  duration: string;
  content: string;
  keyTakeaways: string[];
}

export interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  sections: Section[];
}

export const courses: Course[] = [
  {
    id: 'accounting',
    title: 'Accounting Fundamentals',
    description: 'Master the three financial statements and the accounting concepts critical for IB interviews.',
    icon: '📊',
    color: 'blue',
    level: 'Beginner',
    duration: '3-4 hours',
    sections: [
      {
        id: 'acc-s1',
        title: 'The Three Financial Statements',
        lessons: [
          {
            id: 'acc-l1',
            title: 'The Income Statement',
            duration: '15 min',
            content: `## The Income Statement

The Income Statement (also called P&L — Profit & Loss) shows a company's **revenues and expenses over a period of time** (a quarter or year). It answers: "How profitable is this company?"

### Structure (Top to Bottom)

**Revenue** (also: Net Sales, Top Line)
- Total money earned from selling products/services

**Cost of Goods Sold (COGS)**
- Direct costs to produce what's sold (materials, direct labor)

**Gross Profit** = Revenue - COGS
- Gross Margin = Gross Profit / Revenue

**Operating Expenses**
- SG&A (Sales, General & Administrative)
- R&D (Research & Development)
- Depreciation & Amortization (D&A)

**EBIT** (Operating Income) = Gross Profit - Operating Expenses
- "Earnings Before Interest and Taxes"

**Interest Expense** (non-operating)

**EBT** = EBIT - Interest Expense
- "Earnings Before Taxes"

**Income Taxes** = EBT × Tax Rate

**Net Income** = EBT - Taxes
- "The Bottom Line"

### Key Metrics
- **EBITDA** = EBIT + D&A (most common IB metric)
- **EPS** = Net Income / Diluted Shares Outstanding

### IB Interview Tip
"Walk me through the income statement" is a fundamental question. Know the flow from Revenue → COGS → Gross Profit → EBIT → EBT → Net Income cold.`,
            keyTakeaways: [
              'Income Statement covers a period of time (quarter/year)',
              'Revenue → COGS → Gross Profit → EBIT → EBT → Net Income',
              'EBITDA = EBIT + D&A (key IB metric)',
              'D&A is a non-cash operating expense',
              'Net Income flows into Retained Earnings on the Balance Sheet'
            ]
          },
          {
            id: 'acc-l2',
            title: 'The Balance Sheet',
            duration: '15 min',
            content: `## The Balance Sheet

The Balance Sheet is a **snapshot at a point in time** showing what a company owns (Assets) and how it's financed (Liabilities + Equity).

### The Fundamental Equation
**Assets = Liabilities + Shareholders' Equity**

This ALWAYS holds. Every transaction must keep the balance sheet balanced.

### Assets (Left Side)
**Current Assets** (convertible to cash within 1 year)
- Cash & Cash Equivalents
- Accounts Receivable (AR) — owed by customers
- Inventory
- Prepaid Expenses

**Non-Current Assets**
- Property, Plant & Equipment (PP&E) — net of depreciation
- Intangible Assets (brand, patents)
- Goodwill (from acquisitions)
- Equity Investments

### Liabilities (Right Side, Top)
**Current Liabilities** (due within 1 year)
- Accounts Payable (AP) — owed to suppliers
- Accrued Expenses
- Current Portion of Long-Term Debt
- Deferred Revenue

**Non-Current Liabilities**
- Long-Term Debt
- Deferred Tax Liabilities

### Shareholders' Equity (Right Side, Bottom)
- Common Stock + Additional Paid-In Capital
- Retained Earnings (cumulative past net income)
- Treasury Stock (buybacks, negative)
- Other Comprehensive Income (OCI)

### IB Insight
Retained Earnings = Prior Retained Earnings + Net Income - Dividends

This is the primary link from the Income Statement to the Balance Sheet.`,
            keyTakeaways: [
              'Balance Sheet is a snapshot at a point in time',
              'Assets = Liabilities + Equity (always)',
              'Current = due/convertible within 1 year',
              'Retained Earnings links to Income Statement',
              'Goodwill appears only after an acquisition'
            ]
          },
          {
            id: 'acc-l3',
            title: 'The Cash Flow Statement',
            duration: '20 min',
            content: `## The Cash Flow Statement

The CFS reconciles **Net Income to actual cash**. Companies can be profitable on paper but cash-poor (accrual accounting). The CFS tells the real cash story.

### Three Sections

**Operating Activities (CFO)**
Starts with Net Income, then adds back:
- (+) Depreciation & Amortization (non-cash expense)
- (+/-) Changes in Working Capital:
  - ↑AR → use of cash (negative)
  - ↑Inventory → use of cash (negative)
  - ↑AP → source of cash (positive)
- Other non-cash items (stock comp, deferred taxes)

**Investing Activities (CFI)**
- Capital Expenditures / CapEx (negative — cash out)
- Acquisitions (negative)
- Asset sales (positive)
- Purchase/sale of investments

**Financing Activities (CFF)**
- Debt borrowings (positive)
- Debt repayments (negative)
- Equity issuances (positive)
- Dividends paid (negative)
- Share buybacks (negative)

### Key Formula
**Free Cash Flow = CFO - CapEx**

Or from scratch:
**UFCF = EBIT(1-t) + D&A - CapEx - ΔNWC**

### The Links
- CFS starts with Net Income (from IS)
- Ending Cash = Beginning Cash + Net Change in Cash
- Ending Cash flows to the Balance Sheet Cash line`,
            keyTakeaways: [
              'CFS reconciles Net Income to actual cash',
              'D&A added back (non-cash charge)',
              'Working capital changes affect CFO',
              'CapEx is in Investing Activities (negative)',
              'Free Cash Flow = CFO - CapEx'
            ]
          }
        ]
      },
      {
        id: 'acc-s2',
        title: 'Statement Linkages',
        lessons: [
          {
            id: 'acc-l4',
            title: 'How the 3 Statements Link',
            duration: '20 min',
            content: `## How the Three Statements Link Together

This is one of the **most common IB interview questions**. Understanding these links shows you think like a financial analyst.

### The Flow

**Income Statement → Cash Flow Statement**
Net Income is the **first line** of the Operating Activities section of the CFS. Every adjustment on the CFS starts from this Net Income figure.

**Income Statement → Balance Sheet**
Net Income increases **Retained Earnings** (a component of Equity):
> Ending Retained Earnings = Beginning RE + Net Income - Dividends

**Cash Flow Statement → Balance Sheet**
The **ending cash balance** from the CFS flows directly to the Cash line on the Balance Sheet.

**D&A Link**
- D&A appears as an **expense** on the Income Statement (reducing Net Income)
- D&A is **added back** on the CFS (non-cash charge)
- Accumulated D&A **reduces PP&E** on the Balance Sheet

### Classic Interview Example
**"Depreciation increases by $10. Tax rate 40%. Walk me through the impact."**

**IS:** D&A ↑$10 → EBIT ↓$10 → EBT ↓$10 → Taxes ↓$4 → Net Income ↓$6
**BS:** PP&E ↓$10, Retained Earnings ↓$6, Cash (tax savings) ↑$4
**CFS:** Net Income ↓$6, D&A add-back ↑$10 → CFO ↑$4

The balance sheet balances:
- Assets: PP&E -$10, Cash +$4 = Net -$6
- Equity: Retained Earnings -$6 ✓`,
            keyTakeaways: [
              'Net Income → starts CFS and flows to Retained Earnings on BS',
              'Ending cash on CFS = Cash on Balance Sheet',
              'D&A: expense on IS, add-back on CFS, reduces PP&E on BS',
              'Balance sheet must always balance after any change',
              'Practice the $10 depreciation walkthrough cold'
            ]
          }
        ]
      },
      {
        id: 'acc-s3',
        title: 'Key Metrics & Ratios',
        lessons: [
          {
            id: 'acc-l5',
            title: 'Essential Financial Ratios',
            duration: '20 min',
            content: `## Essential Financial Ratios for IB

### Leverage Ratios
**Net Debt / EBITDA** — Most commonly used by bankers
- Net Debt = Total Debt - Cash
- < 2x: Conservative leverage
- 4-6x: Typical LBO target

**Debt / Equity** — Balance sheet leverage

### Coverage Ratios
**EBITDA / Interest Expense** (Interest Coverage)
- > 2-3x generally considered safe
- Lenders care about this

### Profitability Ratios
**Gross Margin** = Gross Profit / Revenue
**EBITDA Margin** = EBITDA / Revenue (most watched in banking)
**Net Margin** = Net Income / Revenue

**ROE** = Net Income / Equity (return to shareholders)
**ROIC** = NOPAT / Invested Capital
- If ROIC > WACC → company creates value

### Liquidity Ratios
**Current Ratio** = Current Assets / Current Liabilities
**Quick Ratio** = (Current Assets - Inventory) / Current Liabilities
- > 1.0 generally preferred

### Efficiency Ratios (Working Capital Cycle)
**DSO** = AR / Revenue × 365 (Days Sales Outstanding)
**DIO** = Inventory / COGS × 365 (Days Inventory Outstanding)
**DPO** = AP / COGS × 365 (Days Payable Outstanding)
**CCC** = DSO + DIO - DPO (Cash Conversion Cycle)
- Lower CCC = better working capital management`,
            keyTakeaways: [
              'Net Debt/EBITDA is the primary leverage metric in banking',
              'EBITDA margin most commonly watched for comparisons',
              'ROIC > WACC means the company creates shareholder value',
              'Working capital cycle: DSO + DIO - DPO = CCC',
              'Know at least 2-3 ratios per category'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'valuation',
    title: 'Valuation Methodologies',
    description: 'Learn the core valuation frameworks used in every IB deal: comps, precedents, and DCF.',
    icon: '💰',
    color: 'green',
    level: 'Intermediate',
    duration: '4-5 hours',
    sections: [
      {
        id: 'val-s1',
        title: 'Comparable Company Analysis',
        lessons: [
          {
            id: 'val-l1',
            title: 'Building a Trading Comps',
            duration: '25 min',
            content: `## Comparable Company Analysis (Trading Comps)

Comps value a company by comparing it to **similar publicly traded companies**. It answers: "At what multiple do comparable companies trade?"

### Step-by-Step Process

**Step 1: Peer Selection**
Select companies with similar:
- Business model and industry (most important)
- Revenue size (within 0.5x-2x)
- Growth profile (similar organic growth)
- Geographic exposure
- Margin profile

**Step 2: Spread Financials**
Pull LTM and forward (NTM) data:
- Revenue
- Gross Profit / Gross Margin
- EBITDA / EBITDA Margin
- EBIT
- Net Income / EPS

**Step 3: Calculate Enterprise Value**
EV = Market Cap + Net Debt + Preferred Stock + Minority Interest

**Step 4: Calculate Multiples**
- EV / Revenue
- EV / EBITDA (most common)
- EV / EBIT
- P / E (equity value multiple)

**Step 5: Apply to Target**
Use median or 25th-75th percentile range.
Apply to target's LTM or NTM metrics.

### LTM vs. NTM
- **LTM:** Most recent 12 months (backward-looking, actual)
- **NTM:** Next 12 months (forward-looking, estimated)
- NTM often preferred for high-growth companies

### Bankers' Perspective
Comps represent **minority, liquid market value** — what you'd pay for a small stake, with immediate liquidity.`,
            keyTakeaways: [
              'Select 5-10 companies with similar business model and financials',
              'EV = Market Cap + Net Debt + Preferred + Minority Interest',
              'Key multiples: EV/EBITDA, EV/Revenue, P/E',
              'LTM = most current; NTM = forward-looking',
              'Use median of peers to apply to target'
            ]
          }
        ]
      },
      {
        id: 'val-s2',
        title: 'Precedent Transactions',
        lessons: [
          {
            id: 'val-l2',
            title: 'Precedent Transaction Analysis',
            duration: '20 min',
            content: `## Precedent Transaction Analysis

Precedent transactions value a company using **multiples paid in past M&A deals** for comparable companies.

### Why Precedents vs. Comps?

**Precedents include:**
- Control premium (20-40% above trading price)
- Strategic/synergy value
- Deal-specific dynamics

**Result:** Precedent multiples are almost always **higher** than trading comps.

### Finding Deals
Sources: Bloomberg, CapIQ, Mergermarket, SEC filings (8-K, S-4), press releases

Filter for:
- Same industry/sector
- Reasonable time frame (last 5-10 years, but prioritize recent)
- Similar size
- Public targets (announced deal value available)

### Key Multiples
- EV / LTM EBITDA (unaffected)
- EV / NTM EBITDA
- EV / Revenue
- Price / EPS (for financial sector)

### The "Unaffected" Price
When calculating EV for precedents:
- Use share price **before deal announcement** (unaffected price)
- Or use deal price (includes the control premium)
- Calculate premium to unaffected price: (deal price / unaffected - 1)

### Limitations
- Each deal has unique circumstances (synergies, competition, leverage)
- Historical deals may reflect different market conditions
- Fewer data points than trading comps
- Hard to find truly comparable deals`,
            keyTakeaways: [
              'Precedents > Comps because of control premium',
              'Control premium typically 20-40%',
              'Use unaffected share price (before announcement)',
              'Fewer data points than comps — each deal is unique',
              'Best for M&A sell-side mandates'
            ]
          }
        ]
      },
      {
        id: 'val-s3',
        title: 'DCF Analysis',
        lessons: [
          {
            id: 'val-l3',
            title: 'DCF Step-by-Step',
            duration: '30 min',
            content: `## Discounted Cash Flow (DCF) Analysis

A DCF values a company based on the **present value of future free cash flows**. It's theoretically rigorous and internally consistent.

### The 5 Steps

**Step 1: Project Free Cash Flows (5-10 years)**

UFCF = EBIT × (1 - Tax Rate) + D&A - CapEx - ΔNWC

Build assumptions from top:
Revenue → EBITDA Margin → EBITDA → D&A → EBIT → NOPAT → FCF

**Step 2: Calculate Terminal Value**

*Gordon Growth Model:*
TV = FCFn+1 / (WACC - g)
- g = 2-3% (roughly GDP growth)

*Exit Multiple Method:*
TV = EBITDAn × EV/EBITDA multiple
(Preferred in banking — more intuitive)

**Step 3: Calculate WACC**

WACC = (E/V)×Re + (D/V)×Rd×(1-T)
- Re from CAPM: Rf + β(Rm-Rf)
- Rf = 10-yr Treasury (~4-5%)
- ERP = 5-6%

**Step 4: Discount to Present Value**

PV of FCFs = Σ FCFt / (1+WACC)^t
PV of TV = TV / (1+WACC)^n

**Step 5: Calculate Equity Value**

Enterprise Value = PV(FCFs) + PV(TV)
Equity Value = EV - Net Debt - Preferred - Minority Interest
Share Price = Equity Value / Diluted Shares

### Sensitivity Analysis
Always build a sensitivity table:
- WACC vs. Terminal Growth Rate (or Exit Multiple)
- Shows how value changes with assumptions`,
            keyTakeaways: [
              'UFCF = EBIT(1-t) + D&A - CapEx - ΔNWC',
              'Terminal Value = 60-80% of total DCF value',
              'Exit Multiple method preferred in banking',
              'WACC from CAPM and capital structure weights',
              'Always run sensitivity analysis on key assumptions'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'ma',
    title: 'M&A Fundamentals',
    description: 'Understand deal structure, accretion/dilution, synergies, and the M&A process from end to end.',
    icon: '🤝',
    color: 'purple',
    level: 'Intermediate',
    duration: '3-4 hours',
    sections: [
      {
        id: 'ma-s1',
        title: 'Deal Structure & Process',
        lessons: [
          {
            id: 'ma-l1',
            title: 'The M&A Process',
            duration: '20 min',
            content: `## The M&A Process

### Buy-Side vs. Sell-Side

**Sell-Side (representing the seller)**
You run an auction to maximize price.

**Buy-Side (representing the buyer)**
You advise on strategy, valuation, and negotiations.

### The Sell-Side Process

**Phase 1: Preparation (4-8 weeks)**
- Agree on deal strategy with client
- Prepare Confidential Information Memorandum (CIM)
- Build financial model and valuation
- Identify potential buyers (strategic + financial sponsors)
- Prepare management presentations

**Phase 2: Marketing (4-6 weeks)**
- Send teasers (anonymous, no company name)
- Execute NDAs with interested parties
- Distribute CIM
- Set up virtual data room (VDR)

**Phase 3: First Round (2-3 weeks)**
- Receive Indications of Interest (IOIs)
- Select shortlist (usually 3-6 parties)

**Phase 4: Second Round (4-6 weeks)**
- Management presentations
- Site visits
- Q&A sessions / data room access
- Receive Binding Bids

**Phase 5: Negotiate & Sign**
- Select winner, negotiate terms
- Sign Letter of Intent (LOI) / Definitive Agreement (SPA)

**Phase 6: Close (1-3 months)**
- Regulatory approvals (HSR, antitrust)
- Shareholder vote (if public target)
- Integration planning

### Total Timeline: ~6-9 months`,
            keyTakeaways: [
              'CIM is the main marketing document for sell-side deals',
              'Two rounds of bids: IOIs then binding bids',
              'NDA required before sharing confidential info',
              'Regulatory approval (antitrust) is post-signing',
              'Total process: 6-9 months typically'
            ]
          }
        ]
      },
      {
        id: 'ma-s2',
        title: 'Merger Model & Accretion/Dilution',
        lessons: [
          {
            id: 'ma-l2',
            title: 'Accretion/Dilution Analysis',
            duration: '25 min',
            content: `## Accretion / Dilution Analysis

### The Core Question
"Does the acquisition increase or decrease the acquirer's EPS?"

- **Accretive**: Pro forma EPS > Acquirer standalone EPS
- **Dilutive**: Pro forma EPS < Acquirer standalone EPS
- **Breakeven**: No change in EPS

### The Basic Framework

**Pro Forma Combined Net Income:**
= Acquirer NI
+ Target NI
+ After-tax Synergies
− After-tax Incremental Interest (if cash deal)
− After-tax Amortization of Acquired Intangibles

**Pro Forma Share Count:**
= Acquirer shares + New shares issued to target (if stock deal)

**Pro Forma EPS = Pro Forma NI / Pro Forma Shares**

### Key Rule of Thumb (Stock Deals)
If Acquirer P/E > Target P/E (at acquisition price) → Accretive
If Acquirer P/E < Target P/E (at acquisition price) → Dilutive

### Why?
In a stock deal, the acquirer's EPS pickup (target earnings / new shares issued) depends on:
- How much target earnings you get (target NI)
- How many shares you issue (based on deal value / acquirer stock price)
- Lower acquisition P/E = cheaper earnings = accretive

### Cash Deal Logic
All-cash funded by debt: adds interest expense but no share count increase.
Accretive if: Target earnings > After-tax interest cost
(i.e., NI you gain > NI you lose to interest)`,
            keyTakeaways: [
              'Accretive: pro forma EPS > standalone acquirer EPS',
              'Stock deal: accretive if Acquirer P/E > Target P/E',
              'Cash deal: accretive if target earnings > after-tax interest cost',
              'Synergies drive accretion; acquisition premium fights it',
              'Intangibles amortization (D&A of write-ups) reduces pro forma NI'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'lbo',
    title: 'LBO Analysis',
    description: 'Master leveraged buyout mechanics, returns analysis, and what private equity firms look for.',
    icon: '📈',
    color: 'yellow',
    level: 'Advanced',
    duration: '4-5 hours',
    sections: [
      {
        id: 'lbo-s1',
        title: 'LBO Fundamentals',
        lessons: [
          {
            id: 'lbo-l1',
            title: 'LBO Overview & Logic',
            duration: '20 min',
            content: `## Leveraged Buyout (LBO) Overview

### What is an LBO?
An LBO is an acquisition of a company using a **significant amount of debt** (typically 60-70% of the purchase price), with the **target's own assets and cash flows** used as collateral and to repay debt.

### Typical Capital Structure
- **Senior Secured Debt** (Term Loan B): 3-4x EBITDA
- **High Yield Bonds**: 1-2x EBITDA
- **Mezzanine/Subordinated**: 0-1x EBITDA
- **Equity (PE Fund)**: 30-40% of total

### Why Use Leverage?

**1. Return Amplification**
- Without leverage: invest $1,000, sell for $1,400 → 1.4x / 40% return
- With 60% debt: invest $400 equity, company worth $1,400, repay $600 debt → $800 equity → 2.0x / 100% return

**2. Interest Tax Shield**
Interest is tax-deductible → reduces company's tax burden → increases free cash flow

**3. Management Discipline**
Heavy debt forces management to focus on cash generation. No room for inefficiency.

### How PE Makes Money
Entry: Buy company at $500M (5x $100M EBITDA), funded $350M debt + $150M equity

Years 1-5:
- Company EBITDA grows to $150M
- Debt paid down from $350M to $200M

Exit: Sell at 7x → $1,050M EV
- Pay off $200M debt → $850M equity proceeds
- PE invested $150M → MOIC = 5.7x → IRR ~41%

**Three Levers:** EBITDA growth + multiple expansion + debt paydown`,
            keyTakeaways: [
              'LBO: 60-70% debt, 30-40% equity of purchase price',
              'Leverage amplifies equity returns dramatically',
              'Interest tax shield reduces cost of debt',
              'Debt paydown from FCF increases equity value',
              'Three return drivers: EBITDA growth, multiple expansion, deleveraging'
            ]
          }
        ]
      },
      {
        id: 'lbo-s2',
        title: 'LBO Model Mechanics',
        lessons: [
          {
            id: 'lbo-l2',
            title: 'Building the LBO Model',
            duration: '30 min',
            content: `## Building an LBO Model

### Step 1: Transaction Assumptions
- Purchase price (entry EV/EBITDA multiple × EBITDA)
- Capital structure (debt tranches, equity %)
- Hold period (typically 5 years)
- Exit multiple assumption
- Management fees, transaction fees

### Step 2: Sources & Uses
Must balance: Total Sources = Total Uses

**Sources:**
- Term Loan A/B
- Revolving Credit Facility
- High Yield Bonds
- PE Equity Contribution

**Uses:**
- Equity purchase price (enterprise value to equity holders)
- Refinanced existing debt
- Transaction fees (1-3% of deal)
- Financing fees (OID)

### Step 3: Financial Projections
Revenue → EBITDA → D&A → EBIT → Interest → EBT → Taxes → Net Income → FCF

Key: EBITDA must cover interest expense (coverage ratio > 2x)

### Step 4: Debt Schedule
Model each debt tranche:
- Starting balance
- Mandatory amortization (1% annually for TLB)
- Cash sweep (excess FCF to pay debt)
- Interest expense (LIBOR/SOFR + spread for floating; fixed for HY bonds)
- Ending balance

### Step 5: Exit & Returns
Exit EV = Exit EBITDA × Exit Multiple
Equity Proceeds = Exit EV - Remaining Debt
MOIC = Equity Proceeds / Initial Equity
IRR = solve for rate where NPV of equity cash flows = 0

### Quick IRR Benchmarks (memorize!)
- 2x MOIC, 5 years ≈ 15% IRR
- 3x MOIC, 5 years ≈ 25% IRR
- 3x MOIC, 3 years ≈ 44% IRR
- 5x MOIC, 5 years ≈ 38% IRR`,
            keyTakeaways: [
              'Sources & Uses must equal (fundamental model check)',
              'Debt schedule drives interest expense in P&L',
              'Cash sweep = excess FCF used to repay debt',
              'Exit EV = Exit EBITDA × Exit Multiple',
              'Memorize key MOIC/IRR/year benchmarks'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'brainteasers',
    title: 'Brain Teasers & Mental Math',
    description: 'Sharpen your mental math and analytical thinking for technical interviews.',
    icon: '🧠',
    color: 'red',
    level: 'Intermediate',
    duration: '2-3 hours',
    sections: [
      {
        id: 'bt-s1',
        title: 'Mental Math Techniques',
        lessons: [
          {
            id: 'bt-l1',
            title: 'Mental Math for IB Interviews',
            duration: '20 min',
            content: `## Mental Math for Investment Banking

Fast, accurate mental math is critical in IB. Interviewers will test this.

### Core Techniques

**1. Percentage Calculations**
- 10% of X = X/10
- 5% = half of 10%
- 15% = 10% + 5%
- 25% = X/4
- 33% ≈ X/3
- 75% = 3/4 of X

**2. Multiplying Two-Digit Numbers**
17 × 18:
- Method 1: 17 × 20 - 17 × 2 = 340 - 34 = **306**
- Method 2: (17+3)(17+1) isn't clean; try (15+2)(15+3) = 225+45+30+6 = 306

**3. Working with Millions/Billions**
- $500M × 8x = $4.0B (move decimal)
- $2.5B / $500M = 5.0x
- 15% margin on $800M revenue = $120M EBITDA

**4. Compound Growth (CAGR)**
Rule of 72: To double at rate r%, takes 72/r years
- At 10%: doubles in 7.2 years
- At 7%: doubles in ~10 years

**5. Quick IRR Benchmarks**
2x in 3 years ≈ 26%
2x in 4 years ≈ 19%
2x in 5 years ≈ 15%
3x in 3 years ≈ 44%
3x in 5 years ≈ 25%

**6. Margin Math**
EBITDA = Revenue × Margin
- $1B revenue × 15% margin = $150M EBITDA
- EV at 10x = $1.5B

### Interview Tips
- Don't rush — take 5 seconds to set up the problem
- Round first, then adjust for error
- Talk through your math out loud
- Ask if you can use a calculator (often yes in technical rounds)`,
            keyTakeaways: [
              'Rule of 72: 72/r = years to double at rate r%',
              'Memorize key IRR benchmarks (2x-3x, 3-5 years)',
              'Round to nearest clean number, then adjust',
              'Talk through calculations out loud to show thinking',
              'Practice daily: mental math is trainable'
            ]
          }
        ]
      }
    ]
  }
];

export const getCourseById = (id: string) => courses.find(c => c.id === id);
