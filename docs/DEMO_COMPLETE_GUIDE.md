# Wealth 2026 - Complete Demo Guide

## 🎯 Quick Start

**Entry Point**: Open `index.html` in your browser

Choose one of three role-based demos:
- 📱 **Customer** → Click "Customer Mobile App"
- 💼 **Relationship Manager** → Click "Relationship Manager"  
- 📊 **Chief Economist** → Click "Chief Economist"

---

## 📱 Demo Scenario 1: Customer Journey (Mobile)

**Duration**: ~3 minutes  
**Persona**: Jennifer Wu (Premier Customer)

### Flow:
1. **Start**: `index.html` → Click "Customer Mobile App"
2. **Lockscreen** (`customer_lockscreen.html`) → Click notification
3. **AI Dashboard** (`customer_dashboard.html`) → Review AI recommendation → Execute rebalancing
4. **Portfolio** (`customer_portfolio.html`) → View updated holdings

### Demo Script:
> "Jennifer receives a push notification about market volatility. The AI has analyzed her portfolio and recommends rebalancing. She reviews the transparent analysis showing 92% confidence and historical 78% win rate. She can choose defensive, balanced, or aggressive strategies. With one tap, she executes the rebalancing in under 30 seconds."

---

## 💼 Demo Scenario 2: Relationship Manager Journey

**Duration**: ~4 minutes  
**Persona**: Allen Johnson (Senior RM)

### Flow:
1. **Start**: `index.html` → Click "Relationship Manager"
2. **Opportunity** (`rm_opportunity.html`) → AI suggests clients with opportunities
3. **Planning** (`rm_planning.html?client=robert`) → View client details and AI alerts
4. **Investment** (`rm_investment.html`) → Review portfolio recommendations
5. **Performance** (`rm_performance.html`) → Check team metrics

### Demo Script:
> "Allen starts his day with the AI-powered opportunity radar. The system identifies Robert Chen holding 60% cash, risking a $2M retirement shortfall. The AI provides actionable recommendations. Allen can also see his team's performance - the Pacific Northwest region needs ESG training, and the AI has already generated a coaching plan."

---

## 📊 Demo Scenario 3: Chief Economist Journey

**Duration**: ~2 minutes  
**Persona**: Dr. Jonathan Miller (Chief Economist)

### Flow:
1. **Start**: `index.html` → Click "Chief Economist"
2. **Research** (`research_portal.html`) → View macro research dashboard
3. Review Fed policy, market sentiment, and research reports

### Demo Script:
> "Dr. Miller monitors global economic indicators. The AI tracks Federal Reserve policy, predicts rate changes, and analyzes market sentiment. Recent research shows clean energy sector outperformance, which feeds into investment recommendations across the platform."

---

## 🔄 Demo Scenario 4: End-to-End Workflow (Recommended)

**Duration**: ~5 minutes  
**Combines all three roles**

### Flow:
1. **Investment Officer** (`rm_investment.html`) → Approve Jennifer's rebalancing
2. **Customer** (`customer_lockscreen.html`) → Receive notification
3. **Customer** (`customer_dashboard.html`) → Execute rebalancing
4. **Customer** (`customer_portfolio.html`) → View updated portfolio
5. **RM** (`rm_opportunity.html`) → Discover similar opportunities

### Demo Script:
> "This is the complete AI-native workflow. The Investment Officer approves an AI-generated recommendation. Jennifer immediately receives a notification, reviews the transparent analysis, and executes with one tap. Meanwhile, the RM can proactively discover similar opportunities across their client base. This is wealth management reimagined - AI-driven, transparent, and seamlessly collaborative."

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

## 🎬 Video Demo Production Guide

### Recording Setup

**Local Server:**
```bash
cd /path/to/wealth-2026
python3 -m http.server 8000
```

**Screen Recording:**
- Use Cmd+Shift+5 (macOS)
- Resolution: 1920x1080
- Record 10-15 seconds per page

### Video Structure (50 seconds total)

| Section | Duration | Content |
|---------|----------|---------|
| Title | 3s | "Wealth 2026 - AI-Native Wealth Management" |
| Scene 1 | 15s | Investment dashboard with RM interaction |
| Scene 2 | 15s | Rebalancing advice details |
| Scene 3 | 15s | Customer receives and executes |
| Outro | 2s | Fade to black |

### Final Cut Pro Tips

**Project Settings:**
- Resolution: 1080p HD (1920x1080)
- Frame rate: 30fps
- Audio: Stereo

**Key Animations:**
- Avatar slide-in: 2 seconds
- Dialog fade-in: 1 second
- Click effect: 0.5 seconds
- Scene transitions: 1 second cross-dissolve

**Export Settings:**
- Format: H.264
- Quality: High
- Target size: 5-20MB

---

## 🐛 Troubleshooting

**Issue**: Page doesn't load properly
- **Solution**: Run local server: `python3 -m http.server 8000`

**Issue**: Navigation doesn't work
- **Solution**: Check all files are in same directory

**Issue**: Styles look broken
- **Solution**: Check internet connection (Tailwind CSS from CDN)

---

## 🎯 Call to Action

After the demo, emphasize:

1. **AI-Native**: AI as foundation, not feature
2. **Transparent**: Every decision is explainable
3. **Collaborative**: Seamless workflow across roles
4. **Actionable**: From insight to action in seconds

**Next Steps**: 
- Discuss integration with existing systems
- Explore customization for client segments
- Plan pilot program

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

**Version**: 2.0  
**Last Updated**: 2024-11-28  
**Contact**: Wealth Platform Team
