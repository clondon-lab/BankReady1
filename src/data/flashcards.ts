export interface Flashcard {
  id: string;
  category: string;
  front: string;
  back: string;
  tags: string[];
}

export const flashcards: Flashcard[] = [
  // Accounting
  { id: 'f001', category: 'Accounting', front: 'EBITDA Formula', back: 'Net Income + Interest + Taxes + Depreciation + Amortization\n\nOR: Revenue - COGS - OpEx (before D&A)\n\nAlso = EBIT + D&A', tags: ['accounting', 'formulas'] },
  { id: 'f002', category: 'Accounting', front: 'Enterprise Value Formula', back: 'EV = Market Cap + Total Debt + Preferred Stock + Minority Interest - Cash & Equivalents\n\nAlso subtract equity investments in associates', tags: ['valuation', 'formulas'] },
  { id: 'f003', category: 'Accounting', front: 'Net Working Capital (NWC)', back: 'NWC = Current Assets - Current Liabilities\n\nOperating NWC = (AR + Inventory + Prepaid) - (AP + Accrued Expenses)\n\nExcludes cash, short-term debt from current items', tags: ['accounting', 'formulas'] },
  { id: 'f004', category: 'Accounting', front: 'Free Cash Flow (Unlevered)', back: 'UFCF = EBIT × (1 - Tax Rate) + D&A - CapEx - ΔNWC\n\nAlso = EBITDA(1-t) + D&A×t - CapEx - ΔNWC\n\nUsed in DCF; discounted at WACC to get Enterprise Value', tags: ['dcf', 'formulas'] },
  { id: 'f005', category: 'Accounting', front: 'Days Sales Outstanding (DSO)', back: 'DSO = (Accounts Receivable / Revenue) × 365\n\nMeasures how quickly a company collects cash from customers\n\nLower = better (faster collection)', tags: ['accounting', 'ratios'] },
  { id: 'f006', category: 'Accounting', front: 'Return on Equity (ROE)', back: 'ROE = Net Income / Shareholders\' Equity\n\nDuPont Decomposition:\nROE = Net Margin × Asset Turnover × Equity Multiplier\n= (NI/Rev) × (Rev/Assets) × (Assets/Equity)\n\nHigher = more profitable relative to equity base', tags: ['accounting', 'ratios'] },
  { id: 'f007', category: 'Accounting', front: 'ROIC Formula', back: 'ROIC = NOPAT / Invested Capital\n\nNOPAT = EBIT × (1 - Tax Rate)\nInvested Capital = Total Equity + Total Debt - Cash\n\nIf ROIC > WACC → company creates value', tags: ['accounting', 'ratios'] },
  { id: 'f008', category: 'Accounting', front: 'Gross Profit vs. Operating Income', back: 'Gross Profit = Revenue - COGS\nGross Margin = GP / Revenue\n\nOperating Income (EBIT) = GP - Operating Expenses (SG&A, R&D, D&A)\nOperating Margin = EBIT / Revenue\n\nGP measures production efficiency; EBIT measures overall operating efficiency', tags: ['accounting'] },
  { id: 'f009', category: 'Accounting', front: 'Current Ratio vs Quick Ratio', back: 'Current Ratio = Current Assets / Current Liabilities\n(Measures overall liquidity)\n\nQuick Ratio = (Current Assets - Inventory) / Current Liabilities\n(More conservative; excludes illiquid inventory)\n\nBoth > 1.0 generally preferred', tags: ['accounting', 'ratios'] },
  { id: 'f010', category: 'Accounting', front: 'Accrual vs. Cash Accounting', back: 'Accrual: Recognize revenue when earned, expenses when incurred (GAAP)\n\nCash: Recognize only when cash changes hands\n\nKey accrual accounts:\n• AR = earned but not collected\n• AP = incurred but not paid\n• Deferred Revenue = collected but not earned', tags: ['accounting'] },

  // Valuation
  { id: 'f011', category: 'Valuation', front: 'EV/EBITDA Multiple — What it means', back: 'EV/EBITDA = Enterprise Value / EBITDA\n\n"How many years of EBITDA = total enterprise value?"\n\nTypical ranges:\n• Software: 15-25x+\n• Industrials: 8-12x\n• Retail: 5-8x\n• Services: 8-14x\n\nCapital structure neutral (use EV and EBITDA, both unlevered)', tags: ['valuation'] },
  { id: 'f012', category: 'Valuation', front: 'Three Valuation Methodologies', back: '1. Comparable Company Analysis (Comps)\n   → Public market multiples, minority basis\n\n2. Precedent Transactions\n   → M&A multiples, includes control premium\n\n3. DCF Analysis\n   → Intrinsic value, based on cash flows\n\nPresented together in a "football field" chart', tags: ['valuation'] },
  { id: 'f013', category: 'Valuation', front: 'Control Premium', back: 'Premium paid above current trading price to acquire control of a company\n\nTypically 20-40%\n\nWhy paid:\n• Ability to implement strategic changes\n• Capture synergies\n• Elimination of public market discount\n\nReason precedent transactions > trading comps', tags: ['valuation', 'ma'] },
  { id: 'f014', category: 'Valuation', front: 'LTM Calculation', back: 'LTM (Last Twelve Months) = TTM (Trailing Twelve Months)\n\nFormula:\nLTM = Last Fiscal Year + YTD Current - YTD Prior Year\n\nExample: FY2023 + Q1 2024 - Q1 2023 = LTM Q1 2024\n\nUsed for most recent snapshot of performance', tags: ['valuation'] },
  { id: 'f015', category: 'Valuation', front: 'Football Field Chart', back: 'A horizontal bar chart showing valuation ranges from each methodology\n\nComponents:\n• Trading Comps range\n• Precedent Transactions range  \n• DCF range\n• (Optional: LBO, analyst price targets)\n\nShows where different methods overlap → implied fair value range', tags: ['valuation'] },

  // DCF
  { id: 'f016', category: 'DCF', front: 'WACC Formula', back: 'WACC = (E/V)×Re + (D/V)×Rd×(1-T)\n\nWhere:\nE = Equity Value, D = Debt Value, V = E + D\nRe = Cost of Equity (CAPM)\nRd = Cost of Debt (pre-tax)\nT = Tax Rate\n\nDebt is tax-deductible → after-tax cost = Rd×(1-T)', tags: ['dcf', 'formulas'] },
  { id: 'f017', category: 'DCF', front: 'CAPM Formula', back: 'Cost of Equity = Rf + β × (Rm - Rf)\n\nRf = Risk-free rate (10-yr Treasury, ~4-5%)\nβ = Beta (systematic risk)\nRm - Rf = Equity Risk Premium (~5-6%)\n\nHigher beta → higher required return (more risk)', tags: ['dcf', 'formulas'] },
  { id: 'f018', category: 'DCF', front: 'Terminal Value — Gordon Growth', back: 'TV = FCFn × (1+g) / (WACC - g)\n\ng = perpetual growth rate (usually ~GDP growth, 2-3%)\n\nWARNING: TV often = 60-80% of total DCF value\nVery sensitive to WACC and g assumptions\n\nSanity check: implied exit multiple', tags: ['dcf', 'formulas'] },
  { id: 'f019', category: 'DCF', front: 'Beta — Unlever and Re-lever', back: 'Unlevered Beta (Asset Beta):\nβu = βl / (1 + (1-T) × D/E)  [Hamada]\n\nRe-levered Beta:\nβl = βu × (1 + (1-T) × D/E)\n\nProcess:\n1. Get peer levered betas\n2. Unlever each using peer D/E and tax rate\n3. Take median unlevered beta\n4. Re-lever at target D/E', tags: ['dcf'] },
  { id: 'f020', category: 'DCF', front: 'Present Value Formula', back: 'PV = CF / (1 + r)^n\n\nFor a stream: PV = Σ CFt / (1+r)^t\n\nFor perpetuity: PV = CF / r\n\nFor growing perpetuity: PV = CF / (r - g)\n\nHigher discount rate → lower PV\nLonger time period → lower PV', tags: ['dcf', 'formulas'] },

  // M&A
  { id: 'f021', category: 'M&A', front: 'Accretion vs. Dilution', back: 'Accretive: Pro forma EPS > Acquirer standalone EPS\nDilutive: Pro forma EPS < Acquirer standalone EPS\n\nKey drivers:\n• Acquisition multiple vs. acquirer P/E\n• Synergies\n• Deal consideration (cash vs. stock)\n• Interest expense (cash deals)\n• D&A of acquired intangibles\n\nAll-cash + low purchase P/E → more likely accretive', tags: ['ma'] },
  { id: 'f022', category: 'M&A', front: 'Sources & Uses', back: 'SOURCES = USES (must balance)\n\nSources: Term loans, revolving credit, high-yield bonds, mezzanine, PE equity\n\nUses: Equity purchase price, refinanced debt, transaction fees, OID (original issue discount)\n\nKey: Equity % = Equity / Total Sources', tags: ['ma', 'lbo'] },
  { id: 'f023', category: 'M&A', front: 'Cost vs. Revenue Synergies', back: 'Cost Synergies (reliable):\n• Headcount reduction\n• Facility consolidation\n• Procurement savings\n• Shared back-office\n\nRevenue Synergies (less reliable):\n• Cross-selling\n• New market access\n• Pricing power\n• Product bundling\n\n"Buy the cost synergies; get revenue for free"', tags: ['ma'] },
  { id: 'f024', category: 'M&A', front: 'Goodwill Calculation', back: 'Goodwill = Purchase Price - FMV of Net Assets - FMV of Identifiable Intangibles\n\nOR: Price Paid - Book Value of Equity - Write-ups + Write-downs\n\nUnder GAAP: No amortization; annual impairment test\nUnder IFRS: Can be amortized over useful life\n\nImpairment → charge to income statement', tags: ['ma'] },
  { id: 'f025', category: 'M&A', front: 'Stock vs. Cash Deal (Seller Perspective)', back: 'Cash Deal:\n✓ Certainty of value\n✓ Full liquidity immediately\n✗ Fully taxable as capital gain\n\nStock Deal:\n✓ Tax-deferred exchange\n✓ Upside if acquirer stock rises\n✗ Market risk (stock may fall before close)\n✗ More complex transaction\n\nMost deals: mix of cash + stock', tags: ['ma'] },

  // LBO
  { id: 'f026', category: 'LBO', front: 'LBO Return Drivers', back: '3 sources of PE returns:\n\n1. EBITDA Growth → higher exit EV\n2. Multiple Expansion → sell at higher multiple\n3. Debt Paydown → deleveraging benefits equity\n\nLeverage amplifies all three\n\nIRR target: 20-25%+\nHold period: 3-7 years (typically ~5)', tags: ['lbo'] },
  { id: 'f027', category: 'LBO', front: 'MOIC vs IRR', back: 'MOIC (Multiple on Invested Capital):\nMOIC = Exit Proceeds / Initial Equity\nNot time-sensitive\n\nIRR (Internal Rate of Return):\nDiscount rate where NPV = 0\nTime-sensitive\n\nQuick benchmarks:\n• 2x / 3yr ≈ 26% IRR\n• 2x / 4yr ≈ 19% IRR\n• 3x / 5yr ≈ 25% IRR\n• 3x / 3yr ≈ 44% IRR', tags: ['lbo', 'formulas'] },
  { id: 'f028', category: 'LBO', front: 'Good LBO Candidate Characteristics', back: '✓ Strong, predictable cash flows\n✓ Low existing leverage\n✓ Stable/recurring revenue\n✓ Low CapEx intensity\n✓ Defensible market position\n✓ Operational improvement opportunities\n✓ Multiple exit paths (strategic + IPO)\n✓ Reasonable entry valuation\n\n✗ Avoid: Cyclical, high-CapEx, rapidly changing tech', tags: ['lbo'] },
  { id: 'f029', category: 'LBO', front: 'Typical LBO Capital Structure', back: 'Typical mix (varies by deal):\n\n• Senior Secured: 3-4x EBITDA (Term Loan B)\n• Second Lien / Mezz: 0-1x EBITDA\n• High Yield Bonds: 0-2x EBITDA\n• Total Debt: 5-6x EBITDA (leveraged)\n• PE Equity: 30-40% of total\n\nCredit metrics: Debt/EBITDA < 6-7x for most deals\nInterest coverage: EBITDA/Interest > 2x minimum', tags: ['lbo'] },
  { id: 'f030', category: 'LBO', front: 'PIK (Pay-in-Kind) Interest', back: 'PIK = interest paid in additional debt rather than cash\n\nBenefits to borrower:\n→ Preserves cash in tight periods\n→ Defer cash outflow\n\nDownsides:\n→ Compounds (interest on interest)\n→ Higher total debt at exit\n→ Expensive (higher rate than cash interest)\n\nPIK Toggle = can switch between cash and PIK', tags: ['lbo'] },
];

export const getFlashcardsByCategory = (category: string) =>
  flashcards.filter(f => f.category === category);

export const flashcardCategories = [...new Set(flashcards.map(f => f.category))];
