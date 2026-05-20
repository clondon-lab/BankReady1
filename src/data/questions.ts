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
