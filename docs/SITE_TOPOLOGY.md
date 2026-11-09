# Wealth 2026 - Website Link Topology

## 📊 Complete Site Map

```
index.html (Entry Point)
│
├─→ Customer Journey (Mobile)
│   │
│   ├─→ customer_lockscreen.html
│   │   └─→ Click notification → customer_dashboard.html
│   │
│   ├─→ customer_dashboard.html
│   │   ├─→ Execute Rebalancing → customer_portfolio.html
│   │   ├─→ Bottom nav → customer_portfolio.html
│   │   └─→ [AI Features] button → ai_features_hub.html
│   │       ├─→ AI Product Q&A
│   │       ├─→ Portfolio Health Check
│   │       ├─→ AI Academy
│   │       └─→ Trending Assets
│   │
│   └─→ customer_portfolio.html
│       ├─→ Login → screen-wealth (default)
│       ├─→ Bottom nav: Home → screen-dashboard
│       ├─→ Bottom nav: Wealth → screen-wealth
│       └─→ Back to Roles → index.html
│
├─→ RM Journey (Desktop)
│   │
│   ├─→ rm_opportunity.html
│   │   ├─→ Top nav: Opportunity (current)
│   │   ├─→ Top nav: Planning → rm_planning.html
│   │   ├─→ Top nav: Investment → rm_investment.html
│   │   ├─→ Top nav: Performance → rm_performance.html
│   │   ├─→ Top nav: Home → index.html
│   │   ├─→ [AI Tools] menu → ai_features_hub.html
│   │   │   ├─→ Smart Money Flow
│   │   │   └─→ Gold Forecast
│   │   ├─→ Client card: Robert → rm_planning.html?client=robert
│   │   ├─→ Client card: Alice → rm_planning.html?client=alice
│   │   └─→ Client card: Sarah → rm_planning.html?client=sarah
│   │
│   ├─→ rm_planning.html
│   │   ├─→ Top nav: Opportunity → rm_opportunity.html
│   │   ├─→ Top nav: Planning (current)
│   │   ├─→ Top nav: Investment → rm_investment.html
│   │   ├─→ Top nav: Performance → rm_performance.html
│   │   ├─→ Top nav: Home → index.html
│   │   ├─→ AI Alert: "View Investment Options" → rm_investment.html
│   │   └─→ URL params: ?client=robert|sarah|alice
│   │
│   ├─→ rm_investment.html
│   │   ├─→ Top nav: Opportunity → rm_opportunity.html
│   │   ├─→ Top nav: Planning → rm_planning.html
│   │   ├─→ Top nav: Investment (current)
│   │   ├─→ Top nav: Performance → rm_performance.html
│   │   ├─→ Top nav: Home → index.html
│   │   └─→ Approve button → customer_lockscreen.html (cross-role)
│   │
│   └─→ rm_performance.html
│       ├─→ Top nav: Opportunity → rm_opportunity.html
│       ├─→ Top nav: Planning → rm_planning.html
│       ├─→ Top nav: Investment → rm_investment.html
│       ├─→ Top nav: Performance (current)
│       └─→ Top nav: Home → index.html
│
└─→ Economist Journey (Desktop)
    │
    └─→ research_portal.html
        ├─→ Top nav: Home → index.html
        ├─→ [AI Research] section → ai_features_hub.html
        │   ├─→ Gold Forecast
        │   └─→ Smart Money Flow
        └─→ Research reports (static content)
```

---

## 🔗 Link Matrix

### From index.html

| Link Text | Target | Role |
|-----------|--------|------|
| "Customer Mobile App" | customer_portfolio.html | Customer |
| "Relationship Manager" | rm_opportunity.html | RM |
| "Chief Economist" | research_portal.html | Economist |

### From customer_portfolio.html

| Element | Target | Notes |
|---------|--------|-------|
| Login button | screen-wealth | Default landing (changed from screen-dashboard) |
| Bottom nav: Home | screen-dashboard | Banking view |
| Bottom nav: Wealth | screen-wealth | Investment view |
| "Back to Roles" link | index.html | Top of page |

### From customer_lockscreen.html

| Element | Target | Notes |
|---------|--------|-------|
| Notification click | customer_dashboard.html | AI investment dashboard |
| "← Roles" link | index.html | Top left |

### From customer_dashboard.html

| Element | Target | Notes |
|---------|--------|-------|
| "Execute Rebalancing" | customer_portfolio.html | After confirmation |
| Bottom nav: Home | customer_portfolio.html | Portfolio view |
| "AI Features" button | ai_features_hub.html | AI tools access |
| "← Roles" link | index.html | Top left |

### From RM Platform (opportunity, planning, investment, performance)

| Nav Item | Target | Available On |
|----------|--------|--------------|
| Opportunity | rm_opportunity.html | All RM pages |
| Planning | rm_planning.html | All RM pages |
| Investment | rm_investment.html | All RM pages |
| Performance | rm_performance.html | All RM pages |
| Home | index.html | All RM pages |

### From rm_planning.html

| Element | Target | Notes |
|---------|--------|-------|
| URL param: ?client=robert | Robert Chen profile | Default |
| URL param: ?client=sarah | Sarah Jenkins profile | New client |
| URL param: ?client=alice | Alice Num profile | Young professional |
| "View Investment Options" | rm_investment.html | In AI Alert card |

### From rm_investment.html

| Element | Target | Notes |
|---------|--------|-------|
| Approve button | customer_lockscreen.html | Cross-role workflow |
| View Details | Expands panel | Same page |

### From research_portal.html

| Element | Target | Notes |
|---------|--------|-------|
| "AI Research" section | ai_features_hub.html | AI research tools |
| Home icon | index.html | Top right |

### From ai_features_hub.html

| Element | Target | Notes |
|---------|--------|-------|
| "← Back" button | Previous page | Dynamic return |
| Feature cards | Modal/panel | Same page interaction |

---

## 🎯 User Journeys

### Journey 1: Customer Receives Notification
```
customer_lockscreen.html
  → Click notification
  → customer_dashboard.html
  → Execute Rebalancing
  → customer_portfolio.html (screen-wealth)
```

### Journey 2: RM Discovers Opportunity
```
rm_opportunity.html
  → Click "Robert Chen"
  → rm_planning.html?client=robert
  → Click "View Investment Options"
  → rm_investment.html
```

### Journey 3: Investment Officer Approves
```
rm_investment.html
  → Click "View Details" on Jennifer Wu
  → Click "Approve"
  → Redirect to customer_lockscreen.html
  → (Demonstrates cross-role workflow)
```

### Journey 4: RM Platform Navigation
```
rm_opportunity.html
  → Top nav: Planning
  → rm_planning.html
  → Top nav: Investment
  → rm_investment.html
  → Top nav: Performance
  → rm_performance.html
  → Top nav: Home
  → index.html
```

---

## 🔄 Cross-Role Workflows

### Workflow 1: Investment Officer → Customer
```
rm_investment.html (Approve)
  → customer_lockscreen.html (Notification)
  → customer_dashboard.html (Review)
  → customer_portfolio.html (Execute)
```

### Workflow 2: RM → Investment Management
```
rm_planning.html (Discover issue)
  → Click "View Investment Options"
  → rm_investment.html (Review recommendations)
```

### Workflow 3: Complete Loop
```
rm_investment.html (Officer approves)
  → customer_lockscreen.html (Customer notified)
  → customer_dashboard.html (Customer reviews)
  → customer_portfolio.html (Customer executes)
  → rm_opportunity.html (RM discovers similar cases)
  → rm_planning.html (RM reviews client)
  → rm_investment.html (New recommendations)
```

---

## 📱 Screen States

### customer_portfolio.html Screens

| Screen ID | Purpose | Default |
|-----------|---------|---------|
| screen-login | Login form | Initial |
| screen-wealth | Investment portfolio | ✅ After login |
| screen-dashboard | Banking dashboard | Via bottom nav |

**Navigation:**
- Login → screen-wealth (default)
- Bottom nav: Home → screen-dashboard
- Bottom nav: Wealth → screen-wealth

### rm_planning.html Client Profiles

| URL Parameter | Client | Profile |
|---------------|--------|---------|
| ?client=robert | Robert Chen | Business owner, cash drag risk |
| ?client=sarah | Sarah Jenkins | New client, discovery phase |
| ?client=alice | Alice Num | Young professional, first home |

---

## 🎨 Navigation Patterns

### Pattern 1: RM Platform Unified Nav
All RM pages share the same navigation bar:
```
Opportunity | Planning | Investment | Performance | Home
```
- Current page highlighted in red
- Consistent across all RM pages
- Icons visible on mobile

### Pattern 2: Customer Mobile Bottom Nav
```
Home | Wealth | Cards | Profile
```
- Fixed at bottom
- Current tab highlighted in green
- Icons with labels

### Pattern 3: Back to Roles Link
```
← Back to Roles (top of page)
```
- Available on all pages
- Returns to index.html
- Consistent positioning

---

## 🔍 Special Links

### Dynamic Links

| Source | Target | Condition |
|--------|--------|-----------|
| rm_investment.html | customer_lockscreen.html | After approve + confirm |
| customer_dashboard.html | customer_portfolio.html | After execute + confirm |

### Parameterized Links

| Link | Parameters | Example |
|------|------------|---------|
| rm_planning.html | ?client={id} | rm_planning.html?client=robert |

### Modal/Panel Triggers

| Page | Element | Action |
|------|---------|--------|
| customer_portfolio.html | "View AI Rebalancing Advice" | Opens rebalancing-modal |
| rm_investment.html | "View Details" | Expands advice-detail-panel |

---

## 📊 Link Statistics

### Total Pages: 10
- index.html (hub)
- customer_portfolio.html (3 screens)
- customer_lockscreen.html
- customer_dashboard.html
- rm_opportunity.html
- rm_planning.html (3 profiles)
- rm_investment.html
- rm_performance.html
- research_portal.html
- ai_features_hub.html (AI tools)

### Total Unique Links: ~30
- Navigation links: 20
- Action buttons: 6
- Back links: 4

### Cross-Role Links: 2
- rm_investment.html → customer_lockscreen.html
- rm_planning.html → rm_investment.html

---

## 🎯 Navigation Best Practices

### For Demos:
1. **Start at index.html** - Always begin with role selection
2. **Follow user journeys** - Use predefined paths for clarity
3. **Show cross-role** - Demonstrate rm_investment.html → customer_lockscreen.html workflow
4. **Use back links** - Return to index.html between role switches

### For Development:
1. **Consistent nav** - RM pages share unified navigation
2. **Clear hierarchy** - index.html is always the hub
3. **Logical flow** - Links follow user mental models
4. **Escape routes** - Every page can return to index.html

---

**Version**: 1.0  
**Last Updated**: 2024-11-28  
**Maintained By**: Wealth Platform Team
