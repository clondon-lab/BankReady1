export type Difficulty = 'easy' | 'medium' | 'hard';
export type Category = 'accounting' | 'valuation' | 'dcf' | 'ma' | 'lbo' | 'brainteasers';

export interface Question {
  id: string;
  category: Category;
  subcategory: string;
  difficulty: Difficulty;
  question: string;
  answer: string;
  keyPoints?: string[];
  followUp?: string;
}

export const questions: Question[] = [
  // ===== ACCOUNTING =====
  {
    id: 'acc-001',
    category: 'accounting',
    subcategory: 'Three Statements',
    difficulty: 'easy',
    question: 'Walk me through the 3 financial statements.',
    answer: 'The 3 financial statements are the Income Statement, Balance Sheet, and Cash Flow Statement. The Income Statement shows a company\'s revenues and expenses over a period, resulting in Net Income. The Balance Sheet shows a snapshot of assets, liabilities, and equity at a point in time. The Cash Flow Statement reconciles Net Income to actual cash generated, broken into Operating, Investing, and Financing activities.',
    keyPoints: [
      'Income Statement: Revenue → Net Income (period of time)',
      'Balance Sheet: Assets = Liabilities + Equity (snapshot)',
      'Cash Flow: Net Income → Cash (operating, investing, financing)',
      'Assets = Liabilities + Shareholders\' Equity always holds'
    ],
    followUp: 'How do the three statements link together?'
  },
  {
    id: 'acc-002',
    category: 'accounting',
    subcategory: 'Statement Links',
    difficulty: 'medium',
    question: 'How do the 3 financial statements link together?',
    answer: 'Net Income from the Income Statement flows into both the Cash Flow Statement (as the starting point for Operating Activities) and the Balance Sheet (as an increase to Retained Earnings under Equity). Cash from the bottom of the Cash Flow Statement flows to the Cash & Equivalents line on the Balance Sheet. Depreciation appears on the Income Statement but is added back on the Cash Flow Statement as a non-cash charge.',
    keyPoints: [
      'Net Income → top of Cash Flow Statement',
      'Net Income → Retained Earnings on Balance Sheet',
      'Ending cash on CFS = Cash on Balance Sheet',
      'D&A: Income Statement expense, add-back on CFS'
    ]
  },
  {
    id: 'acc-003',
    category: 'accounting',
    subcategory: 'Income Statement',
    difficulty: 'medium',
    question: 'If depreciation increases by $10, how does each financial statement change? Assume a 40% tax rate.',
    answer: 'Income Statement: Operating Income (EBIT) falls by $10, pre-tax income falls by $10, taxes fall by $4 (10 × 40%), and Net Income falls by $6. Balance Sheet: PP&E falls by $10, Cash falls by nothing initially—but deferred tax asset or cash tax payment adjusts. Equity (Retained Earnings) falls by $6. Cash Flow Statement: Net Income falls by $6 in Operating Activities, but D&A add-back increases by $10, so net operating cash flow increases by $4. Balance Sheet still balances: Assets down $6 (net PP&E down $10, cash up $4 from tax benefit), Equity down $6.',
    keyPoints: [
      'Pre-tax impact: -$10',
      'After-tax impact on Net Income: -$6',
      'D&A is a non-cash charge, add back on CFS',
      'Net cash flow impact: +$4 (tax shield)',
      'Balance sheet: Cash +$4, PP&E -$10, RE -$6'
    ]
  },
  {
    id: 'acc-004',
    category: 'accounting',
    subcategory: 'Working Capital',
    difficulty: 'medium',
    question: 'Walk me through how working capital affects the cash flow statement.',
    answer: 'Changes in working capital appear in the Operating section of the Cash Flow Statement. An increase in a current asset (like Accounts Receivable) is a use of cash (negative). A decrease in a current asset is a source of cash (positive). An increase in a current liability (like Accounts Payable) is a source of cash (positive). A decrease in a current liability is a use of cash (negative). Working Capital = Current Assets - Current Liabilities. If a company collects cash faster (lower DSO), it generates more cash from operations.',
    keyPoints: [
      '↑ AR (asset) → uses cash (negative on CFS)',
      '↓ AR → source of cash (positive)',
      '↑ AP (liability) → source of cash (positive)',
      '↓ AP → uses cash (negative)',
      'NWC = Current Assets - Current Liabilities'
    ]
  },
  {
    id: 'acc-005',
    category: 'accounting',
    subcategory: 'Key Ratios',
    difficulty: 'easy',
    question: 'What is EBITDA and why do bankers use it?',
    answer: 'EBITDA stands for Earnings Before Interest, Taxes, Depreciation, and Amortization. Bankers use it as a proxy for cash flow from operations because it strips out non-cash charges (D&A) and capital structure differences (interest, taxes). It\'s useful for comparing companies across capital structures and tax regimes. Most valuation multiples (EV/EBITDA) are based on it. However, EBITDA ignores capex, working capital changes, and can be misleading for capital-intensive businesses.',
    keyPoints: [
      'EBITDA = Net Income + Interest + Taxes + D&A',
      'Or: EBIT + D&A',
      'Strips out capital structure and accounting differences',
      'Used in EV/EBITDA multiple for valuation',
      'Weakness: ignores capex, WC changes'
    ]
  },
  {
    id: 'acc-006',
    category: 'accounting',
    subcategory: 'Income Statement',
    difficulty: 'easy',
    question: 'What is the difference between gross profit and operating income (EBIT)?',
    answer: 'Gross Profit = Revenue - Cost of Goods Sold (COGS). It measures profitability before overhead. Operating Income (EBIT) = Gross Profit - Operating Expenses (SG&A, R&D, D&A). EBIT measures profitability from core operations before interest and taxes. The Gross Margin tells you how efficiently a company produces its product. Operating Margin tells you how efficiently it runs the entire business.',
    keyPoints: [
      'Gross Profit = Revenue - COGS',
      'EBIT = Gross Profit - Operating Expenses',
      'Gross Margin = Gross Profit / Revenue',
      'Operating Margin = EBIT / Revenue'
    ]
  },
  {
    id: 'acc-007',
    category: 'accounting',
    subcategory: 'Balance Sheet',
    difficulty: 'medium',
    question: 'A company buys $100 of equipment with cash. Walk me through the impact on all 3 financial statements.',
    answer: 'Income Statement: No immediate impact (equipment is capitalized, not expensed). Over time, depreciation will appear. Balance Sheet: Cash decreases by $100, PP&E increases by $100—net effect is zero, balance sheet stays balanced. Cash Flow Statement: $100 outflow in the Investing Activities section (CapEx). Net income unchanged, but investing cash outflow of -$100.',
    keyPoints: [
      'IS: No immediate impact',
      'BS: Cash -$100, PP&E +$100 (no net change)',
      'CFS: CapEx -$100 in investing activities',
      'Depreciation appears over asset\'s useful life'
    ]
  },
  {
    id: 'acc-008',
    category: 'accounting',
    subcategory: 'Balance Sheet',
    difficulty: 'hard',
    question: 'What happens when a company issues $200 of stock and uses the proceeds to pay down $200 of debt?',
    answer: 'Balance Sheet: Cash increases by $200 (from stock issuance), then immediately decreases by $200 (debt paydown)—net cash change is zero. Total liabilities decrease by $200 (debt gone). Total equity increases by $200 (new stock). Balance sheet still balances: assets unchanged, liabilities -$200, equity +$200. Income Statement: Going forward, interest expense decreases, increasing Net Income. Cash Flow Statement: +$200 in Financing (equity issuance), -$200 in Financing (debt repayment)—net financing cash flow is zero.',
    keyPoints: [
      'Net cash impact: $0',
      'BS: Liabilities -$200, Equity +$200',
      'CFS: Financing +$200, -$200 = net $0',
      'Future IS benefit: lower interest expense'
    ]
  },
  {
    id: 'acc-009',
    category: 'accounting',
    subcategory: 'Cash Flow',
    difficulty: 'medium',
    question: 'What is the difference between cash-based and accrual-based accounting?',
    answer: 'Under cash-based accounting, revenue is recognized when cash is received and expenses when cash is paid. Under accrual accounting (GAAP), revenue is recognized when earned (regardless of cash receipt) and expenses when incurred. Accrual accounting better matches revenue with the expenses that generated it. For example, if a company does $100 of work in December but gets paid in January, under accrual it shows $100 revenue in December; under cash basis it shows nothing in December.',
    keyPoints: [
      'Cash basis: recognize when cash moves',
      'Accrual: recognize when earned/incurred',
      'GAAP requires accrual accounting',
      'Key accounts: AR, AP, deferred revenue, accrued expenses'
    ]
  },
  {
    id: 'acc-010',
    category: 'accounting',
    subcategory: 'Key Ratios',
    difficulty: 'medium',
    question: 'What are the key financial ratios an investment banker should know?',
    answer: 'Leverage: Net Debt / EBITDA, Debt / Equity. Coverage: EBITDA / Interest Expense, EBIT / Interest. Profitability: Gross Margin, EBITDA Margin, Net Margin, ROE, ROA, ROIC. Liquidity: Current Ratio (Current Assets/Liabilities), Quick Ratio. Efficiency: DSO (AR/Revenue × 365), DIO, DPO. Valuation: EV/EBITDA, EV/Revenue, P/E.',
    keyPoints: [
      'Leverage: Net Debt/EBITDA',
      'Coverage: EBITDA/Interest',
      'Profitability: EBITDA margin, ROIC',
      'Liquidity: Current ratio',
      'Valuation: EV/EBITDA, P/E'
    ]
  },
  {
    id: 'acc-011',
    category: 'accounting',
    subcategory: 'Working Capital',
    difficulty: 'hard',
    question: 'What does it mean if a company has negative working capital? Is that good or bad?',
    answer: 'Negative working capital means current liabilities exceed current assets. For most companies, this signals liquidity risk. However, for retailers and subscription businesses (like Amazon, Costco, McDonald\'s), negative working capital is a sign of business strength—customers pay upfront (cash) before the company has to pay suppliers (AP). This creates a self-funding business model where the company essentially borrows interest-free from suppliers. Context matters enormously.',
    keyPoints: [
      'Negative NWC = Current Liabilities > Current Assets',
      'Generally negative: liquidity risk',
      'Exception: retail/subscription models (Costco, Amazon)',
      'These businesses collect cash before paying suppliers',
      'Evaluate in context of business model'
    ]
  },
  {
    id: 'acc-012',
    category: 'accounting',
    subcategory: 'Income Statement',
    difficulty: 'medium',
    question: 'What is the difference between operating and non-operating items on the income statement?',
    answer: 'Operating items relate to the company\'s core business: revenue, COGS, gross profit, SG&A, R&D, D&A, and EBIT. Non-operating items are below EBIT and include interest income/expense, gains/losses on investments, foreign exchange gains/losses, and other one-time items. The distinction matters because operating items recur and reflect business performance; non-operating items can distort comparability.',
    keyPoints: [
      'Operating: Revenue through EBIT',
      'Non-operating: Interest, FX, one-time items',
      'EBT = EBIT + Non-operating items',
      'Bankers often focus on "adjusted EBITDA" stripping non-recurring items'
    ]
  },

  // ===== VALUATION =====
  {
    id: 'val-001',
    category: 'valuation',
    subcategory: 'Methodologies',
    difficulty: 'easy',
    question: 'What are the main valuation methodologies and when would you use each?',
    answer: 'The three core methodologies are: (1) Comparable Company Analysis (Comps)—uses trading multiples of public peers; best for publicly traded companies with clear comps. (2) Precedent Transaction Analysis—uses multiples from M&A deals; includes control premium, best for M&A situations. (3) DCF Analysis—intrinsic value based on projected free cash flows; best when you have visibility into future cash flows. In M&A, bankers typically use all three and show results in a "football field" chart.',
    keyPoints: [
      'Comps: Public market multiples (EV/EBITDA, P/E)',
      'Precedent transactions: M&A multiples, includes control premium',
      'DCF: Intrinsic value, cash flow based',
      'Generally: Precedents > Comps > DCF (on valuation)',
      'Football field shows all three ranges together'
    ]
  },
  {
    id: 'val-002',
    category: 'valuation',
    subcategory: 'Trading Comps',
    difficulty: 'medium',
    question: 'Walk me through how you would build a comparable company analysis.',
    answer: 'Step 1: Select peers—similar size, business model, geography, growth profile. Step 2: Spread financials—Revenue, EBITDA, EBIT, Net Income (LTM and forward estimates). Step 3: Calculate Enterprise Value for each comp (market cap + net debt + minority interest - associates). Step 4: Calculate multiples—EV/Revenue, EV/EBITDA, EV/EBIT, P/E. Step 5: Apply median/mean multiples to your target company\'s metrics to derive an implied valuation range.',
    keyPoints: [
      'Peer selection is the art—similar business model',
      'LTM vs NTM multiples',
      'EV = Mkt Cap + Net Debt + Minority Interest - Associates',
      'EV/EBITDA most common for industrial/services companies',
      'Apply range (25th–75th percentile) to target'
    ]
  },
  {
    id: 'val-003',
    category: 'valuation',
    subcategory: 'Enterprise Value',
    difficulty: 'medium',
    question: 'What is the difference between Enterprise Value and Equity Value? Walk me through the bridge.',
    answer: 'Equity Value (market cap) represents the value to equity shareholders. Enterprise Value represents the total value of the firm to all capital providers. The bridge: EV = Equity Value + Total Debt + Preferred Stock + Minority Interest - Cash & Equivalents - Associates/Investments. To go from EV to Equity Value: subtract debt, preferred, minority interest; add back cash and associates. EV is used with unlevered metrics (EBITDA, EBIT, FCF); Equity Value with levered metrics (Net Income, EPS).',
    keyPoints: [
      'EV = Equity Value + Debt + Preferred + Minority Interest - Cash',
      'EV is capital-structure neutral',
      'EV → Equity: subtract net debt, preferred, minority interest',
      'EV multiples: EV/EBITDA, EV/Revenue (unlevered)',
      'Equity multiples: P/E, P/Book (levered)'
    ]
  },
  {
    id: 'val-004',
    category: 'valuation',
    subcategory: 'Trading Comps',
    difficulty: 'medium',
    question: 'What is LTM and why do you use it in comps?',
    answer: 'LTM stands for Last Twelve Months (also called TTM, Trailing Twelve Months). It represents the most recent 12 months of financial data and is used in comps because it\'s the most current view of performance, more recent than the last full fiscal year. LTM = Last Fiscal Year + YTD Current Period - YTD Prior Year Period. Using LTM ensures you\'re comparing companies on the same time basis with the most current information available.',
    keyPoints: [
      'LTM = most recent 12 months of data',
      'LTM formula: FY + YTD - Prior Year YTD',
      'More current than last full fiscal year',
      'NTM = Next Twelve Months (forward-looking)',
      'Public comps often use both LTM and NTM'
    ]
  },
  {
    id: 'val-005',
    category: 'valuation',
    subcategory: 'Precedent Transactions',
    difficulty: 'medium',
    question: 'Why are precedent transaction multiples typically higher than trading comps?',
    answer: 'Precedent transaction multiples include a control premium—the premium an acquirer pays above the current trading price to gain control of the target. This premium typically ranges from 20-40% above the unaffected share price. Acquirers pay this because they expect to capture synergies (cost and revenue) that they can\'t get as a passive minority shareholder. Additionally, transactions reflect strategic value and competitive bidding dynamics, whereas trading comps reflect daily public market sentiment.',
    keyPoints: [
      'Control premium: 20-40% above unaffected price',
      'Synergies (cost cuts + revenue uplift) justify premium',
      'Competitive bidding can drive multiples higher',
      'Precedents are "en vogue" in M&A pitchbooks',
      'Comps = minority, liquid market value; Precedents = control value'
    ]
  },
  {
    id: 'val-006',
    category: 'valuation',
    subcategory: 'Valuation Mechanics',
    difficulty: 'hard',
    question: 'Walk me through a situation where you would NOT use EV/EBITDA as a valuation multiple.',
    answer: 'Several situations: (1) Financial institutions (banks, insurance)—use P/Book or P/E because interest income/expense is part of operations, not financing. (2) Capital-intensive businesses with high D&A—EV/EBITDA can mislead because capex needs differ (use EV/EBIT or EV/(EBITDA-Capex)). (3) Companies with significant real estate (use EV/EBITDAR, adding rent back). (4) Early-stage/unprofitable companies—use EV/Revenue or EV/Gross Profit. (5) Oil & gas—use EV/Proved Reserves or EV/BOE.',
    keyPoints: [
      'Banks/insurance: P/Book, P/E',
      'Capital-intensive: EV/EBIT or EV/(EBITDA-CapEx)',
      'Real estate heavy: EV/EBITDAR',
      'Unprofitable: EV/Revenue, EV/Gross Profit',
      'O&G: EV/Reserves, EV/EBITDAX'
    ]
  },
  {
    id: 'val-007',
    category: 'valuation',
    subcategory: 'Valuation Mechanics',
    difficulty: 'easy',
    question: 'What makes a good set of comparable companies?',
    answer: 'Good comps share: similar business model and industry, similar size (revenue/EBITDA), similar growth profile, similar margins and profitability, similar geography/end markets, and similar capital structure risks. In practice, you rarely find perfect comps. You must balance having too few (not statistically meaningful) vs too many (diluted by poor comps). Bankers often use 5-10 comps. You should be able to justify every company you include or exclude.',
    keyPoints: [
      'Similar industry and business model (most important)',
      'Similar size, growth, margins',
      'Similar geographic exposure',
      'Typically 5-10 companies',
      'Must be able to explain inclusions/exclusions'
    ]
  },
  {
    id: 'val-008',
    category: 'valuation',
    subcategory: 'Valuation Mechanics',
    difficulty: 'medium',
    question: 'Which valuation methodology typically gives the highest value? The lowest?',
    answer: 'Precedent Transactions typically give the highest value because they include a control premium. DCF can swing either direction depending on assumptions—bullish assumptions yield high values, conservative ones low values. Comps typically reflect current public market sentiment and fall in the middle. In a strong M&A market, the order is usually: Precedents > DCF > Comps. In a depressed market: DCF > Precedents > Comps. This is why the football field presentation is valuable—it shows the full range.',
    keyPoints: [
      'Typically highest: Precedents (control premium)',
      'Middle: Comps (current market)',
      'Variable: DCF (depends on assumptions)',
      'DCF can be highest or lowest based on inputs',
      'Football field chart shows all ranges'
    ]
  },

  // ===== DCF =====
  {
    id: 'dcf-001',
    category: 'dcf',
    subcategory: 'DCF Overview',
    difficulty: 'easy',
    question: 'Walk me through a DCF analysis.',
    answer: 'A DCF values a company based on the present value of its future free cash flows. Steps: (1) Project Free Cash Flows for 5-10 years (EBIT × (1-tax rate) + D&A - CapEx - ΔNWC). (2) Calculate Terminal Value using either the Gordon Growth Model (FCF × (1+g) / (WACC - g)) or Exit Multiple method (EBITDA × multiple). (3) Discount all cash flows (FCFs + TV) to present value using WACC. (4) Sum the PV of FCFs and PV of Terminal Value to get Enterprise Value. (5) Subtract net debt to get Equity Value; divide by shares to get implied share price.',
    keyPoints: [
      'Project FCFs: EBIT(1-t) + D&A - CapEx - ΔNWC',
      'Terminal Value: Gordon Growth or Exit Multiple',
      'Discount at WACC',
      'EV = PV(FCFs) + PV(TV)',
      'Equity Value = EV - Net Debt'
    ]
  },
  {
    id: 'dcf-002',
    category: 'dcf',
    subcategory: 'WACC',
    difficulty: 'hard',
    question: 'How do you calculate WACC?',
    answer: 'WACC = (E/V) × Re + (D/V) × Rd × (1-T). Where: E = Equity Value, D = Debt Value, V = Total Capital (E+D), Re = Cost of Equity (from CAPM), Rd = Cost of Debt (yield on debt), T = Tax Rate. Cost of Equity via CAPM: Re = Rf + β × (Rm - Rf), where Rf = risk-free rate (10-year Treasury), β = levered beta, and (Rm-Rf) = equity risk premium (~5-6%). Cost of debt is the yield on the company\'s bonds or interest rate on its loans. Debt is tax-deductible, so we use after-tax cost: Rd × (1-T).',
    keyPoints: [
      'WACC = (E/V)×Re + (D/V)×Rd×(1-T)',
      'Cost of equity: CAPM = Rf + β×ERP',
      'Rf: 10-year Treasury (~4-5%)',
      'ERP: ~5-6%',
      'Beta: unlever peers, re-lever at target structure',
      'Cost of debt: current yield or interest rate'
    ]
  },
  {
    id: 'dcf-003',
    category: 'dcf',
    subcategory: 'Terminal Value',
    difficulty: 'medium',
    question: 'What are the two ways to calculate Terminal Value? Which is more common?',
    answer: 'Two methods: (1) Gordon Growth Model (Perpetuity Growth): TV = FCF_n+1 / (WACC - g), where g is the long-term growth rate (typically GDP growth, 2-3%). (2) Exit Multiple Method: TV = EBITDA_n × EV/EBITDA multiple (based on comps). The Exit Multiple method is more commonly used in investment banking because it\'s easier to justify (tied to observable market multiples) and is more intuitive. The Perpetuity Growth method is used as a sanity check—you calculate the implied exit multiple to see if it\'s reasonable. Terminal Value typically represents 60-80% of total DCF value, so it\'s critically important.',
    keyPoints: [
      'Gordon Growth: FCF×(1+g)/(WACC-g)',
      'Exit Multiple: EBITDA × comps multiple',
      'Exit Multiple more common in banking',
      'Gordon Growth used as sanity check',
      'TV = 60-80% of total DCF value typically'
    ]
  },
  {
    id: 'dcf-004',
    category: 'dcf',
    subcategory: 'Free Cash Flow',
    difficulty: 'medium',
    question: 'What is Unlevered Free Cash Flow and why do we use it in a DCF?',
    answer: 'Unlevered Free Cash Flow (UFCF) = EBIT × (1 - Tax Rate) + D&A - CapEx - Changes in NWC. It\'s "unlevered" because it excludes interest expense—it represents cash flows available to ALL capital providers (debt and equity holders). We use it in a DCF because we\'re discounting at WACC (which already accounts for the cost of both debt and equity), and consistency requires unlevered cash flows. If we used levered FCFs (which deduct interest), we would only discount at the cost of equity. The output of a UFCF DCF is Enterprise Value.',
    keyPoints: [
      'UFCF = EBIT(1-t) + D&A - CapEx - ΔNWC',
      'Excludes interest (capital structure neutral)',
      'Discount at WACC → get Enterprise Value',
      'If using levered FCF → discount at Ke → Equity Value',
      'Also called Free Cash Flow to Firm (FCFF)'
    ]
  },
  {
    id: 'dcf-005',
    category: 'dcf',
    subcategory: 'DCF Assumptions',
    difficulty: 'hard',
    question: 'What are the main weaknesses of a DCF analysis?',
    answer: 'Key weaknesses: (1) Garbage in, garbage out—small changes in WACC or growth assumptions cause huge swings in value. A 1% change in WACC or terminal growth can move value by 20-30%. (2) Terminal value dominates—often 60-80% of the total value, making near-term projections less relevant. (3) Projection uncertainty—5-10 year forecasts are highly uncertain. (4) WACC is hard to calculate precisely—beta changes with market, ERP is estimated. (5) Doesn\'t capture market dynamics or strategic value. Despite these flaws, DCF is still fundamental because it forces you to think through the business fundamentals.',
    keyPoints: [
      'Highly sensitive to WACC and growth rate assumptions',
      'TV dominates (60-80% of value)',
      'Long-term projections are uncertain',
      'WACC calculation is itself an estimate',
      'Best used alongside comps and precedents'
    ]
  },
  {
    id: 'dcf-006',
    category: 'dcf',
    subcategory: 'WACC',
    difficulty: 'hard',
    question: 'How do you unlever and re-lever beta?',
    answer: 'Beta measures systematic risk. When comparing betas across companies with different leverage, you must first unlever each peer\'s beta to get "asset beta" (removes capital structure effect), then re-lever at your target\'s capital structure. Unlever: βu = βl / (1 + (1-T) × D/E). Re-lever: βl = βu × (1 + (1-T) × D/E). Hamada equation. Process: (1) Get each peer\'s levered beta from Bloomberg/Barra. (2) Get each peer\'s D/E ratio and tax rate. (3) Unlever each beta. (4) Take the median unlevered beta. (5) Re-lever at your target company\'s D/E ratio.',
    keyPoints: [
      'Unlever: βu = βl / (1 + (1-T)×D/E) — Hamada equation',
      'Re-lever: βl = βu × (1 + (1-T)×D/E)',
      'Strips out each peer\'s capital structure',
      'Use median of unlevered peer betas',
      'Re-lever at target\'s current or target D/E'
    ]
  },

  // ===== M&A =====
  {
    id: 'ma-001',
    category: 'ma',
    subcategory: 'M&A Overview',
    difficulty: 'easy',
    question: 'Walk me through a merger model / accretion-dilution analysis.',
    answer: 'A merger model determines whether a deal is accretive or dilutive to the acquirer\'s EPS. Steps: (1) Determine the offer price and deal structure (cash, stock, or mixed). (2) Calculate total deal value and sources of funds. (3) Estimate synergies (cost and revenue) and integration costs. (4) Calculate new share count if stock deal. (5) Calculate pro forma combined Net Income: Acquirer NI + Target NI + Synergies - Incremental Interest (if debt) - Amortization of acquired intangibles, net of tax. (6) Divide by new share count to get pro forma EPS. If pro forma EPS > acquirer standalone EPS → Accretive. If lower → Dilutive.',
    keyPoints: [
      'Accretive: Pro forma EPS > Acquirer standalone EPS',
      'Dilutive: Pro forma EPS < Acquirer standalone EPS',
      'Key adjustments: synergies, interest, D&A of intangibles',
      'All-cash deals are more often accretive (no share issuance)',
      'High-multiple acquisitions tend to be dilutive'
    ]
  },
  {
    id: 'ma-002',
    category: 'ma',
    subcategory: 'Deal Structure',
    difficulty: 'medium',
    question: 'What factors determine whether a deal is accretive or dilutive?',
    answer: 'Key factors: (1) Relative P/E ratios—if acquirer\'s P/E > target\'s P/E, an all-stock deal is accretive. (2) Deal consideration—all-cash (funded by debt) deals add interest expense but no share dilution. If synergies + target earnings exceed incremental interest → accretive. (3) Synergies—larger synergies improve accretion. (4) Goodwill amortization (rare under GAAP) or D&A of acquired intangibles (reduces EPS). (5) Acquisition premium—higher premium = harder to achieve accretion. Rule of thumb: if acquirer P/E > target P/E (on acquisition price), all-stock deal is accretive.',
    keyPoints: [
      'Acquirer P/E > Target P/E → accretive in all-stock deal',
      'Synergies drive accretion',
      'Cash deal: interest cost vs. earnings pickup',
      'Higher premium → harder to be accretive',
      'Intangibles D&A reduces EPS'
    ]
  },
  {
    id: 'ma-003',
    category: 'ma',
    subcategory: 'Synergies',
    difficulty: 'medium',
    question: 'What are synergies in M&A? What types are there and which are more reliable?',
    answer: 'Synergies are the incremental value created by combining two companies that neither could achieve alone. Two types: (1) Cost Synergies—eliminating duplicate costs: headcount reduction, facility consolidation, shared back-office, procurement savings. These are more reliable and achievable. (2) Revenue Synergies—cross-selling, new markets, pricing power, bundling. Less reliable because they depend on customer behavior and market dynamics. Bankers often say "cost synergies are in the bag; revenue synergies are icing on the cake." In models, cost synergies are typically phased in over 2-3 years.',
    keyPoints: [
      'Cost synergies: headcount, facilities, procurement (reliable)',
      'Revenue synergies: cross-sell, new markets (less reliable)',
      'Typically 50-75% of synergies realized in first 2 years',
      'Integration costs offset near-term synergies',
      '"Buy the cost synergies, get the revenue for free"'
    ]
  },
  {
    id: 'ma-004',
    category: 'ma',
    subcategory: 'Deal Structure',
    difficulty: 'medium',
    question: 'What are the main differences between a stock deal and a cash deal from the buyer\'s and seller\'s perspective?',
    answer: 'Cash deal—Buyer: uses cash/debt, retains more upside if target performs well, higher EPS dilution risk from interest but no share count increase. Seller: fully taxable as capital gain, immediate liquidity, certain value. Stock deal—Buyer: issues shares, dilutes existing shareholders, seller participates in future upside, typically more dilutive to EPS. Seller: tax-deferred exchange (no immediate capital gains tax), retains exposure to acquirer\'s stock, some risk if acquirer\'s stock falls between signing and closing. In uncertain markets, sellers often prefer cash; buyers often prefer stock when their stock is highly valued.',
    keyPoints: [
      'Cash: seller pays taxes now, certain value',
      'Stock: seller defers taxes, retains upside (and risk)',
      'Buyer with high valuation prefers stock (cheap currency)',
      'Buyer prefers cash when stock is undervalued',
      'Most deals are mixed (cash + stock)'
    ]
  },
  {
    id: 'ma-005',
    category: 'ma',
    subcategory: 'M&A Process',
    difficulty: 'easy',
    question: 'Walk me through the M&A process from start to finish.',
    answer: 'M&A Process: (1) Strategy—client decides to buy or sell, banker advises on rationale and targets/buyers. (2) Preparation—for a sale: prepare CIM (Confidential Information Memorandum), management presentations, data room. (3) Marketing—distribute teasers, get NDAs signed, send CIM to interested parties. (4) First Round Bids—receive IOIs (Indications of Interest), select shortlist. (5) Second Round—management presentations, site visits, due diligence, final bids. (6) Negotiate and Sign—negotiate LOI/definitive agreement (SPA). (7) Regulatory Approvals—antitrust, shareholder votes. (8) Close and Integrate. Timeline: 4-9 months typically.',
    keyPoints: [
      'Buy-side vs. sell-side process differs',
      'CIM: marketing document with financial info',
      'IOI → Letter of Intent → Definitive Agreement',
      'Due diligence: financial, legal, tax, commercial',
      '4-9 month timeline typical'
    ]
  },
  {
    id: 'ma-006',
    category: 'ma',
    subcategory: 'M&A Concepts',
    difficulty: 'hard',
    question: 'What is goodwill and how is it created in an acquisition?',
    answer: 'Goodwill is an intangible asset created when an acquirer pays more than the fair market value of a target\'s net identifiable assets. Formula: Goodwill = Purchase Price - Fair Value of Net Assets - Fair Value of Other Identifiable Intangibles. When an acquisition closes, a Purchase Price Allocation (PPA) is performed: assets/liabilities are stepped up to fair value, identifiable intangibles (brand, customer lists, patents) are written up. Goodwill = the residual. Under GAAP, goodwill is not amortized but tested for impairment annually. Under IFRS, goodwill can be amortized.',
    keyPoints: [
      'Goodwill = Purchase Price - FMV of Net Assets - Other Intangibles',
      'Created through Purchase Price Allocation (PPA)',
      'Under GAAP: tested annually for impairment (not amortized)',
      'Under IFRS: can be amortized',
      'Goodwill impairment charge hits income statement'
    ]
  },

  // ===== LBO =====
  {
    id: 'lbo-001',
    category: 'lbo',
    subcategory: 'LBO Overview',
    difficulty: 'easy',
    question: 'Walk me through an LBO and explain why private equity firms use leverage.',
    answer: 'An LBO (Leveraged Buyout) is an acquisition of a company using significant debt (~60-70% of the purchase price), with the acquired company\'s assets and cash flows used as collateral. The PE firm contributes the remaining equity (30-40%). Why use leverage: (1) Amplifies returns—PE firm uses less equity, so if the company value increases, returns on equity are magnified. (2) Tax shield—interest on debt is tax-deductible, reducing the company\'s taxes. (3) Discipline—forces management to focus on cash flow generation to service debt. Returns are driven by: multiple expansion, EBITDA growth, and debt paydown.',
    keyPoints: [
      'Typical structure: 60-70% debt, 30-40% equity',
      'Leverage amplifies equity returns',
      'Interest tax shield reduces cost of debt',
      'Exit: sell company or IPO after 3-7 years',
      'Returns: EBITDA growth + debt paydown + multiple expansion'
    ]
  },
  {
    id: 'lbo-002',
    category: 'lbo',
    subcategory: 'LBO Returns',
    difficulty: 'medium',
    question: 'What makes a good LBO candidate?',
    answer: 'A good LBO target has: (1) Strong, predictable cash flows—to service debt. (2) Low existing debt—room to add leverage. (3) Stable, recurring revenue—reduces default risk. (4) Defensible market position / barriers to entry. (5) Low capex requirements—more FCF to pay down debt. (6) Potential for operational improvements—PE value creation. (7) Clear exit options—strategic buyers or IPO possible. (8) Attractive but not excessive entry valuation. Examples: mature businesses, utilities, established consumer brands, software with high switching costs. Not great LBO candidates: cyclical businesses, high-capex industries, rapidly changing tech sectors.',
    keyPoints: [
      'Strong, predictable cash flows (most important)',
      'Low existing leverage, room to add debt',
      'Stable/recurring revenue',
      'Low CapEx intensity',
      'Operational improvement opportunities',
      'Multiple exit paths'
    ]
  },
  {
    id: 'lbo-003',
    category: 'lbo',
    subcategory: 'LBO Returns',
    difficulty: 'medium',
    question: 'How does an LBO generate returns for the private equity firm?',
    answer: 'PE returns in an LBO come from three sources: (1) EBITDA Growth—growing the business organically or through add-on acquisitions increases enterprise value at exit. (2) Multiple Expansion—selling at a higher EV/EBITDA multiple than the purchase multiple. Harder to rely on; depends on market conditions. (3) Debt Paydown—as the company generates cash and pays down debt, more of the enterprise value accrues to equity holders. Also called "deleveraging." Example: Buy at 8x, sell at 10x with higher EBITDA + less debt = significantly higher equity return.',
    keyPoints: [
      'EBITDA growth: operational improvement',
      'Multiple expansion: buy low, sell high',
      'Debt paydown: deleveraging increases equity value',
      'Leverage amplifies all three drivers',
      'Target IRR: 20-25%+ over 3-7 year hold period'
    ]
  },
  {
    id: 'lbo-004',
    category: 'lbo',
    subcategory: 'LBO Mechanics',
    difficulty: 'hard',
    question: 'Walk me through the mechanics of building an LBO model.',
    answer: 'Step 1: Assumptions—entry multiple, leverage ratio (Debt/EBITDA), hold period, exit multiple, revenue/EBITDA growth. Step 2: Sources & Uses—how the deal is funded (debt tranches, equity) and where the money goes (purchase price, fees). Step 3: Project financials—revenue, EBITDA, D&A, interest expense (on debt schedule), taxes → Net Income → FCF. Step 4: Debt schedule—model each debt tranche, calculate interest, show paydown from FCF. Step 5: Exit—calculate exit EV (exit EBITDA × multiple), subtract remaining debt, calculate equity proceeds. Step 6: Returns—IRR and MOIC for the PE fund.',
    keyPoints: [
      'Sources & Uses must balance',
      'Debt schedule: term loans, revolvers, high-yield bonds',
      'Cash flow used to pay down debt (debt sweep)',
      'Exit EV = Exit EBITDA × Exit Multiple',
      'Equity proceeds = Exit EV - Remaining Debt',
      'IRR and MOIC are primary return metrics'
    ]
  },
  {
    id: 'lbo-005',
    category: 'lbo',
    subcategory: 'LBO Returns',
    difficulty: 'medium',
    question: 'What is IRR and MOIC? If a PE fund invests $100M and exits at $300M after 5 years, what is the MOIC and approximate IRR?',
    answer: 'MOIC (Multiple on Invested Capital) = Exit Proceeds / Initial Investment. IRR (Internal Rate of Return) is the annualized return—the discount rate that makes NPV of all cash flows = 0. In this case: MOIC = $300M / $100M = 3.0x. For IRR approximation: (1+IRR)^5 = 3.0. IRR = 3.0^(1/5) - 1 = 24.6%. Good rule of thumb: 2x in 3 years ≈ 26% IRR; 2x in 4 years ≈ 19%; 3x in 5 years ≈ 25%; 3x in 3 years ≈ 44%. PE firms typically target 20-25%+ IRR.',
    keyPoints: [
      'MOIC = Exit / Entry (3.0x in this case)',
      'IRR ≈ 24.6% for 3x in 5 years',
      'Memorize key benchmarks: 2x/4yr≈19%, 3x/5yr≈25%',
      'Target IRR: 20-25%+',
      'IRR is time-sensitive; MOIC is not'
    ]
  },
  {
    id: 'lbo-006',
    category: 'lbo',
    subcategory: 'LBO Mechanics',
    difficulty: 'hard',
    question: 'What is a debt sweep and a PIK toggle? How do they appear in an LBO model?',
    answer: 'Debt Sweep: the provision that requires excess free cash flow to be used to pay down debt (often at 50-75% of excess FCF). Modeled in the debt schedule: after operating costs, interest, and mandatory amortization, remaining FCF is swept toward debt paydown. This accelerates deleveraging. PIK Toggle (Pay-in-Kind): allows the borrower to "toggle" interest payments from cash to additional debt (PIK), deferring cash interest to preserve liquidity. If toggled, interest accrues on top of principal (compounds), increasing debt balance. Companies use this when cash flow is tight. In the model, PIK interest adds to the debt balance instead of reducing cash.',
    keyPoints: [
      'Cash sweep: excess FCF pays down debt (50-100% of FCF)',
      'Faster deleveraging → higher equity returns',
      'PIK toggle: defer cash interest, adds to principal',
      'PIK used when FCF is constrained',
      'PIK compounds, increasing future debt burden'
    ]
  },

  // ===== BRAIN TEASERS =====
  {
    id: 'bt-001',
    category: 'brainteasers',
    subcategory: 'Math',
    difficulty: 'medium',
    question: 'What is 17 × 18?',
    answer: '306. Quick method: 17 × 18 = 17 × 20 - 17 × 2 = 340 - 34 = 306. Or: (15 + 2)(15 + 3) = 225 + 45 + 30 + 6 = 306.',
    keyPoints: [
      'Break into easier numbers: 17×20 - 17×2',
      '340 - 34 = 306',
      'Practice mental math: critical for case studies'
    ]
  },
  {
    id: 'bt-002',
    category: 'brainteasers',
    subcategory: 'Math',
    difficulty: 'medium',
    question: 'If a company\'s revenue grows from $500M to $750M, what is the percentage increase?',
    answer: '50% increase. ($750M - $500M) / $500M = $250M / $500M = 0.50 = 50%.',
    keyPoints: [
      '(New - Old) / Old = % change',
      '$250M / $500M = 50%',
      'Quick check: 50% of $500M = $250M ✓'
    ]
  },
  {
    id: 'bt-003',
    category: 'brainteasers',
    subcategory: 'Conceptual',
    difficulty: 'medium',
    question: 'If you could only use one valuation methodology, which would you use and why?',
    answer: 'DCF Analysis. While all methods have trade-offs, the DCF is the most theoretically sound because it\'s based on intrinsic value—what the business is fundamentally worth based on its future cash generation. It doesn\'t rely on market sentiment (which can be irrational) or finding perfect comps (which rarely exist). However, a strong answer acknowledges DCF\'s weaknesses (sensitivity to assumptions) and notes that in practice, you should always triangulate with comps and precedents.',
    keyPoints: [
      'DCF: most theoretically rigorous',
      'Based on fundamental cash flows, not market sentiment',
      'Weakness: sensitive to WACC and growth assumptions',
      'Always triangulate with multiple methods in practice',
      'Show you understand trade-offs'
    ]
  },
  {
    id: 'bt-004',
    category: 'brainteasers',
    subcategory: 'Conceptual',
    difficulty: 'easy',
    question: 'Why would two companies in the same industry trade at different EV/EBITDA multiples?',
    answer: 'Multiple differences are driven by: (1) Growth profile—faster growing companies warrant higher multiples. (2) Profitability / margin quality—higher margins = premium. (3) Revenue predictability—recurring/subscription revenue commands premium. (4) Market position—#1 player trades at premium to #3. (5) Management quality. (6) Geographic exposure—high-growth markets = premium. (7) Leverage—more levered companies sometimes trade at discount. (8) Liquidity (for public companies). The market assigns a premium to businesses it believes will grow faster and generate more predictable cash flows.',
    keyPoints: [
      'Growth: faster growers = higher multiples',
      'Margin quality and predictability',
      'Market position and competitive moat',
      'Revenue mix: recurring vs. one-time',
      'Leverage and financial risk'
    ]
  },
  {
    id: 'bt-005',
    category: 'brainteasers',
    subcategory: 'Math',
    difficulty: 'hard',
    question: 'A company has $100M EBITDA. At 8x EV/EBITDA it\'s worth $800M. Net debt is $200M. What is equity value and implied P/E if tax rate is 30% and D&A is $20M, interest is $15M?',
    answer: 'Equity Value = EV - Net Debt = $800M - $200M = $600M. For P/E: EBIT = EBITDA - D&A = $100M - $20M = $80M. Pre-tax income = EBIT - Interest = $80M - $15M = $65M. Net Income = $65M × (1 - 30%) = $65M × 0.70 = $45.5M. P/E = Equity Value / Net Income = $600M / $45.5M ≈ 13.2x.',
    keyPoints: [
      'EV = $800M, Net Debt = $200M',
      'Equity Value = $600M',
      'EBIT = EBITDA - D&A = $80M',
      'Pre-tax income = $80M - $15M = $65M',
      'Net Income = $65M × 70% = $45.5M',
      'P/E = $600M / $45.5M ≈ 13.2x'
    ]
  },

  // ===== ACCOUNTING (continued) =====
  {
    id: 'acc-013',
    category: 'accounting',
    subcategory: 'Income Statement',
    difficulty: 'medium',
    question: 'How does stock-based compensation (SBC) affect the three financial statements?',
    answer: 'Income Statement: SBC is recorded as an operating expense, reducing pre-tax income and net income. Cash Flow Statement: Because SBC is non-cash, it is added back in Operating Activities (similar to D&A)—so operating cash flow is unaffected. Balance Sheet: Equity (Additional Paid-In Capital) increases by the SBC amount, offsetting the reduction to Retained Earnings from the lower net income. Net effect on cash is zero, but existing shareholders are diluted as new shares are eventually issued.',
    keyPoints: [
      'IS: SBC expense reduces net income',
      'CFS: Added back in operating activities (non-cash)',
      'BS: APIC increases by SBC amount; equity neutral net',
      'Cash flow impact: zero',
      'Dilutive to existing shareholders over time'
    ]
  },
  {
    id: 'acc-014',
    category: 'accounting',
    subcategory: 'Balance Sheet',
    difficulty: 'hard',
    question: 'What is the difference between a deferred tax asset and a deferred tax liability? Give an example of each.',
    answer: 'A Deferred Tax Liability (DTL) arises when book income exceeds taxable income—you owe more taxes in the future than currently recognized. Classic example: accelerated depreciation for tax (larger deduction now → lower taxes now → future tax bill). A Deferred Tax Asset (DTA) arises when taxable income exceeds book income—you have a future tax benefit. Classic example: Net Operating Loss (NOL) carryforward; you paid no taxes now and will use the loss to reduce future taxable income.',
    keyPoints: [
      'DTL: future tax payment; book income > taxable income',
      'Example DTL: accelerated tax depreciation vs. straight-line book',
      'DTA: future tax saving; taxable income > book income',
      'Example DTA: NOL carryforward, accrued expenses not yet deductible',
      'Both appear on Balance Sheet; offset by valuation allowance if recovery uncertain'
    ]
  },
  {
    id: 'acc-015',
    category: 'accounting',
    subcategory: 'Income Statement',
    difficulty: 'medium',
    question: 'In an inflationary environment, which inventory method gives higher net income — LIFO or FIFO? What are the tax implications?',
    answer: 'FIFO gives higher net income in an inflationary environment. Under FIFO, the oldest (cheapest) inventory is sold first, resulting in lower COGS and higher gross profit. Under LIFO, the most recent (more expensive) inventory is sold first, resulting in higher COGS and lower gross profit. From a tax perspective, LIFO is advantageous because lower net income means lower taxes. However, LIFO is not permitted under IFRS—only under US GAAP. Most US companies that use LIFO also disclose a "LIFO reserve" to allow analysts to convert to FIFO for comparability.',
    keyPoints: [
      'FIFO: lower COGS → higher gross profit → higher net income',
      'LIFO: higher COGS → lower gross profit → lower net income',
      'LIFO tax advantage: lower NI = lower cash taxes',
      'LIFO not allowed under IFRS (only US GAAP)',
      'LIFO reserve = FIFO inventory − LIFO inventory'
    ]
  },
  {
    id: 'acc-016',
    category: 'accounting',
    subcategory: 'Three Statements',
    difficulty: 'hard',
    question: 'A company writes down $100 of inventory. Walk through the impact on all three financial statements. Assume a 30% tax rate.',
    answer: 'Income Statement: COGS increases by $100 (write-down is a charge to COGS or a separate impairment line). Pre-tax income falls $100; taxes fall $30; net income falls $70. Cash Flow Statement: Net income falls $70, but the $100 write-down is added back as a non-cash charge (like D&A). Net operating cash flow increases by $30 (tax benefit). Balance Sheet: Inventory falls $100; cash increases $30 (from tax savings); net assets fall $70. Retained earnings fall $70. Balance sheet balances: assets down $70, equity down $70.',
    keyPoints: [
      'IS: COGS +$100, net income −$70 (after 30% tax benefit)',
      'CFS: Non-cash add-back +$100, net operating CF +$30',
      'BS: Inventory −$100, Cash +$30, Retained Earnings −$70',
      'Balance sheet check: Assets −$70 = Equity −$70 ✓',
      'Tax shield = $100 × 30% = $30'
    ]
  },
  {
    id: 'acc-017',
    category: 'accounting',
    subcategory: 'Balance Sheet',
    difficulty: 'medium',
    question: 'What is the difference between an operating lease and a finance lease under ASC 842?',
    answer: 'Under ASC 842 (effective 2019), both operating and finance (formerly "capital") leases are recognized on the balance sheet as a right-of-use (ROU) asset and a corresponding lease liability. The key difference is in income statement treatment: Operating lease: a single straight-line "lease expense" (similar to old treatment). Finance lease: separate depreciation of the ROU asset plus interest expense on the liability (front-loaded total expense). Pre-ASC 842, operating leases were entirely off-balance sheet—this was a major change that brought trillions of lease obligations onto balance sheets.',
    keyPoints: [
      'Both now on balance sheet: ROU asset + lease liability',
      'Operating lease: straight-line rent expense on P&L',
      'Finance lease: depreciation + interest (front-loaded)',
      'Pre-ASC 842: operating leases were off-balance sheet',
      'Key ratio impact: higher D/E ratio and assets for all companies'
    ]
  },
  {
    id: 'acc-018',
    category: 'accounting',
    subcategory: 'Three Statements',
    difficulty: 'medium',
    question: 'What happens to the three financial statements when a company does a $100M stock buyback?',
    answer: 'Income Statement: No immediate impact; going forward, lower share count increases EPS (assuming earnings unchanged). Cash Flow Statement: $100M outflow in Financing Activities (repurchase of shares). Balance Sheet: Cash decreases $100M; Treasury Stock (contra-equity) increases $100M. Net result: total assets decline $100M, total equity declines $100M. The balance sheet still balances. If the buyback is funded by debt instead of cash, add the debt: Cash is unaffected, debt increases $100M, treasury stock increases $100M.',
    keyPoints: [
      'IS: No immediate impact; EPS rises over time',
      'CFS: −$100M in Financing Activities',
      'BS: Cash −$100M, Treasury Stock +$100M (equity −$100M)',
      'Total assets down $100M = Total equity down $100M ✓',
      'If debt-funded: Debt +$100M, Cash neutral, Equity −$100M'
    ]
  },
  {
    id: 'acc-019',
    category: 'accounting',
    subcategory: 'Income Statement',
    difficulty: 'medium',
    question: 'What is the difference between basic and diluted EPS? How do you calculate diluted share count?',
    answer: 'Basic EPS = Net Income / Basic Shares Outstanding. Diluted EPS = Adjusted Net Income / Diluted Shares Outstanding. Diluted shares include the effect of all potentially dilutive securities: stock options, warrants, RSUs, convertible debt/preferred. For in-the-money options, use the Treasury Stock Method: net new shares = Options × (1 − Strike Price / Market Price). For convertible securities, add the shares that would be issued and add back the after-tax interest (or preferred dividend) saved. Diluted EPS is always ≤ Basic EPS. Antidilutive securities (those that would increase EPS) are excluded.',
    keyPoints: [
      'Basic EPS = NI / Basic shares',
      'Diluted EPS = Adjusted NI / Diluted shares',
      'TSM: Net new shares = Options × (1 − Strike/Price)',
      'Convertibles: add shares issued, add back after-tax interest',
      'Antidilutive securities excluded'
    ]
  },
  {
    id: 'acc-020',
    category: 'accounting',
    subcategory: 'Balance Sheet',
    difficulty: 'medium',
    question: 'How does a $50M goodwill impairment charge affect the three financial statements?',
    answer: 'Income Statement: $50M impairment charge reduces operating income by $50M. Goodwill impairment is typically not tax-deductible (assuming the goodwill arose from a stock purchase), so there is no tax benefit. Net income falls by the full $50M. Cash Flow Statement: The impairment is a non-cash charge, so it is added back in Operating Activities. Operating cash flow is unaffected. Balance Sheet: Goodwill falls $50M; Retained Earnings (equity) falls $50M. Assets down $50M = Equity down $50M. The company\'s book value falls but cash position is unchanged.',
    keyPoints: [
      'IS: Operating income −$50M; typically no tax benefit',
      'Net income −$50M',
      'CFS: Non-cash add-back; operating CF unchanged',
      'BS: Goodwill −$50M, Retained Earnings −$50M',
      'Cash unchanged; book value declines'
    ]
  },
  {
    id: 'acc-021',
    category: 'accounting',
    subcategory: 'Income Statement',
    difficulty: 'hard',
    question: 'Walk me through the 5-step revenue recognition model under ASC 606.',
    answer: 'ASC 606 (IFRS 15) established a principles-based 5-step model: (1) Identify the contract with a customer—must have commercial substance and enforceable rights. (2) Identify the performance obligations—distinct goods or services promised. (3) Determine the transaction price—total consideration, including variable components (volume discounts, refunds). (4) Allocate the transaction price to each performance obligation based on standalone selling prices. (5) Recognize revenue when (or as) each performance obligation is satisfied—either at a point in time or over time. This replaced hundreds of industry-specific rules with a single framework.',
    keyPoints: [
      'Step 1: Identify the contract',
      'Step 2: Identify performance obligations',
      'Step 3: Determine transaction price',
      'Step 4: Allocate price to obligations',
      'Step 5: Recognize revenue when obligation satisfied',
      'Replaced old industry-specific rules with unified framework'
    ]
  },
  {
    id: 'acc-022',
    category: 'accounting',
    subcategory: 'Key Ratios',
    difficulty: 'medium',
    question: 'If a company has $500M revenue and its DSO is 45 days, what is its accounts receivable balance? If DSO improves to 30 days, what is the cash impact?',
    answer: 'AR = DSO × (Revenue / 365) = 45 × ($500M / 365) = $61.6M. If DSO improves to 30 days: New AR = 30 × ($500M / 365) = $41.1M. The reduction in AR of $61.6M − $41.1M = $20.5M is a source of cash (decrease in current asset). This improvement means the company collects cash from customers 15 days faster. On the Cash Flow Statement, this appears as a positive working capital change in Operating Activities. DSO improvement is a common working capital initiative and a lever PE firms target to generate cash.',
    keyPoints: [
      'AR = DSO × (Revenue / 365)',
      'At 45-day DSO: AR = $61.6M',
      'At 30-day DSO: AR = $41.1M',
      'Cash released: $20.5M (positive working capital change)',
      'Faster collection → lower AR → source of cash'
    ]
  },

  // ===== VALUATION (continued) =====
  {
    id: 'val-009',
    category: 'valuation',
    subcategory: 'Sector-Specific',
    difficulty: 'hard',
    question: 'How do you value a bank or financial institution? Why can\'t you use EV/EBITDA?',
    answer: 'You cannot use EV/EBITDA for banks because interest income and expense are operational (not financing) for a bank—separating "operating" from "financing" cash flows is meaningless. Instead, use equity-based multiples: Price-to-Book Value (P/B) is the primary multiple—banks are asset-intensive and book value (equity) is meaningful. Price-to-Earnings (P/E) is also used. Key metrics: Net Interest Margin (NIM), efficiency ratio, return on equity (ROE), and non-performing loan ratio. A bank trading above book (P/B > 1) implies the market believes it can earn returns above cost of equity.',
    keyPoints: [
      'No EV/EBITDA: interest is operational for banks',
      'Primary multiples: P/Book, P/E',
      'P/B > 1 = ROE > cost of equity',
      'Key metrics: NIM, efficiency ratio, NPL ratio',
      'DDM (dividend discount model) also used for stable dividend-paying banks'
    ]
  },
  {
    id: 'val-010',
    category: 'valuation',
    subcategory: 'Trading Comps',
    difficulty: 'medium',
    question: 'Walk me through the treasury stock method for calculating diluted share count.',
    answer: 'The Treasury Stock Method (TSM) is used to calculate the dilutive effect of in-the-money stock options and warrants. For each batch of options: assume they are exercised—the company receives the exercise price proceeds. Those proceeds are then assumed to be used to repurchase shares at the current market price. Net new shares = Options Outstanding × (1 − Exercise Price / Current Stock Price). Example: 10M options at $10 strike, stock at $25. Net new shares = 10M × (1 − $10/$25) = 10M × 0.60 = 6M shares. These 6M shares are added to basic shares to get diluted shares outstanding.',
    keyPoints: [
      'Net new shares = Options × (1 − Strike/Market Price)',
      'Only applies to in-the-money options',
      'Proceeds assumed to repurchase shares at current price',
      'Example: 10M options, $10 strike, $25 stock → 6M net new shares',
      'Antidilutive options (out of the money) excluded'
    ]
  },
  {
    id: 'val-011',
    category: 'valuation',
    subcategory: 'Trading Comps',
    difficulty: 'medium',
    question: 'How do you value a company with negative EBITDA in a comps analysis?',
    answer: 'When EBITDA is negative, EV/EBITDA is meaningless. Use revenue-based or gross profit-based multiples instead: EV/Revenue (most common for high-growth or pre-profit companies), EV/Gross Profit (better than revenue if margins differ widely). For tech companies, use sector-specific KPI multiples: EV/ARR (annual recurring revenue), EV/MAU (monthly active users), Price/Subscriber. Forward multiples are often used—if profitability is expected in 2 years, use NTM+2 EBITDA. Analysts also use discounted path to profitability or sum-of-parts approaches.',
    keyPoints: [
      'EV/Revenue: most common for pre-profit companies',
      'EV/Gross Profit: useful when margins differ materially',
      'Sector-specific: EV/ARR, EV/MAU, Price/Subscriber',
      'Forward multiples: use NTM EBITDA when near breakeven',
      'Avoid EV/EBITDA when EBITDA is negative—meaningless'
    ]
  },
  {
    id: 'val-012',
    category: 'valuation',
    subcategory: 'Methodologies',
    difficulty: 'medium',
    question: 'What is a sum-of-the-parts (SOTP) valuation and when would you use it?',
    answer: 'SOTP values a conglomerate or diversified company by valuing each business segment separately using the most appropriate methodology for each, then summing them. Process: (1) Segment the company into distinct business units. (2) Apply relevant multiples or DCF to each segment (e.g., tech segment at 20x EBITDA, industrial at 8x). (3) Sum segment EVs → consolidated EV. (4) Subtract corporate overhead (often capitalized at a discount) and net debt → equity value. Used when a conglomerate trades at a "sum-of-parts discount" and when segments have meaningfully different growth/margin profiles. Often used in activist investment theses.',
    keyPoints: [
      'Value each segment separately with appropriate multiples',
      'Sum → consolidated EV; subtract corporate overhead + net debt',
      'Best for conglomerates with disparate businesses',
      'Often reveals "hidden value" or strategic case for break-up',
      'Used in activist situations and spin-off analyses'
    ]
  },
  {
    id: 'val-013',
    category: 'valuation',
    subcategory: 'Valuation Mechanics',
    difficulty: 'hard',
    question: 'A company\'s EV/EBITDA is 10x but its P/E is 40x. What could explain the gap?',
    answer: 'The large gap between EV/EBITDA and P/E is driven by factors that affect net income more than EBITDA: (1) High leverage: significant interest expense greatly reduces net income without affecting EBITDA. (2) High D&A: large D&A (from asset-heavy business or prior acquisitions) reduces net income but not EBITDA. (3) High taxes: effective tax rate compresses net income. (4) Minority interests or non-operating losses below the EBIT line. You can reconcile: from EBITDA, subtract D&A, interest, and taxes to get net income. The larger these deductions, the more P/E diverges from EV/EBITDA. This is why EV/EBITDA is preferred for capital structure-neutral comparisons.',
    keyPoints: [
      'High leverage: interest expense gaps EBITDA vs. NI',
      'High D&A: depresses net income, not EBITDA',
      'High effective tax rate: reduces NI further',
      'EV/EBITDA is capital structure neutral; P/E is not',
      'Bridge: EBITDA − D&A = EBIT − Interest = Pre-tax − Taxes = NI'
    ]
  },
  {
    id: 'val-014',
    category: 'valuation',
    subcategory: 'Trading Comps',
    difficulty: 'medium',
    question: 'How do you adjust for non-recurring items when building a comparable company analysis?',
    answer: 'When spreading comps, you normalize each company\'s financials by stripping out non-recurring or one-time items to get a clean, recurring picture of performance. Add back (exclude from expenses): restructuring charges, goodwill impairment, litigation settlements, M&A transaction fees, severance costs. Remove from income: one-time gains, asset sale proceeds, insurance recoveries. The result is "Adjusted EBITDA" and "Adjusted Net Income." This allows apples-to-apples comparison. Publicly available company presentations and 10-K MD&A sections typically disclose these adjustments. Bankers must make judgment calls on what qualifies as non-recurring.',
    keyPoints: [
      'Add back: restructuring, impairments, litigation, M&A fees',
      'Remove: one-time gains, asset sale proceeds',
      'Output: "Adjusted EBITDA" and "Adjusted Net Income"',
      'Enables apples-to-apples comparison',
      'Source: 8-K earnings releases, 10-K, investor presentations'
    ]
  },
  {
    id: 'val-015',
    category: 'valuation',
    subcategory: 'Valuation Mechanics',
    difficulty: 'medium',
    question: 'How does a company\'s capital structure affect its equity valuation multiples?',
    answer: 'Capital structure directly affects equity-based multiples (P/E, P/Book) but not EV-based multiples (EV/EBITDA, EV/Revenue). A more leveraged company has higher interest expense → lower net income → potentially higher P/E even if enterprise value is the same. Example: two identical companies (same EV/EBITDA of 10x) but different leverage. The more levered one will have less equity value and lower net income—its P/E could be much higher or lower depending on the dynamics. This is why EV-based multiples are preferred for comparisons across companies with different capital structures—they are leverage-neutral.',
    keyPoints: [
      'EV multiples (EV/EBITDA): leverage neutral',
      'Equity multiples (P/E): affected by interest expense and debt load',
      'Higher leverage → lower equity value and lower NI → distorts P/E',
      'Use EV/EBITDA for cross-company comparison',
      'Use P/E only within similar capital structure peers'
    ]
  },
  {
    id: 'val-016',
    category: 'valuation',
    subcategory: 'Trading Comps',
    difficulty: 'easy',
    question: 'What is calendarization and when is it required in a comps analysis?',
    answer: 'Calendarization converts a company\'s fiscal year financials to a calendar year (Dec 31) basis, enabling consistent comparison across companies with different fiscal year ends. For example, Walmart\'s fiscal year ends January 31, Microsoft\'s ends June 30, and Apple\'s ends September 30. To compare them on a Dec 31 basis, you need to calendarize: Calendar Year Metric = LTM as of Dec 31 = Last FY + Months since FY end − Prior Year same period. This is essential when building comps because you must compare companies on the same time period. Most bulge-bracket equity research and M&A work requires calendarization for accurate multiples.',
    keyPoints: [
      'Converts fiscal year data to calendar year for comparability',
      'Required when comps have different fiscal year end dates',
      'Formula: CY = Last FY + (Months since FY end / 12) × NTM − same for prior year',
      'Walmart FYE Jan, Microsoft FYE Jun, Apple FYE Sep all differ',
      'Standard practice in equity research and M&A comps'
    ]
  },

  // ===== DCF (continued) =====
  {
    id: 'dcf-007',
    category: 'dcf',
    subcategory: 'DCF Overview',
    difficulty: 'medium',
    question: 'What is the mid-year convention in a DCF and how does it affect value?',
    answer: 'The standard DCF assumes free cash flows are received at the end of each year (t=1, 2, 3...). The mid-year convention assumes cash flows are received evenly throughout the year, approximated as mid-year (t=0.5, 1.5, 2.5...). This is more realistic because businesses generate cash continuously, not just on December 31. The practical effect: mid-year convention increases the present value of cash flows because they are discounted for less time. To convert from year-end to mid-year, multiply the DCF value by (1+WACC)^0.5. This can increase the implied value by several percent depending on the WACC.',
    keyPoints: [
      'Year-end: discount at t=1, 2, 3...',
      'Mid-year: discount at t=0.5, 1.5, 2.5...',
      'Mid-year gives higher PV (shorter discounting period)',
      'Adjustment: multiply year-end DCF by (1 + WACC)^0.5',
      'More realistic for continuously operating businesses'
    ]
  },
  {
    id: 'dcf-008',
    category: 'dcf',
    subcategory: 'DCF Assumptions',
    difficulty: 'medium',
    question: 'How do you build and use a sensitivity analysis in a DCF?',
    answer: 'A sensitivity analysis shows how the DCF output (implied share price or EV) changes as you vary key inputs. The two primary sensitivity variables are WACC and terminal growth rate (for Gordon Growth) or exit multiple. Build a two-variable data table: rows represent different WACC assumptions (e.g., ±50bps increments), columns represent different growth rates or exit multiples. Each cell shows the resulting implied value. This reveals which inputs drive the most value and creates a valuation range rather than a single point estimate. Present the "middle scenario" as the base case but use the table to justify a range for the football field.',
    keyPoints: [
      'Primary variables: WACC and terminal growth (or exit multiple)',
      'Two-way data table: rows = WACC range, columns = growth/multiple range',
      'Reveals which assumptions are most value-sensitive',
      'Creates a valuation range, not just a point estimate',
      'Standard: ±50bps on WACC, ±0.5% on growth rate'
    ]
  },
  {
    id: 'dcf-009',
    category: 'dcf',
    subcategory: 'WACC',
    difficulty: 'hard',
    question: 'What is the Adjusted Present Value (APV) method and when would you prefer it over WACC?',
    answer: 'APV separates the value of a firm into two components: (1) Base case NPV—value of the unlevered firm (discounted at the unlevered cost of equity, not WACC). (2) PV of financing side effects—primarily the interest tax shield (PV of tax savings from debt interest). APV = Unlevered Firm Value + PV(Tax Shield). WACC bakes the tax shield into the discount rate and assumes a constant D/E ratio. APV is preferred when capital structure changes significantly over the projection period—such as in LBOs where debt is paid down rapidly. It is also useful for highly leveraged deals or structured finance where the tax shield is large and must be modeled explicitly.',
    keyPoints: [
      'APV = Unlevered NPV + PV(Tax Shield)',
      'WACC assumes constant D/E; APV handles changing leverage',
      'Discount unlevered FCFs at unlevered cost of equity',
      'Preferred for LBOs and high-leverage transactions',
      'More complex but more accurate when capital structure changes'
    ]
  },
  {
    id: 'dcf-010',
    category: 'dcf',
    subcategory: 'Free Cash Flow',
    difficulty: 'medium',
    question: 'How do you forecast changes in net working capital in a DCF model?',
    answer: 'Model each NWC component as a percentage of revenue or COGS, based on historical patterns: AR = Revenue × (DSO / 365), Inventory = COGS × (DIO / 365), AP = COGS × (DPO / 365), plus accrued liabilities as a % of revenue. Build a working capital schedule showing NWC each year, then ΔNWC = NWC(t) − NWC(t−1). A positive ΔNWC (NWC increasing) is a cash outflow on the CFS; negative ΔNWC is a cash inflow. Growing businesses typically require more NWC as a use of cash—this often catches analysts off guard. Key insight: companies with negative working capital models (like retail) actually generate cash as they grow.',
    keyPoints: [
      'AR = Revenue × (DSO/365), Inventory = COGS × (DIO/365), AP = COGS × (DPO/365)',
      'ΔNWC = NWC(t) − NWC(t−1)',
      'Positive ΔNWC = cash outflow (uses cash)',
      'Growing businesses consume more NWC',
      'Negative NWC models (retail) generate cash as they grow'
    ]
  },
  {
    id: 'dcf-011',
    category: 'dcf',
    subcategory: 'Free Cash Flow',
    difficulty: 'medium',
    question: 'What is the difference between FCFF and FCFE and when would you use each?',
    answer: 'FCFF (Free Cash Flow to the Firm, or Unlevered FCF) = EBIT × (1-T) + D&A − CapEx − ΔNWC. It represents cash available to all capital providers before financing costs. Discount at WACC to get Enterprise Value. FCFE (Free Cash Flow to Equity, or Levered FCF) = Net Income + D&A − CapEx − ΔNWC + Net Borrowing. It represents cash available to equity holders after debt service. Discount at the cost of equity to get Equity Value directly. Both methods should yield the same equity value if done consistently. FCFF/WACC is more common in M&A and corporate finance; FCFE/Ke is common in equity research and bank/financial institution valuation.',
    keyPoints: [
      'FCFF = EBIT(1-T) + D&A − CapEx − ΔNWC → discount at WACC → EV',
      'FCFE = Net Income + D&A − CapEx − ΔNWC + Net Borrowing → discount at Ke → Equity Value',
      'FCFF is capital-structure neutral; FCFE is levered',
      'FCFF more common in IB/M&A; FCFE in equity research',
      'Both should yield same equity value if consistent'
    ]
  },
  {
    id: 'dcf-012',
    category: 'dcf',
    subcategory: 'Terminal Value',
    difficulty: 'medium',
    question: 'If terminal value represents 80% of your DCF, is that a problem? How do you sanity-check it?',
    answer: 'Terminal value routinely represents 60-80% of total DCF value—this is normal and expected, not necessarily a problem. However, it means the model is highly sensitive to terminal assumptions, and small changes in WACC or growth rate can dramatically change the implied value. Sanity checks: (1) Cross-check terminal value against exit multiple method—does the implied exit multiple look reasonable relative to current comps? (2) Check implied perpetuity growth rate—is it reasonable relative to GDP and inflation (2-3%)? (3) Build a sensitivity table showing value at various WACC/growth combinations. (4) Ensure near-term cash flows are reasonable. High TV dependency reinforces the importance of getting the WACC and long-term growth rate right.',
    keyPoints: [
      '60-80% TV share is normal and expected',
      'Problem: model becomes sensitive to WACC and growth rate',
      'Sanity check 1: implied exit multiple vs. comps',
      'Sanity check 2: implied perpetuity growth rate vs. GDP',
      'Build sensitivity table to show range of outcomes'
    ]
  },

  // ===== M&A (continued) =====
  {
    id: 'ma-007',
    category: 'ma',
    subcategory: 'Deal Structure',
    difficulty: 'hard',
    question: 'What is the difference between an asset deal and a stock deal from a tax perspective? Which does each party prefer?',
    answer: 'Asset Deal: The buyer acquires individual assets and liabilities. The buyer gets a "step-up" in tax basis for all assets to fair market value—this creates additional D&A deductions, reducing future taxes. Sellers face higher taxes: ordinary income rates on depreciation recapture, capital gains on appreciated assets. Stock Deal: The buyer acquires shares of the company; no step-up in basis. The target\'s existing tax basis carries over. Simpler legally—all contracts, licenses, permits transfer automatically. Seller pays capital gains tax (lower rate), making it preferable for sellers. Summary: Buyers prefer asset deals (tax benefit); sellers prefer stock deals (lower tax, simplicity). Most deals are stock deals, with the buyer negotiating a price premium to compensate for the tax cost.',
    keyPoints: [
      'Asset deal: buyer gets step-up in basis → more D&A → lower future taxes',
      'Asset deal: seller pays more tax (recapture at ordinary rates)',
      'Stock deal: no step-up; existing basis carries over',
      'Stock deal: simpler (contracts transfer automatically); seller pays capital gains',
      'Buyers prefer assets; sellers prefer stock'
    ]
  },
  {
    id: 'ma-008',
    category: 'ma',
    subcategory: 'Deal Structure',
    difficulty: 'hard',
    question: 'What is a 338(h)(10) election and why would parties agree to it?',
    answer: 'A Section 338(h)(10) election allows a stock acquisition to be treated as an asset acquisition for federal income tax purposes. The buyer gets the tax step-up in basis (as in an asset deal) while the transaction is structured legally as a stock deal (simpler execution). Available only for S-corporations and subsidiaries of consolidated C-corporation groups—not standalone C-corps. The seller effectively pays higher taxes (as if assets were sold) but typically receives a higher purchase price to compensate. The buyer\'s tax benefit (PV of future D&A deductions) often exceeds the seller\'s incremental tax cost, so there is a net tax benefit that can be shared via a higher price—making it a "win-win" structuring tool.',
    keyPoints: [
      'Stock deal treated as asset deal for tax purposes',
      'Buyer gets step-up in basis; seller pays higher taxes',
      'Only available for S-corps and consolidated C-corp subsidiaries',
      'Net tax benefit can be shared via higher purchase price',
      '"Win-win" when buyer\'s benefit > seller\'s tax cost'
    ]
  },
  {
    id: 'ma-009',
    category: 'ma',
    subcategory: 'M&A Concepts',
    difficulty: 'medium',
    question: 'What are the main defensive tactics against a hostile takeover?',
    answer: 'Defensive tactics include: (1) Poison Pill (Shareholder Rights Plan)—allows existing shareholders to buy additional shares at a discount if a hostile buyer exceeds a threshold (~15-20%), diluting the acquirer\'s stake and making the acquisition prohibitively expensive. (2) Staggered Board—only 1/3 of directors face election each year; requires 2-3 years to replace board, preventing quick control. (3) White Knight—seek a friendly acquirer. (4) Pac-Man Defense—target acquires the acquirer. (5) Crown Jewel Defense—sell the most valuable asset. (6) Leveraged Recapitalization—take on debt to pay special dividend, increasing leverage and reducing attractiveness. (7) Litigation—challenge on antitrust or disclosure grounds.',
    keyPoints: [
      'Poison pill: shareholders buy discounted shares → dilutes hostile bidder',
      'Staggered board: takes 2-3 years to gain board control',
      'White knight: find friendly acquirer',
      'Pac-Man: target buys the acquirer',
      'Crown jewel: sell most attractive asset',
      'Leveraged recap: take on debt, pay special dividend'
    ]
  },
  {
    id: 'ma-010',
    category: 'ma',
    subcategory: 'M&A Process',
    difficulty: 'medium',
    question: 'What is the difference between a tender offer and a merger?',
    answer: 'A merger is a negotiated combination between two companies: boards agree, then shareholders vote to approve. It requires shareholder votes, proxy statements, and typically takes 6-12 months to close. A tender offer is a direct offer to buy shares from shareholders at a specified price—it bypasses management and the board. Tender offers can be hostile (board opposes) or friendly. They are typically faster in theory and don\'t always require a shareholder vote (if enough shares are tendered). In practice, most hostile attempts begin as tender offers. After a successful tender, the acquirer often conducts a short-form merger to acquire remaining shares. Tender offers must comply with SEC Rules 14D and 14E (20 business day minimum offering period).',
    keyPoints: [
      'Merger: board-negotiated, shareholder vote required',
      'Tender offer: direct to shareholders, bypasses board',
      'Tender offers can be hostile; mergers are negotiated',
      'Tender: faster; no shareholder vote if enough tendered',
      'Often followed by short-form merger to acquire remaining shares'
    ]
  },
  {
    id: 'ma-011',
    category: 'ma',
    subcategory: 'M&A Concepts',
    difficulty: 'medium',
    question: 'What is an earnout and when is it used in M&A?',
    answer: 'An earnout is a contingent consideration mechanism where the seller receives additional payments after closing if the acquired business hits specified performance targets. Example: buyer pays $100M at close + up to $30M more if the company achieves $15M EBITDA in year 1 post-close. Earnouts are used to bridge valuation gaps when buyer and seller disagree on the future prospects of the business. Common in healthcare, technology, and founder-led businesses where future performance is uncertain or dependent on key people. Key risk for sellers: buyer may manage the business to avoid triggering earnout metrics. Key risk for buyers: earnout creates incentive for seller to maximize short-term metrics at the expense of long-term value.',
    keyPoints: [
      'Contingent payment based on post-close performance targets',
      'Bridges valuation gaps between buyer and seller',
      'Common in healthcare, tech, founder-led businesses',
      'Seller risk: buyer can manage around earnout metrics',
      'Buyer risk: seller optimizes short-term to hit targets'
    ]
  },
  {
    id: 'ma-012',
    category: 'ma',
    subcategory: 'M&A Concepts',
    difficulty: 'medium',
    question: 'What is the difference between a spin-off, a carve-out, and a split-off?',
    answer: 'Spin-off: Parent distributes shares of a subsidiary to existing shareholders on a pro-rata basis. Shareholders end up owning both parent and subsidiary shares. Tax-free if structured under Section 355. Parent receives no cash. Most common divestiture structure. Carve-out (Partial IPO): Parent sells a minority stake in the subsidiary to public investors via an IPO. Parent retains a majority interest and receives cash proceeds. Creates a "currency" for future transactions. Split-off: Shareholders must choose—they exchange their parent shares for subsidiary shares. Reduces parent share count. Less dilutive than spin-off for remaining parent shareholders. Less common than spin-offs.',
    keyPoints: [
      'Spin-off: pro-rata distribution of subsidiary shares; parent gets no cash',
      'Carve-out: minority IPO; parent keeps majority; parent gets cash',
      'Split-off: shareholders choose to swap parent shares for sub shares',
      'Spin-offs tax-free under Section 355 if structured properly',
      'Carve-out used to "surface value" before full spin'
    ]
  },
  {
    id: 'ma-013',
    category: 'ma',
    subcategory: 'M&A Concepts',
    difficulty: 'hard',
    question: 'Walk me through a purchase price allocation (PPA).',
    answer: 'When an acquisition closes, GAAP requires a Purchase Price Allocation: all acquired assets and liabilities are remeasured to fair value. Process: (1) Fair value tangible assets—step up PP&E if market value > book value. (2) Identify and value previously unrecorded intangible assets: brand name, customer relationships, developed technology, backlog, non-competes. These are valued using income or market approaches and assigned useful lives (typically 3-20 years). (3) Any excess purchase price not allocated to identifiable assets = Goodwill (residual). Income statement impact: acquirer must amortize identified intangibles over their useful lives, reducing reported net income post-acquisition. Goodwill is not amortized under GAAP but tested annually for impairment.',
    keyPoints: [
      'All assets/liabilities stepped up to fair value at close',
      'Identify intangibles: brand, customer lists, technology, backlog',
      'Goodwill = Purchase Price − FMV Net Assets − Identified Intangibles',
      'Intangibles amortized over useful life (3-20 yrs) → reduces NI',
      'Goodwill not amortized under GAAP; annual impairment test'
    ]
  },
  {
    id: 'ma-014',
    category: 'ma',
    subcategory: 'M&A Process',
    difficulty: 'easy',
    question: 'What is a fairness opinion and why is it important in M&A?',
    answer: 'A fairness opinion is a written opinion from an investment bank stating that the consideration in a proposed transaction is fair from a financial point of view to the shareholders of a company. It is typically delivered to the board of directors. The bank analyzes the deal using standard valuation methodologies (comps, precedents, DCF) and concludes whether the price is within a fair range. Boards request fairness opinions to fulfill their fiduciary duty to shareholders and to protect themselves from lawsuits (business judgment rule). The primary bank advising on the deal may also deliver the fairness opinion, though this creates a potential conflict of interest since their fee is contingent on deal completion.',
    keyPoints: [
      'Written opinion: consideration is "fair from a financial point of view"',
      'Delivered to board to fulfill fiduciary duty',
      'Uses comps, precedents, DCF to support the opinion',
      'Protects directors under the business judgment rule',
      'Conflict: advising bank paid only if deal closes'
    ]
  },
  {
    id: 'ma-015',
    category: 'ma',
    subcategory: 'Synergies',
    difficulty: 'medium',
    question: 'What synergies would you expect in a horizontal merger versus a vertical merger?',
    answer: 'Horizontal merger (competitors combining): Cost synergies dominate—headcount reduction by eliminating duplicate roles, consolidating overlapping facilities and offices, procurement savings from combined purchasing power, rationalization of overlapping product lines. Revenue synergies: cross-selling complementary products to each other\'s customers, pricing power from reduced competition, geographic expansion. Vertical merger (buyer acquires supplier or customer): Margin synergies—capture the supplier\'s profit margin, eliminate intermediary. Operational benefits—supply chain security, better pricing and production control. Revenue synergies—guaranteed supply or distribution channel. Cost synergies are generally smaller in vertical deals; the primary benefit is margin capture and strategic security.',
    keyPoints: [
      'Horizontal: cost synergies dominate (headcount, facilities, procurement)',
      'Horizontal revenue synergies: cross-sell, pricing power',
      'Vertical: capture supplier/distributor margin',
      'Vertical: supply chain security and lower input costs',
      'Cost synergies more reliable than revenue synergies in both'
    ]
  },
  {
    id: 'ma-016',
    category: 'ma',
    subcategory: 'M&A Concepts',
    difficulty: 'medium',
    question: 'What is a leveraged recapitalization and how does it work?',
    answer: 'A leveraged recapitalization ("leveraged recap") involves a company taking on significant new debt and using the proceeds to pay a large special dividend or repurchase shares, dramatically increasing its leverage ratio. Effect: shareholders receive immediate cash; the company\'s capital structure transforms to resemble an LBO. Used for three main reasons: (1) Return capital to shareholders who want liquidity. (2) Defensive tactic—increased leverage and debt burden makes the company less attractive as an acquisition target. (3) Signal management confidence in future cash flows. Risk: significantly higher interest burden reduces financial flexibility; higher probability of financial distress if operating cash flows disappoint. Post-recap, the stock price often falls to reflect the leverage increase.',
    keyPoints: [
      'Company borrows heavily to pay special dividend or buyback shares',
      'Creates LBO-like capital structure on a public company',
      'Uses: return capital, defensive tactic, signal confidence',
      'Risk: higher interest burden → financial distress risk',
      'Stock price typically falls to reflect new leverage'
    ]
  },

  // ===== LBO (continued) =====
  {
    id: 'lbo-007',
    category: 'lbo',
    subcategory: 'LBO Mechanics',
    difficulty: 'medium',
    question: 'What is a dividend recapitalization and why do PE firms do it?',
    answer: 'A dividend recapitalization ("dividend recap") occurs when a PE-backed company takes on new debt specifically to pay a special cash dividend to the PE fund (and management). The portfolio company\'s leverage increases but the PE fund receives cash before the company is sold. PE firms do recaps for several reasons: (1) Return capital to LPs earlier than the exit, improving the fund\'s IRR. (2) "De-risk" the investment—capital returned cannot be lost if the company later struggles. (3) If exit markets are unfavorable, a recap allows returning capital while continuing to own the business. Downside: increased leverage reduces the company\'s financial flexibility and could impair operations if cash flows deteriorate.',
    keyPoints: [
      'Portco takes new debt → pays special dividend to PE sponsor',
      'Returns capital to LPs without a full exit',
      'Improves fund IRR (earlier return of capital)',
      'Reduces PE\'s remaining equity "at risk"',
      'Risk: higher leverage, reduced financial flexibility for portco'
    ]
  },
  {
    id: 'lbo-008',
    category: 'lbo',
    subcategory: 'LBO Returns',
    difficulty: 'medium',
    question: 'How does carried interest work in a PE fund? What is the typical structure?',
    answer: 'Carried interest is the PE fund manager\'s (GP\'s) share of investment profits—typically 20% of gains above the hurdle rate. The economic waterfall: (1) LPs receive all distributions until they recover 100% of their invested capital. (2) LPs receive a preferred return (hurdle rate, typically 8% IRR) on their capital. (3) GP catch-up: GP receives 80-100% of distributions until GP\'s total profit share equals 20% of total profits above hurdle. (4) Ongoing: 80% to LPs, 20% to GP. Carried interest is taxed at long-term capital gains rates (lower than ordinary income), which has been a significant political controversy. The "2 and 20" fee structure: 2% management fee on committed capital + 20% carry.',
    keyPoints: [
      '20% of profits above the hurdle rate goes to GP as carry',
      'Waterfall: return capital → preferred return → GP catch-up → 80/20 split',
      'Hurdle rate typically 8% IRR',
      'Taxed at long-term capital gains rates',
      '"2 and 20": 2% management fee + 20% carried interest'
    ]
  },
  {
    id: 'lbo-009',
    category: 'lbo',
    subcategory: 'LBO Overview',
    difficulty: 'easy',
    question: 'What is a management buyout (MBO) and how does it differ from a typical LBO?',
    answer: 'An MBO (Management Buyout) is an LBO where the company\'s existing management team is the principal buyer, often backed by a PE firm that provides the equity. Structure is identical to a traditional LBO (significant leverage, equity contribution). Key difference: management already runs the business, so they have intimate knowledge of operations, competitive dynamics, and risk factors—reducing diligence uncertainty. Management typically invests meaningful personal capital alongside the PE fund, creating strong alignment. Common in founder succession situations, corporate carve-outs, and public-to-private transactions where insiders see more value than the market. Key risk: conflict of interest—management may have an incentive to negotiate a lower price to benefit themselves.',
    keyPoints: [
      'Management team is the primary buyer, typically PE-backed',
      'Identical structure to a traditional LBO',
      'Management advantage: deep operational knowledge',
      'Strong alignment: management invests own capital',
      'Risk: management conflict of interest in price negotiation'
    ]
  },
  {
    id: 'lbo-010',
    category: 'lbo',
    subcategory: 'LBO Returns',
    difficulty: 'hard',
    question: 'Walk me through the distribution waterfall in a PE fund.',
    answer: 'The distribution waterfall defines how cash flows from portfolio company exits are distributed between LPs and the GP. Four stages: (1) Return of Capital: all distributions go 100% to LPs until their invested capital is fully returned. (2) Preferred Return: LPs receive a preferred return (typically 8% IRR) on their invested capital before the GP earns anything. (3) GP Catch-Up: the GP receives 80-100% of subsequent distributions until the GP\'s total profit share equals 20% of all profits above the hurdle. (4) Carried Interest Split: remaining distributions split 80% LP / 20% GP. Two structures exist: American waterfall (deal-by-deal carry, GP gets paid on winning deals) and European waterfall (whole-fund carry, safer for LPs).',
    keyPoints: [
      'Stage 1: LPs recover 100% of invested capital',
      'Stage 2: LPs receive 8% preferred return',
      'Stage 3: GP catch-up to 20% of total profits',
      'Stage 4: 80/20 split ongoing',
      'American waterfall: deal-by-deal; European: whole-fund'
    ]
  },
  {
    id: 'lbo-011',
    category: 'lbo',
    subcategory: 'LBO Mechanics',
    difficulty: 'medium',
    question: 'What is covenant-lite debt and why has it become popular in leveraged buyouts?',
    answer: 'Covenant-lite (cov-lite) loans are leveraged loans that contain few or no financial maintenance covenants. Traditional leveraged loans required borrowers to maintain financial ratios (e.g., Net Debt/EBITDA ≤ 5.0x) tested quarterly—a breach triggers a default. Cov-lite loans only have incurrence covenants, triggered by specific borrower actions (new debt issuance, dividends, asset sales). Cov-lite became dominant in the leveraged loan market post-2012 driven by high institutional demand (CLOs) chasing yield. Benefits for PE sponsors: more operating flexibility, fewer forced renegotiations, and ability to tolerate earnings volatility without technical default. Risk for lenders: limited early warning signals before financial distress.',
    keyPoints: [
      'No financial maintenance covenants tested quarterly',
      'Only incurrence covenants (triggered by specific actions)',
      'Dominant in leveraged loan market since ~2012',
      'PE benefit: operational flexibility, no technical default on earnings dip',
      'Lender risk: limited early warning before distress'
    ]
  },
  {
    id: 'lbo-012',
    category: 'lbo',
    subcategory: 'LBO Returns',
    difficulty: 'medium',
    question: 'How do add-on acquisitions create value in an LBO?',
    answer: 'Add-on (bolt-on) acquisitions involve a PE-backed platform company acquiring smaller companies to drive value creation. Multiple arbitrage: PE buys smaller targets at lower multiples (e.g., 5-6x EBITDA) and integrates them into a larger platform that may exit at a higher multiple (8-10x). The combined entity\'s larger scale justifies the premium. Operational value creation: cost synergies from integration (procurement, SG&A), cross-selling revenue synergies, geographic or capability expansion. EBITDA growth: add-on targets are immediately EBITDA-accretive, accelerating the PE fund\'s return profile. Buy-and-build or roll-up strategies are common in fragmented industries (healthcare, IT services, specialty manufacturing).',
    keyPoints: [
      'Multiple arbitrage: acquire at 5-6x, exit platform at 8-10x',
      'Larger scale justifies higher exit multiple',
      'Cost synergies: procurement, SG&A consolidation',
      'Accelerates EBITDA growth → better returns',
      'Common in fragmented industries: healthcare, IT services, manufacturing'
    ]
  },
  {
    id: 'lbo-013',
    category: 'lbo',
    subcategory: 'LBO Overview',
    difficulty: 'easy',
    question: 'What is the difference between a financial sponsor (PE firm) and a strategic acquirer? Which typically pays more?',
    answer: 'A financial sponsor (PE firm) acquires companies purely for financial returns—they apply leverage, improve operations, and sell within 3-7 years. They value based on standalone cash flows plus financial engineering. A strategic acquirer is an existing operating company buying a target in a related industry—they can realize synergies (cost and revenue) that a PE firm cannot. Because synergies increase the combined company\'s value, strategics can justify paying more than a financial sponsor. In practice, strategics often win competitive auctions unless: (1) the PE firm has significant operational expertise specific to the sector, (2) the process is structured to favor PE (e.g., management wants independence), or (3) synergies are uncertain.',
    keyPoints: [
      'PE (financial): leverage + operational improvement + exit in 3-7 years',
      'Strategic: operates in same/adjacent industry; synergies justify premium',
      'Strategic typically pays more due to synergies',
      'PE wins when strategics lack synergies or management prefers independence',
      'PE disciplines value by EBITDA multiples and IRR hurdles'
    ]
  },
  {
    id: 'lbo-014',
    category: 'lbo',
    subcategory: 'LBO Returns',
    difficulty: 'medium',
    question: 'How does a change in exit multiple affect LBO returns? Walk me through an example.',
    answer: 'Exit multiple is one of the three primary PE return drivers and has a large impact. Example: PE buys company at 8x $50M EBITDA = $400M EV, with $250M debt and $150M equity. After 5 years: EBITDA grows to $70M, debt paid down to $150M. Exit at 8x → EV = $560M, equity = $560M − $150M = $410M → MOIC = 2.7x. Exit at 10x → EV = $700M, equity = $700M − $150M = $550M → MOIC = 3.7x. That 2-turn improvement in exit multiple is worth $140M to equity, more than doubling the incremental return. This is why PE sponsors focus on positioning companies as premium assets at exit and why hold period timing matters (exit during strong M&A market).',
    keyPoints: [
      '1-turn improvement in exit multiple at $70M EBITDA = $70M more EV',
      'All of that incremental EV goes to equity holders',
      'Exit multiple has disproportionate impact on smaller equity checks',
      'PE tries not to underwrite multiple expansion but benefits when it occurs',
      'Exit timing matters: sell in a strong M&A market'
    ]
  },

  // ===== BRAIN TEASERS (continued) =====
  {
    id: 'bt-006',
    category: 'brainteasers',
    subcategory: 'Conceptual',
    difficulty: 'medium',
    question: 'If interest rates rise by 1%, what happens to bond prices? Why?',
    answer: 'Bond prices fall when interest rates rise—they are inversely related. Intuition: if you own a bond paying 5% but new bonds now pay 6%, your bond is less valuable because it pays less than the market rate. Buyers will only purchase it at a discount. Mathematically: bond price = PV of future coupons + PV of principal, both discounted at the current market yield. When yields rise, the discount rate rises and PV falls. The magnitude depends on duration: a 10-year bond with duration ~9 years will fall approximately 9% in price for a 1% rise in rates. Longer-duration bonds are more sensitive to rate changes. This is a critical concept: "Duration × ΔYTM ≈ % price change."',
    keyPoints: [
      'Bond prices and yields are inversely related',
      'Rising rates → higher discount rate → lower PV → lower price',
      'Price change ≈ −Duration × Change in yield',
      '10-year bond, ~9yr duration: price falls ~9% per 1% rate rise',
      'Longer duration = more rate-sensitive'
    ]
  },
  {
    id: 'bt-007',
    category: 'brainteasers',
    subcategory: 'Math',
    difficulty: 'easy',
    question: 'A company has $75M EBITDA. At 9x EV/EBITDA with $200M of net debt, what is the equity value?',
    answer: 'EV = $75M × 9 = $675M. Equity Value = EV − Net Debt = $675M − $200M = $475M. Quick mental math: 75 × 9 = 75 × 10 − 75 = 750 − 75 = 675. Then 675 − 200 = 475. This is a common interview calculation—practice EV → equity bridge: EV minus net debt (total debt + preferred + minority interest − cash) = equity value.',
    keyPoints: [
      'EV = $75M × 9x = $675M',
      'Equity Value = $675M − $200M net debt = $475M',
      'Mental math: 75×9 = 75×10 − 75 = 675',
      'EV → Equity: always subtract net debt',
      'Net Debt = Total Debt + Preferred + Minority Interest − Cash'
    ]
  },
  {
    id: 'bt-008',
    category: 'brainteasers',
    subcategory: 'Math',
    difficulty: 'hard',
    question: 'A company issues $500M of debt at 6% interest to repurchase shares. Shares outstanding: 100M, stock price: $25, EPS: $2.00, tax rate: 35%. Is this accretive or dilutive? By how much?',
    answer: 'Shares repurchased: $500M / $25 = 20M shares. New share count: 100M − 20M = 80M. New interest expense: $500M × 6% = $30M. After-tax interest: $30M × (1 − 35%) = $19.5M. Old net income: $2.00 × 100M = $200M. New net income: $200M − $19.5M = $180.5M. New EPS: $180.5M / 80M = $2.26. Accretion: $2.26 vs $2.00 original = +$0.26, or +13% accretive. This is accretive because the after-tax cost of debt (4.7% effective after-tax yield on $500M = $23.5M... wait, let me recalculate) is lower than the earnings yield of the repurchased shares (EPS/Price = $2/$25 = 8%).',
    keyPoints: [
      'Shares repurchased: $500M / $25 = 20M',
      'After-tax interest cost: $30M × (1 − 35%) = $19.5M',
      'New NI: $200M − $19.5M = $180.5M; New EPS: $180.5M / 80M = $2.26',
      '+13% accretive',
      'Accretive when after-tax cost of debt < earnings yield on repurchased shares'
    ]
  },
  {
    id: 'bt-009',
    category: 'brainteasers',
    subcategory: 'Conceptual',
    difficulty: 'medium',
    question: 'If a bond trades at $950 with a face value of $1,000 and a 5% coupon, is the yield above or below 5%? Why?',
    answer: 'The yield is above 5%. The bond trades at a discount to par value ($950 < $1,000), which means you are paying less than face value but will receive $1,000 at maturity. This capital gain ($50) adds to your total return, pushing the yield above the stated coupon rate. Current yield = Annual Coupon / Price = $50 / $950 = 5.26%. The yield to maturity (YTM) is slightly higher, around 5.5-5.6%, as it also accounts for the capital gain from $950 to $1,000. Key principle: price and yield move inversely. Discount bond → yield > coupon. Premium bond → yield < coupon. Par bond → yield = coupon.',
    keyPoints: [
      'Yield > 5% because bond trades at a discount to par',
      'Capital gain ($950 → $1,000 at maturity) boosts total return',
      'Current yield = $50/$950 = 5.26%',
      'YTM slightly higher (~5.5%) includes capital appreciation',
      'Discount → yield > coupon; Premium → yield < coupon'
    ]
  },
  {
    id: 'bt-010',
    category: 'brainteasers',
    subcategory: 'Math',
    difficulty: 'medium',
    question: 'What is 23 × 27? And 19 × 21?',
    answer: '23 × 27 = 621. Use the difference-of-squares shortcut: (25 − 2)(25 + 2) = 25² − 2² = 625 − 4 = 621. For 19 × 21: (20 − 1)(20 + 1) = 20² − 1² = 400 − 1 = 399. The pattern (a − b)(a + b) = a² − b² is extremely useful for mental math when two numbers are symmetric around a round number. Practice: 48×52 = 50²−4 = 2496. 97×103 = 100²−9 = 9991.',
    keyPoints: [
      '23 × 27 = (25−2)(25+2) = 625 − 4 = 621',
      '19 × 21 = (20−1)(20+1) = 400 − 1 = 399',
      'Pattern: (a−b)(a+b) = a² − b²',
      'Works when numbers are symmetric around a round base',
      'Practice: 48×52 = 2496, 97×103 = 9991'
    ]
  },

  // ===== ACCOUNTING (continued) =====
  {
    id: 'acc-023',
    category: 'accounting',
    subcategory: 'Three Statements',
    difficulty: 'easy',
    question: 'A company raises $200M through a follow-on equity offering. Walk me through the impact on all three financial statements.',
    answer: 'Income Statement: No immediate impact on net income. Going forward, the higher share count will dilute EPS (assuming earnings do not grow proportionally with the new capital raised). Cash Flow Statement: +$200M inflow in Financing Activities (proceeds from issuance of common stock). Balance Sheet: Cash increases by $200M; equity (specifically Additional Paid-In Capital) increases by $200M. Total assets up $200M equals total equity up $200M—the balance sheet balances. Unlike a debt raise, there is no interest expense and no future repayment obligation, but existing shareholders are diluted.',
    keyPoints: [
      'IS: No immediate impact; future EPS diluted by more shares',
      'CFS: +$200M in Financing Activities',
      'BS: Cash +$200M, APIC (equity) +$200M',
      'No interest expense, no repayment obligation',
      'Existing shareholders diluted — ownership % decreases'
    ]
  },
  {
    id: 'acc-024',
    category: 'accounting',
    subcategory: 'Income Statement',
    difficulty: 'medium',
    question: 'What is the difference between capitalizing and expensing a cost? Walk through the financial statement impact of each.',
    answer: 'Expensing: the full cost hits the Income Statement immediately, reducing pre-tax income and net income in the current period. Capitalizing: the cost is recorded as an asset on the Balance Sheet and expensed gradually through depreciation or amortization over its useful life. Example with a $120M cost at 30% tax rate: If expensed → IS: NI falls $84M; CFS: operating CF falls $84M (or investing if CapEx); BS: Cash −$120M, RE −$84M. If capitalized (10-year life) → IS: only $12M/yr D&A hits; NI falls $8.4M/yr; BS: Cash −$120M, PP&E +$120M. Key rule: costs that provide future benefit are capitalized (PP&E, software); period costs are expensed (R&D under US GAAP, SG&A). Capitalizing boosts near-term earnings but creates future depreciation drag.',
    keyPoints: [
      'Expense: full cost hits IS immediately → lower NI now',
      'Capitalize: record as asset, depreciate over useful life → lower NI spread over time',
      'Capitalizing boosts near-term earnings vs. expensing',
      'Both have same total long-run income impact',
      'US GAAP: R&D expensed; IFRS: development costs can be capitalized'
    ]
  },
  {
    id: 'acc-025',
    category: 'accounting',
    subcategory: 'Balance Sheet',
    difficulty: 'medium',
    question: 'Walk me through the PP&E rollforward. How does PP&E on the balance sheet change from one period to the next?',
    answer: 'Net PP&E(end) = Net PP&E(begin) + CapEx − Depreciation − Net Book Value of Disposals. Starting with gross PP&E, you add new capital expenditures (acquisitions, construction), then subtract the accumulated depreciation charge for the period (D&A expense), and remove any assets sold or written off at their net book value. The result is ending net PP&E. This rollforward links directly to the financial statements: CapEx appears as a cash outflow in Investing Activities on the CFS; D&A appears as an operating expense on the IS and a non-cash add-back in Operating Activities on the CFS. Analysts use PP&E rollforwards to verify CapEx assumptions in models and assess asset intensity.',
    keyPoints: [
      'Net PP&E(end) = Net PP&E(begin) + CapEx − D&A − Disposals',
      'CapEx → Investing Activities on CFS (cash outflow)',
      'D&A → Operating expense on IS; add-back on CFS',
      'Gross PP&E − Accumulated Depreciation = Net PP&E',
      'Key model check: CFS CapEx must tie to BS PP&E change'
    ]
  },

  // ===== VALUATION (continued) =====
  {
    id: 'val-017',
    category: 'valuation',
    subcategory: 'Valuation Mechanics',
    difficulty: 'medium',
    question: 'When would you use EV/EBIT instead of EV/EBITDA as a valuation multiple?',
    answer: 'EV/EBIT is preferred when D&A is economically meaningful and should not be added back. EBITDA strips out depreciation entirely, treating all companies as if asset wear-and-tear is costless. For capital-intensive businesses where D&A is a reasonable proxy for maintenance CapEx, this distorts comparisons—a company that spends heavily on assets looks artificially cheap on EV/EBITDA. Use EV/EBIT for: heavy manufacturing, utilities, telecom, transportation, mining/resources where assets must be continuously replaced. Also use when companies have very different depreciation policies or asset lives, making EBITDA non-comparable. EV/EBITDA remains more popular in practice because it is closer to cash flow, but EV/EBIT is the more intellectually honest multiple for asset-heavy industries.',
    keyPoints: [
      'EV/EBIT keeps D&A as a cost; EV/EBITDA adds it back',
      'Use EV/EBIT when D&A ≈ maintenance CapEx (heavy industries)',
      'Asset-heavy: manufacturing, utilities, telecom, transportation',
      'EBITDA overstates cash flow for capital-intensive businesses',
      'EV/EBITDA still more widely used due to simplicity'
    ]
  },
  {
    id: 'val-018',
    category: 'valuation',
    subcategory: 'Enterprise Value',
    difficulty: 'hard',
    question: 'How do you treat minority interest (non-controlling interest) when calculating Enterprise Value in a comps analysis?',
    answer: 'Minority interest must be added to Enterprise Value. The reason is a consistency principle: when a parent owns, say, 80% of a subsidiary, it consolidates 100% of the subsidiary\'s revenue and EBITDA into its financials. But only 80% of the equity value belongs to the parent—the other 20% belongs to minority shareholders. So EV (which should reflect total claims on the business) must include this minority interest. If you omit it, EV is understated relative to EBITDA, artificially lowering the EV/EBITDA multiple. In practice, minority interest is added at book value from the balance sheet if the subsidiary is not publicly traded, or at market value if it is. Formula: EV = Market Cap + Net Debt + Preferred Stock + Minority Interest.',
    keyPoints: [
      'Parent consolidates 100% of subsidiary EBITDA but only owns ~80%',
      'EV must include 20% minority interest for consistency',
      'Omitting minority interest understates EV → artificially low multiple',
      'Add at book value (private sub) or market value (public sub)',
      'EV = Mkt Cap + Net Debt + Preferred + Minority Interest'
    ]
  },
  {
    id: 'val-019',
    category: 'valuation',
    subcategory: 'Methodologies',
    difficulty: 'medium',
    question: 'How is an LBO analysis used as a valuation methodology? What does it tell you?',
    answer: 'An LBO analysis establishes a "floor" valuation—the maximum price a financial sponsor could pay and still achieve its minimum required return (typically 20-25% IRR). By working backwards from a target IRR, assumed leverage, and exit multiple, you can solve for the implied maximum entry EV or offer price. In a sell-side M&A process, bankers include LBO analysis in the football field to show clients the minimum price PE firms would pay. It answers: "Would private equity be interested, and at what price?" If the LBO-implied value is well below comps and precedents, it suggests PE buyers may be outbid by strategics. If LBO value is close to strategic value, it signals competitive tension and a potentially strong auction.',
    keyPoints: [
      'LBO analysis sets the valuation floor (PE buyer\'s max entry price)',
      'Solve for entry price that achieves target IRR (20-25%)',
      'Inputs: leverage assumptions, EBITDA growth, exit multiple, hold period',
      'Used in football field chart alongside comps, precedents, DCF',
      'High LBO value = strong PE interest = competitive auction'
    ]
  },

  // ===== DCF (continued) =====
  {
    id: 'dcf-013',
    category: 'dcf',
    subcategory: 'WACC',
    difficulty: 'hard',
    question: 'How do you calculate the cost of preferred stock and how does it factor into WACC?',
    answer: 'Cost of preferred stock (Rp) = Annual Preferred Dividend / Market Price of Preferred Stock. Unlike debt interest, preferred dividends are paid from after-tax income—they are not tax-deductible. Therefore, there is no tax shield adjustment. Extended WACC formula: WACC = (E/V)×Re + (D/V)×Rd×(1−T) + (P/V)×Rp, where P = preferred stock market value, V = E + D + P, Rp = preferred dividend yield. Preferred stock is a hybrid security: fixed dividend (like debt) but subordinated to debt and sits above common equity. In practice, most companies have minimal preferred stock, so it is often excluded from WACC or immaterial. It is more significant for financial institutions, utilities, and REITs.',
    keyPoints: [
      'Cost of preferred = Annual Dividend / Market Price of Preferred',
      'No tax shield: preferred dividends paid from after-tax income',
      'Extended WACC: + (P/V) × Rp',
      'Preferred: fixed dividends but junior to debt, senior to common',
      'Usually immaterial; more significant for banks, utilities, REITs'
    ]
  },
  {
    id: 'dcf-014',
    category: 'dcf',
    subcategory: 'DCF Assumptions',
    difficulty: 'hard',
    question: 'What is a circular reference in a financial model and how do you handle it?',
    answer: 'A circular reference occurs when a formula refers back to itself through a chain of calculations. In financial models, the classic example is interest expense: interest expense depends on the debt balance, which depends on net income (after interest), which depends on interest expense. Another example: a revolver drawn based on cash shortfall, which depends on net income, which depends on interest on the revolver. Solutions: (1) Use beginning-of-period debt balance to calculate interest (simple approximation, eliminates circularity with minimal error). (2) Enable Excel\'s iterative calculations—the model recalculates repeatedly until values converge. (3) Use a plug-and-check approach. Most LBO models use iterative calculations because the revolver and interest expense are inherently circular. The risk with iterative calculations is that Excel may converge on a wrong answer if the initial state is far off.',
    keyPoints: [
      'Classic example: interest expense ↔ debt balance ↔ net income',
      'Solution 1: use beginning-of-period balance (simple, accurate)',
      'Solution 2: enable Excel iterative calculations',
      'LBO models commonly use iterative calcs for revolver/interest',
      'Risk: iterative calcs can converge on wrong answer'
    ]
  },

  // ===== M&A (continued) =====
  {
    id: 'ma-017',
    category: 'ma',
    subcategory: 'Deal Structure',
    difficulty: 'medium',
    question: 'In an all-stock deal, if the acquirer\'s P/E is 15x and the acquisition price implies a P/E of 25x, is the deal accretive or dilutive? Explain the P/E crossover rule.',
    answer: 'The deal is dilutive. In an all-stock deal, the acquirer issues shares (valued at 15x earnings) to buy a target (priced at 25x earnings). Each share issued buys fewer earnings than it represents—you are giving up 15x earnings power to acquire 25x earnings power. P/E Crossover Rule: all-stock deal is accretive if acquirer P/E > acquisition P/E, dilutive if acquirer P/E < acquisition P/E. Intuition: if you issue a share worth $150 (15× $10 EPS) to acquire a company at $250 (25× earnings), you need that company to earn more than $10 to offset the $10 EPS you "gave up." Synergies can bridge the gap—sufficient cost or revenue synergies can turn a dilutive deal accretive.',
    keyPoints: [
      'Dilutive when acquirer P/E < acquisition P/E (15x < 25x)',
      'P/E crossover rule: accretive if acquirer P/E > deal P/E',
      'Issuing cheap stock (low P/E) to buy expensive target = dilutive',
      'Issuing expensive stock (high P/E) to buy cheap target = accretive',
      'Synergies can turn a dilutive deal accretive'
    ]
  },
  {
    id: 'ma-018',
    category: 'ma',
    subcategory: 'M&A Concepts',
    difficulty: 'medium',
    question: 'What is a merger of equals (MOE) and how does it differ from a standard acquisition?',
    answer: 'A merger of equals is a combination of two companies of roughly similar size where no party pays a traditional control premium and neither is clearly the "acquirer." Key features: (1) All-stock deal—no cash premium; shareholders of both companies receive shares in the combined entity at a negotiated exchange ratio based on relative valuations. (2) Combined leadership—co-CEO structure or shared board, leading to governance complexity. (3) No goodwill or minimal premium—so no large intangibles D&A hit post-close. (4) Shareholder votes required from both sides. (5) Presented as a "merger" rather than an acquisition to avoid negative connotations. In practice, true mergers of equals are rare—one party usually exerts more control. Famous examples: Pfizer/Warner-Lambert, Dow/DuPont. They often struggle with integration due to shared decision-making.',
    keyPoints: [
      'All-stock deal at negotiated exchange ratio; no cash premium',
      'Neither party is "acquirer"; both shareholder bases must approve',
      'No control premium → minimal goodwill creation',
      'Combined leadership often creates governance challenges',
      'True MOEs are rare; one party usually dominates post-close'
    ]
  },

  // ===== LBO (continued) =====
  {
    id: 'lbo-015',
    category: 'lbo',
    subcategory: 'LBO Returns',
    difficulty: 'hard',
    question: 'What happens to LBO equity returns if EBITDA declines 20% during the hold period? Walk through the mechanics.',
    answer: 'An EBITDA decline has a compounding negative effect on equity. Example: PE buys at 8x on $100M EBITDA = $800M EV, $480M debt, $320M equity. EBITDA falls to $80M. (1) Exit EV falls: at same 8x exit multiple, EV = $80M × 8 = $640M—$160M lower than entry. (2) Debt paydown is impaired—less FCF to service debt, so more debt remains. Assume debt stays at $480M (worst case, no paydown). Equity = $640M − $480M = $160M vs $320M invested → loss of 50%. (3) Covenant breach risk: at $80M EBITDA, leverage = $480M/$80M = 6.0x—potentially breaching senior debt covenants. (4) If the business recovers but the timeline extends, IRR deteriorates even if MOIC recovers. Leverage turns every dollar of EBITDA decline into multiple dollars of equity loss.',
    keyPoints: [
      'Exit EV falls: $80M × 8x = $640M vs $800M entry',
      'Less FCF for debt paydown → higher remaining debt at exit',
      'Equity value compressed on both sides (lower EV, higher debt)',
      'Covenant breach risk: higher Net Debt/EBITDA ratio',
      'Leverage amplifies losses just as it amplifies gains'
    ]
  },
  {
    id: 'lbo-016',
    category: 'lbo',
    subcategory: 'LBO Overview',
    difficulty: 'medium',
    question: 'When does leverage enhance returns in an LBO and when does it hurt?',
    answer: 'Leverage enhances returns when: (1) the company generates stable, predictable cash flows sufficient to service interest and repay principal, (2) the entry multiple is reasonable relative to cash flows, (3) operating performance meets or exceeds projections, (4) interest rates are manageable, and (5) the business is not cyclical. Mechanism: PE invests less equity for the same asset; all upside above the purchase price goes to equity. Leverage hurts when: (1) cash flows are volatile (can\'t cover debt service in downturns), (2) too much leverage leaves no margin of safety, (3) covenants are breached forcing renegotiation, (4) rising rates increase interest burden (floating rate debt), (5) a recession or operational miss compresses EBITDA and equity gets wiped out. The LBO thesis must be stress-tested against downside scenarios.',
    keyPoints: [
      'Helps: stable cash flows, reasonable entry, good operations, low rates',
      'Hurts: volatile cash flows, high leverage, covenant breach, rising rates',
      'Leverage amplifies gains AND losses symmetrically',
      'Stress test: what if EBITDA falls 20%? Can debt be serviced?',
      'Good LBO: multiple ways to win; bad LBO: only works in base case'
    ]
  },

  // ===== BRAIN TEASERS (continued) =====
  {
    id: 'bt-011',
    category: 'brainteasers',
    subcategory: 'Math',
    difficulty: 'easy',
    question: 'What is the Rule of 72? Use it to estimate how long it takes an investment to double at 8%, 12%, and 20% returns.',
    answer: 'The Rule of 72 states that the number of years to double an investment ≈ 72 / Annual Return (%). At 8%: 72/8 = 9 years. At 12%: 72/12 = 6 years. At 20%: 72/20 = 3.6 years. It also works in reverse: if an investment doubles in 4 years, implied return ≈ 72/4 = 18%. This is invaluable for quick PE return sanity checks. PE target IRR of 20-25% means they need to approximately double equity every 3-4 years. The Rule of 72 is accurate within ~1% for returns in the 6-20% range. For very high or low rates, use Rule of 70 or Rule of 69.3 (natural log approximation) for better accuracy.',
    keyPoints: [
      'Years to double ≈ 72 / Return (%)',
      '8% → 9 years; 12% → 6 years; 20% → 3.6 years',
      'Reverse: if doubles in N years → return ≈ 72/N',
      'PE at 20% IRR needs to double equity every ~3.6 years',
      'Accurate for returns in 6-20% range'
    ]
  },
  {
    id: 'bt-012',
    category: 'brainteasers',
    subcategory: 'Math',
    difficulty: 'medium',
    question: 'A company\'s revenue was $300M in 2020 and grew to $600M by 2025. What is the CAGR? How would you estimate it quickly?',
    answer: 'Exact CAGR = (600/300)^(1/5) − 1 = 2^(0.2) − 1 ≈ 14.9%. Quick estimation using Rule of 72: revenue doubled in 5 years → CAGR ≈ 72/5 = 14.4%. Close enough for an interview. The general CAGR formula: (Ending Value / Beginning Value)^(1/n) − 1, where n = number of years. Key benchmarks to memorize: 2x in 3yr ≈ 26%; 2x in 4yr ≈ 19%; 2x in 5yr ≈ 15%; 3x in 5yr ≈ 25%. When given a starting and ending value and asked for growth, think in multiples first, then estimate using these benchmarks.',
    keyPoints: [
      'CAGR = (End/Start)^(1/n) − 1 = 2^(0.2) − 1 ≈ 14.9%',
      'Quick: Rule of 72 → doubled in 5 years ≈ 14.4%',
      'Benchmarks: 2x/5yr≈15%, 2x/4yr≈19%, 3x/5yr≈25%',
      'Think in multiples first, then use benchmarks',
      'Rule of 72 gives good approximation for interview purposes'
    ]
  },
  {
    id: 'bt-013',
    category: 'brainteasers',
    subcategory: 'Conceptual',
    difficulty: 'medium',
    question: 'A company does a 2-for-1 stock split. What happens to EPS, the stock price, market cap, and P/E ratio?',
    answer: 'A stock split is purely cosmetic—it creates no economic value. Each existing share is replaced by 2 shares at half the price. Share count: doubles (e.g., 50M → 100M). Stock price: halves (e.g., $40 → $20). Market cap: unchanged ($40 × 50M = $20 × 100M = $2B). EPS: halves (same net income / double the shares: $2.00 → $1.00). P/E ratio: unchanged (was $40/$2.00 = 20x; now $20/$1.00 = 20x). The split makes shares more accessible to retail investors (lower price per share) but creates no new value. Contrast this with a dilutive equity issuance, which does hurt EPS because new shares are sold but the proceeds must earn a return to be accretive.',
    keyPoints: [
      'Stock split: purely cosmetic, no economic value created',
      'Price halves, shares double, market cap unchanged',
      'EPS halves; P/E ratio unchanged',
      'Makes shares more accessible at lower price per share',
      'Contrast: dilutive issuance does hurt EPS (new shares sold for cash)'
    ]
  },
  {
    id: 'bt-014',
    category: 'brainteasers',
    subcategory: 'Conceptual',
    difficulty: 'hard',
    question: 'Walk me through what happens to the three financial statements when a company issues $100M of convertible debt at 2% interest.',
    answer: 'At issuance — Balance Sheet: Cash +$100M; Convertible Debt (liability) +$100M. IS/CFS: no impact at issuance. Ongoing (while outstanding) — Income Statement: Interest expense = $100M × 2% = $2M/year, reducing pre-tax income. After 30% tax: net income falls $1.4M/year. CFS: $2M cash interest outflow in Operating Activities. BS: cash decreases $2M/year (interest payments); debt stays at $100M. Upon conversion — when holders convert to equity: Debt −$100M, Common Stock/APIC +$100M on the Balance Sheet. No cash impact. Share count increases (dilutive). Interest expense disappears. For diluted EPS, the convertible shares are included via the if-converted method: add back after-tax interest to numerator, add converted shares to denominator.',
    keyPoints: [
      'Issuance: Cash +$100M, Convertible Debt +$100M; no IS impact',
      'Ongoing: $2M interest expense/year reduces NI by $1.4M (after tax)',
      'Conversion: Debt −$100M, APIC +$100M; no cash; shares increase',
      'Diluted EPS: if-converted method (add back interest, add shares)',
      'Low coupon convertibles: cheap financing but future dilution risk'
    ]
  },
  {
    id: 'bt-015',
    category: 'brainteasers',
    subcategory: 'Conceptual',
    difficulty: 'easy',
    question: 'Why might a company choose to issue debt rather than equity to fund an acquisition?',
    answer: 'Several reasons to prefer debt: (1) Tax benefit—interest expense is tax-deductible, reducing the after-tax cost of debt. Equity dividends are not deductible. (2) No dilution—debt does not dilute existing shareholders\' ownership or EPS (assuming the acquisition is accretive). (3) Signal of confidence—issuing equity can signal that management thinks the stock is overvalued; taking on debt signals confidence in cash flows. (4) Lower cost—cost of debt (after-tax) is typically lower than cost of equity because debtholders have priority in bankruptcy. (5) Speed—debt can be arranged faster than a public equity offering. Reasons to prefer equity: if leverage is already high, financial flexibility is constrained, or the deal is very large relative to the acquirer\'s size.',
    keyPoints: [
      'Tax shield: interest is deductible, reducing after-tax cost',
      'No dilution: existing shareholders retain ownership %',
      'Debt signals confidence in cash flow generation',
      'Lower cost of capital than equity (priority in bankruptcy)',
      'Prefer equity when: already levered, deal is very large, stock is overvalued'
    ]
  },
];

export const getQuestionsByCategory = (category: Category) =>
  questions.filter(q => q.category === category);

export const getQuestionsByDifficulty = (difficulty: Difficulty) =>
  questions.filter(q => q.difficulty === difficulty);

export const getRandomQuestions = (count: number, category?: Category): Question[] => {
  const pool = category ? getQuestionsByCategory(category) : questions;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};
