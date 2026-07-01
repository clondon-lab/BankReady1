export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type Category = 'accounting' | 'ev' | 'valuation' | 'dcf' | 'ma' | 'lbo' | 'brainteasers' | 'fit';

interface MCQQuestion {
  id: string;
  category: Category;
  type: 'mcq';
  difficulty: Difficulty;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface WalkthroughQuestion {
  id: string;
  category: Category;
  type: 'walkthrough';
  difficulty: Difficulty;
  question: string;
  modelAnswer: string;
  rubric: string[];
}

export type Question = MCQQuestion | WalkthroughQuestion;

export const questions: Question[] = [
  // ── ACCOUNTING MCQ (12) ─────────────────────────────────
  {
    id: 'accounting-mcq-001', category: 'accounting', type: 'mcq', difficulty: 'beginner',
    question: 'Which statement is built on accrual accounting and shows profitability over a period?',
    options: ['Balance Sheet', 'Income Statement', 'Cash Flow Statement', 'Statement of Equity'],
    correctIndex: 1,
    explanation: 'The Income Statement is accrual-based and shows Revenue down to Net Income over a period. The Balance Sheet is a point-in-time snapshot; the CFS shows actual cash.'
  },
  {
    id: 'accounting-mcq-002', category: 'accounting', type: 'mcq', difficulty: 'beginner',
    question: 'If Depreciation rises by $10 at a 40% tax rate, Net Income changes by:',
    options: ['−$10', '−$6', '−$4', '+$4'],
    correctIndex: 1,
    explanation: 'Depreciation is a $10 pretax expense. After-tax impact = $10 × (1 − 0.40) = $6 decrease. The $4 and +$4 figures relate to the cash-flow impact, not Net Income.'
  },
  {
    id: 'accounting-mcq-003', category: 'accounting', type: 'mcq', difficulty: 'beginner',
    question: 'If Depreciation rises by $10 at a 40% tax rate, Cash Flow from Operations changes by:',
    options: ['−$6', '+$4', '+$10', '$0'],
    correctIndex: 1,
    explanation: 'Net Income falls $6, but you add back the full $10 non-cash depreciation: −6 + 10 = +$4. Cash rises because depreciation shields income from taxes.'
  },
  {
    id: 'accounting-mcq-004', category: 'accounting', type: 'mcq', difficulty: 'beginner',
    question: 'Why does a non-cash expense like depreciation affect the cash balance?',
    options: ['It isn\'t really non-cash', 'Because it\'s tax-deductible, lowering cash taxes paid', 'Because it reduces revenue', 'It doesn\'t affect cash'],
    correctIndex: 1,
    explanation: 'Depreciation is tax-deductible, so it reduces taxable income and therefore the actual cash taxes paid — the "tax shield." That tax saving is the cash impact.'
  },
  {
    id: 'accounting-mcq-005', category: 'accounting', type: 'mcq', difficulty: 'beginner',
    question: 'Inventory is purchased for $10 in cash. The Income Statement impact is:',
    options: ['Revenue up $10', 'COGS up $10', 'No impact', 'Net Income down $6'],
    correctIndex: 2,
    explanation: 'Inventory only hits the Income Statement (via COGS) when the product is SOLD. Buying inventory is a Balance Sheet/CFS event. Claiming an IS impact is a classic error.'
  },
  {
    id: 'accounting-mcq-006', category: 'accounting', type: 'mcq', difficulty: 'beginner',
    question: 'Accounts Receivable rises by $10 (40% tax). What happens to cash?',
    options: ['Up $6', 'Down $4', 'Up $10', 'No change'],
    correctIndex: 1,
    explanation: 'Revenue up $10 → NI up $6. But A/R (an asset) rose $10 → subtract $10 on the CFS. Net cash = +6 − 10 = −$4. You paid tax on revenue not yet collected.'
  },
  {
    id: 'accounting-mcq-007', category: 'accounting', type: 'mcq', difficulty: 'beginner',
    question: 'The Balance Sheet equation is:',
    options: ['Assets = Liabilities − Equity', 'Assets + Liabilities = Equity', 'Assets = Liabilities + Shareholders\' Equity', 'Revenue − Expenses = Equity'],
    correctIndex: 2,
    explanation: 'Assets = Liabilities + Shareholders\' Equity, always. If it doesn\'t balance, there\'s an error — which is why it\'s your built-in check on every walk-through question.'
  },
  {
    id: 'accounting-mcq-008', category: 'accounting', type: 'mcq', difficulty: 'beginner',
    question: 'Stranded on a desert island with one statement to judge company health, pick:',
    options: ['Income Statement', 'Balance Sheet', 'Cash Flow Statement', 'Statement of Equity'],
    correctIndex: 2,
    explanation: 'The Cash Flow Statement shows true cash generation independent of non-cash accounting choices, making it the best single view of health.'
  },
  {
    id: 'accounting-mcq-009', category: 'accounting', type: 'mcq', difficulty: 'beginner',
    question: 'EBITDA can be positive for years while a company still goes bankrupt because EBITDA ignores:',
    options: ['Revenue', 'CapEx, working capital, interest, and taxes', 'Gross profit', 'Operating income'],
    correctIndex: 1,
    explanation: 'EBITDA excludes CapEx, working capital, interest, and taxes — exactly the cash drains that can bankrupt a company despite positive EBITDA.'
  },
  {
    id: 'accounting-mcq-010', category: 'accounting', type: 'mcq', difficulty: 'beginner',
    question: 'Goodwill is:',
    options: ['Amortized over 10 years', 'Tested for impairment and written down if needed', 'Depreciated like PP&E', 'Expensed immediately'],
    correctIndex: 1,
    explanation: 'Goodwill is not amortized; it\'s tested for impairment annually and written down if the acquisition underperforms. Definite-life intangibles (not goodwill) are amortized.'
  },
  {
    id: 'accounting-mcq-011', category: 'accounting', type: 'mcq', difficulty: 'intermediate',
    question: 'Deferred Tax Liabilities most commonly arise from:',
    options: ['Paying dividends', 'Accelerated tax depreciation vs. straight-line book depreciation', 'Issuing stock', 'Buying inventory'],
    correctIndex: 1,
    explanation: 'Using accelerated depreciation for taxes but straight-line for books means you pay less cash tax early on; that timing difference accumulates as a DTL.'
  },
  {
    id: 'accounting-mcq-012', category: 'accounting', type: 'mcq', difficulty: 'beginner',
    question: 'When Accounts Receivable increases, on the Cash Flow Statement you:',
    options: ['Add it to CFO', 'Subtract it from CFO', 'Ignore it', 'Add it to CFF'],
    correctIndex: 1,
    explanation: 'An asset increasing uses cash, so a rise in A/R is subtracted in Cash Flow from Operations. Asset up = cash down.'
  },

  // ── ACCOUNTING WALKTHROUGHS (3) ─────────────────────────
  {
    id: 'accounting-walk-001', category: 'accounting', type: 'walkthrough', difficulty: 'intermediate',
    question: 'Walk me through what happens to the 3 statements when Depreciation increases by $10 (assume a 40% tax rate).',
    modelAnswer: 'IS: Depreciation is an expense, so Pre-Tax Income falls $10; at 40% tax, Net Income falls $6. CFS: Start with NI down $6, add back the $10 non-cash depreciation → CFO up $4; Net Change in Cash +$4. BS: Cash up $4 and PP&E down $10 → Assets down $6; Retained Earnings down $6. Both sides fall $6 — it balances.',
    rubric: ['Net Income falls $6 (uses after-tax math)', 'Adds back $10 non-cash depreciation on CFS', 'CFO/cash up $4', 'PP&E down $10, Cash up $4 on BS', 'Retained Earnings down $6', 'States the Balance Sheet balances']
  },
  {
    id: 'accounting-walk-002', category: 'accounting', type: 'walkthrough', difficulty: 'intermediate',
    question: 'Apple buys $100 of factories with debt. Walk me through the 3 statements at the very start of Year 1, before anything else.',
    modelAnswer: 'IS: No change yet (no depreciation or interest incurred). CFS: CapEx −$100 in Investing; +$100 debt raised in Financing → Net Change in Cash $0. BS: PP&E up $100, Debt up $100 → both sides up $100, balances.',
    rubric: ['IS unchanged initially', 'CapEx −$100 in CFI', 'Debt +$100 in CFF', 'Net cash change $0', 'PP&E +$100 and Debt +$100 on BS', 'Balances']
  },
  {
    id: 'accounting-walk-003', category: 'accounting', type: 'walkthrough', difficulty: 'intermediate',
    question: 'A company takes a $100 writedown. Walk me through the statements (40% tax).',
    modelAnswer: 'IS: $100 hits Pre-Tax Income → Net Income down $60. CFS: NI down $60, add back $100 non-cash writedown → CFO up $40. BS: Cash up $40, asset down $100 → Assets down $60; Retained Earnings down $60. Balances.',
    rubric: ['NI down $60', 'Writedown added back $100 on CFS', 'CFO up $40', 'Asset down $100, cash up $40', 'Retained Earnings down $60', 'Balances']
  },

  // ── EV & EQUITY VALUE MCQ (6) ────────────────────────────
  {
    id: 'ev-and-equity-value-mcq-001', category: 'ev', type: 'mcq', difficulty: 'beginner',
    question: 'Enterprise Value equals:',
    options: ['Equity Value − Debt + Cash', 'Equity Value + Debt + Preferred + Minority Interest − Cash', 'Share price × shares only', 'Equity Value + Cash − Debt'],
    correctIndex: 1,
    explanation: 'EV = Equity Value + Debt + Preferred + Minority Interest − Cash. You add claims you assume (debt) and subtract non-operating cash that offsets cost.'
  },
  {
    id: 'ev-and-equity-value-mcq-002', category: 'ev', type: 'mcq', difficulty: 'beginner',
    question: 'Which multiple is INCORRECTLY paired?',
    options: ['EV / EBITDA', 'EV / Revenue', 'P / E (Equity Value / Net Income)', 'Enterprise Value / Net Income'],
    correctIndex: 3,
    explanation: 'EV must pair with pre-interest metrics (Revenue, EBITDA, EBIT). Net Income is after interest — it belongs to equity — so EV/Net Income mixes claims. That\'s the classic trap.'
  },
  {
    id: 'ev-and-equity-value-mcq-003', category: 'ev', type: 'mcq', difficulty: 'intermediate',
    question: 'A company raises $100 of debt and holds it as cash. Enterprise Value:',
    options: ['Rises $100', 'Falls $100', 'Is unchanged', 'Doubles'],
    correctIndex: 2,
    explanation: 'EV = Equity + Debt − Cash. Debt +$100 and Cash +$100 cancel. EV is capital-structure-neutral, so a pure financing move doesn\'t change it.'
  },
  {
    id: 'ev-and-equity-value-mcq-004', category: 'ev', type: 'mcq', difficulty: 'beginner',
    question: 'Why subtract cash when calculating Enterprise Value?',
    options: ['Cash is a liability', 'Cash is non-operating and offsets acquisition cost', 'Cash earns no return', 'To inflate EV'],
    correctIndex: 1,
    explanation: 'Cash is a non-operating asset; an acquirer could use the target\'s own cash to offset the purchase, so it\'s subtracted from EV.'
  },
  {
    id: 'ev-and-equity-value-mcq-005', category: 'ev', type: 'mcq', difficulty: 'intermediate',
    question: 'Two identical companies differ only in leverage. Their EV/EBITDA multiples should be:',
    options: ['Very different', 'Roughly the same', 'Zero', 'Impossible to compare'],
    correctIndex: 1,
    explanation: 'EV/EBITDA is capital-structure-neutral by design, so leverage shouldn\'t move it much. Their P/E ratios, by contrast, would differ.'
  },
  {
    id: 'ev-and-equity-value-mcq-006', category: 'ev', type: 'mcq', difficulty: 'intermediate',
    question: 'Which can be negative?',
    options: ['Market Equity Value', 'Enterprise Value', 'Neither', 'Share price'],
    correctIndex: 1,
    explanation: 'EV can be negative if cash exceeds Equity Value + Debt (some distressed/financial firms). Market Equity Value (price × shares) can never be negative.'
  },

  // ── EV WALKTHROUGH (1) ───────────────────────────────────
  {
    id: 'ev-and-equity-value-walk-001', category: 'ev', type: 'walkthrough', difficulty: 'intermediate',
    question: 'Explain the difference between Equity Value and Enterprise Value, and why you add debt and subtract cash.',
    modelAnswer: 'Equity Value is the value to shareholders (share price × diluted shares). Enterprise Value is the value of the core operations to ALL investors — debt and equity. You bridge by adding debt (you assume it when acquiring) plus preferred and minority interest, and subtracting cash (non-operating, offsets cost). EV is designed to be capital-structure-neutral, so it doesn\'t change just because a company funds itself with debt vs. equity.',
    rubric: ['Equity Value = value to shareholders', 'EV = value to all investors / core operations', 'Add debt (assumed on acquisition)', 'Subtract cash (non-operating/offsets cost)', 'Mentions capital-structure neutrality']
  },

  // ── VALUATION MCQ (6) ────────────────────────────────────
  {
    id: 'valuation-mcq-001', category: 'valuation', type: 'mcq', difficulty: 'beginner',
    question: 'The three main valuation methodologies are:',
    options: ['Comps, Precedents, DCF', 'P/E, EV/EBITDA, DCF', 'Comps, LBO, IPO', 'DCF, Dividends, Book Value'],
    correctIndex: 0,
    explanation: 'Comparable Companies, Precedent Transactions, and DCF are the three core methods. The first two are relative/market-based; the DCF is intrinsic.'
  },
  {
    id: 'valuation-mcq-002', category: 'valuation', type: 'mcq', difficulty: 'beginner',
    question: 'Which method typically produces the HIGHEST valuation?',
    options: ['Comparable Companies', 'Precedent Transactions', 'LBO Analysis', 'Liquidation'],
    correctIndex: 1,
    explanation: 'Precedent Transactions are usually highest because acquirers pay a control premium plus expected synergies. LBO analysis is usually the lowest (a floor).'
  },
  {
    id: 'valuation-mcq-003', category: 'valuation', type: 'mcq', difficulty: 'beginner',
    question: 'Why is EV/EBITDA usually preferred over P/E?',
    options: ['It\'s easier to compute', 'It neutralizes capital structure, taxes, and non-cash D&A', 'P/E is never used', 'EBITDA equals cash flow'],
    correctIndex: 1,
    explanation: 'EV/EBITDA compares operating businesses directly by removing capital structure, taxes, and D&A differences. P/E is distorted by all three.'
  },
  {
    id: 'valuation-mcq-004', category: 'valuation', type: 'mcq', difficulty: 'intermediate',
    question: 'For pricing an IPO, you rely most on:',
    options: ['Precedent transactions', 'Public company comparables', 'Liquidation value', 'LBO analysis'],
    correctIndex: 1,
    explanation: 'An IPO sells a minority stake to public investors — no control premium — so public company comparables are the primary method.'
  },
  {
    id: 'valuation-mcq-005', category: 'valuation', type: 'mcq', difficulty: 'intermediate',
    question: 'An LBO analysis is often described as a valuation:',
    options: ['Ceiling', 'Floor', 'Midpoint', 'Outlier'],
    correctIndex: 1,
    explanation: 'Because a PE firm\'s required return (~20–25%) caps how much it can pay, the LBO sets a floor — usually the lowest of the methods.'
  },
  {
    id: 'valuation-mcq-006', category: 'valuation', type: 'mcq', difficulty: 'intermediate',
    question: 'To value an unprofitable, early-stage company, the best multiple is often:',
    options: ['P/E', 'EV/EBITDA', 'EV/Revenue', 'EV/EBIT'],
    correctIndex: 2,
    explanation: 'With negative EBITDA and Net Income, EV/Revenue is used since revenue is still positive and meaningful.'
  },

  // ── VALUATION WALKTHROUGH (1) ────────────────────────────
  {
    id: 'valuation-walk-001', category: 'valuation', type: 'walkthrough', difficulty: 'intermediate',
    question: 'A CEO asks why you\'re presenting three different valuations instead of one number. How do you explain it?',
    modelAnswer: 'No single method is "correct" — each rests on different assumptions and biases. Comps reflect current market pricing of peers, precedents reflect what real acquirers paid (including control premiums), and the DCF reflects the company\'s own intrinsic cash generation. Presenting all three gives a defensible valuation RANGE (a "football field") and shows where the methods overlap, which is far more credible than false precision from one number.',
    rubric: ['No single method is correct', 'Names the 3 methods and what each reflects', 'Explains they give a range, not one number', 'Mentions the football field / overlap concept']
  },

  // ── DCF MCQ (9) ──────────────────────────────────────────
  {
    id: 'dcf-mcq-001', category: 'dcf', type: 'mcq', difficulty: 'beginner',
    question: 'A DCF values a company based on:',
    options: ['Peer trading multiples', 'The present value of its future free cash flows', 'Book value of assets', 'Past dividends'],
    correctIndex: 1,
    explanation: 'The DCF is the intrinsic method: a company is worth the present value of the free cash flows it will generate, discounted for time and risk.'
  },
  {
    id: 'dcf-mcq-002', category: 'dcf', type: 'mcq', difficulty: 'beginner',
    question: 'A standard DCF discounts which cash flow at which rate?',
    options: ['Levered FCF at Cost of Equity', 'Unlevered FCF at WACC', 'Net Income at the risk-free rate', 'EBITDA at Cost of Debt'],
    correctIndex: 1,
    explanation: 'Unlevered FCF belongs to all investors, so you discount it at WACC (the blended cost of all capital), yielding Enterprise Value.'
  },
  {
    id: 'dcf-mcq-003', category: 'dcf', type: 'mcq', difficulty: 'beginner',
    question: 'Unlevered Free Cash Flow equals:',
    options: ['Net Income + Depreciation', 'EBIT×(1−tax) + D&A − CapEx − increase in NWC', 'EBITDA − Taxes', 'Revenue − COGS'],
    correctIndex: 1,
    explanation: 'Unlevered FCF = EBIT×(1−tax) + D&A − CapEx − increase in Net Working Capital. It\'s pre-interest, so it values the whole business.'
  },
  {
    id: 'dcf-mcq-004', category: 'dcf', type: 'mcq', difficulty: 'intermediate',
    question: 'Cost of Equity via CAPM equals:',
    options: ['Risk-Free Rate × Beta', 'Risk-Free Rate + Beta × Equity Risk Premium', 'Beta + ERP', 'WACC − Cost of Debt'],
    correctIndex: 1,
    explanation: 'CAPM: Cost of Equity = Risk-Free Rate + Beta × Equity Risk Premium. Beta scales the market\'s risk premium to this specific stock.'
  },
  {
    id: 'dcf-mcq-005', category: 'dcf', type: 'mcq', difficulty: 'beginner',
    question: 'The terminal growth rate (Gordon Growth) should be:',
    options: ['Around 10%', 'Near long-term GDP/inflation, ~2–3%', 'Equal to WACC', 'As high as possible'],
    correctIndex: 1,
    explanation: 'No company can outgrow the economy forever, so g is pegged near long-term GDP/inflation (~2–3%). A g above ~4% is a red flag.'
  },
  {
    id: 'dcf-mcq-006', category: 'dcf', type: 'mcq', difficulty: 'beginner',
    question: 'Cost of Equity is higher than after-tax Cost of Debt because:',
    options: ['Equity holders are paid first', 'Equity is riskier — holders are paid last, so demand higher returns', 'Debt has no return', 'Taxes favor equity'],
    correctIndex: 1,
    explanation: 'Equity holders are last in line and bear more risk, so they demand higher returns. Debt is also cheaper because its interest is tax-deductible.'
  },
  {
    id: 'dcf-mcq-007', category: 'dcf', type: 'mcq', difficulty: 'beginner',
    question: 'Terminal Value typically represents what share of total DCF value?',
    options: ['Under 10%', 'About 25%', 'Often 50–75%+', 'Exactly 50% always'],
    correctIndex: 2,
    explanation: 'Most of a company\'s value sits in the distant future, so terminal value is usually the majority (50–75%+) of the DCF — which is why it dominates sensitivity analysis.'
  },
  {
    id: 'dcf-mcq-008', category: 'dcf', type: 'mcq', difficulty: 'beginner',
    question: 'All else equal, a higher WACC produces a:',
    options: ['Higher valuation', 'Lower valuation', 'Unchanged valuation', 'Negative valuation'],
    correctIndex: 1,
    explanation: 'A higher discount rate shrinks the present value of future cash flows, lowering the valuation.'
  },
  {
    id: 'dcf-mcq-009', category: 'dcf', type: 'mcq', difficulty: 'beginner',
    question: 'A DCF\'s main weakness is that it is:',
    options: ['Too simple', 'Highly sensitive to assumptions', 'Never used in banking', 'Independent of growth'],
    correctIndex: 1,
    explanation: 'Small changes in WACC, growth, or exit multiple swing the output dramatically ("garbage in, garbage out"), and it\'s least reliable for unpredictable companies.'
  },

  // ── DCF WALKTHROUGHS (2) ─────────────────────────────────
  {
    id: 'dcf-walk-001', category: 'dcf', type: 'walkthrough', difficulty: 'intermediate',
    question: 'Walk me through a DCF.',
    modelAnswer: '1) Project Unlevered Free Cash Flow (EBIT×(1−tax) + D&A − CapEx − ΔNWC) for ~5–10 years. 2) Calculate the discount rate, WACC (weighted after-tax cost of debt and CAPM-based cost of equity). 3) Calculate Terminal Value via Gordon Growth (final FCF×(1+g)/(WACC−g)) or an exit multiple. 4) Discount the FCFs and Terminal Value to present value at WACC. 5) Sum to get Enterprise Value, then subtract net debt (and preferred/minority) and divide by diluted shares for implied share price.',
    rubric: ['Projects unlevered FCF with correct formula', 'Discount rate = WACC', 'Terminal Value (Gordon Growth or exit multiple)', 'Discounts to present value', 'Sums to EV then bridges to equity/share price']
  },
  {
    id: 'dcf-walk-002', category: 'dcf', type: 'walkthrough', difficulty: 'intermediate',
    question: 'Why do you use unlevered free cash flow and WACC together, rather than levered FCF?',
    modelAnswer: 'Unlevered FCF is before the effect of debt (before interest), so it represents cash available to ALL investors and is independent of capital structure. Because it belongs to everyone, you discount it at WACC — the blended required return of all capital providers — and you get Enterprise Value directly. Levered FCF (after interest, after debt repayment) belongs to equity only and would be discounted at the cost of equity to get Equity Value; the unlevered approach is standard because it isolates the operating business from financing decisions.',
    rubric: ['Unlevered FCF is pre-interest / capital-structure-neutral', 'Belongs to all investors', 'Discounted at WACC → Enterprise Value', 'Contrasts with levered FCF → cost of equity → equity value']
  },

  // ── M&A MCQ (6) ──────────────────────────────────────────
  {
    id: 'manda-mcq-001', category: 'ma', type: 'mcq', difficulty: 'beginner',
    question: 'Accretion/dilution measures whether, after a deal, the combined company\'s ____ rises or falls:',
    options: ['Revenue', 'EPS (Earnings Per Share)', 'Cash balance', 'Headcount'],
    correctIndex: 1,
    explanation: 'Accretion/dilution compares combined EPS to the acquirer\'s standalone EPS. Higher = accretive, lower = dilutive.'
  },
  {
    id: 'manda-mcq-002', category: 'ma', type: 'mcq', difficulty: 'beginner',
    question: 'In an all-stock deal, the deal is accretive when the acquirer\'s P/E is:',
    options: ['Lower than the target\'s', 'Higher than the target\'s', 'Equal to the target\'s', 'Negative'],
    correctIndex: 1,
    explanation: 'A higher-P/E acquirer issues "expensive" shares to buy "cheap" earnings, adding more earnings per share than shares — accretive. (Add the control premium to the target\'s effective P/E.)'
  },
  {
    id: 'manda-mcq-003', category: 'ma', type: 'mcq', difficulty: 'beginner',
    question: 'Ranked cheapest to most expensive, acquisition funding is generally:',
    options: ['Stock < Debt < Cash', 'Cash < Debt < Stock', 'Debt < Cash < Stock', 'Cash < Stock < Debt'],
    correctIndex: 1,
    explanation: 'Cash is cheapest (little foregone interest), debt is modest and tax-deductible, and stock is most expensive (highest required return + dilution).'
  },
  {
    id: 'manda-mcq-004', category: 'ma', type: 'mcq', difficulty: 'beginner',
    question: 'Which synergies do acquirers trust more?',
    options: ['Revenue synergies', 'Cost synergies', 'Tax synergies only', 'Neither'],
    correctIndex: 1,
    explanation: 'Cost synergies (cutting duplicate costs) are more reliable and quantifiable. Revenue synergies (cross-selling) often fail to materialize and are discounted.'
  },
  {
    id: 'manda-mcq-005', category: 'ma', type: 'mcq', difficulty: 'intermediate',
    question: 'Goodwill created in an acquisition equals:',
    options: ['Purchase Price + Debt', 'Purchase Price − Fair Value of net identifiable assets', 'Cash − Debt', 'Target\'s old equity'],
    correctIndex: 1,
    explanation: 'Goodwill = Purchase Price − Fair Value of the target\'s net identifiable assets. It plugs the balance sheet for the premium paid over tangible worth.'
  },
  {
    id: 'manda-mcq-006', category: 'ma', type: 'mcq', difficulty: 'beginner',
    question: 'A dilutive acquisition is:',
    options: ['Always a bad deal', 'Sometimes justified by synergies or strategic value', 'Illegal', 'Impossible with cash'],
    correctIndex: 1,
    explanation: 'Short-term dilution can be worth long-term value from synergies, market entry, or must-have technology. Dilutive isn\'t automatically bad.'
  },

  // ── M&A WALKTHROUGHS (2) ─────────────────────────────────
  {
    id: 'manda-walk-001', category: 'ma', type: 'walkthrough', difficulty: 'intermediate',
    question: 'Company A (P/E of 20) acquires Company B (P/E of 15) in an all-stock deal. Accretive or dilutive, and why?',
    modelAnswer: 'Accretive. In an all-stock deal, compare P/E ratios: the acquirer\'s P/E (20) is higher than the target\'s (15), so A is issuing relatively "expensive" shares to acquire relatively "cheap" earnings — it adds more earnings per share than it adds shares, raising combined EPS. Caveat: you must add the control premium to B\'s effective purchase P/E; if the premium pushes B\'s effective P/E above 20, the deal would flip to dilutive.',
    rubric: ['Concludes accretive', 'Compares P/E ratios (acquirer higher)', 'Explains "expensive shares for cheap earnings"', 'Notes the control-premium caveat']
  },
  {
    id: 'manda-walk-002', category: 'ma', type: 'walkthrough', difficulty: 'intermediate',
    question: 'Walk me through a basic merger model.',
    modelAnswer: '1) Set assumptions: purchase price, % cash/debt/stock, expected synergies. 2) Combine the two income statements. 3) Adjust for financing: subtract after-tax interest on new debt or foregone interest on cash used, add after-tax synergies, and add new shares issued for the stock portion. 4) Compute combined EPS = adjusted combined Net Income ÷ combined shares. 5) Compare combined EPS to the acquirer\'s standalone EPS → accretion or dilution. 6) Build the combined balance sheet using purchase accounting (wipe target equity, mark assets to fair value, create Goodwill).',
    rubric: ['Sets purchase/financing/synergy assumptions', 'Combines income statements', 'Adjusts for financing (interest/foregone interest/new shares)', 'Computes combined EPS vs. standalone', 'Mentions purchase accounting & Goodwill']
  },

  // ── LBO MCQ (8) ──────────────────────────────────────────
  {
    id: 'lbo-mcq-001', category: 'lbo', type: 'mcq', difficulty: 'beginner',
    question: 'An LBO is best compared to:',
    options: ['A cash purchase of a house', 'Buying a house with a mortgage', 'Renting an apartment', 'Buying stocks on margin only'],
    correctIndex: 1,
    explanation: 'An LBO buys a company mostly with debt (like a mortgage), lets the company\'s cash flow pay it down, and sells later — leverage magnifies equity returns.'
  },
  {
    id: 'lbo-mcq-002', category: 'lbo', type: 'mcq', difficulty: 'beginner',
    question: 'The three sources of LBO returns are:',
    options: ['Dividends, buybacks, splits', 'Debt paydown, EBITDA growth, multiple expansion', 'Revenue, margins, taxes', 'Interest, principal, fees'],
    correctIndex: 1,
    explanation: 'Returns come from debt paydown (deleveraging), EBITDA growth, and multiple expansion (least reliable). Good firms don\'t count on multiple expansion.'
  },
  {
    id: 'lbo-mcq-003', category: 'lbo', type: 'mcq', difficulty: 'beginner',
    question: 'Leverage magnifies equity returns because:',
    options: ['Debt is free', 'A small equity base captures all upside above the fixed debt claim', 'Interest isn\'t paid', 'It reduces risk'],
    correctIndex: 1,
    explanation: 'Equity is a small slice that captures all value above the debt\'s fixed claim, so gains (and losses) on the whole company are amplified on that small base.'
  },
  {
    id: 'lbo-mcq-004', category: 'lbo', type: 'mcq', difficulty: 'beginner',
    question: 'A typical PE firm targets an IRR of about:',
    options: ['5%', '10%', '20–25%+', '50%+'],
    correctIndex: 2,
    explanation: 'Private equity funds generally target ~20–25%+ IRR, which is why the LBO sets a floor valuation — a high required return caps the affordable price.'
  },
  {
    id: 'lbo-mcq-005', category: 'lbo', type: 'mcq', difficulty: 'beginner',
    question: 'Which is an ideal LBO candidate trait?',
    options: ['High, volatile CapEx', 'Stable, predictable cash flows', 'Already heavily indebted', 'Declining margins'],
    correctIndex: 1,
    explanation: 'Stable predictable cash flows let the company service heavy debt safely. Low existing debt, low CapEx, strong margins, and a clear exit are also ideal.'
  },
  {
    id: 'lbo-mcq-006', category: 'lbo', type: 'mcq', difficulty: 'intermediate',
    question: 'In the LBO debt stack, which is safest and cheapest?',
    options: ['Mezzanine debt', 'High-yield notes', 'Senior secured term loans / revolver', 'Equity'],
    correctIndex: 2,
    explanation: 'The revolver and senior secured term loans are first in priority, collateralized, and cheapest. Mezzanine is last among debt and most expensive.'
  },
  {
    id: 'lbo-mcq-007', category: 'lbo', type: 'mcq', difficulty: 'intermediate',
    question: 'All else equal, using MORE debt in an LBO generally:',
    options: ['Lowers IRR', 'Raises IRR (until risk dominates)', 'Has no effect', 'Eliminates risk'],
    correctIndex: 1,
    explanation: 'More leverage means less equity invested and more magnification, raising IRR — up to the point where bankruptcy risk and interest burden dominate.'
  },
  {
    id: 'lbo-mcq-008', category: 'lbo', type: 'mcq', difficulty: 'intermediate',
    question: 'Between a DCF and an LBO, which usually gives the higher valuation?',
    options: ['LBO', 'DCF', 'Always equal', 'Neither can be compared'],
    correctIndex: 1,
    explanation: 'The DCF is usually higher; the LBO\'s required-return constraint holds the affordable price down, making it a floor.'
  },

  // ── LBO WALKTHROUGHS (2) ─────────────────────────────────
  {
    id: 'lbo-walk-001', category: 'lbo', type: 'walkthrough', difficulty: 'intermediate',
    question: 'Why does a private equity firm use so much debt in a leveraged buyout?',
    modelAnswer: 'Three reasons. First, leverage magnifies returns on the equity invested: a small equity base captures all the upside above the debt\'s fixed claim, so debt paydown and EBITDA growth translate into outsized equity returns. Second, debt is cheaper than equity, and interest is tax-deductible, lowering the cost of capital. Third, using less of the firm\'s own money lets it spread capital across more deals. The trade-off is risk — the same leverage that magnifies gains can wipe out the equity if the company can\'t service its debt.',
    rubric: ['Leverage magnifies equity returns', 'Debt is cheaper than equity + tax-deductible interest', 'Spreads capital across more deals', 'Acknowledges the risk trade-off']
  },
  {
    id: 'lbo-walk-002', category: 'lbo', type: 'walkthrough', difficulty: 'intermediate',
    question: 'Walk me through a simple (paper) LBO.',
    modelAnswer: 'Assume entry EBITDA and an entry multiple → purchase price (EV). Split funding into debt and PE equity (e.g., 60% debt / 40% equity); the equity is the plug. Project EBITDA and free cash flow over ~5 years; use the free cash flow as a cash sweep to pay down debt each year. At exit, Exit EV = exit-year EBITDA × exit multiple; Exit Equity Value = Exit EV − remaining net debt. Returns: MOIC = Exit Equity ÷ Initial Equity; approximate the IRR from the MOIC and holding period (e.g., ~2× over 5 years ≈ 15% IRR, ~3× ≈ 25%).',
    rubric: ['Entry: EBITDA × multiple = price', 'Debt/equity split, equity as plug', 'Projects EBITDA/FCF and sweeps cash to pay debt', 'Exit EV = EBITDA × exit multiple; minus net debt', 'Computes MOIC and approximate IRR']
  },

  // ── BRAIN TEASERS MCQ (5) ────────────────────────────────
  {
    id: 'brain-teasers-mcq-001', category: 'brainteasers', type: 'mcq', difficulty: 'beginner',
    question: 'Using the Rule of 72, money invested at 9% doubles in roughly:',
    options: ['9 years', '8 years', '6 years', '12 years'],
    correctIndex: 1,
    explanation: '72 ÷ 9 = 8 years. The Rule of 72 gives a fast doubling-time estimate for a given rate.'
  },
  {
    id: 'brain-teasers-mcq-002', category: 'brainteasers', type: 'mcq', difficulty: 'beginner',
    question: 'If 5 machines make 5 widgets in 5 minutes, how long do 100 machines take to make 100 widgets?',
    options: ['100 minutes', '5 minutes', '20 minutes', '1 minute'],
    correctIndex: 1,
    explanation: 'Each machine makes 1 widget in 5 minutes. 100 machines working in parallel make 100 widgets in the same 5 minutes. The "100 minutes" answer is the classic trap.'
  },
  {
    id: 'brain-teasers-mcq-003', category: 'brainteasers', type: 'mcq', difficulty: 'intermediate',
    question: 'The probability of rolling at least one 6 in four rolls of a fair die is closest to:',
    options: ['11%', '52%', '67%', '4%'],
    correctIndex: 1,
    explanation: 'Use the complement: 1 − (5/6)^4 = 1 − 0.482 ≈ 51.8%. Complements make "at least one" problems easy.'
  },
  {
    id: 'brain-teasers-mcq-004', category: 'brainteasers', type: 'mcq', difficulty: 'intermediate',
    question: 'A stock at $100 has a 50% chance of +$40 and 50% of −$30. Its expected value change is:',
    options: ['−$5', '+$5', '+$70', '$0'],
    correctIndex: 1,
    explanation: 'EV = 0.5×(+40) + 0.5×(−30) = 20 − 15 = +$5. Positive expected value, though the answer also depends on risk tolerance.'
  },
  {
    id: 'brain-teasers-mcq-005', category: 'brainteasers', type: 'mcq', difficulty: 'beginner',
    question: 'For brain teasers, interviewers primarily grade:',
    options: ['The exact number', 'Your reasoning process and stated assumptions', 'Speed only', 'Whether you use a calculator'],
    correctIndex: 1,
    explanation: 'Estimation and logic teasers reward a structured, verbalized approach and clear assumptions far more than a precise figure.'
  },

  // ── FIT MCQ (5) ──────────────────────────────────────────
  {
    id: 'fit-mcq-001', category: 'fit', type: 'mcq', difficulty: 'beginner',
    question: 'The most important interview question, which frames the whole interview, is:',
    options: ['What\'s your greatest weakness?', 'Walk me through your resume / Tell me about yourself', 'Why our firm?', 'Where else are you interviewing?'],
    correctIndex: 1,
    explanation: 'Your "story" opens nearly every interview; nail it and everything references it, fumble it and the interviewer disengages within ~90 seconds.'
  },
  {
    id: 'fit-mcq-002', category: 'fit', type: 'mcq', difficulty: 'beginner',
    question: 'A strong "walk me through your resume" answer is:',
    options: ['A line-by-line recital of your resume', 'A chronological narrative (origin → spark → build → why here) in 2–3 minutes', 'A 30-second summary', 'A 6-minute deep dive'],
    correctIndex: 1,
    explanation: 'It should be a chronological story connecting each step toward finance, ending with why you\'re here today, in about 2–3 minutes — not a list.'
  },
  {
    id: 'fit-mcq-003', category: 'fit', type: 'mcq', difficulty: 'beginner',
    question: 'The best way to answer a "weakness" question is to:',
    options: ['Say you work too hard', 'Name a real but non-fatal weakness plus how you improved it', 'Say you have none', 'Blame a former team'],
    correctIndex: 1,
    explanation: '"Work too hard" is a fake non-answer; a fatal weakness disqualifies you. A real, minor weakness with a genuine improvement story is credible.'
  },
  {
    id: 'fit-mcq-004', category: 'fit', type: 'mcq', difficulty: 'beginner',
    question: '"Why our firm?" is best answered by focusing on:',
    options: ['Generic prestige', 'Specific people you\'ve met and what they told you', 'The bank\'s stock price', 'Its office location'],
    correctIndex: 1,
    explanation: 'Most banks\' cultures are similar, so specific people and anecdotes are far more convincing than generic reasons.'
  },
  {
    id: 'fit-mcq-005', category: 'fit', type: 'mcq', difficulty: 'beginner',
    question: 'Which four qualities should every fit answer reinforce?',
    options: ['Rich, connected, tall, loud', 'Smart, hardworking, likeable, committed', 'Aggressive, quiet, lucky, cheap', 'Creative, distant, casual, flexible'],
    correctIndex: 1,
    explanation: 'Interviewers are checking that you\'re smart, hardworking, likeable, and genuinely committed to banking — every answer should quietly support these.'
  },

  // ── FIT WALKTHROUGHS (2) ─────────────────────────────────
  {
    id: 'fit-walk-001', category: 'fit', type: 'walkthrough', difficulty: 'intermediate',
    question: 'Tell me about yourself / walk me through your resume.',
    modelAnswer: '(Model structure — the candidate fills in specifics.) Start at the beginning (where you\'re from / how you reached college), briefly. Describe the spark that got you interested in finance/business. Trace how that interest grew through specific internships, classes, and experiences, each leading logically to the next — a narrative, not a list. Close with a strong statement of why you\'re interviewing here today. Chronological, ~2–3 minutes, confident about wanting banking, delivered without reading from the resume.',
    rubric: ['Chronological order', 'Shows each step leading toward finance', '~2–3 minutes', 'Ends with why here today', 'Sounds certain about banking']
  },
  {
    id: 'fit-walk-002', category: 'fit', type: 'walkthrough', difficulty: 'intermediate',
    question: 'Why investment banking?',
    modelAnswer: '(Model structure.) Two pillars: (1) You\'ve done your homework — cite specific bankers you\'ve spoken with and what drew you in — and (2) you hold a long-term view and accept the short-term sacrifice. Substantive reasons: wanting to learn how companies make major strategic decisions, working on high-impact transactions, and building a strong analytical/finance skill set at the center of deals. Avoid "I want to make money" and avoid vague passion with no evidence behind it.',
    rubric: ['Cites having done homework / specific people', 'Long-term view accepting short-term sacrifice', 'Substantive reasons (impact, skills, deals)', 'Avoids money / vague passion']
  },
];

export const getQuestionsByCategory = (category: Category) =>
  questions.filter(q => q.category === category);

export const getRandomQuestions = (count: number, category?: Category): Question[] => {
  const pool = category ? getQuestionsByCategory(category) : questions;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};
