# Use Case 4: AI Academy - "Why Is This ETF Performing Well?"

## Context

Users see market movements but lack understanding of underlying causes. Traditional financial education is generic and disconnected from real-time events. With AI-Native capabilities, we can provide contextual learning integrated into every market event, explaining the "why" behind price movements using 5-Why analysis.

## Problem Statement

**User Pain Points:**
1. **Knowledge Gap** - Users don't understand why assets rise/fall
2. **Generic Education** - Traditional courses don't address specific holdings
3. **Timing Mismatch** - Learn about events weeks after they happen
4. **No Actionable Learning** - Education doesn't connect to portfolio decisions

## Goals

1. **Real-Time Education** - Explain market events as they happen
2. **Contextual Learning** - Focus on user's actual holdings
3. **Root Cause Analysis** - Use 5-Why to reveal fundamental drivers

## Non-Goals

- Not building a generic financial education platform
- Not replacing formal investment courses
- Not providing day-trading strategies

## User Personas

**Primary**: Sarah Li (28, Beginner Investor)
- Limited financial knowledge
- Owns QQQ but doesn't understand tech sector dynamics
- Wants to learn while investing

**Secondary**: Jennifer Wu (35, Moderate Experience)
- Understands basics but wants deeper insights
- Interested in macro trends
- Values time-efficient learning

## User Journey

```
Wealth Home → Rankings → Today's Top Gainers → Tap "QQQ +2.3%"
→ AI Explanation appears
→ View 5-Why Analysis
→ Read Knowledge Cards (What is ETF, QQQ Components)
→ See Related Products
→ Tap "Add to Watchlist"
```

### Screen Flow

**Screen 1: Today's Top Gainers**
```
┌─────────────────────────────────┐
│  🏆 Today's Top Gainers          │
├─────────────────────────────────┤
│  📈 QQQ (Nasdaq ETF)             │
│  +2.3% | $385.50                │
│  [Tap for AI Explanation]        │
├─────────────────────────────────┤
│  📈 GLD (Gold ETF)               │
│  +1.8% | $195.20                │
└─────────────────────────────────┘
```

**Screen 2: AI Deep Dive - QQQ**
```
┌─────────────────────────────────┐
│  ← QQQ Performance Analysis      │
├─────────────────────────────────┤
│  🤖 Why QQQ Rose 2.3% Today      │
│                                  │
│  📊 Primary Drivers (Weighted)   │
│  1. Tech earnings beat (60%)    │
│     NVDA, MSFT exceeded estimates│
│  2. Fed dovish comments (30%)   │
│     Powell hints at rate pause   │
│  3. Capital inflows (10%)       │
│     $500M net inflow to QQQ     │
├─────────────────────────────────┤
│  🔍 5-Why Root Cause Analysis    │
│                                  │
│  Why1: Why did tech stocks rise? │
│  → AI chip demand surge          │
│                                  │
│  Why2: Why chip demand surge?    │
│  → ChatGPT/AI apps proliferation │
│                                  │
│  Why3: Why AI apps proliferating?│
│  → Enterprise digital transformation│
│                                  │
│  Why4: Why transformation now?   │
│  → Post-pandemic remote work norm│
│                                  │
│  Why5: Root cause?               │
│  → Technology revolution driving │
│    productivity transformation   │
├─────────────────────────────────┤
│  📚 Learn More                   │
│  [What is an ETF?]               │
│  [QQQ Top 10 Holdings]           │
│  [Tech Sector Risks]             │
└─────────────────────────────────┘
```

**Screen 3: Knowledge Card - What is ETF**
```
┌─────────────────────────────────┐
│  ← What is an ETF?               │
├─────────────────────────────────┤
│  📖 Definition                   │
│  Exchange-Traded Fund (ETF) is  │
│  a basket of securities that     │
│  trades on an exchange like a    │
│  stock.                          │
├─────────────────────────────────┤
│  ✅ Key Benefits                 │
│  • Diversification: Own 100+    │
│    stocks with one purchase      │
│  • Low Cost: Fees typically     │
│    <0.5% per year                │
│  • Liquidity: Trade anytime     │
│    during market hours           │
│  • Transparency: Holdings       │
│    disclosed daily               │
├─────────────────────────────────┤
│  📊 Example: QQQ                 │
│  Tracks Nasdaq-100 Index         │
│  Top Holdings:                   │
│  • Apple (AAPL): 12%             │
│  • Microsoft (MSFT): 10%         │
│  • NVIDIA (NVDA): 8%             │
│  • Amazon (AMZN): 6%             │
├─────────────────────────────────┤
│  🤖 AI Insight:                  │
│  "ETFs are ideal for beginners   │
│   seeking diversification without│
│   picking individual stocks."    │
└─────────────────────────────────┘
```

**Screen 4: Related Products**
```
┌─────────────────────────────────┐
│  Related Products                │
├─────────────────────────────────┤
│  🤖 If you like QQQ, consider:   │
│                                  │
│  📊 ARKK (Innovation ETF)        │
│  Focus: Disruptive tech          │
│  Risk: Higher volatility         │
│  Fit Score: 78%                  │
│                                  │
│  📊 VGT (Tech Sector ETF)        │
│  Focus: Broader tech exposure    │
│  Risk: Moderate                  │
│  Fit Score: 85%                  │
│                                  │
│  📊 SPY (S&P 500 ETF)            │
│  Focus: Diversified US stocks    │
│  Risk: Lower volatility          │
│  Fit Score: 92%                  │
└─────────────────────────────────┘
```

## Jobs to be Done

**When** I see an asset performing well/poorly,  
**I want to** understand the root causes in simple terms,  
**So I can** learn from real events and make better investment decisions.

## Key Features

### 1. Real-Time Event Explanation
- **Trigger**: Significant price movement (>2% daily)
- **Content**: 
  - Primary drivers with weight (e.g., earnings 60%, Fed 30%, flows 10%)
  - Plain-English explanation
  - Supporting data/charts

### 2. 5-Why Root Cause Analysis
- **Methodology**: Iteratively ask "Why?" to reach fundamental drivers
- **Depth**: 5 levels minimum
- **Visualization**: Expandable tree or linear flow
- **Example**: Tech rally → AI demand → App proliferation → Digital transformation → Productivity revolution

### 3. Contextual Knowledge Cards
- **Topics**:
  - Asset class basics (What is ETF, Bond, etc.)
  - Specific product details (QQQ holdings, strategy)
  - Risk factors (Tech sector risks, interest rate sensitivity)
  - Market concepts (Volatility, Beta, Sharpe Ratio)
- **Format**: Bite-sized (200-300 words), visual, interactive
- **Personalization**: Prioritize topics relevant to user's holdings

### 4. Related Products Recommendation
- **Logic**: AI identifies similar products based on:
  - Asset class
  - Risk profile
  - Investment strategy
  - User fit score
- **Display**: 3-5 alternatives with comparison

### 5. Learning Progress Tracking
- **Metrics**:
  - Knowledge cards completed
  - Topics mastered
  - Quiz scores (optional)
- **Gamification**: Badges, levels, streaks

## AI-Native Advantages

| Traditional Approach | AI-Native Approach | Impact |
|---------------------|-------------------|--------|
| Generic courses | Contextual learning on holdings | Relevance +100% |
| Weeks after event | Real-time explanation | Timeliness +100x |
| Surface-level news | 5-Why root cause analysis | Depth +500% |
| Passive reading | Interactive knowledge cards | Engagement +200% |
| No personalization | AI-curated learning path | Completion rate +150% |

## Success Metrics

- **Engagement**: Knowledge card views +80%
- **Completion**: Card read-through rate >70%
- **Retention**: Return to AI Academy within 7 days >50%
- **Satisfaction**: "Learned something new" rating >85%

## Technical Requirements

- **AI Model**: GPT-4 for explanations + Custom NLP for event detection
- **Data Sources**:
  - Real-time market data (prices, volumes)
  - News feeds (Bloomberg, Reuters)
  - Earnings data
  - Fed announcements
- **Update Frequency**: Real-time for events, daily for knowledge cards
- **Latency**: <3 seconds for explanation generation

## Compliance Considerations

- **Disclaimer**: "Educational content only, not investment advice"
- **Accuracy**: Fact-check all explanations before publishing
- **Transparency**: Cite data sources
- **Audit Trail**: Log all content for regulatory review

## Open Questions

1. **Content Depth**: How technical should explanations be for beginners?
2. **Update Frequency**: How often to refresh knowledge cards?
3. **Gamification**: Will badges/points increase engagement or feel gimmicky?
4. **Localization**: How to adapt content for different regions/languages?
5. **Monetization**: Should advanced courses be premium features?

---

**Version**: 1.0  
**Status**: Design Phase  
**Owner**: Product Team  
**Last Updated**: 2024-11-28
