# Wealth 2026 - AI-Native Wealth Management Demo

## 🎯 Quick Start

```bash
cd /path/to/wealth-2026
python3 -m http.server 8000
# Open http://localhost:8000 in your browser
```

Click `index.html` to start the demo and choose your role:
- 📱 **Customer** - Mobile investment experience
- 💼 **Relationship Manager** - Client management platform
- 📊 **Chief Economist** - Macro research dashboard

## 📁 Project Structure

### Core Pages
- `index.html` - Role selection hub (entry point)
- `customer_portfolio.html` - Customer mobile app (3 screens: login, dashboard, wealth)
- `customer_lockscreen.html` - iPhone notification simulation
- `customer_dashboard.html` - AI investment dashboard

### RM Platform
- `rm_opportunity.html` - Client discovery with AI
- `rm_planning.html` - Financial planning (3 client profiles)
- `rm_investment.html` - Portfolio management center
- `rm_performance.html` - Team performance metrics

### Research
- `research_portal.html` - Chief Economist macro research portal

### Resources
- `resource/` - Images and assets
  - `IMG_1035.png` - HSBC logo (standard)
  - `IMG_1034.webp` - HSBC logo (white)

## 📚 Documentation

- **[Complete Demo Guide](docs/DEMO_COMPLETE_GUIDE.md)** - Full demo scenarios and scripts
- **[Site Topology](docs/SITE_TOPOLOGY.md)** - Complete website link structure and navigation
- **[Project Summary](docs/项目总结.md)** - Project overview (Chinese)
- **[Design Document](docs/Real-time%20Market%20Sentiment%20Driven%20Portfolio%20Rebalancing%20Design.md)** - Technical design

## 🎬 Demo Scenarios

### 1. Customer Journey (~3 min)
Lockscreen notification → AI dashboard → Execute rebalancing → View portfolio

### 2. RM Journey (~4 min)
Discover opportunities → Review client → Check investment options → View team performance

### 3. End-to-End Workflow (~5 min)
Investment officer approves → Customer receives notification → Customer executes → RM discovers similar opportunities

## 🔗 Key Navigation Flows

**Customer Flow:**
```
index.html → customer_portfolio.html (login → wealth page)
```

**RM Flow:**
```
index.html → rm_opportunity.html → rm_planning.html → rm_investment.html → rm_performance.html
```

**Cross-Role Flow:**
```
rm_investment.html (approve) → customer_lockscreen.html → customer_dashboard.html → customer_portfolio.html
```

## 💡 Key Features

- ✅ **AI-Native**: AI as foundation, not feature
- ✅ **Transparent**: Every AI decision is explainable
- ✅ **Collaborative**: Seamless workflow across roles
- ✅ **Mobile-First**: Customer experience optimized for mobile
- ✅ **Real-Time**: Instant notifications and updates

## 🛠️ Technical Stack

- **Frontend**: Pure HTML/CSS/JavaScript
- **Styling**: Tailwind CSS (CDN)
- **Icons**: Font Awesome 6
- **Fonts**: Open Sans (Google Fonts)
- **No Backend**: Static demo with localStorage

## 📊 Demo Metrics

- **Time Savings**: 30 seconds for rebalancing (vs. hours)
- **Risk Reduction**: 30% portfolio risk reduction
- **AI Confidence**: 92% with historical backtest
- **Client Coverage**: 12,000+ client records

## 🎯 Use Cases

1. **Product Demo** - Show AI-native wealth management
2. **Sales Presentation** - Demonstrate value to prospects
3. **Training** - Onboard new team members
4. **User Testing** - Gather feedback on UX

## 📝 Notes

- All pages are static HTML - no server required
- Edit any `.html` file and refresh browser to see changes
- Use Chrome/Safari/Firefox for best experience
- Mobile view optimized for iPhone dimensions

## 🚀 Next Steps

1. Review [Complete Demo Guide](docs/DEMO_COMPLETE_GUIDE.md) for detailed scenarios
2. Check [Site Topology](docs/SITE_TOPOLOGY.md) for navigation structure
3. Practice demo flows before presentation
4. Customize content for specific audiences

---

**Version**: 2.0  
**Last Updated**: 2024-11-28  
**Contact**: Wealth Platform Team
