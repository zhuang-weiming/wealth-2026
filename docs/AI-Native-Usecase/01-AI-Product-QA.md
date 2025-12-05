# Use Case 1: AI Product Q&A - "Is This Product Right for Me?"

## Context

Users face information overload when browsing financial products. Traditional product pages contain lengthy prospectuses that take 10+ minutes to read, yet users still can't determine if the product fits their needs. With AI-Native capabilities, we can provide instant, personalized product interpretation in under 10 seconds.

## Problem Statement

**User Pain Points:**
1. **Information Overload** - 50+ page prospectus documents are overwhelming
2. **Generic Content** - Product descriptions don't address individual needs
3. **Comparison Difficulty** - Hard to compare similar products (e.g., HSBC Tokenized Deposit vs. Money Market Funds)
4. **Decision Paralysis** - Too much information leads to no action

## Goals

1. **Instant Understanding** - Users comprehend product essence in <10 seconds
2. **Personalized Fit** - AI calculates product-user match score (0-100)
3. **Actionable Insights** - Clear recommendation: Buy / Watch / Skip

## Non-Goals

- Not building a generic chatbot for all queries
- Not replacing detailed prospectus (still available for deep dive)
- Not providing investment advice (regulatory constraint)

## User Personas

**Primary**: Jennifer Wu (35, Premier Client, Moderate Experience)
- Busy professional, wants quick decisions
- Trusts AI but needs transparency
- Prefers mobile-first experience

**Secondary**: Sarah Li (28, Beginner Investor)
- Limited financial knowledge
- Needs educational content
- Risk-averse, seeks validation

## User Journey

```
Wealth Home → Browse Products → Tap "HSBC Tokenized Deposit" 
→ AI One-Sentence Summary appears
→ View Fit Score (85/100)
→ Expand 5W1H Analysis
→ Compare with Similar Products
→ Tap "Add to Portfolio"
```

### Screen Flow

**Screen 1: Product List**
```
┌─────────────────────────────────┐
│  Wealth Products                 │
├─────────────────────────────────┤
│  💰 HSBC Tokenized Deposit       │
│  3.5% APY | T+0 | AI Fit: 85%   │
│  [Tap for AI Analysis]           │
├─────────────────────────────────┤
│  📊 Short-Term Bond Fund         │
│  4.2% APY | T+1 | AI Fit: 78%   │
└─────────────────────────────────┘
```

**Screen 2: AI Product Analysis**
```
┌─────────────────────────────────┐
│  ← HSBC Tokenized Deposit        │
├─────────────────────────────────┤
│  🤖 AI One-Sentence Summary      │
│  "Digital deposit certificate    │
│   with 3.5% APY, T+0 redemption, │
│   ideal for short-term cash."    │
├─────────────────────────────────┤
│  📊 Your Fit Score: 85/100       │
│  ✅ Matches your risk profile    │
│  ✅ Meets liquidity needs        │
│  ⚠️ Yield slightly below target  │
├─────────────────────────────────┤
│  📖 5W1H Analysis                │
│  • What: Blockchain-backed deposit│
│  • Why: Higher yield than savings│
│  • When: Anytime (T+0 liquidity) │
│  • Where: HSBC Digital Platform  │
│  • Who: Conservative investors   │
│  • How: One-tap purchase         │
├─────────────────────────────────┤
│  🔍 Compare Similar Products     │
│  vs. Money Market Fund           │
│  vs. Savings Account             │
├─────────────────────────────────┤
│  [Add to Portfolio] [Learn More] │
└─────────────────────────────────┘
```

**Screen 3: Product Comparison**
```
┌─────────────────────────────────┐
│  Product Comparison              │
├─────────────────────────────────┤
│                 │ HSBC TD │ MMF  │
│  Yield          │ 3.5%    │ 3.0% │
│  Liquidity      │ T+0     │ T+1  │
│  Risk Level     │ Very Low│ Low  │
│  Min Investment │ $1,000  │ $500 │
│  AI Recommend   │ ⭐⭐⭐⭐⭐ │ ⭐⭐⭐⭐ │
├─────────────────────────────────┤
│  🤖 AI Insight:                  │
│  "HSBC Tokenized Deposit offers  │
│   better liquidity and yield.    │
│   Recommended for your profile." │
└─────────────────────────────────┘
```

## Jobs to be Done

**When** I'm browsing wealth products,  
**I want to** quickly understand if a product fits my needs,  
**So I can** make confident investment decisions without reading lengthy documents.

## Key Features

### 1. AI One-Sentence Summary
- **Input**: Product metadata + User profile
- **Output**: Plain-English summary (max 20 words)
- **Example**: "Digital deposit certificate with 3.5% APY, T+0 redemption, ideal for short-term cash management"

### 2. Personalized Fit Score (0-100)
- **Calculation Factors**:
  - Risk tolerance match (30%)
  - Liquidity needs alignment (25%)
  - Return expectation fit (25%)
  - Investment horizon match (20%)
- **Display**: Color-coded (Green >80, Yellow 60-80, Red <60)

### 3. 5W1H Analysis
- **What**: Product type and core features
- **Why**: Key benefits vs. alternatives
- **When**: Optimal timing for purchase
- **Where**: Purchase channel
- **Who**: Target investor profile
- **How**: Step-by-step purchase process

### 4. Auto-Comparison
- **Logic**: AI identifies 2-3 similar products based on category and features
- **Display**: Side-by-side comparison table
- **Insight**: AI explains which product is better and why

## AI-Native Advantages

| Traditional Approach | AI-Native Approach | Impact |
|---------------------|-------------------|--------|
| Read 50-page prospectus | AI one-sentence summary | 10min → 10sec |
| Generic product description | Personalized fit score | Relevance +80% |
| Manual comparison | Auto-comparison with insights | Effort -90% |
| Static content | Real-time updates based on market | Timeliness +100% |

## Success Metrics

- **Speed**: Time to understand product <10 seconds
- **Engagement**: Product detail page views +40%
- **Conversion**: Add-to-portfolio rate +25%
- **Satisfaction**: "Helpful" rating >85%

## Technical Requirements

- **AI Model**: GPT-4 for natural language generation
- **Data Sources**: Product database, user profile, market data
- **Latency**: <2 seconds for AI analysis
- **Personalization**: Real-time fit score calculation

## Compliance Considerations

- **Disclaimer**: "AI analysis is for informational purposes only, not investment advice"
- **Transparency**: Show data sources and calculation logic
- **Audit Trail**: Log all AI recommendations for regulatory review

## Open Questions

1. **Regulatory Approval**: Does AI product interpretation require investment advisor license?
2. **Liability**: If AI misrepresents a product, who is responsible?
3. **Data Privacy**: How to ensure user profile data is protected during AI analysis?
4. **Accuracy**: What's the acceptable error rate for fit score calculation?
5. **Localization**: How to adapt AI summaries for different languages/regions?

---

**Version**: 1.0  
**Status**: Design Phase  
**Owner**: Product Team  
**Last Updated**: 2024-11-28
