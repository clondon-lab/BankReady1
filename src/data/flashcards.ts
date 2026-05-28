export interface Flashcard {
  id: string;
  category: string;
  front: string;
  back: string;
  tags: string[];
}

export const flashcards: Flashcard[] = [
  // Accounting
  { id: 'f001', category: 'Accounting', front: 'EBITDA Formula', back: 'Net Income + Interest + Taxes + D&A\n= EBIT + D&A', tags: ['accounting', 'formulas'] },
  { id: 'f002', category: 'Accounting', front: 'Enterprise Value Formula', back: 'Market Cap + Total Debt + Preferred Stock + Minority Interest − Cash', tags: ['valuation', 'formulas'] },
  { id: 'f003', category: 'Accounting', front: 'Net Working Capital (NWC)', back: 'Current Assets − Current Liabilities\n\nOperating NWC = (AR + Inventory) − (AP + Accrued Expenses)', tags: ['accounting', 'formulas'] },
  { id: 'f004', category: 'Accounting', front: 'Free Cash Flow (Unlevered)', back: 'EBIT × (1 − Tax Rate) + D&A − CapEx − ΔNWC', tags: ['dcf', 'formulas'] },
  { id: 'f005', category: 'Accounting', front: 'Days Sales Outstanding (DSO)', back: '(Accounts Receivable / Revenue) × 365\n\nLower = faster cash collection', tags: ['accounting', 'ratios'] },
  { id: 'f006', category: 'Accounting', front: 'Return on Equity (ROE)', back: 'Net Income / Shareholders\' Equity\n\nDuPont: Net Margin × Asset Turnover × Equity Multiplier', tags: ['accounting', 'ratios'] },
  { id: 'f007', category: 'Accounting', front: 'ROIC Formula', back: 'NOPAT / Invested Capital\nNOPAT = EBIT × (1 − Tax Rate)\n\nROIC > WACC → value creation', tags: ['accounting', 'ratios'] },
  { id: 'f008', category: 'Accounting', front: 'Gross Profit vs. EBIT', back: 'Gross Profit = Revenue − COGS\nEBIT = Gross Profit − SG&A − R&D − D&A', tags: ['accounting'] },
  { id: 'f009', category: 'Accounting', front: 'Current Ratio vs. Quick Ratio', back: 'Current Ratio = Current Assets / Current Liabilities\nQuick Ratio = (Current Assets − Inventory) / Current Liabilities', tags: ['accounting', 'ratios'] },
  { id: 'f010', category: 'Accounting', front: 'Accrual vs. Cash Accounting', back: 'Accrual: revenue recognized when earned (GAAP)\nCash: revenue recognized when cash is received', tags: ['accounting'] },
  { id: 'f031', category: 'Accounting', front: 'LIFO vs. FIFO (Rising Prices)', back: 'LIFO: higher COGS → lower net income → lower taxes (tax advantage)\nFIFO: lower COGS → higher net income → higher taxes\n\nLIFO not permitted under IFRS', tags: ['accounting'] },
  { id: 'f032', category: 'Accounting', front: 'Cash Conversion Cycle (CCC)', back: 'DSO + DIO − DPO\n\nLower = faster cash generation', tags: ['accounting', 'formulas'] },
  { id: 'f033', category: 'Accounting', front: 'Days Inventory Outstanding (DIO)', back: '(Inventory / COGS) × 365', tags: ['accounting', 'ratios'] },
  { id: 'f034', category: 'Accounting', front: 'Days Payable Outstanding (DPO)', back: '(Accounts Payable / COGS) × 365\n\nHigher = company takes longer to pay suppliers (favorable)', tags: ['accounting', 'ratios'] },
  { id: 'f035', category: 'Accounting', front: 'Levered Free Cash Flow (FCFE)', back: 'Net Income + D&A − CapEx − ΔNWC − Mandatory Debt Repayment\n\nDiscount at cost of equity → equity value', tags: ['dcf', 'formulas'] },
  { id: 'f036', category: 'Accounting', front: 'Deferred Tax Liability (DTL)', back: 'Book taxes < taxes actually owed in the future\nCaused by: accelerated tax depreciation vs. straight-line book\n\nA future cash tax payment', tags: ['accounting'] },
  { id: 'f037', category: 'Accounting', front: 'Deferred Tax Asset (DTA)', back: 'Cash taxes paid > book taxes; future tax benefit\nCaused by: NOL carryforwards, accrued expenses not yet deductible\n\nA future tax savings', tags: ['accounting'] },
  { id: 'f038', category: 'Accounting', front: 'Operating Leverage', back: '% Change in EBIT / % Change in Revenue\n\nHigh fixed costs = high operating leverage = more volatile earnings', tags: ['accounting'] },
  { id: 'f039', category: 'Accounting', front: 'Net Debt', back: 'Total Debt + Preferred Stock + Minority Interest − Cash & Equivalents', tags: ['accounting', 'formulas'] },
  { id: 'f040', category: 'Accounting', front: 'Stock-Based Compensation (SBC)', back: 'Non-cash expense on income statement\nAdded back on CFS (like D&A)\nDilutes shareholders via new share issuance', tags: ['accounting'] },

  // Valuation
  { id: 'f011', category: 'Valuation', front: 'EV/EBITDA Multiple', back: 'Enterprise Value / EBITDA\n\nCapital-structure neutral. Typical range: 8–15× (varies by industry)', tags: ['valuation'] },
  { id: 'f012', category: 'Valuation', front: 'Three Valuation Methodologies', back: '1. Comparable Companies — public trading multiples\n2. Precedent Transactions — M&A multiples + control premium\n3. DCF — intrinsic value from discounted cash flows', tags: ['valuation'] },
  { id: 'f013', category: 'Valuation', front: 'Control Premium', back: 'Premium above trading price paid for a controlling stake. Typically 20–40%.\n\nExplains why precedent transactions trade above public comps.', tags: ['valuation', 'ma'] },
  { id: 'f014', category: 'Valuation', front: 'LTM Calculation', back: 'Last Fiscal Year + YTD Current Period − YTD Prior Year Period', tags: ['valuation'] },
  { id: 'f015', category: 'Valuation', front: 'Football Field Chart', back: 'Bar chart showing the valuation range implied by each methodology side by side', tags: ['valuation'] },
  { id: 'f041', category: 'Valuation', front: 'Price-to-Earnings (P/E)', back: 'Share Price / EPS = Market Cap / Net Income\n\nEquity multiple (levered). Higher P/E = higher growth expectations.', tags: ['valuation'] },
  { id: 'f042', category: 'Valuation', front: 'Price-to-Book (P/B)', back: 'Market Cap / Book Value of Equity\n\nKey multiple for banks. P/B > 1 means market values franchise above book assets.', tags: ['valuation'] },
  { id: 'f043', category: 'Valuation', front: 'Treasury Stock Method (TSM)', back: 'Diluted shares = Basic shares + Options × (1 − Strike Price / Market Price)\n\nAssumes option proceeds used to repurchase shares at current price', tags: ['valuation', 'formulas'] },
  { id: 'f044', category: 'Valuation', front: 'EV/Revenue', back: 'Enterprise Value / Revenue\n\nUsed for pre-profit, high-growth, or early-stage companies', tags: ['valuation'] },
  { id: 'f045', category: 'Valuation', front: 'Sum-of-the-Parts (SOTP)', back: 'Value each business segment separately using appropriate multiples, then aggregate.\n\nUsed for conglomerates trading at a "sum-of-parts discount"', tags: ['valuation'] },
  { id: 'f046', category: 'Valuation', front: 'Calendarization', back: 'Adjusting fiscal year financials to a calendar year basis for consistent comparison across companies with different FYEs', tags: ['valuation'] },

  // DCF
  { id: 'f016', category: 'DCF', front: 'WACC Formula', back: '(E/V) × Re + (D/V) × Rd × (1 − T)\n\nRe = cost of equity (CAPM), Rd = pre-tax cost of debt', tags: ['dcf', 'formulas'] },
  { id: 'f017', category: 'DCF', front: 'CAPM Formula', back: 'Rf + β × (Rm − Rf)\n\nRf = risk-free rate (~4–5%), Rm − Rf = equity risk premium (~5–6%)', tags: ['dcf', 'formulas'] },
  { id: 'f018', category: 'DCF', front: 'Terminal Value (Gordon Growth)', back: 'FCFn × (1 + g) / (WACC − g)\n\ng ≈ 2–3% (GDP growth). TV is typically 60–80% of total DCF value.', tags: ['dcf', 'formulas'] },
  { id: 'f019', category: 'DCF', front: 'Beta — Unlever and Re-lever', back: 'Unlever: βu = βL / (1 + (1−T) × D/E)\nRelever: βL = βu × (1 + (1−T) × D/E)', tags: ['dcf'] },
  { id: 'f020', category: 'DCF', front: 'Present Value Formula', back: 'PV = CF / (1 + r)^n\nPerpetuity: PV = CF / r\nGrowing perpetuity: PV = CF / (r − g)', tags: ['dcf', 'formulas'] },
  { id: 'f047', category: 'DCF', front: 'Mid-Year Convention', back: 'Assumes cash flows arrive mid-year (t = 0.5, 1.5, 2.5...)\n\nMore realistic than year-end; increases DCF value slightly', tags: ['dcf'] },
  { id: 'f048', category: 'DCF', front: 'APV (Adjusted Present Value)', back: 'APV = Unlevered firm value + PV of tax shield\n\nPreferred when capital structure changes significantly (e.g. LBOs)', tags: ['dcf', 'formulas'] },
  { id: 'f049', category: 'DCF', front: 'FCFF vs FCFE', back: 'FCFF (unlevered): discount at WACC → Enterprise Value\nFCFE (levered): discount at cost of equity → Equity Value\n\nFCFE = FCFF − After-tax Interest + Net Borrowing', tags: ['dcf', 'formulas'] },

  // M&A
  { id: 'f021', category: 'M&A', front: 'Accretion vs. Dilution', back: 'Accretive: pro forma EPS > acquirer standalone EPS\nDilutive: pro forma EPS < acquirer standalone EPS', tags: ['ma'] },
  { id: 'f022', category: 'M&A', front: 'Sources & Uses', back: 'Sources = Uses (must balance)\nSources: debt + equity\nUses: purchase price + fees + refinanced debt', tags: ['ma', 'lbo'] },
  { id: 'f023', category: 'M&A', front: 'Cost vs. Revenue Synergies', back: 'Cost synergies: headcount cuts, facilities, procurement (reliable)\nRevenue synergies: cross-selling, new markets (less reliable)', tags: ['ma'] },
  { id: 'f024', category: 'M&A', front: 'Goodwill Calculation', back: 'Purchase Price − FMV of Net Assets − FMV of Identifiable Intangibles\n\nNo amortization under GAAP; tested annually for impairment', tags: ['ma'] },
  { id: 'f025', category: 'M&A', front: 'Stock vs. Cash Deal (Seller)', back: 'Cash: immediate liquidity, fully taxable\nStock: tax-deferred, but seller takes on acquirer market risk', tags: ['ma'] },
  { id: 'f050', category: 'M&A', front: 'Break-Up Fee', back: 'Fee paid by the target if it accepts a superior competing offer\nTypically 2–4% of deal value', tags: ['ma'] },
  { id: 'f051', category: 'M&A', front: 'Reverse Break-Up Fee', back: 'Fee paid by the acquirer if the deal fails (e.g. financing falls through)\nTypically 3–6% of deal value', tags: ['ma'] },
  { id: 'f052', category: 'M&A', front: 'Asset Deal vs. Stock Deal', back: 'Asset deal: buyer gets step-up in tax basis on acquired assets\nStock deal: simpler; no step-up; buyer inherits all liabilities\n\nSellers prefer stock (capital gains); buyers prefer assets (tax benefit)', tags: ['ma'] },
  { id: 'f053', category: 'M&A', front: '338(h)(10) Election', back: 'Treats a stock acquisition as an asset deal for tax purposes\nBuyer gets step-up; seller pays as if assets were sold\n\nRequires agreement from both parties', tags: ['ma'] },
  { id: 'f054', category: 'M&A', front: 'Earnout', back: 'Contingent payment to seller if post-close performance targets are hit\n\nBridges valuation gaps between buyer and seller', tags: ['ma'] },

  // LBO
  { id: 'f026', category: 'LBO', front: 'LBO Return Drivers', back: '1. EBITDA growth\n2. Multiple expansion\n3. Debt paydown\n\nTarget IRR: 20–25%+', tags: ['lbo'] },
  { id: 'f027', category: 'LBO', front: 'MOIC vs. IRR', back: 'MOIC = Exit Proceeds / Initial Equity (ignores time)\nIRR = discount rate where NPV = 0 (time-sensitive)', tags: ['lbo', 'formulas'] },
  { id: 'f028', category: 'LBO', front: 'Good LBO Candidate', back: 'Stable, predictable cash flows; low CapEx; low existing leverage; recurring revenue; defensible market position', tags: ['lbo'] },
  { id: 'f029', category: 'LBO', front: 'Typical LBO Capital Structure', back: 'Total debt: ~5–6× EBITDA\nSenior secured (Term Loan B): 3–4× EBITDA\nPE equity: 30–40% of total', tags: ['lbo'] },
  { id: 'f030', category: 'LBO', front: 'PIK (Pay-in-Kind) Interest', back: 'Interest paid in additional debt instead of cash.\nPreserves liquidity but compounds — results in higher total debt at exit.', tags: ['lbo'] },
  { id: 'f055', category: 'LBO', front: 'Dividend Recapitalization', back: 'PE firm loads additional debt onto a portfolio company to pay itself a special dividend before exit', tags: ['lbo'] },
  { id: 'f056', category: 'LBO', front: 'Carried Interest', back: 'GP\'s 20% share of fund profits above the hurdle rate\n\nTaxed at long-term capital gains rates', tags: ['lbo'] },
  { id: 'f057', category: 'LBO', front: 'Hurdle Rate (Preferred Return)', back: 'Minimum return (typically 8%) that LPs must receive before the GP earns carried interest', tags: ['lbo'] },
  { id: 'f058', category: 'LBO', front: 'Management Fee', back: 'Annual fee charged by PE firm on committed capital (typically 2%)\n\nPrimary GP revenue during the investment period', tags: ['lbo'] },
  { id: 'f059', category: 'LBO', front: 'Mezzanine Financing', back: 'Subordinated debt + equity kicker (warrants)\nYield: 12–20%; sits between senior debt and equity in the capital structure', tags: ['lbo'] },
  { id: 'f060', category: 'LBO', front: 'Maintenance vs. Incurrence Covenant', back: 'Maintenance: tested each quarter (e.g. Net Debt/EBITDA ≤ 5.0x)\nIncurrence: triggered only by specific actions (issuing new debt, paying dividends)', tags: ['lbo'] },
];

export const getFlashcardsByCategory = (category: string) =>
  flashcards.filter(f => f.category === category);

export const flashcardCategories = [...new Set(flashcards.map(f => f.category))];
