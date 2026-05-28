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

  // Valuation
  { id: 'f011', category: 'Valuation', front: 'EV/EBITDA Multiple', back: 'Enterprise Value / EBITDA\n\nCapital-structure neutral. Typical range: 8–15× (varies by industry)', tags: ['valuation'] },
  { id: 'f012', category: 'Valuation', front: 'Three Valuation Methodologies', back: '1. Comparable Companies — public trading multiples\n2. Precedent Transactions — M&A multiples + control premium\n3. DCF — intrinsic value from discounted cash flows', tags: ['valuation'] },
  { id: 'f013', category: 'Valuation', front: 'Control Premium', back: 'Premium above trading price paid for a controlling stake. Typically 20–40%.\n\nExplains why precedent transactions trade above public comps.', tags: ['valuation', 'ma'] },
  { id: 'f014', category: 'Valuation', front: 'LTM Calculation', back: 'Last Fiscal Year + YTD Current Period − YTD Prior Year Period', tags: ['valuation'] },
  { id: 'f015', category: 'Valuation', front: 'Football Field Chart', back: 'Bar chart showing the valuation range implied by each methodology side by side', tags: ['valuation'] },

  // DCF
  { id: 'f016', category: 'DCF', front: 'WACC Formula', back: '(E/V) × Re + (D/V) × Rd × (1 − T)\n\nRe = cost of equity (CAPM), Rd = pre-tax cost of debt', tags: ['dcf', 'formulas'] },
  { id: 'f017', category: 'DCF', front: 'CAPM Formula', back: 'Rf + β × (Rm − Rf)\n\nRf = risk-free rate (~4–5%), Rm − Rf = equity risk premium (~5–6%)', tags: ['dcf', 'formulas'] },
  { id: 'f018', category: 'DCF', front: 'Terminal Value (Gordon Growth)', back: 'FCFn × (1 + g) / (WACC − g)\n\ng ≈ 2–3% (GDP growth). TV is typically 60–80% of total DCF value.', tags: ['dcf', 'formulas'] },
  { id: 'f019', category: 'DCF', front: 'Beta — Unlever and Re-lever', back: 'Unlever: βu = βL / (1 + (1−T) × D/E)\nRelever: βL = βu × (1 + (1−T) × D/E)', tags: ['dcf'] },
  { id: 'f020', category: 'DCF', front: 'Present Value Formula', back: 'PV = CF / (1 + r)^n\nPerpetuity: PV = CF / r\nGrowing perpetuity: PV = CF / (r − g)', tags: ['dcf', 'formulas'] },

  // M&A
  { id: 'f021', category: 'M&A', front: 'Accretion vs. Dilution', back: 'Accretive: pro forma EPS > acquirer standalone EPS\nDilutive: pro forma EPS < acquirer standalone EPS', tags: ['ma'] },
  { id: 'f022', category: 'M&A', front: 'Sources & Uses', back: 'Sources = Uses (must balance)\nSources: debt + equity\nUses: purchase price + fees + refinanced debt', tags: ['ma', 'lbo'] },
  { id: 'f023', category: 'M&A', front: 'Cost vs. Revenue Synergies', back: 'Cost synergies: headcount cuts, facilities, procurement (reliable)\nRevenue synergies: cross-selling, new markets (less reliable)', tags: ['ma'] },
  { id: 'f024', category: 'M&A', front: 'Goodwill Calculation', back: 'Purchase Price − FMV of Net Assets − FMV of Identifiable Intangibles\n\nNo amortization under GAAP; tested annually for impairment', tags: ['ma'] },
  { id: 'f025', category: 'M&A', front: 'Stock vs. Cash Deal (Seller)', back: 'Cash: immediate liquidity, fully taxable\nStock: tax-deferred, but seller takes on acquirer market risk', tags: ['ma'] },

  // LBO
  { id: 'f026', category: 'LBO', front: 'LBO Return Drivers', back: '1. EBITDA growth\n2. Multiple expansion\n3. Debt paydown\n\nTarget IRR: 20–25%+', tags: ['lbo'] },
  { id: 'f027', category: 'LBO', front: 'MOIC vs. IRR', back: 'MOIC = Exit Proceeds / Initial Equity (ignores time)\nIRR = discount rate where NPV = 0 (time-sensitive)', tags: ['lbo', 'formulas'] },
  { id: 'f028', category: 'LBO', front: 'Good LBO Candidate', back: 'Stable, predictable cash flows; low CapEx; low existing leverage; recurring revenue; defensible market position', tags: ['lbo'] },
  { id: 'f029', category: 'LBO', front: 'Typical LBO Capital Structure', back: 'Total debt: ~5–6× EBITDA\nSenior secured (Term Loan B): 3–4× EBITDA\nPE equity: 30–40% of total', tags: ['lbo'] },
  { id: 'f030', category: 'LBO', front: 'PIK (Pay-in-Kind) Interest', back: 'Interest paid in additional debt instead of cash.\nPreserves liquidity but compounds — results in higher total debt at exit.', tags: ['lbo'] },
];

export const getFlashcardsByCategory = (category: string) =>
  flashcards.filter(f => f.category === category);

export const flashcardCategories = [...new Set(flashcards.map(f => f.category))];
