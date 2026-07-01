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
  // ─────────────────────────────────────────────
  // 1. ACCOUNTING FUNDAMENTALS
  // ─────────────────────────────────────────────
  {
    id: 'accounting',
    title: 'Accounting Fundamentals',
    description: 'The foundation of every IB topic. If you understand how the three statements link, you can reason through almost any technical question — even ones you\'ve never seen before.',
    icon: '📊',
    color: 'blue',
    level: 'Beginner',
    duration: '~2 hours',
    sections: [
      {
        id: 'acct-s1',
        title: 'The Three Financial Statements',
        lessons: [
          {
            id: 'acct-l1',
            title: 'What the Three Statements Actually Are',
            duration: '10 min',
            content: `## The Three Statements: Three Camera Angles on One Engine

A company is an engine that turns resources into cash. The three financial statements are three different camera angles on that engine. None of them alone tells the whole story; together they do.

### The Income Statement (IS)

The Income Statement answers: *Did the company make a profit over a period of time?*

It starts with Revenue (sales) and subtracts expenses step by step until you reach Net Income at the bottom. Crucially, it is built on **accrual accounting** — it records revenue when it's *earned* and expenses when they're *incurred*, not when cash actually moves. That single fact is the source of half of all accounting interview questions. A company can show a big profit and still be running out of cash.

Top-to-bottom:
- Revenue
- (–) Cost of Goods Sold (COGS) → **Gross Profit**
- (–) Operating Expenses (SG&A, R&D, D&A) → **Operating Income (EBIT)**
- (–) Interest, (+/–) other non-operating items → **Pre-Tax Income (EBT)**
- (–) Taxes → **Net Income**

### The Balance Sheet (BS)

The Balance Sheet answers: *What does the company own and owe at a single moment in time?*

It's a snapshot, not a movie. It always obeys one equation:

**Assets = Liabilities + Shareholders' Equity**

Assets are resources the company controls (Cash, Accounts Receivable, Inventory, PP&E). Liabilities are obligations (Accounts Payable, Debt). Shareholders' Equity is what's left for the owners after all obligations are met. The Balance Sheet *must* always balance — if it doesn't, you made an error. This is your built-in error checker on every interview question.

### The Cash Flow Statement (CFS)

The Cash Flow Statement answers: *How much actual cash did the company generate or burn?*

It exists precisely because the Income Statement lies about cash (thanks to accrual accounting). It starts with Net Income and then *undoes* all the accrual distortions to get to real cash movement. Three sections:
- **Cash Flow from Operations (CFO)** — cash from the core business
- **Cash Flow from Investing (CFI)** — buying/selling long-term assets (CapEx lives here)
- **Cash Flow from Financing (CFF)** — raising/repaying debt, issuing stock, paying dividends

The bottom line is the **Net Change in Cash**, which flows to the Cash line on the Balance Sheet.

### Check Yourself

If you were stranded on a desert island and could see only ONE statement to judge a company's health, which would you pick?

→ The **Cash Flow Statement**, because cash generation is the truest measure of health, independent of the non-cash accounting choices that can distort the Income Statement.`,
            keyTakeaways: [
              'IS = profitability over a period (accrual). BS = position at a point in time (must balance). CFS = actual cash movement, built to correct the IS\'s accrual distortions.',
              'The Income Statement uses accrual accounting — profit ≠ cash.',
              'Assets = Liabilities + Shareholders\' Equity always. If it doesn\'t balance, you made an error.',
              'The CFS exists to correct the IS: it starts with Net Income and adds back non-cash items.',
              'If you could only pick one statement: CFS, because it shows true cash generation.',
            ],
          },
          {
            id: 'acct-l2',
            title: 'How the Statements Link (the heart of everything)',
            duration: '10 min',
            content: `## How the Statements Link

This is the concept interviewers test more than any other. If you understand it, everything else follows. There are exactly three bridges connecting the statements.

### Link 1 — Net Income connects all three

Net Income is the last line of the Income Statement. It becomes:
- the *first* line of the Cash Flow Statement, and
- an addition to **Retained Earnings** inside Shareholders' Equity on the Balance Sheet.

### Link 2 — The Cash Flow Statement rebuilds the cash balance

The Net Change in Cash (bottom of the CFS) is added to the prior period's Cash to get the new Cash balance on the Balance Sheet. Meanwhile, the CFS's individual line items (changes in working capital, CapEx, debt raised, etc.) reflect *changes in Balance Sheet items*.

### Link 3 — Balance Sheet changes drive the CFS

Every change in a non-cash Balance Sheet item shows up somewhere on the Cash Flow Statement. An asset going *up* uses cash (negative on CFS); a liability going *up* is a source of cash (positive on CFS).

### The Golden Rule for Walk-Through Questions

Always go **IS → CFS → BS**, in that order. Start at the top of the Income Statement, flow the effect down to Net Income, carry Net Income to the top of the Cash Flow Statement, work through the cash effects, then land the results on the Balance Sheet and confirm it balances. Doing it in this order means you never compute the cash effect twice.

### Why This Order Works

The direction is logical: the IS determines profit; profit is the starting point for the CFS; the CFS determines how cash moved; cash movement updates the Balance Sheet; the BS balances as your final check. Breaking this chain is how candidates get confused and make errors.

### Check Yourself

What are the three links between the statements? Try to answer without looking.

→ (1) Net Income → top of CFS and flows to Retained Earnings on BS. (2) Net Change in Cash → BS Cash line. (3) Every non-cash BS change appears on the CFS.`,
            keyTakeaways: [
              'Three links: (1) Net Income → CFS top + Retained Earnings; (2) Net Change in Cash → Balance Sheet Cash; (3) every non-cash BS change → CFS.',
              'Always walk IS → CFS → BS. The Balance Sheet balancing is your error check.',
              'Asset up = cash down; liability up = cash up. This drives the CFS.',
              'Retained Earnings on the BS absorbs all Net Income (minus dividends) over the company\'s life.',
            ],
          },
        ],
      },
      {
        id: 'acct-s2',
        title: 'Statement Walk-Throughs',
        lessons: [
          {
            id: 'acct-l3',
            title: 'The Master Skill: Walk-Through Questions',
            duration: '12 min',
            content: `## The Master Skill: Walking Through Statement Changes

This is the most common technical question format in all of investment banking. The interviewer changes one item and asks you to trace it through all three statements. Build this reflex.

### The Classic: Depreciation Goes Up by $10 (40% tax rate)

**Income Statement:** Depreciation is an expense, so Operating Income (and Pre-Tax Income) falls by $10. At a 40% tax rate, taxes drop by $4, so Net Income falls by **$6**.

**Cash Flow Statement:** Start with Net Income down $6. But depreciation is a **non-cash** expense — no cash left the building — so we add the full $10 back. Net effect: CFO is up $10 − $6 = **+$4**. Net Change in Cash is **+$4**.

**Balance Sheet:** On the Assets side, Cash is up $4 (from the CFS) and PP&E is down $10 (that's what got depreciated), so Assets are **down $6** net. On the other side, Net Income was down $6, so Retained Earnings is **down $6**. Both sides fall by $6. It balances. ✓

### Why Does a Non-Cash Expense Change Cash?

Because it's **tax-deductible**. Depreciation reduces taxable income, which reduces the actual cash taxes you pay. That tax saving — the "tax shield" — is why cash went *up* by $4 even though depreciation isn't itself a cash outflow. This is the single most important intuition in the module.

**Formula: Non-cash expense increases cash by (expense × tax rate)**

$10 depreciation at 40% → +$4 cash. This tax shield logic reappears in DCF, LBO, and M&A.

### The Repeatable 3-Step Method

For *any* item that changes, run this procedure:

1. **IS:** Does it hit the Income Statement? If yes, compute after-tax Net Income impact = pre-tax change × (1 − tax rate). If it's non-operating cash movement (buying an asset or raising debt), the IS doesn't change.
2. **CFS:** Start with the Net Income change. Add back any non-cash portion. Then handle working capital changes (asset up = cash down; liability up = cash up), CapEx (CFI), and financing (CFF). Sum to Net Change in Cash.
3. **BS:** Update Cash by the Net Change in Cash. Update the specific asset/liability that changed. Update Retained Earnings by the Net Income change. Confirm Assets = Liabilities + Equity.

### Worked Example: Accounts Receivable Goes Up by $10 (40% tax)

Think about what A/R *means*: you recorded a sale (revenue), but the customer hasn't paid yet.
- **IS:** Revenue up $10 → Net Income up $6.
- **CFS:** Net Income up $6, but A/R is an asset that increased → subtract $10. CFO down **$4**.
- **BS:** Cash down $4, A/R up $10 → Assets up $6. Retained Earnings up $6. Balances. ✓
- **Intuition:** You booked profit and paid taxes on revenue you haven't received in cash yet. Fast-growing companies can be cash-strapped for exactly this reason.

### Worked Example: Inventory Goes Up by $10, Bought with Cash

- **IS:** No change. Inventory only hits the IS (via COGS) when the product is *sold*.
- **CFS:** Inventory is an asset that went up → CFO down $10. Net Change in Cash down $10.
- **BS:** Inventory up $10, Cash down $10 → Assets net zero. Balances. ✓
- **Common trap:** Do NOT say the IS is affected by inventory purchases. Working capital changes flow through the Cash Flow Statement.`,
            keyTakeaways: [
              'The reflex is always the same: IS → CFS → BS. Non-cash items get added back. Asset up = cash down, liability up = cash up. Retained Earnings absorbs Net Income. It must balance.',
              'Non-cash expense increases cash by (expense × tax rate) — the tax shield.',
              '$10 depreciation at 40% tax: NI −$6, CFO +$4, PP&E −$10, Cash +$4, RE −$6.',
              'A/R increasing is revenue earned but not collected — you paid taxes on money you don\'t have yet.',
              'Inventory purchases don\'t hit the IS — only COGS (when sold) does.',
            ],
          },
          {
            id: 'acct-l4',
            title: 'Multi-Year Questions and the Apple Factory Chain',
            duration: '10 min',
            content: `## Multi-Year Questions

Interviewers love multi-step questions where you buy an asset with debt, then run time forward. It tests whether you can hold state across periods.

### The Setup

Apple buys $100 of iPad factories, funded entirely with debt. Start of Year 1, before anything else happens.

- **IS:** No change yet (no depreciation or interest has been incurred).
- **CFS:** CapEx of $100 → CFI down $100. Debt raised of $100 → CFF up $100. Net Change in Cash = $0.
- **BS:** PP&E up $100 (asset), Debt up $100 (liability). Both sides up $100. Balances. ✓

### Year 2: Debt is 10% interest, factories depreciate 10%/year

- **IS:** Depreciation $10 + Interest $10 = $20 hit to Pre-Tax Income → Net Income down **$12** (40% tax).
- **CFS:** Net Income down $12, add back $10 depreciation (non-cash) → CFO down $2. Net Change in Cash down **$2**.
- **BS:** Cash down $2, PP&E down $10 → Assets down $12. Retained Earnings down $12. Balances. ✓

### Year 3: Factories break down, written to $0, loan must be repaid

After two years of 10% depreciation, the factories are worth $80. That $80 is written down.
- **IS:** $80 writedown hits Pre-Tax Income → Net Income down **$48** (40% tax).
- **CFS:** Net Income down $48, add back $80 non-cash writedown → CFO up $32. Then CFF: repay $100 loan → down $100. Net Change in Cash = 32 − 100 = down **$68**.
- **BS:** Cash down $68, PP&E down $80 → Assets down $148. Debt down $100, Retained Earnings down $48 → Liabilities + Equity down $148. Balances. ✓

### Key Principles for Multi-Period Questions

- **Carry state forward.** PP&E shrinks each year by depreciation. Calculate what's left before applying new events.
- **Depreciation and interest hit the IS.** They are NOT financing cash flows.
- **Principal repayment is a financing outflow** — it never touches the Income Statement.
- **Writedowns are non-cash** — add back on the CFS, just like depreciation.

### Check Yourself

After Year 2, what is the PP&E balance? → Started at $100, depreciated $10/year for 2 years = $80 remaining.`,
            keyTakeaways: [
              'For multi-period questions, carry state forward. Depreciation compounds (asset shrinks each year).',
              'Interest expense hits the IS; principal repayment is a CFF item only.',
              'Writedowns are non-cash — add them back on the CFS.',
              'CapEx flows through CFI; borrowing flows through CFF. Neither hits the IS on day one.',
            ],
          },
        ],
      },
      {
        id: 'acct-s3',
        title: 'Core Accounting Concepts',
        lessons: [
          {
            id: 'acct-l5',
            title: 'Accrual Accounting and the Four Mismatches',
            duration: '10 min',
            content: `## Accrual Accounting

**Accrual accounting** records revenue when it's *earned* (goods delivered / service performed) and expenses when they're *incurred* (matched to the revenue they helped generate), regardless of when cash changes hands. GAAP and IFRS require accrual for most companies because it more accurately matches effort to reward within a period.

### The Four Timing Mismatches

Every working-capital line item is a timing mismatch between when something is recognized and when cash moves:

- **Accounts Receivable** = revenue earned *before* cash received → asset
- **Deferred Revenue** = cash received *before* revenue earned → liability
- **Prepaid Expenses** = cash paid *before* expense incurred → asset
- **Accrued Expenses / Accounts Payable** = expense incurred *before* cash paid → liability

### Concrete Example: Annual SaaS Contract

You sign a $120 annual contract on December 1 and the customer pays $120 upfront. Under accrual accounting, you recognize only $10 of revenue in December (one month's worth); the other $110 sits as **Deferred Revenue** (a liability — you owe the customer service). Under cash accounting, you'd book all $120 immediately. This mismatch is exactly why the CFS exists.

### Capitalize vs. Expense

If something provides value over many years (a factory, equipment, acquired software), you **capitalize** it — put it on the Balance Sheet as an asset and spread the cost over its useful life via depreciation/amortization.

If it's consumed in the current period (rent, salaries, utilities), you **expense** it immediately on the Income Statement.

- **Capitalizing** keeps costs off the current IS and smooths them out; this is why CapEx doesn't hit the IS directly but depreciation does.
- The decision between capitalizing and expensing is one of the biggest ways companies can manipulate their reported earnings.`,
            keyTakeaways: [
              'Accrual accounting separates "when cash moves" from "when it\'s earned/incurred."',
              'A/R = earned not collected (asset). Deferred Revenue = collected not earned (liability). Prepaid = paid not yet incurred (asset). Accrued/AP = incurred not yet paid (liability).',
              'Capitalize long-lived assets (spread via depreciation); expense short-lived costs immediately.',
              'CapEx doesn\'t hit the IS — it goes on the BS as an asset, then depreciation hits the IS over time.',
            ],
          },
          {
            id: 'acct-l6',
            title: 'Key Line Items You Must Understand',
            duration: '10 min',
            content: `## Key Line Items

### Goodwill

Goodwill arises only in acquisitions. When an acquirer pays more than the fair value of the target's net identifiable assets, the excess is recorded as Goodwill — it captures things like brand, customer relationships, and expected synergies.

**Goodwill is NOT amortized.** Instead it's tested for **impairment** annually, and written down if the acquisition turns out to be worth less than paid.

Other Intangible Assets (patents, trademarks, customer lists with definite lives) *are* amortized over their useful lives, similar to how PP&E is depreciated.

### Deferred Tax Liabilities (DTL) and Assets (DTA)

These arise from timing differences between **book (GAAP) accounting** and **tax accounting**. The most common cause: companies use straight-line depreciation for their books but *accelerated* depreciation for taxes. Early on, they pay *less* cash tax than the book tax expense implies → the difference accumulates as a **DTL** (you'll owe it later). DTAs work in reverse (you've overpaid tax relative to book — common with net operating losses).

### Stock-Based Compensation (SBC)

SBC is a real expense on the Income Statement (it compensates employees), but it's paid in shares, not cash. So it's a **non-cash expense** added back on the Cash Flow Statement, exactly like depreciation. It also dilutes existing shareholders.

### Working Capital

Working Capital = Current Assets (excluding cash) − Current Liabilities (excluding debt). It measures the cash tied up in day-to-day operations. Rising working capital *consumes* cash; falling working capital *frees* cash.

### EBITDA

EBITDA = Earnings Before Interest, Taxes, Depreciation & Amortization. It's a proxy for operating cash flow that strips out capital structure (interest), tax regime, and non-cash D&A, making companies comparable. But beware: it ignores CapEx and working capital, so a company can have positive EBITDA for years and still go bankrupt.

### Check Yourself

A company has had positive EBITDA for 10 years but just went bankrupt. How?

→ Several ways: heavy CapEx not captured in EBITDA; crushing interest expense it can no longer afford; all its debt matured at once and it couldn't refinance; a massive one-time charge (litigation). EBITDA excludes exactly the things that killed it.`,
            keyTakeaways: [
              'Goodwill (unamortized, impairment-tested) vs. other intangibles (amortized).',
              'DTLs come from book-vs-tax timing — usually accelerated tax depreciation vs. straight-line book.',
              'SBC is a non-cash add-back, just like D&A. It also dilutes shareholders.',
              'EBITDA ignores CapEx, working capital, interest, and taxes — which is exactly why it can mislead.',
              'Working capital rising = cash consumed; falling = cash freed.',
            ],
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. ENTERPRISE & EQUITY VALUE
  // ─────────────────────────────────────────────
  {
    id: 'ev',
    title: 'Enterprise & Equity Value',
    description: 'The vocabulary of valuation. Master this before comps or DCF — interviewers probe it hard, and once the core intuition clicks, every question becomes easy.',
    icon: '⚖️',
    color: 'teal',
    level: 'Beginner',
    duration: '~1.5 hours',
    sections: [
      {
        id: 'ev-s1',
        title: 'The Core Distinction',
        lessons: [
          {
            id: 'ev-l1',
            title: 'Equity Value vs. Enterprise Value',
            duration: '10 min',
            content: `## Equity Value vs. Enterprise Value

The entire topic rests on one idea: **who has a claim on the company's cash flows.**

### Equity Value

**Equity Value** (also called Market Capitalization for a public company) is the value available to **equity investors (shareholders) only**.

For a public company:
**Equity Value = Share Price × Fully Diluted Shares Outstanding**

### Enterprise Value

**Enterprise Value (EV)** is the value of the company's **core business operations** to *all* investors — both equity holders *and* debt holders (and preferred, minority interests, etc.). It represents what it would effectively cost to acquire the entire operating business.

**Enterprise Value = Equity Value + Debt + Preferred Stock + Minority Interest − Cash**

### The House Analogy

Think about buying a house. The "equity value" is your down payment (plus what your equity stake is worth). The "enterprise value" is the actual price of the house. If you assume the seller's mortgage, you pay their equity *and* take on their debt — but if there's cash sitting in a drawer in the house, that offsets your cost.

- **Add Debt:** When you acquire a company, you assume responsibility for its debt — a real cost to you.
- **Subtract Cash:** Cash is a non-operating asset. After acquiring, you could use the target's own cash to pay yourself back, reducing your true cost. (Also, cash is already implicitly reflected in Equity Value, so leaving it in would double-count.)

### Why EV is Capital-Structure-Neutral

Enterprise Value shouldn't change just because a company chooses to fund itself with debt vs. equity. If a company borrows $100 and holds it as cash: Debt +$100, Cash +$100 → they cancel, EV unchanged. The core operations didn't change, so neither did EV.`,
            keyTakeaways: [
              'Equity Value = value to shareholders = Share Price × Diluted Shares.',
              'Enterprise Value = value of core operations to ALL investors = Equity Value + Debt + Preferred + Minority Interest − Cash.',
              'Add debt (you assume it on acquisition), subtract cash (non-operating, offsets cost).',
              'EV is capital-structure-neutral by design — debt/equity mix doesn\'t change the operations.',
            ],
          },
          {
            id: 'ev-l2',
            title: 'Multiples Pairing — The Most Common Trap',
            duration: '8 min',
            content: `## Multiples Must Be Consistent

The whole reason we distinguish EV from Equity Value is that **valuation multiples must pair the right numerator with the right denominator.** A multiple compares a value measure to a financial metric.

### The Rule

Interest expense is the dividing line.
- Metrics computed *before* subtracting interest belong to everyone → pair with **Enterprise Value**
- Metrics *after* interest belong to shareholders only → pair with **Equity Value**

### Enterprise Value Multiples (pre-interest)
- EV / Revenue
- EV / EBITDA ← the most common valuation multiple in banking
- EV / EBIT

### Equity Value Multiples (post-interest)
- P/E (Price / Earnings = Equity Value / Net Income)
- Equity Value / Levered Free Cash Flow

### The Classic Trap

You must NEVER pair Enterprise Value with Net Income, or Equity Value with EBITDA.

EBITDA is a pre-interest number — it belongs to everyone. Net Income is after interest — it belongs only to shareholders. Mixing them is the single most common error interviewers hunt for.

### Why EV/EBITDA is the Workhorse

P/E is affected by capital structure (interest), taxes, and non-cash D&A — all things that differ between companies for reasons unrelated to operating performance. EV/EBITDA strips those out, so it compares the *operating businesses* directly. Two identical companies with different capital structures will have similar EV/EBITDA but very different P/E ratios.

### Check Yourself

A company with more debt has a higher or lower P/E ratio than an identical all-equity company?

→ **Lower P/E**, because more interest expense reduces Net Income, shrinking the denominator of P/E (while share price may stay similar). Their EV/EBITDA, however, should be roughly the same.`,
            keyTakeaways: [
              'Pair pre-interest metrics (Revenue, EBITDA, EBIT) with EV. Pair post-interest metrics (Net Income, EPS) with Equity Value. Never mix.',
              'EV/EBITDA is the workhorse because it neutralizes capital structure, taxes, and non-cash D&A.',
              'P/E is affected by leverage; EV/EBITDA is not. That\'s the whole point of the distinction.',
            ],
          },
          {
            id: 'ev-l3',
            title: 'Fully Diluted Shares and Making Metrics Change',
            duration: '10 min',
            content: `## Fully Diluted Shares

Equity Value uses **fully diluted** shares, not just basic shares outstanding. Options, warrants, convertibles, and restricted stock can turn into new shares, so you must count them.

### Treasury Stock Method (TSM)

For options, in-the-money options are assumed exercised, which brings in cash (the strike price × number of options). The company is assumed to use that cash to buy back shares at the current market price. The *net* new shares = options exercised − shares repurchased.

**Example:** 10 million options with a $5 strike, current price $10. Exercise brings in $50M cash. At $10/share, that buys back 5M shares. Net dilution = 10M − 5M = **5M new shares**. Only in-the-money options (strike below current price) count.

## How Events Change EV vs. Equity Value

### A company raises $100 of debt and holds it as cash.

- Equity Value: **unchanged** (no impact on shareholders' claim)
- Enterprise Value: **unchanged.** EV = Equity + Debt − Cash. Debt went up $100, Cash went up $100, they cancel.

### A company pays $100 in cash dividends.

- Equity Value: **down** (cash leaving to shareholders reduces the company's value)
- Enterprise Value: **up $100.** Cash fell by $100, and EV subtracts Cash, so subtracting a smaller cash number raises EV. The core business is unchanged; only the cash cushion shrank.

### Can EV be negative?

Yes — if a company has more cash than its Equity Value + Debt. This happens with distressed companies (market cap collapsed but sitting on cash). Unusual but possible.

### Can market Equity Value be negative?

No. Equity Value = share price × shares. Neither can be negative. (Book equity *can* be negative — common after LBOs — but market equity value cannot.)`,
            keyTakeaways: [
              'Always use fully diluted shares for Equity Value. For options, use the Treasury Stock Method: net new shares = options − (cash raised ÷ share price).',
              'Raising debt/equity to hold as cash → EV unchanged (capital-structure neutral).',
              'Paying dividends → Cash falls → EV rises; Equity Value falls.',
              'EV can be negative (cash-rich, distressed); market Equity Value cannot.',
              'You add minority interest to EV because consolidated EBITDA includes 100% of subsidiaries.',
            ],
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. VALUATION METHODOLOGIES
  // ─────────────────────────────────────────────
  {
    id: 'valuation',
    title: 'Valuation Methodologies',
    description: 'How bankers actually price companies. There are only three main approaches, and every valuation is some combination of them — understand the why behind each.',
    icon: '💰',
    color: 'green',
    level: 'Intermediate',
    duration: '~1.5 hours',
    sections: [
      {
        id: 'val-s1',
        title: 'The Three Approaches',
        lessons: [
          {
            id: 'val-l1',
            title: 'Three Methods — Why We Use All of Them',
            duration: '8 min',
            content: `## The Three Core Methodologies

There are only three main ways to value a company, and every valuation you'll ever do in banking is some combination of them.

1. **Comparable Companies ("Comps")** — value the company based on what similar public companies trade for right now.
2. **Precedent Transactions ("Precedents")** — value the company based on what similar companies were *acquired* for in past M&A deals.
3. **Discounted Cash Flow (DCF)** — value the company based on the present value of its own projected future cash flows (intrinsic value).

### Why Use All Three?

Because no single method is "right." Each has different assumptions and biases, and using them together gives you a **valuation range**, not a false-precision single number. You typically present them in a "football field" chart — horizontal bars showing the range implied by each method — and look for where they overlap.

### Which Gives the Highest Value?

Usually **Precedent Transactions**, because acquirers pay a **control premium** (a premium over the public trading price to gain control) and often expect synergies. Comps reflect prices for *minority, non-controlling* stakes (a single share), so they're typically lower. The DCF can land anywhere depending on assumptions, but it's the most theoretically "pure" because it's based on the company's actual cash generation rather than market sentiment.

The LBO analysis (covered in its own module) is typically the *lowest* valuation — it's a floor based on what a PE firm could pay and still hit its required return.`,
            keyTakeaways: [
              'Three methods: Comps (public peers now), Precedents (past M&A deals), DCF (intrinsic cash flows).',
              'Use all three for a range. Precedents are usually highest (control premium); the DCF is the most intrinsic.',
              'LBO analysis is typically the floor — PE\'s required return caps what they can pay.',
              'Valuation is a range presented in a "football field" chart — never a false-precision single number.',
            ],
          },
        ],
      },
      {
        id: 'val-s2',
        title: 'Relative Valuation',
        lessons: [
          {
            id: 'val-l2',
            title: 'Comparable Companies Analysis',
            duration: '12 min',
            content: `## Comparable Companies Analysis (Comps)

**The logic:** If a public company similar to yours trades at 10× EBITDA, and your company has $100 of EBITDA, then your company is worth roughly $1,000 of Enterprise Value. You're using the market's current pricing of peers to imply a value for your target.

### Step 1 — Select the Comparable Set

This is the most important (and most judgment-heavy) step. You screen for companies similar in:
- **Industry / sector** (the biggest factor — a software company isn't comparable to an airline)
- **Size** (revenue, market cap — a $50B giant isn't comparable to a $200M small-cap)
- **Geography** (different markets, growth rates, regulation)
- **Growth and margin profile** (a 40%-growth company commands a higher multiple than a flat one)

A clean comp set is usually 5–15 companies. Fewer and the median isn't meaningful; more and you're probably including companies that aren't truly comparable.

### Step 2 — Calculate Multiples for Each Comp

- EV / Revenue (useful for early-stage or unprofitable companies)
- EV / EBITDA (the workhorse — capital-structure-neutral)
- EV / EBIT (accounts for depreciation differences, i.e., capital intensity)
- P / E (Equity Value / Net Income — affected by capital structure and taxes)

### Step 3 — Apply to Your Target

Take the **median** (not the mean) of the comp multiples and multiply by your target's corresponding metric. Use the median because it's less distorted by outliers.

### Why EV/EBITDA Over P/E?

Because P/E is affected by capital structure (interest), taxes, and non-cash D&A — things that differ between companies for reasons unrelated to operating performance. EV/EBITDA strips those out.

### Strengths and Weaknesses

**Strengths:** Based on real, current market data; easy to compute and communicate; reflects current market sentiment.

**Weaknesses:** Truly comparable companies are rare; the market may be over- or under-valuing the whole sector; a "comp" is never a perfect match.`,
            keyTakeaways: [
              'Comps value a company using peers\' current trading multiples.',
              'The hard part is picking a genuinely comparable set (industry, size, geography, growth).',
              'Use median multiples — less distorted by outliers than the mean.',
              'EV/EBITDA is the default because it neutralizes capital structure and taxes.',
            ],
          },
          {
            id: 'val-l3',
            title: 'Precedent Transactions',
            duration: '10 min',
            content: `## Precedent Transactions Analysis

**The logic:** Instead of what similar companies *trade* for, look at what similar companies were actually *acquired* for. If comparable companies sold for 12× EBITDA over the last few years, that's evidence of what an acquirer might pay for your target.

### Step 1 — Select Comparable Transactions

Screen by:
- Industry (same as comps)
- Time frame (usually last 2–5 years — a 2007 deal multiple is meaningless in today's market)
- Deal size and target characteristics
- Deal type (strategic vs. financial buyer, etc.)

### Step 2 — Calculate the Multiples Paid

Compute EV/EBITDA, EV/Revenue based on the purchase price for each deal.

### Step 3 — Apply to Your Target

Apply the median (or range) of deal multiples.

### Why Are Precedent Multiples Usually Higher Than Comps?

Two reasons:
1. **Control premium** — an acquirer buying the *whole* company pays more than the price of a single minority share, because control has value (you can direct strategy, replace management, capture cash flows).
2. **Synergies** — acquirers expect cost savings and revenue gains post-deal, and are often willing to "pay away" some of that expected value to win the deal.

### Strengths and Weaknesses

**Strengths:** Reflects what real buyers actually paid, including control premiums — very relevant if you're advising on an M&A sale.

**Weaknesses:** Past deals happened under different market conditions; data can be hard to find (private deals often don't disclose terms); each deal had unique circumstances.`,
            keyTakeaways: [
              'Precedents use multiples paid in past M&A deals. Higher than comps because of control premiums and synergies.',
              'Most relevant when advising a company that\'s actually being sold.',
              'Watch for stale data (use last 2–5 years) and one-off deal dynamics.',
            ],
          },
        ],
      },
      {
        id: 'val-s3',
        title: 'Applying Valuation Judgment',
        lessons: [
          {
            id: 'val-l4',
            title: 'Choosing Methods and Common Questions',
            duration: '10 min',
            content: `## When to Use (and Not Use) Each Method

### When NOT to Use Certain Methods

- For an **IPO**: rely mostly on **public company comparables**, not precedent transactions, because you're pricing a minority stake being sold to public investors — no control premium applies.
- For a company with **no comparable public peers**: comps are weak; lean more on the DCF.
- For an **unprofitable / early-stage company**: EBITDA and Net Income are negative, so use **EV/Revenue** or forward multiples.
- For a **distressed company**: consider **Liquidation Valuation** — value the assets if sold off and liabilities paid.
- For a **conglomerate**: use **Sum-of-the-Parts** — value each business segment separately with its own comps, then add.

### What If Two Methods Disagree Wildly?

That's informative, not a problem. A DCF far above the comps might mean the market is undervaluing the sector, or your projections are too aggressive. You investigate the gap rather than forcing agreement.

### Common Interview Questions (Reasoned, Not Memorized)

**"Would an LBO or a DCF give a higher valuation?"** Typically the **DCF**, because an LBO sets the *maximum price a PE firm can pay* to hit a target return (often 20–25% IRR). That target-return constraint usually produces a lower number, which is why the LBO is often called a "floor" valuation.

**"How do you value a private company?"** Same methods, with adjustments: comps and precedents work, but you can't use a market cap. You rely more on the DCF and apply an **illiquidity discount** (often ~10–15%) because private shares are harder to sell.

**"Two companies are identical but one has more debt. Which has the higher EV/EBITDA?"** They should be roughly the *same* — that's the whole point of EV/EBITDA being capital-structure-neutral. Their P/E ratios would differ, but EV/EBITDA should be similar.`,
            keyTakeaways: [
              'Match method to situation: IPO → public comps; distressed → liquidation; unprofitable → revenue multiples; conglomerate → sum-of-the-parts.',
              'Disagreement between methods is a signal to investigate, not a failure.',
              'LBO is a floor valuation — PE\'s required return caps the price below what a DCF or strategic buyer would pay.',
              'Private companies get an illiquidity discount (~10–15%) and more DCF weight.',
            ],
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. DCF ANALYSIS
  // ─────────────────────────────────────────────
  {
    id: 'dcf',
    title: 'DCF Analysis',
    description: 'The intrinsic valuation — and one of the two most-tested technicals. A company is worth the sum of all the cash it will generate in the future, discounted back to today.',
    icon: '📉',
    color: 'purple',
    level: 'Intermediate',
    duration: '~2 hours',
    sections: [
      {
        id: 'dcf-s1',
        title: 'The Foundation',
        lessons: [
          {
            id: 'dcf-l1',
            title: 'The Big Idea: Why Discount at All?',
            duration: '8 min',
            content: `## The DCF's Core Idea

The DCF is the crown jewel of valuation because it's the only method that values a company based on its *own* fundamentals rather than what the market thinks of its peers.

**Core idea: a company is worth the sum of all the cash it will generate in the future, discounted back to today's dollars.**

### Why Discount at All?

A dollar today is worth more than a dollar next year. Three reasons:
- You could invest today's dollar and earn a return (**opportunity cost**)
- Inflation erodes future dollars
- Future dollars are *uncertain* (**risk**)

So to value future cash flows, we "discount" them — shrink them — to reflect their present worth. The riskier and more distant the cash flow, the more we shrink it.

### The Five-Step Recipe

A DCF has exactly two components: projected Free Cash Flows for an explicit period (usually 5–10 years), and a Terminal Value for everything beyond.

1. Project **Unlevered Free Cash Flow** for 5–10 years.
2. Calculate the **discount rate** (WACC).
3. Calculate the **Terminal Value**.
4. **Discount** the FCFs and Terminal Value to present value.
5. Sum to get Enterprise Value, then bridge to Equity Value / share price.`,
            keyTakeaways: [
              'A DCF values a company as the present value of its future free cash flows.',
              'Two pieces: the explicit-period FCFs and the Terminal Value, both discounted to today at the WACC.',
              'We discount because a future dollar is worth less today: opportunity cost, inflation, and risk.',
            ],
          },
          {
            id: 'dcf-l2',
            title: 'Free Cash Flow — Building the Engine',
            duration: '10 min',
            content: `## Free Cash Flow

**Free Cash Flow (FCF)** is the cash a company generates that's genuinely "free" — available to be returned to investors after paying for operations and the investments needed to sustain the business.

### Why Unlevered?

In a standard DCF we use **Unlevered Free Cash Flow** (also "Free Cash Flow to Firm"). "Unlevered" means *before* the effect of debt (before interest). We use it because we want to value the *entire business* — the operations available to *all* investors — independent of how it's financed. This gives us Enterprise Value directly, and keeps the valuation capital-structure-neutral.

### Building Unlevered FCF

Starting from EBIT:
- Start with **EBIT** (operating income — pre-interest, pre-tax)
- (×) Apply taxes → **EBIT × (1 − tax rate)** = **NOPAT** (we tax EBIT directly, ignoring interest, because we're unlevered)
- (+) Add back **Depreciation & Amortization** (non-cash)
- (−) Subtract **Capital Expenditures** (real cash spent on long-term assets)
- (−/+) Subtract the **increase in Net Working Capital** (a rise in working capital consumes cash)
- = **Unlevered Free Cash Flow**

### Unlevered vs. Levered FCF

- **Unlevered FCF** starts from EBIT(1−t), is pre-interest, belongs to all investors → discount at WACC → **Enterprise Value**
- **Levered FCF** starts from Net Income (after interest), subtracts mandatory debt repayments → belongs to equity holders only → discount at Cost of Equity → **Equity Value**

Banking standard is unlevered because it isolates the operating business from financing decisions.`,
            keyTakeaways: [
              'Unlevered FCF = EBIT×(1−tax) + D&A − CapEx − ΔNet Working Capital.',
              'It\'s "before debt," so it values the whole business and yields Enterprise Value.',
              'Levered FCF starts from Net Income and yields Equity Value.',
              'We add back D&A (non-cash) and subtract CapEx (real cash spend on long-term assets).',
            ],
          },
        ],
      },
      {
        id: 'dcf-s2',
        title: 'WACC and Terminal Value',
        lessons: [
          {
            id: 'dcf-l3',
            title: 'The Discount Rate: WACC',
            duration: '10 min',
            content: `## WACC: Weighted Average Cost of Capital

You discount unlevered free cash flows at the **WACC** — the blended rate of return the company must earn to satisfy *all* its investors (debt and equity), weighted by how much of each it uses.

**WACC = (Cost of Equity × % Equity) + (After-tax Cost of Debt × % Debt) + (Cost of Preferred × % Preferred)**

### Cost of Debt

Easy to calculate: roughly the interest rate the company pays on its debt (its yield). We multiply by **(1 − tax rate)** because interest is **tax-deductible** — the government effectively subsidizes debt via the tax shield, making debt cheaper than its stated rate.

### Cost of Equity: CAPM

Equity holders don't have a stated "rate," so we estimate their required return with the **Capital Asset Pricing Model (CAPM):**

**Cost of Equity = Risk-Free Rate + β × Equity Risk Premium**

- **Risk-Free Rate** — yield on a safe government bond (10-year US Treasury). The return you get for taking essentially no risk.
- **Equity Risk Premium (ERP)** — the extra return investors demand for holding stocks over the risk-free asset (historically ~5–7%).
- **Beta (β)** — how volatile *this* stock is relative to the overall market. β = 1 moves with the market; β > 1 is more volatile; β < 1 is less volatile.

For a private company or when beta is unavailable, you use comparable companies' betas, "un-lever" them to strip out their capital structures, then "re-lever" for your target's capital structure.

### Why Is Cost of Equity Higher Than Cost of Debt?

Equity is riskier for the investor. Debt holders get paid first (contractual claims, often collateral); equity holders are last in line and only get what's left. Higher risk demands higher return. This also means adding *some* debt lowers WACC (cheaper, tax-advantaged) — but too much raises bankruptcy risk.`,
            keyTakeaways: [
              'Discount unlevered FCF at WACC — the blended, weighted cost of all capital.',
              'Cost of Equity via CAPM: risk-free + β × ERP. Higher than after-tax Cost of Debt because equity is riskier.',
              'Debt\'s interest is tax-deductible → after-tax cost of debt = pre-tax rate × (1 − tax rate).',
              'Beta measures volatility relative to the market. Un-lever peers, then re-lever to your target.',
            ],
          },
          {
            id: 'dcf-l4',
            title: 'Terminal Value — Usually the Majority of the Answer',
            duration: '10 min',
            content: `## Terminal Value

You can't project cash flows forever, so after the explicit 5–10 year window, you capture *everything beyond* in a single **Terminal Value**. There are two methods — know both.

### Method 1: Gordon Growth (Perpetuity Growth)

Assume FCF grows at a constant modest rate forever:

**Terminal Value = Final Year FCF × (1 + g) ÷ (WACC − g)**

**g must be low** — typically pegged to long-term GDP or inflation (~2–3%). Why? No company can grow faster than the overall economy *forever*; if it did, it would eventually become larger than the entire economy. A g above ~4% is a red flag in an interview.

### Method 2: Exit Multiple

Assume the company is "sold" at the end of the projection period at a market multiple:

**Terminal Value = Final Year EBITDA × chosen EV/EBITDA exit multiple**

The exit multiple is usually based on current comparable-company multiples. This method is more common in banking because it ties the terminal value to observable market data.

### The Uncomfortable Reality

Terminal Value typically accounts for **50–75% or more** of the total DCF value. Most of a company's value is in the distant future. This means the DCF is *highly sensitive* to terminal value assumptions — which is why you always run sensitivity tables on g, WACC, and the exit multiple.

### Cross-Check

A good analyst cross-checks: compute the implied exit multiple from the Gordon Growth method and the implied growth rate from the exit multiple method, and make sure both are sane.`,
            keyTakeaways: [
              'Terminal Value captures all cash flows beyond the projection window.',
              'Gordon Growth: perpetual g near GDP (~2–3%). Exit Multiple: final EBITDA × market multiple.',
              'TV is usually 50–75%+ of total DCF value — it dominates sensitivity analysis.',
              'Always stress-test g, WACC, and the exit multiple. Cross-check between methods.',
              'A g above ~4% in an interview is a red flag.',
            ],
          },
        ],
      },
      {
        id: 'dcf-s3',
        title: 'Putting It Together',
        lessons: [
          {
            id: 'dcf-l5',
            title: 'Discounting, Bridging, and Sensitivity',
            duration: '10 min',
            content: `## Discounting to Present Value

Each year's FCF and the Terminal Value are brought to present value by dividing by (1 + WACC) raised to the number of years out:

**PV = Cash Flow ÷ (1 + WACC)^n**

Sum the present values of all the projected FCFs plus the present value of the Terminal Value. That sum **is the Enterprise Value.**

### Bridging to Equity Value / Share Price

You now reverse the EV bridge:
- Start with Enterprise Value
- (−) Subtract Net Debt (Total Debt − Cash)
- (−) Subtract preferred stock and minority interest
- = **Equity Value**
- (÷) Divide by fully diluted shares outstanding → **implied share price per share**

Then compare that implied share price to the actual market price: if your DCF says the stock is worth $80 and it trades at $60, the DCF suggests it's undervalued (given your assumptions).

### Sensitivity Analysis

Always build a sensitivity table on:
- **WACC vs. terminal growth rate** (for Gordon Growth)
- **WACC vs. exit multiple** (for exit multiple method)

A higher WACC → lower valuation (cash flows discounted more heavily). A higher terminal growth rate or exit multiple → higher valuation.

### Strengths and Weaknesses of the DCF

**Why it's powerful:** Intrinsic — based on the company's actual cash-generating ability, not on possibly-mispriced market comparables.

**Why it's dangerous:** Extremely sensitive to assumptions — small changes in WACC, growth rate, or the exit multiple swing the valuation dramatically. Least reliable for young, unpredictable, or cyclical companies.

**Rule:** Never let the DCF stand alone. Present it with sensitivity tables and alongside comps and precedents.`,
            keyTakeaways: [
              'Discount every cash flow by (1+WACC)^n, sum to Enterprise Value, then subtract net debt and divide by diluted shares.',
              'Higher WACC → lower value. Higher g / exit multiple → higher value.',
              'The DCF is powerful (intrinsic) but dangerous (assumption-sensitive). Always run sensitivities.',
              'Never present a DCF alone — it belongs alongside comps and precedents.',
            ],
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. M&A & MERGER MODELS
  // ─────────────────────────────────────────────
  {
    id: 'ma',
    title: 'M&A & Merger Models',
    description: 'Deal mechanics + accretion/dilution. The beating heart of investment banking — when Company A buys Company B, does A\'s EPS go up or down?',
    icon: '🤝',
    color: 'indigo',
    level: 'Intermediate',
    duration: '~1.5 hours',
    sections: [
      {
        id: 'ma-s1',
        title: 'Why Deals Happen and How They Work',
        lessons: [
          {
            id: 'ma-l1',
            title: 'Strategic Rationale and the Deal Process',
            duration: '10 min',
            content: `## Why Companies Do M&A

Companies acquire to:
- **Grow faster** than they could organically (buy revenue/customers instead of building them)
- **Enter new markets or geographies** quickly
- **Acquire technology, products, or talent** ("acqui-hire")
- **Achieve synergies** — the deal's value creation engine
- **Consolidate** — buy competitors to gain market share and pricing power

### Synergies

Synergies are the extra value created when two companies combine — the "1 + 1 = 3" idea:
- **Cost synergies** — eliminating duplicate costs (overlapping offices, redundant staff, combined purchasing power). More reliable and easier to quantify, so buyers trust them more.
- **Revenue synergies** — selling more by combining (cross-selling to each other's customers, new bundled products). Less reliable and often don't materialize, so analysts discount them heavily.

### The Sell-Side Process

If you represent the company being sold (a "broad auction"):
1. Create marketing materials: a teaser (no company name) and a detailed **Confidential Information Memorandum (CIM)**. Build the target list.
2. Send teasers to gauge interest; get interested buyers to sign **NDAs**; send the CIM.
3. Collect first-round **Indications of Interest (IOIs)**; select who advances.
4. Run management presentations and due diligence; open a **data room**.
5. Collect final binding bids; negotiate the **Purchase Agreement**; pick the winner and announce.

### The Buy-Side Process

If you represent the acquirer: research and filter targets → narrow with client feedback → approach and gauge receptivity → deepen due diligence → negotiate price and terms → announce.

### How Banks Win Work

Banks build relationships with companies over years. When a company needs a deal, it invites several banks to **pitch** ("bake-off") and picks the winner. A pitch book typically contains: the bank's credentials, strategic alternatives, valuation and models, potential buyers/targets, and recommendations.`,
            keyTakeaways: [
              'M&A exists to create value faster than organic growth. Synergies are the core rationale.',
              'Cost synergies are reliable; revenue synergies are aspirational.',
              'Sell-side = structured auction: teaser → NDA → CIM → IOIs → final bids → purchase agreement.',
              'Banks win mandates through long-term relationships and pitches (bake-offs).',
            ],
          },
        ],
      },
      {
        id: 'ma-s2',
        title: 'Deal Mechanics',
        lessons: [
          {
            id: 'ma-l2',
            title: 'How Acquisitions Are Funded',
            duration: '8 min',
            content: `## How an Acquisition Is Paid For

An acquirer can fund a purchase three ways, and the mix drives the accretion/dilution math:

- **Cash** — uses the acquirer's cash on hand (or newly raised debt). Cheapest "cost" is the low interest the acquirer *would have* earned on that cash (foregone interest income).
- **Debt** — borrow to fund the purchase. Cost = the interest rate on the new debt.
- **Stock** — issue new shares to the target's shareholders. Cost = the acquirer's "cost of equity," proxied by the inverse of its P/E ratio (its **earnings yield**).

### Which is "Cheapest"?

Usually **cash**, then **debt**, then **stock** — because foregone interest on cash is tiny, debt interest is modest and tax-deductible, and equity is the most expensive form of capital.

This ranking is why most deals use cash and debt when possible, and stock when the acquirer's own shares are richly valued (a high P/E makes stock "cheaper" to issue).

### Cash/Debt vs. Stock Trade-offs

**More cash/debt:**
- Usually more accretive (cheaper funding)
- Increases leverage and risk
- Drains the cash cushion
- Doesn't dilute acquirer shareholders

**More stock:**
- Usually less accretive (or dilutive) — expensive funding
- Preserves cash and balance sheet flexibility
- Shares risk with target holders
- Dilutes existing acquirer shareholders`,
            keyTakeaways: [
              'Deals are funded with cash, debt, or stock. Rough cost order: cash < debt < stock.',
              'The funding mix directly determines whether the deal is accretive or dilutive.',
              'Cash/debt is more accretive but riskier; stock is safer for the balance sheet but often dilutive.',
            ],
          },
          {
            id: 'ma-l3',
            title: 'Accretion / Dilution — The Core Technical Concept',
            duration: '12 min',
            content: `## Accretion / Dilution

**Accretion/dilution** measures whether the combined company's **Earnings Per Share (EPS)** goes *up* (accretive) or *down* (dilutive) compared to the acquirer's standalone EPS after the deal.

### The Mechanics

1. Combine the two companies' Net Incomes.
2. Adjust for financing costs: subtract after-tax interest on new debt or foregone interest on cash used; add after-tax synergies.
3. Divide the combined, adjusted Net Income by the combined share count (acquirer's shares + any new shares issued for a stock deal).
4. Compare the combined EPS to the acquirer's standalone EPS. Higher = **accretive**; lower = **dilutive**.

### The Elegant Shortcut for All-Stock Deals

**If the acquirer's P/E > target's P/E (including the control premium) → accretive. If lower → dilutive.**

**Intuition:** A high-P/E acquirer is issuing "expensive" shares to buy "cheap" earnings, so it adds more earnings per share than shares — accretive. A low-P/E acquirer buying a high-P/E target does the reverse.

### Example

Company A (P/E 20) acquires Company B (P/E 15) in an all-stock deal. Is it accretive or dilutive?

**Accretive.** A issues "expensive" shares (P/E 20) to acquire "cheap" earnings (P/E 15). The deal adds more earnings than shares on a per-share basis.

**Caveat:** You must add the control premium to B's effective P/E. If the premium pushes B's effective P/E above 20, the deal flips to dilutive.

### Why Bankers Care So Much

Accretion/dilution is a quick sanity check on whether a deal "makes sense" for the acquirer's shareholders on day one. A dilutive deal isn't automatically bad (it may create long-term value through synergies and growth), but acquirers strongly prefer accretive deals, and dilution invites scrutiny from investors.`,
            keyTakeaways: [
              'Accretion/dilution = does combined EPS rise (accretive) or fall (dilutive)?',
              'All-stock shortcut: higher-P/E buyer acquiring lower-P/E target = accretive.',
              'A deal is accretive when the yield on what you buy exceeds the after-tax cost of how you paid.',
              'Dilutive deals can still be smart if synergies or strategy justify them.',
            ],
          },
        ],
      },
      {
        id: 'ma-s3',
        title: 'Purchase Accounting',
        lessons: [
          {
            id: 'ma-l4',
            title: 'Purchase Accounting and the Combined Balance Sheet',
            duration: '10 min',
            content: `## Purchase Accounting

When A acquires B, you rebuild the combined Balance Sheet using **purchase accounting**:

1. The target's old Shareholders' Equity is **wiped out** (you're buying the company; its historical equity doesn't carry over).
2. The target's assets and liabilities are **written up/down to fair market value**.
3. **Goodwill** is created = Purchase Price − Fair Value of the target's net identifiable assets. It's the plug that makes the combined Balance Sheet balance, capturing the premium paid over tangible worth.
4. New financing is added: new debt raised appears as a liability; cash used reduces the cash asset; new stock issued increases equity.

### Why Does Goodwill Get Created?

Because acquirers almost always pay *more* than the fair value of net identifiable assets — they pay for brand, synergies, control, and growth. That excess has to go *somewhere* on the Balance Sheet to keep it balanced — that "somewhere" is Goodwill. It later gets tested for impairment and written down if the acquisition underperforms.

### Walk Me Through a Basic Merger Model

1. Make assumptions (purchase price, % cash/debt/stock, synergies).
2. Combine the income statements.
3. Adjust for financing (after-tax interest, foregone interest, new shares).
4. Compute combined EPS.
5. Compare to standalone EPS → accretion or dilution.
6. Build the combined balance sheet with purchase accounting and Goodwill.

### Deferred Taxes in M&A

Writing up assets (like PP&E) in a taxable-vs-book sense creates **Deferred Tax Liabilities**, and the incremental D&A from written-up assets can affect the combined Income Statement. Advanced detail but good to flag in an interview.`,
            keyTakeaways: [
              'In purchase accounting, the target\'s equity is eliminated, its assets are marked to fair value, and Goodwill = Purchase Price − Fair Value of net identifiable assets.',
              'Goodwill plugs the gap for the premium paid — brand, synergies, control.',
              'Merger model: combine IS → adjust for financing → compare EPS → build combined BS.',
            ],
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 6. LBO ANALYSIS
  // ─────────────────────────────────────────────
  {
    id: 'lbo',
    title: 'LBO Analysis',
    description: 'The private equity lens — the capstone technical module. An LBO is just a house purchase with a mortgage. Once that analogy clicks, the whole model is derivable.',
    icon: '📈',
    color: 'yellow',
    level: 'Advanced',
    duration: '~2 hours',
    sections: [
      {
        id: 'lbo-s1',
        title: 'The Fundamentals',
        lessons: [
          {
            id: 'lbo-l1',
            title: 'The Big Idea: An LBO is a Mortgage',
            duration: '10 min',
            content: `## A Leveraged Buyout is a Mortgage

Imagine buying a $1,000,000 house. You put down $200,000 of your own cash (equity) and borrow $800,000 (debt/mortgage). Tenants' rent pays down the mortgage. After some time you sell the house for $1,200,000. You repay the remaining mortgage and keep the rest. Because you only put in $200,000 but captured the full price appreciation *plus* years of debt paydown, your return is enormous relative to the modest rise in the house's value.

An LBO is exactly this. A **private equity (PE) firm** buys a company using a **small slice of its own equity and a large slice of borrowed money** (typically 60–80% debt). The company's own cash flows pay down that debt over the holding period (usually 3–7 years). At exit, the PE firm sells and pockets the gain. **The leverage magnifies returns on the equity invested** — that's the entire point.

### Where Do the Returns Come From?

Three sources. Know all three:
1. **Debt paydown (deleveraging)** — the company's cash flow repays debt, so the PE firm's equity stake grows as the company deleverages.
2. **EBITDA growth** — growing the business's earnings makes the company worth more at exit.
3. **Multiple expansion** — selling at a higher EV/EBITDA multiple than you bought at. Least controllable, least reliable — good PE firms don't count on it.

### The Math Intuition

Buy a company for $1,000 (EV). Fund it with $300 equity + $700 debt. Hold 5 years. Cash flow pays down $300 of debt (now $400 remaining). Sell for the same $1,000.
- At exit: EV $1,000 − remaining debt $400 = **$600 equity value.**
- You put in $300, got out $600 → **2.0× your money**, with *no* change in company value.

That doubling came *entirely* from debt paydown. Layer in EBITDA growth and a slightly higher exit multiple, and returns climb further.`,
            keyTakeaways: [
              'An LBO buys a company mostly with debt; its cash flow pays the debt down; sell later.',
              'Returns come from debt paydown, EBITDA growth, and (unreliably) multiple expansion.',
              'The leverage magnifies equity returns because a small equity base captures all upside above the fixed debt claim.',
              'Leverage cuts both ways — too much debt can wipe out equity if the company can\'t service it.',
            ],
          },
          {
            id: 'lbo-l2',
            title: 'Return Metrics and Ideal LBO Candidates',
            duration: '10 min',
            content: `## Return Metrics

### IRR — Internal Rate of Return

The annualized rate of return on the equity investment, accounting for the time value of money and the holding period. PE firms typically target **~20–25%+ IRR**.

### MOIC — Multiple of Money

How many times the initial equity you got back (e.g., 2.5×). Ignores timing — a 3.0× over 5 years ≈ 25% IRR; a 2.0× over 5 years ≈ 15% IRR.

**Rule of thumb anchors:**
- 2× in 3 years ≈ 26%
- 2× in 5 years ≈ 15%
- 3× in 5 years ≈ 25%

### Ideal LBO Candidate

Because the debt must be serviced by the company's own cash flow, PE firms look for:
- **Stable, predictable cash flows** — to reliably service debt. Volatile/cyclical businesses are riskier.
- **Strong, consistent EBITDA and high margins** — more cash to pay down debt.
- **Low existing debt** — room to add leverage.
- **Low future CapEx needs** — CapEx competes with debt service for cash.
- **Undervalued / reasonable purchase price** — you can't overpay and hit target returns.
- **A clear exit** — a realistic buyer or IPO path in 3–7 years.
- **Opportunities to improve** — cost cuts, operational improvements, or bolt-on acquisitions.
- **Strong asset base** — assets can serve as collateral.

### The Risk

The same leverage that magnifies gains magnifies losses. If the company underperforms and can't service its debt, the equity can be wiped out entirely — like being underwater on a mortgage.`,
            keyTakeaways: [
              'IRR = annualized return (time-weighted), target ~20–25%+. MOIC = multiple of money (ignores timing).',
              'Ideal LBO targets: stable cash flows, strong margins, low existing debt, low CapEx, fair price, clear exit.',
              '3× in 5 years ≈ 25% IRR. 2× in 5 years ≈ 15% IRR. Memorize these anchors.',
            ],
          },
        ],
      },
      {
        id: 'lbo-s2',
        title: 'The Capital Structure and Model',
        lessons: [
          {
            id: 'lbo-l3',
            title: 'The Debt Stack',
            duration: '10 min',
            content: `## The LBO Capital Structure

An LBO stacks multiple layers of debt, each with different risk, cost, and priority. Understanding the **"debt waterfall"** (order of who gets paid) is essential — it mirrors the bankruptcy priority order.

From safest/cheapest to riskiest/most expensive:

1. **Revolver** — a corporate "credit card," drawn as needed. Secured, cheapest, first priority.
2. **Bank Debt / Term Loans (Senior Secured)** — secured by collateral, lower interest, amortizes (repays principal over time), has **maintenance covenants** (ongoing financial tests the company must pass).
3. **Senior Notes / High-Yield Bonds (Unsecured)** — no collateral, higher interest, fewer restrictions ("incurrence covenants"), typically no amortization (bullet maturity).
4. **Subordinated / Mezzanine Debt** — lowest debt priority, highest interest, often includes equity kickers (warrants) or **PIK interest** (Paid-In-Kind — interest accrues onto the balance instead of being paid in cash, preserving cash but growing the debt).
5. **Equity** — the PE firm's own money, last in line, highest risk, highest potential return.

### Why Multiple Layers?

To optimize cost and flexibility. Cheaper senior debt is used as much as lenders allow; riskier junior debt fills the gap to reach total leverage needed, at higher cost.

### Covenants

- **Maintenance covenants** require passing ongoing tests (e.g., Debt/EBITDA below a threshold) — senior lenders demand these.
- **Incurrence covenants** only trigger on specific actions (taking on more debt) — high-yield bond feature.`,
            keyTakeaways: [
              'LBO debt stacks from senior secured (cheap, first priority, tight covenants) down through mezzanine (expensive, last, may use PIK).',
              'Priority = the bankruptcy waterfall. More senior = cheaper and safer for the lender.',
              'PIK interest accrues onto the balance — preserves cash today but grows debt.',
              'Maintenance covenants = ongoing quarterly tests. Incurrence covenants = triggered by specific actions.',
            ],
          },
          {
            id: 'lbo-l4',
            title: 'Building the LBO Model (Five Steps)',
            duration: '12 min',
            content: `## The LBO Model — Five Steps

### Step 1 — Entry: Sources & Uses

- Purchase Price (Enterprise Value) = Entry EBITDA × Entry Multiple
- **Uses** = what you're paying for (buy the equity, refinance existing debt, transaction fees)
- **Sources** = how you fund it (new debt tranches + PE equity)
- Sources must equal Uses. The PE **equity is the plug**: Equity = Total Uses − Total Debt raised.

### Step 2 — Operating Model

Project revenue, EBITDA, and free cash flow for the holding period (~5 years). Standard operating projection.

### Step 3 — Debt Schedule

Each year, use the company's free cash flow (a **cash sweep**) to pay down debt in priority order (revolver → term loans → etc.). Calculate interest on each tranche. As debt falls, interest falls, freeing more cash — a virtuous cycle. This is the deleveraging engine.

### Step 4 — Calculate the Exit

- Exit Enterprise Value = Exit-Year EBITDA × Exit Multiple (often assumed equal to entry multiple, to be conservative)
- Exit Equity Value = Exit EV − remaining Net Debt at exit

### Step 5 — Compute Returns

- **MOIC** = Exit Equity Value ÷ Initial Equity Invested
- **IRR** = the annualized return implied by turning the initial equity into the exit equity over the holding period

### The Paper LBO (Practice This Out Loud)

"Assume entry EBITDA and multiple → purchase price → debt/equity split → project EBITDA and FCF → pay down debt each year → compute exit equity value → derive MOIC and approximate IRR."

PE interviews often ask you to do a paper LBO — walking through the math verbally without a model. Practice until it's automatic.`,
            keyTakeaways: [
              'Five steps: entry sources/uses (equity is the plug) → operating model → debt schedule (cash sweep) → exit value → IRR/MOIC.',
              'Cash sweep = free cash flow used to pay down debt in priority order each year.',
              'Exit Equity = Exit EV − remaining Net Debt. MOIC = Exit Equity ÷ Initial Equity.',
              'Practice the paper LBO out loud — it\'s a PE interview rite of passage.',
            ],
          },
        ],
      },
      {
        id: 'lbo-s3',
        title: 'LBO as a Valuation Tool',
        lessons: [
          {
            id: 'lbo-l5',
            title: 'LBO as a Floor Valuation and Key Interview Questions',
            duration: '10 min',
            content: `## LBO as a Valuation Method

An LBO isn't just how PE firms buy companies — it's also a **valuation methodology**. By fixing a target return (say 20–25% IRR) and working *backwards*, you solve for the **maximum price a PE firm could pay** and still hit that return. This sets a **"floor" valuation** in a football field.

### Why Is the LBO Usually the Lowest Valuation?

Because PE firms need a high return (20%+), which caps how much they can pay. Strategic acquirers (in precedent transactions) can pay more because they get synergies and don't demand a 20% IRR. So the ranking is typically: **Precedents (highest) ≥ Comps/DCF ≥ LBO (lowest, the floor).**

### Common LBO Interview Questions

**"Why use debt in an LBO at all?"** Debt magnifies equity returns (small equity base captures all upside above the fixed debt claim), debt is cheaper than equity (tax-deductible interest), and using less of your own money lets you spread capital across more deals. The trade-off is risk.

**"What happens to IRR if you use more debt?"** Generally IRR *rises* (less equity in, more leverage magnifying returns) — up to a point. Too much debt raises bankruptcy risk and interest burden.

**"What happens to returns if the holding period lengthens?"** IRR typically *falls* (same total gain spread over more years lowers the annualized rate), even though MOIC may be unchanged. Time is the enemy of IRR.

**"What levers most improve LBO returns?"** A lower entry multiple (buy cheap), EBITDA growth, faster debt paydown, and a higher exit multiple. Buying cheap and growing EBITDA are the controllable ones.

**"Would a DCF or an LBO give a higher valuation?"** Almost always the **DCF** — because the LBO's target-return constraint holds the price down.`,
            keyTakeaways: [
              'Run an LBO backwards (fix target IRR, solve for max price) = a floor valuation.',
              'The LBO is usually the lowest method because 20%+ required return caps the affordable price.',
              'More leverage raises IRR (until risk dominates). Longer hold period lowers IRR.',
              'Best controllable levers: buy cheap (low entry multiple) and grow EBITDA.',
            ],
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 7. BRAIN TEASERS & MENTAL MATH
  // ─────────────────────────────────────────────
  {
    id: 'brainteasers',
    title: 'Brain Teasers & Mental Math',
    description: 'Quick math and logic under pressure. Interviewers watch your process as much as your answer — practice until the techniques are reflexes.',
    icon: '🧠',
    color: 'red',
    level: 'Intermediate',
    duration: '~1 hour',
    sections: [
      {
        id: 'bt-s1',
        title: 'Mental Math Techniques',
        lessons: [
          {
            id: 'bt-l1',
            title: 'Speed Math: The Techniques That Matter',
            duration: '10 min',
            content: `## Mental Math for Investment Banking

Bankers do quick math constantly, so interviewers test it. Build these reflexes:

### Percentage Reversal

X% of Y = Y% of X. 16% of 25 is hard; 25% of 16 = 4 is easy. This works because multiplication is commutative.

### Multiplication by Breaking Apart

17 × 24 = 17 × 25 − 17 = 425 − 17 = **408**. Round to a nearby clean number, then adjust.

### The Rule of 72

Money doubles in roughly **72 ÷ (interest rate %)** years. At 8%, ~9 years. At 6%, ~12 years. Great for quick IRR/growth intuition.

### Growth Compounding Shortcut

Growing at g% for n years ≈ multiply by (1 + g×n) for small g and n, then adjust slightly up for compounding. 10% for 3 years ≈ 1.33× (exact is 1.331×).

### IRR from MOIC — Memorize These Anchors

- 2× in 3 years ≈ 26%
- 2× in 4 years ≈ 19%
- 2× in 5 years ≈ 15%
- 3× in 5 years ≈ 25%
- 3× in 3 years ≈ 44%

Memorizing a few anchors lets you interpolate.

### Fractions to Percentages

Know these cold:
- 1/6 ≈ 16.7%
- 1/7 ≈ 14.3%
- 1/8 = 12.5%
- 1/9 ≈ 11.1%
- 1/11 ≈ 9.1%
- 1/12 ≈ 8.3%`,
            keyTakeaways: [
              'Speed comes from tricks, not raw computation: reverse percentages, break multiplications apart.',
              'Rule of 72: money doubles in ≈ 72 ÷ interest rate % years.',
              'IRR anchors: 2× in 5 years ≈ 15%; 3× in 5 years ≈ 25%; 3× in 3 years ≈ 44%.',
              'Common fractions: 1/8 = 12.5%, 1/7 ≈ 14.3%, 1/6 ≈ 16.7%.',
            ],
          },
        ],
      },
      {
        id: 'bt-s2',
        title: 'Teaser Types and Finance Puzzles',
        lessons: [
          {
            id: 'bt-l2',
            title: 'Classic Brain Teaser Types',
            duration: '10 min',
            content: `## Brain Teaser Approach: Process Over Precision

Interviewers watch your *process* as much as your answer. They want to see you stay calm and reason clearly.

### Estimation / Market Sizing

"How many golf balls fit in a 747?" They don't want a precise number — they want structured reasoning. Break it into estimable pieces, state your assumptions out loud, and compute. For golf balls: estimate the plane's interior volume → estimate a golf ball's volume → divide → apply a packing-efficiency haircut (~65%). **The method is the answer.**

### Probability Puzzles

Think in terms of favorable outcomes ÷ total outcomes, or use complements. "What's the probability of rolling at least one 6 in four rolls?" → **1 − (5/6)^4 ≈ 51.8%**. Complements make "at least one" problems easy.

### Logic / Lateral Puzzles

"Two ropes each burn in 60 min unevenly — measure 45 min." → Light rope A at both ends and rope B at one end simultaneously. A burns out in 30 min; at that instant light B's other end; B's remaining half burns in 15 more min. Total = 45 min. These reward creative constraint-solving.

### Weighing / Sorting Puzzles

Use binary/ternary division — each weighing splits the possibilities. With a balance scale, three groups per weighing means you can distinguish among 3^n coins in n weighings.

### Speed / Rate / Work Puzzles

"If 5 machines make 5 widgets in 5 minutes, how long for 100 machines to make 100 widgets?" → Each machine makes 1 widget in 5 min, so 100 machines make 100 widgets in **5 minutes** (not 100 — the classic trap). Convert to a common rate.`,
            keyTakeaways: [
              'For every teaser, verbalize your approach and assumptions. The interviewer grades the process.',
              'Estimation → decompose into estimable pieces. Probability → complements (P(at least one) = 1 − P(none)).',
              'Logic → creative use of constraints. Rates → convert to common units first.',
              '5 machines, 5 widgets, 5 min → 100 machines make 100 widgets in 5 min (not 100 — classic trap).',
            ],
          },
          {
            id: 'bt-l3',
            title: 'Finance-Flavored Teasers',
            duration: '8 min',
            content: `## Finance-Flavored Brain Teasers

Some teasers wrap finance concepts:

### "What's your personal beta?"

Beta measures volatility/risk vs. the market. Say **slightly above 1.0** — more ambitious and willing to take calculated risks than average, but not reckless. Don't say 2.0.

### "A stock is at $100 with 50% chance of +$40 and 50% of −$30. Buy it?"

Expected value = 0.5×(+40) + 0.5×(−30) = +$5. A positive expected return, so yes on an EV basis — but note risk tolerance matters. Compute the EV, state your risk assumption, and answer decisively.

### "How would you value a company with no revenue?"

Lean on other signals: user growth, comparable early-stage transactions, DCF once cash flows are projected to turn positive, or strategic value. No revenue ≠ no value — think about what drives the business's future earnings potential.

### General Rule for Finance Teasers

- Compute expected values when probabilities are given
- Reason from first principles about risk and value
- State your assumptions explicitly
- Answer decisively — don't hedge indefinitely

### Interview Tips for All Teasers

- Don't rush — take 5 seconds to set up the problem
- Talk through your math and reasoning out loud
- If you make a mistake, calmly correct it — interviewers value composure
- A slightly wrong answer with great process beats a right answer with no explanation`,
            keyTakeaways: [
              'Finance teasers reward computing expected value and reasoning from first principles.',
              '"Personal beta" → slightly above 1.0: ambitious, calculated, not reckless.',
              'When given probabilities, compute expected value explicitly, then address risk tolerance.',
              '"No revenue" company → user growth, comparable transactions, DCF projections, strategic value.',
            ],
          },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 8. FIT & BEHAVIORAL
  // ─────────────────────────────────────────────
  {
    id: 'fit',
    title: 'Fit & Behavioral',
    description: 'Technicals get you in the room; fit gets you the offer. Every fit answer should quietly reinforce: smart, hardworking, likeable, genuinely committed to banking.',
    icon: '🎯',
    color: 'pink',
    level: 'Beginner',
    duration: '~1 hour',
    sections: [
      {
        id: 'fit-s1',
        title: 'Your Story',
        lessons: [
          {
            id: 'fit-l1',
            title: '"Walk Me Through Your Resume" — The Most Important Question',
            duration: '10 min',
            content: `## The Most Important Question

This opens almost every interview, and it frames everything after it. Nail it and the rest flows; fumble it and the interviewer tunes out in 90 seconds.

### The Four-Part Structure

1. **Start at the beginning** — where you're from / how you got to college, briefly.
2. **The spark** — how you first got interested in finance/business.
3. **The build** — how that interest grew through specific internships, classes, and experiences, each one leading logically to the next (a *narrative*, not a list).
4. **The now** — a strong closing statement about why you're interviewing here today.

### Rules

- Be **chronological**. Show how each step led toward finance (a "connect-the-dots" story).
- Aim for **2–3 minutes**. Sound *certain* you want banking.
- Don't recite your resume line-by-line — give the transitions and the *why*.
- Don't look at your resume while telling it.
- Practice it out loud until it's smooth but not robotic.

### Common Mistakes

- Going out of chronological order
- Too much throat-clearing exposition ("I've had so many great experiences…")
- Too short (<1 min) or too long (>5 min)
- Sounding unsure about banking
- Listing experiences without connecting them ("And then I did X, and then I did Y…")

### The Goal

Your story should make the interviewer think: "This person has a clear, logical path to banking and knows exactly why they want to be here." Every other fit answer references this story.`,
            keyTakeaways: [
              'Your story: origin → spark → build (chronological) → why here now. 2–3 minutes.',
              'It\'s the single most important thing to prepare, because every other fit answer references it.',
              'Connect each experience to the next — a narrative, not a list.',
              'Sound certain you want banking. Uncertainty at this stage is disqualifying.',
            ],
          },
        ],
      },
      {
        id: 'fit-s2',
        title: 'The Big Fit Categories',
        lessons: [
          {
            id: 'fit-l2',
            title: 'Common Fit Questions — How to Answer Them',
            duration: '12 min',
            content: `## The Big Fit Categories

### "Why investment banking?"

Two pillars: (1) you've done your homework — cite specific people you've spoken with and what drew you in; (2) you have a long-term view and accept the short-term sacrifice.

**Good reasons:** You want to learn how companies make major strategic decisions, work on high-impact transactions, build a strong analytical/finance skill set, and be at the center of deals.

**Avoid:** "I want to make money" (true, but disqualifying to say) and vague passion with no substance.

### "Why our firm?"

Focus on **people and specifics**, because most banks' cultures genuinely are similar. Reference bankers you've met and what they told you. Generic answers fall flat; a real anecdote ("I spoke with Sarah in your healthcare group and she described…") is far stronger.

### "Strengths / Weaknesses"

- **Strengths:** Give *real* strengths bankers want (attention to detail, work ethic, teamwork) backed by a specific example.
- **Weaknesses:** Give a *real but non-fatal* one ("I can get lost in the details") and — crucially — describe how you've improved. Never say "I work too hard" (fake) or "I miss deadlines" (fatal).

### "Tell me about a team/leadership experience"

Use a 3-part structure: (1) state the problem/goal, (2) describe the team, your role, and what you specifically did, (3) state the concrete result. Have 2–3 such stories ready that you can adapt to teamwork, leadership, conflict, and sacrifice questions.

### "Tell me about a failure"

Briefly state a real failure, then spend most of the answer on what you *learned* and how you *improved*. The failure is the setup; the growth is the point.

### "Walk me through a deal that interests you"

Name the buyer and seller, the price and key multiples (EV/Revenue, EV/EBITDA) if available, the strategic rationale, and your own informed opinion on it.`,
            keyTakeaways: [
              'Every fit answer = a specific anecdote + a clear structure + smart/hardworking/likeable/committed.',
              '"Why banking?" → done your homework + long-term view. Cite specific bankers you\'ve met.',
              '"Why this firm?" → specific people and anecdotes. Generic answers fall flat.',
              'Weaknesses: real but non-fatal, plus how you improved. Never fake ("I work too hard").',
              'Team/leadership structure: (1) problem/goal, (2) your role, (3) concrete result.',
            ],
          },
        ],
      },
      {
        id: 'fit-s3',
        title: 'Commitment and Odd-Ball Questions',
        lessons: [
          {
            id: 'fit-l3',
            title: 'Understanding Banking and Creative Questions',
            duration: '8 min',
            content: `## "Understanding Banking" Questions

Interviewers (especially of career changers) test whether you actually know what you're signing up for.

### "What do bankers actually do?"

Advise companies on transactions — buying/selling other companies (M&A) and raising capital (debt/equity). Bankers are agents connecting companies with buyers, sellers, and investors. Day-to-day: building presentations (pitch books), financial analysis and models, and marketing materials.

### "Do you understand the hours?"

Yes — 80–100 hour weeks are normal. Reference a specific time you worked intense hours over a sustained period and handled it well. Don't say "I'm fine with long hours" without evidence.

### "Where else are you interviewing?"

"Just banking" — you're focused and don't want to waste anyone's time, even if privately you're less certain.

### "If we gave you an offer right now, would you take it?"

"Yes." In an interview, the answer is always yes — commitment is being tested.

### Creative / Personality Questions

"What animal would you be?" "Tell me a joke." "What's your personal beta?"

Don't over-think or force a "banker trait." Be genuinely creative and show personality. The interviewer is checking that you're a real, likeable person, not a robot.

### The Four Qualities to Reinforce

Every fit answer should quietly support that you are:
1. **Smart** — you understand and can analyze situations
2. **Hardworking** — you do what it takes and won't crack under pressure
3. **Likeable** — people want to work with you at 2 a.m.
4. **Committed** — you actually want this, not just any job`,
            keyTakeaways: [
              'Know what bankers do: advise on M&A and capital raising via pitch books, models, marketing materials.',
              'Accept the 80–100 hour reality with a concrete example of sustained intensity.',
              '"If we gave you an offer now, would you take it?" → Yes. Commitment is tested.',
              'On creative questions, show real personality — the interviewer wants to know you\'re likeable.',
              'Every fit answer reinforces: smart, hardworking, likeable, committed to banking.',
            ],
          },
        ],
      },
    ],
  },
];

export const getCourseById = (id: string) => courses.find(c => c.id === id);
