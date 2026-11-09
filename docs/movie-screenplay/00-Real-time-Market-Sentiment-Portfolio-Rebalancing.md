# Wealth 2026 - Complete Demo Guide & Movie Script

> **AI-Native Wealth Management Demo**  
> Based on: Real-time Market Sentiment Driven Portfolio Rebalancing Design  
> Target: HSBC Premier Customers (HK)

## 🎯 Quick Start

**Entry Point**: Open `index.html` in your browser

Choose one of three role-based demos:
- 📱 **Customer** → Click "Customer Mobile App"
- 💼 **Relationship Manager** → Click "Relationship Manager"  
- 📊 **Chief Economist** → Click "Chief Economist"

---

## 📱 Demo Scenario 1: Customer Journey (Mobile)

**Duration**: ~3 minutes  
**Persona**: Jennifer Wu (Premier Customer, $800K AUM)

### Flow:
1. **Start**: `index.html` → Click "Customer Mobile App"
2. **Lockscreen** (`customer_lockscreen.html`) → Click notification
3. **AI Dashboard** (`customer_dashboard.html`) → Review AI recommendation → Execute rebalancing
4. **Portfolio** (`customer_portfolio.html`) → View updated holdings
5. **AI Features** (`ai_features_hub.html`) → Explore AI tools

### Movie Script:
**[Scene 1: iPhone Lockscreen - 10 seconds]**
> "It's 8:30 AM. Jennifer Wu, a tech executive, receives a push notification: 'Market Alert: Tech sector volatility detected. AI recommendation ready.' The notification shows HSBC's logo and a red warning indicator."

**[Scene 2: AI Dashboard - 20 seconds]**
> "Jennifer taps the notification and sees her AI investment dashboard. The system shows: 'Your tech stock exposure (65%) faces 30% downside risk. AI confidence: 92%. Historical win rate: 78%.' Three options appear: Defensive (-$50K tech), Balanced (-$25K tech), Aggressive (hold position)."

**[Scene 3: One-Tap Execution - 15 seconds]**
> "Jennifer selects 'Balanced' and taps 'Execute Rebalancing.' The system shows: 'Selling $25,000 QQQ, buying $25,000 TLT. Estimated risk reduction: 30%.' Within 30 seconds, the trade is complete."

**[Scene 4: AI Features Hub - 10 seconds]**
> "Jennifer explores additional AI tools: Portfolio Health Check shows 8.5/10 score, AI Academy explains market dynamics, and Trending Assets highlights gold opportunities."

---

## 💼 Demo Scenario 2: Relationship Manager Journey

**Duration**: ~4 minutes  
**Persona**: Sarah Wong (Senior RM, manages 80 clients)

### Flow:
1. **Start**: `index.html` → Click "Relationship Manager"
2. **Opportunity** (`rm_opportunity.html`) → AI suggests clients with opportunities
3. **AI Tools** (`ai_features_hub.html`) → Access Smart Money Flow & Gold Forecast
4. **Planning** (`rm_planning.html?client=robert`) → View client details and AI alerts
5. **Investment** (`rm_investment.html`) → Review portfolio recommendations
6. **Performance** (`rm_performance.html`) → Check team metrics

### Movie Script:
**[Scene 1: RM Workbench - 15 seconds]**
> "Sarah Wong starts her day at 7:30 AM. Her AI-powered workbench shows: '12 high-priority clients detected.' Robert Chen tops the list: '$2M AUM, 60% cash drag, retirement risk: HIGH.'"

**[Scene 2: AI Tools Access - 10 seconds]**
> "Sarah clicks 'AI Tools' to access Smart Money Flow analysis showing institutional money moving into defensive assets, and Gold Forecast predicting 15% upside in Q1 2025."

**[Scene 3: Client Analysis - 20 seconds]**
> "Clicking on Robert Chen reveals: 'Business owner, age 55, holding $1.2M cash earning 0.5%. AI recommendation: Invest $800K in balanced portfolio. Projected retirement gap reduction: $400K.'"

**[Scene 4: Batch Approval - 10 seconds]**
> "Sarah reviews and approves 8 AI-generated recommendations in 5 minutes. The system automatically notifies clients via mobile app. Her efficiency: from 50 to 200 clients manageable."

---

## 📊 Demo Scenario 3: Chief Economist Journey

**Duration**: ~2 minutes  
**Persona**: Dr. Jonathan Miller (Chief Economist)

### Flow:
1. **Start**: `index.html` → Click "Chief Economist"
2. **Research** (`research_portal.html`) → View macro research dashboard
3. **AI Research** (`ai_features_hub.html`) → Access Gold Forecast & Smart Money Flow
4. Review Fed policy, market sentiment, and research reports

### Movie Script:
**[Scene 1: Research Dashboard - 15 seconds]**
> "Dr. Miller accesses the macro research portal at 6:00 AM. The dashboard shows: 'Fed Policy Tracker: 75% probability of rate cut in March 2025. Market Sentiment: Risk-off mode activated.'"

**[Scene 2: AI Research Tools - 20 seconds]**
> "He clicks 'AI Research' to access advanced analytics. Gold Forecast shows: 'Institutional demand +45%, retail sentiment +62%, technical breakout imminent.' Smart Money Flow reveals: '$2.3B flowing from tech to defensive assets this week.'"

**[Scene 3: Research Synthesis - 10 seconds]**
> "The AI synthesizes findings: 'Recommend overweight gold and defensive assets. Clean energy sector shows resilience despite volatility.' These insights automatically feed into RM recommendations across the platform."

---

## 🔄 Demo Scenario 4: End-to-End Workflow (Movie Script)

**Duration**: ~5 minutes  
**Combines all three roles in cinematic sequence**

### Flow:
1. **Investment Officer** (`rm_investment.html`) → Approve Jennifer's rebalancing
2. **Customer** (`customer_lockscreen.html`) → Receive notification
3. **Customer** (`customer_dashboard.html`) → Execute rebalancing
4. **Customer** (`customer_portfolio.html`) → View updated portfolio
5. **RM** (`rm_opportunity.html`) → Discover similar opportunities

### Complete Movie Script (50 seconds):

**[Opening Title - 3 seconds]**
> "Wealth 2026: AI-Native Wealth Management"

**[Scene 1: Market Crisis Simulation - 12 seconds]**
> "March 8, 2024. Silicon Valley Bank announces $1.8B loss. Within minutes, AI sentiment engine detects panic: Tech sector sentiment drops from +0.3 to -0.85. The system identifies 500 HSBC clients with high tech exposure."

**[Scene 2: Investment Officer Decision - 10 seconds]**
> "Investment Officer reviews AI recommendation for Jennifer Wu: 'Reduce tech exposure by $50K, add defensive assets.' Historical backtest shows 78% success rate. Officer approves with one click."

**[Scene 3: Customer Receives & Acts - 15 seconds]**
> "Jennifer's iPhone buzzes during her morning commute. She opens the notification, sees the transparent AI analysis, and executes the rebalancing in 30 seconds. Risk reduced by 30%, potential loss avoided: $15K."

**[Scene 4: RM Discovers Opportunities - 8 seconds]**
> "Meanwhile, RM Sarah's dashboard lights up: '47 similar clients identified.' She batch-approves recommendations for clients with identical risk profiles. Efficiency: 200 clients managed vs. traditional 50."

**[Closing Message - 2 seconds]**
> "AI-Native. Transparent. Collaborative."

---

## 🗺️ Website Link Topology

### Navigation Structure

```
index.html (Role Selection)
│
├─→ Customer Journey (Mobile)
│   ├─→ customer_lockscreen.html (iPhone notification)
│   ├─→ customer_dashboard.html (AI investment dashboard)
│   └─→ customer_portfolio.html (Portfolio view)
│       ├─→ screen-login (Login)
│       ├─→ screen-wealth (Default: Investment portfolio)
│       └─→ screen-dashboard (Banking dashboard)
│
├─→ RM Journey (Desktop)
│   ├─→ rm_opportunity.html (Client discovery)
│   ├─→ rm_planning.html (Financial planning)
│   │   └─→ ?client=robert|sarah|alice (Client profiles)
│   ├─→ rm_investment.html (Portfolio management)
│   └─→ rm_performance.html (Team metrics)
│
└─→ Economist Journey (Desktop)
    └─→ research_portal.html (Macro research)
```

### Cross-Role Links

**From Investment Officer to Customer:**
- `rm_investment.html` → Approve → Redirect to `customer_lockscreen.html`

**From Planning to Investment:**
- `rm_planning.html` → "View Investment Options" → `rm_investment.html`

**RM Platform Navigation (Unified):**
- All RM pages share navigation: Opportunity → Planning → Investment → Performance → Home

---

## 💡 Demo Tips

### For Customer Journey:
- Emphasize **speed** - 30 seconds end-to-end
- Highlight **transparency** - AI shows confidence and historical data
- Show **control** - customer chooses strategy

### For RM Journey:
- Emphasize **proactive discovery** - AI finds opportunities automatically
- Highlight **actionable insights** - not just data, but recommendations
- Show **efficiency** - from discovery to action in minutes

### For Economist Journey:
- Emphasize **macro intelligence** - Fed policy, market sentiment
- Highlight **research synthesis** - AI summarizes key findings
- Show **investment themes** - research drives recommendations

---

## 📊 Key Metrics

- **Time Savings**: 30 seconds for rebalancing (vs. hours traditionally)
- **Risk Reduction**: 30% portfolio risk reduction
- **Proactive Discovery**: AI identifies opportunities across 12,000+ clients
- **Transparency**: 92% AI confidence with historical backtest
- **Compliance**: Automated regulatory monitoring

---

## 🎬 Movie Production Guide

### Technical Setup

**Local Server:**
```bash
cd /path/to/wealth-2026
python3 -m http.server 8000
```

**Screen Recording:**
- Use Cmd+Shift+5 (macOS) or OBS Studio
- Resolution: 1920x1080 (16:9) or 1080x1920 (9:16 for mobile)
- Frame rate: 30fps
- Record each page interaction for 10-15 seconds

### Cinematic Structure (90 seconds total)

| Scene | Duration | Page/Action | Narrative Focus |
|-------|----------|-------------|----------------|
| **Opening** | 5s | Title card + crisis news | Market volatility context |
| **AI Detection** | 10s | Sentiment analysis visualization | AI processing power |
| **RM Workflow** | 20s | `rm_investment.html` → approval | Professional oversight |
| **Customer Mobile** | 25s | `customer_lockscreen.html` → `customer_dashboard.html` → execution | User experience |
| **AI Features** | 15s | `ai_features_hub.html` | Advanced capabilities |
| **Results** | 10s | Portfolio performance | Value demonstration |
| **Closing** | 5s | HSBC branding + tagline | Brand reinforcement |

### Final Cut Pro Production

**Project Settings:**
- Resolution: 4K (3840x2160) for flexibility
- Frame rate: 30fps
- Color space: Rec. 709
- Audio: 48kHz stereo

**Visual Effects:**
- **Data Visualization**: Animated charts showing sentiment changes
- **Mobile Mockup**: iPhone frame overlay for mobile scenes
- **Transition Effects**: Smooth cross-dissolves (1s duration)
- **Text Overlays**: Key metrics and explanations
- **Color Grading**: HSBC red (#DB0011) accent colors

**Audio Design:**
- **Background Music**: Corporate/tech ambient (60-70 BPM)
- **Sound Effects**: Notification sounds, click effects
- **Voiceover**: Professional narrator (optional)

**Export Formats:**
- **Full Version**: H.264, 1080p, 8-12 Mbps (for presentations)
- **Social Media**: H.264, 1080x1080, 6 Mbps (Instagram/LinkedIn)
- **Mobile Optimized**: H.264, 720p, 4 Mbps (WhatsApp sharing)

### Storyboard Template

**Frame 1**: Crisis news ticker with red alerts
**Frame 2**: AI brain processing thousands of data points
**Frame 3**: RM dashboard showing client priorities
**Frame 4**: iPhone notification appearing
**Frame 5**: Customer reviewing AI recommendation
**Frame 6**: One-tap execution animation
**Frame 7**: Portfolio rebalancing visualization
**Frame 8**: Success metrics and HSBC logo

---

## 🐛 Troubleshooting

**Issue**: Page doesn't load properly
- **Solution**: Run local server: `python3 -m http.server 8000`

**Issue**: Navigation doesn't work
- **Solution**: Check all files are in same directory

**Issue**: Styles look broken
- **Solution**: Check internet connection (Tailwind CSS from CDN)

---

## 🎯 Value Proposition & Call to Action

### Core Value Drivers

**For Customers:**
- **Speed**: 30 seconds vs. 24-48 hours traditional response
- **Performance**: 1.5-2% annual return improvement
- **Risk Control**: 30% downside risk reduction
- **Transparency**: 92% AI confidence with historical validation

**For Relationship Managers:**
- **Scale**: Manage 200 clients vs. 50 traditional capacity
- **Efficiency**: 70% time savings on analysis
- **Quality**: AI-powered prioritization and recommendations
- **Satisfaction**: Focus on high-value client relationships

**For HSBC:**
- **Growth**: AUM growth from 3% to 8% annually
- **Retention**: Reduce Premier customer churn by 12%
- **Differentiation**: AI-native competitive advantage
- **Compliance**: Built-in regulatory framework

### Success Metrics

| Metric | Current | Target | Impact |
|--------|---------|--------|---------|
| Response Time | 24-48 hours | < 2 hours | 12x faster |
| RM Capacity | 50 clients | 200 clients | 4x scale |
| Customer NPS | 42 | 60 | 43% improvement |
| App Engagement | 35% MAU | 55% MAU | 57% increase |

### Next Steps

1. **Pilot Program**: 500 Premier customers (3 months)
2. **RM Training**: AI tool certification program
3. **Integration**: Connect with existing HSBC systems
4. **Expansion**: Scale to Singapore and UK markets

**Contact**: Wealth Platform Team  
**Demo Environment**: `http://localhost:8000`

---

## 📝 Quick Reference

### File Structure
```
wealth-2026/
├── index.html              # Role selection hub
├── customer_portfolio.html           # Customer mobile app
├── customer_lockscreen.html         # iPhone notification
├── customer_dashboard.html     # AI investment dashboard
├── rm_opportunity.html        # RM: Client discovery
├── rm_planning.html           # RM: Financial planning
├── rm_investment.html         # RM: Portfolio management
├── rm_performance.html        # RM: Team metrics
├── research_portal.html           # Economist: Macro research
└── resource/
    ├── IMG_1035.png        # HSBC logo (standard)
    └── IMG_1034.webp       # HSBC logo (white)
```

### Key URLs
- Customer login → Wealth page (default)
- Planning → Investment (via "View Investment Options" button)
- Investment → Customer (via Approve → redirect)

---

## 📚 Reference Documents

- **Technical Design**: [Real-time Market Sentiment Driven Portfolio Rebalancing Design](AI-Native-Usecase/00-Real-time-Market-Sentiment-Portfolio-Rebalancing.md)
- **Site Navigation**: [SITE_TOPOLOGY.md](SITE_TOPOLOGY.md)
- **Project Overview**: [README.md](../README.md)

---

**Version**: 3.0 (Movie Script Edition)  
**Last Updated**: 2024-11-28  
**Purpose**: Demo Guide + Movie Production Script  
**Contact**: Wealth Platform Team
