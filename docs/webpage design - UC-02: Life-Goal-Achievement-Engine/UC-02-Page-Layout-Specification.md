# UC-02: Life-Goal-Achievement-Engine 页面布局详细规范

## 页面架构总览

### 主要页面结构
1. **Landing Page** - 产品概览和价值主张
2. **Interactive Demo** - 核心激活过程演示
3. **Technical Deep Dive** - 技术架构和实现
4. **Relationship Resonance Engine** - 关系共鸣模拟器
5. **Success Stories** - 客户激活案例展示

---

## 1. Landing Page 设计规范

### Hero Section (首屏设计) - The Great Thaw (Relationship Edition) 视觉叙事

**核心理念转变**:
- From: Turning Dormant Data into Active Revenue (将沉睡数据转化为收入)
- To: Turning Silence into Dialogue (将沉默转化为对话)

**Two-Stage Visual Progression**:
```html
<div class="hero-section" id="heroSection">
  <!-- The Silence (Cold State) - 初始状态 -->
  <div class="global-globe" id="globalGlobe">
    <canvas id="globeCanvas" width="800" height="600"></canvas>
    <!-- 静止的灰白色点代表Freezed Customers -->
    <div class="customer-dots" id="customerDots">
      <div class="dot" data-region="hongkong" style="top: 40%; left: 70%">
        <span class="dot-count">280,000</span>
      </div>
      <div class="dot" data-region="singapore" style="top: 45%; left: 68%">
        <span class="dot-count">240,000</span>
      </div>
      <div class="dot" data-region="london" style="top: 25%; left: 25%">
        <span class="dot-count">320,000</span>
      </div>
      <div class="dot" data-region="middleeast" style="top: 35%; left: 45%">
        <span class="dot-count">160,000</span>
      </div>
    </div>
  </div>
  
  <!-- 主要内容 -->
  <div class="hero-content">
    <h1 class="hero-title">
      The Great Thaw
      <span class="subtitle">Turning Silence into Dialogue</span>
    </h1>
    
    <div class="hero-stats">
      <div class="stat-item" data-state="silence">
        <span class="stat-number" id="silentRelationships">1.2M</span>
        <span class="stat-label">Silent Relationships</span>
        <div class="state-indicator silence"></div>
      </div>
      <div class="stat-item" data-state="transition">
        <span class="stat-number" id="connectionRate">15%→85%</span>
        <span class="stat-label">Connection Progress</span>
        <div class="state-indicator transition"></div>
      </div>
      <div class="stat-item" data-state="dialogue">
        <span class="stat-number" id="trustScore">98/100</span>
        <span class="stat-label">Trust Score</span>
        <div class="state-indicator dialogue"></div>
      </div>
    </div>
    
    <div class="cta-buttons">
      <button class="btn-primary" onclick="igniteConnection()">Ignite Connection</button>
      <button class="btn-secondary" onclick="showResonanceSimulator()">Experience Resonance</button>
    </div>
  </div>
</div>
```

**CSS样式**:
```css
.hero-section {
  height: 100vh;
  position: relative;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  overflow: hidden;
  transition: background 3s ease-in-out;
}

/* The Silence State - 深邃的冰蓝色背景 */
.hero-section[data-state="silence"] {
  background: linear-gradient(135deg, #1a237e 0%, #0d47a1 50%, #1565c0 100%);
}

/* The Dialogue State - 温暖的HSBC红 */
.hero-section[data-state="dialogue"] {
  background: linear-gradient(135deg, #c41e3a 0%, #e91e63 50%, #ff5722 100%);
}

.customer-dots {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.dot {
  position: absolute;
  width: 20px;
  height: 20px;
  background: rgba(158, 158, 158, 0.6);
  border-radius: 50%;
  transition: all 2s ease;
}

.dot.activated {
  background: #ff1744;
  animation: heartbeat 1.5s infinite;
  box-shadow: 0 0 20px rgba(255, 23, 68, 0.6);
}

@keyframes heartbeat {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.hero-content {
  position: relative;
  z-index: 10;
  text-align: center;
  padding-top: 15vh;
  color: white;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.subtitle {
  display: block;
  font-size: 1.5rem;
  font-weight: 400;
  margin-top: 0.5rem;
  opacity: 0.9;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 4rem;
  margin: 3rem 0;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 3rem;
  font-weight: 700;
  color: #FFD700;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

.stat-label {
  font-size: 1rem;
  opacity: 0.8;
}

/* 状态指示器 */
.state-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin: 0.5rem auto;
}

.state-indicator.silence {
  background: #9e9e9e;
}

.state-indicator.transition {
  background: #ffc107;
  animation: pulse 2s infinite;
}

.state-indicator.dialogue {
  background: #4caf50;
}

@keyframes pulse {
  0% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
  100% { opacity: 0.6; transform: scale(1); }
}
```

### AI引擎状态展示

**实时状态监控**:
```html
<div class="ai-engines-status">
  <div class="engine-card" data-engine="lifeStage">
    <div class="engine-icon">🧠</div>
    <h3>Life-Stage Intelligence</h3>
    <div class="engine-status active">Active</div>
    <div class="processing-count">Processing 1,247 customers</div>
  </div>
  
  <div class="engine-card" data-engine="goalPlanning">
    <div class="engine-icon">🎯</div>
    <h3>Dynamic Goal Planning</h3>
    <div class="engine-status active">Active</div>
    <div class="processing-count">Planning 892 goals</div>
  </div>
  
  <div class="engine-card" data-engine="execution">
    <div class="engine-icon">⚡</div>
    <h3>Intelligent Execution</h3>
    <div class="engine-status active">Active</div>
    <div class="processing-count">Executing 156 strategies</div>
  </div>
</div>
```

### 客户分布可视化

**交互式世界地图**:
```javascript
// 客户分布数据
const customerData = {
  'Hong Kong': {
    count: 2800,
    activated: 420,
    regions: ['Central', 'Admiralty', 'Repulse Bay']
  },
  'Singapore': {
    count: 2400,
    activated: 360,
    regions: ['Marina Bay', 'Orchard', 'Sentosa']
  },
  'London': {
    count: 3200,
    activated: 480,
    regions: ['City', 'Canary Wharf', 'Knightsbridge']
  },
  'Dubai': {
    count: 1600,
    activated: 240,
    regions: ['DIFC', 'Downtown', 'Marina']
  }
};

// 地图渲染函数
function renderCustomerMap() {
  const svg = d3.select("#worldMap");
  const projection = d3.geoNaturalEarth1();
  
  // 绘制世界地图
  d3.json("world-110m.json").then(function(world) {
    svg.selectAll("path")
      .data(topojson.feature(world, world.objects.countries).features)
      .enter().append("path")
      .attr("d", d3.geoPath().projection(projection))
      .attr("class", "country");
      
    // 添加客户分布点
    addCustomerPoints();
  });
}
```

---

## 2. Interactive Demo 页面 - AI黑盒透明化 (The Glass-Box Demo)

### 双屏对照演示布局

**主界面结构**:
```html
<div class="glass-box-demo">
  <div class="demo-header">
    <h2>The Moment of Connection</h2>
    <p>See how understanding transforms silence into dialogue</p>
  </div>
  
  <!-- 四大代表人物选择 -->
  <div class="representative-selector">
    <div class="rep-card" data-persona="alexandra-wong">
      <img src="avatars/alexandra-wong.svg" alt="Alexandra Wong">
      <h3>Alexandra Wong</h3>
      <p>Hong Kong • 富三代 • 非侵入式服务</p>
      <span class="demo-focus">"我參與蘇比高拍卖時，AI推送藝術品融資而非理財產品"</span>
    </div>
    
    <div class="rep-card" data-persona="lim-wei-ming">
      <img src="avatars/lim-wei-ming.svg" alt="Lim Wei Ming">
      <h3>Lim Wei Ming</h3>
      <p>Singapore • 保守中产 • 政府政策整合</p>
      <span class="demo-focus">"AI自動計算CPF與子女教育的缺口"</span>
    </div>
    
    <div class="rep-card" data-persona="giuseppe">
      <img src="avatars/giuseppe.svg" alt="Giuseppe">
      <h3>Giuseppe</h3>
      <p>UK • 外派高管 • 跨文化连接</p>
      <span class="demo-focus">"AI用意大利式思维解釋英國的ISA賬戶"</span>
    </div>
    
    <div class="rep-card" data-persona="hassan">
      <img src="avatars/hassan.svg" alt="Hassan">
      <h3>Hassan</h3>
      <p>Middle East • 穆斯林 • 合规与尊重</p>
      <span class="demo-focus">"AI自動過濾非伊斯蘭合規產品"</span>
    </div>
  </div>
  
  <!-- 双屏对照演示 -->
  <div class="dual-screen-demo">
    <!-- 左侧屏幕：客户体验 -->
    <div class="screen client-view">
      <div class="screen-header">
        <h3>👤 客户体验视图 (Client View)</h3>
        <span class="screen-desc">极简设计，符合HSBC品牌调性</span>
      </div>
      
      <div class="phone-mockup">
        <div class="phone-screen">
          <div class="notification-preview" id="activationNotification">
            <!-- 激活通知内容 -->
          </div>
        </div>
      </div>
      
      <div class="ai-conversation">
        <div class="message ai-message">
          <div class="avatar">🤖</div>
          <div class="message-content">
            <p>注意到您对艺术收藏的兴趣，我们为您准备了艺术投资专题分析</p>
            <span class="message-time">刚刚</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 右侧屏幕：后台逻辑 -->
    <div class="screen engine-view">
      <div class="screen-header">
        <h3>🔧 AI引擎视图 (Engine View)</h3>
        <span class="screen-desc">《钢铁侠》HUD界面，展示AI思考过程</span>
      </div>
      
      <div class="hud-interface">
        <div class="hud-section">
          <h4>📍 Trigger Detection</h4>
          <div class="hud-log">
            <span class="log-entry active">Life Event: Art Auction</span>
            <span class="log-detail">Detected via Geolocation/Search</span>
            <span class="confidence">Confidence: 94%</span>
          </div>
        </div>
        
        <div class="hud-section">
          <h4>🌍 Culture Filter</h4>
          <div class="hud-log">
            <span class="log-entry active">Applying "High-Context" Protocol</span>
            <span class="log-detail">Tone: Professional but Exclusive</span>
            <span class="cultural-score">Cultural IQ: 96%</span>
          </div>
        </div>
        
        <div class="hud-section">
          <h4>🎯 Emotional Context Analysis</h4>
          <div class="hud-log">
            <span class="log-entry active">Emotional Context: Nostalgic</span>
            <span class="log-detail">Thinking about legacy</span>
            <span class="cultural-score">Cultural Value: Family Harmony</span>
          </div>
        </div>
        
        <div class="hud-section">
          <h4>🤝 Intervention Goal</h4>
          <div class="hud-log">
            <span class="log-entry active">Goal: Build Trust</span>
            <span class="log-detail">而非推销产品</span>
            <span class="success-probability">Approach: Offer Advisory</span>
          </div>
        </div>
        
        <div class="hud-section">
          <h4>⚡ Smart Tier Selection</h4>
          <div class="hud-log">
            <span class="log-entry active">Customer Tier: Premier (P1)</span>
            <span class="log-detail">Quota Available: 1,247,500 / 1,500,000</span>
            <span class="tier-cost">LLM Cost: $0.03/request</span>
          </div>
        </div>
        
        <div class="hud-section">
          <h4>🔄 Smart Downgrade Flow</h4>
          <div class="hud-log" id="downgradeFlow">
            <span class="log-entry">Current: Level 2 (Premier Pro)</span>
            <span class="log-entry" style="display: none;">Fallback: Level 4 (RAG Only)</span>
            <span class="downgrade-trigger" style="display: none;">Quota < 80% threshold</span>
          </div>
        </div>
        
        <div class="engines-status">
          <div class="engine" data-engine="lifeStage">
            <span class="engine-icon">🧠</span>
            <span class="engine-status">Active</span>
            <span class="engine-load">45%</span>
          </div>
          <div class="engine" data-engine="goalPlanning">
            <span class="engine-icon">🎯</span>
            <span class="engine-status">Processing</span>
            <span class="engine-load">67%</span>
          </div>
          <div class="engine" data-engine="execution">
            <span class="engine-icon">⚡</span>
            <span class="engine-status">Standby</span>
            <span class="engine-load">23%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- 实时数据流 -->
  <div class="data-stream">
    <div class="stream-label">实时数据处理</div>
    <div class="stream-flow">
      <div class="data-packet" data-type="trigger">Trigger Detected</div>
      <div class="data-packet" data-type="analysis">Cultural Analysis</div>
      <div class="data-packet" data-type="strategy">Strategy Generated</div>
      <div class="data-packet" data-type="execution">Message Sent</div>
    </div>
  </div>
</div>
```

**客户卡片设计**:
```html
<div class="persona-card" data-persona="alexandra-wong">
  <div class="persona-avatar">
    <img src="avatars/alexandra-wong.svg" alt="Alexandra Wong">
    <div class="activation-status-badge">Freezed</div>
  </div>
  
  <div class="persona-info">
    <h3 class="persona-name">Alexandra Wong</h3>
    <p class="persona-details">29岁 • 香港 • 家族企业董事</p>
    <div class="persona-stats">
      <div class="stat">
        <span class="stat-label">HSBC存款</span>
        <span class="stat-value">$120万</span>
      </div>
      <div class="stat">
        <span class="stat-label">总AUM</span>
        <span class="stat-value">$250万</span>
      </div>
    </div>
    <div class="persona-challenges">
      <span class="challenge-tag">时间成本高</span>
      <span class="challenge-tag">隐私顾虑</span>
    </div>
  </div>
  
  <button class="activate-btn" onclick="simulateActivation('alexandra-wong')">
    Experience Activation
  </button>
</div>
```

### 激活过程演示

**实时激活流程**:
```html
<div class="activation-demo" id="activationDemo" style="display: none;">
  <div class="demo-progress">
    <div class="progress-steps">
      <div class="step active" data-step="1">
        <div class="step-icon">🔍</div>
        <span>Life Event Detection</span>
      </div>
      <div class="step" data-step="2">
        <div class="step-icon">🤖</div>
        <span>AI Analysis</span>
      </div>
      <div class="step" data-step="3">
        <div class="step-icon">💬</div>
        <span>Cultural Adaptation</span>
      </div>
      <div class="step" data-step="4">
        <div class="step-icon">🎯</div>
        <span>Activation Message</span>
      </div>
      <div class="step" data-step="5">
        <div class="step-icon">✅</div>
        <span>Relationship Established</span>
      </div>
    </div>
  </div>
  
  <div class="demo-content">
    <div class="customer-view">
      <div class="phone-mockup">
        <div class="phone-screen">
          <div class="notification-preview" id="activationNotification">
            <!-- 激活通知内容 -->
          </div>
        </div>
      </div>
    </div>
    
    <div class="ai-engine-view">
      <div class="engine-log" id="engineLog">
        <!-- AI处理日志 -->
      </div>
    </div>
  </div>
</div>
```

**激活通知内容**:
```html
<div class="hsbc-notification">
  <div class="notification-header">
    <div class="hsbc-logo">🏦 HSBC</div>
    <div class="notification-time">刚刚</div>
  </div>
  
  <div class="notification-content">
    <h4>💡 Personalized Insight for You</h4>
    <p>注意到您对艺术收藏的兴趣，我们为您准备了艺术投资专题分析</p>
    
    <div class="value-proposition">
      <div class="value-item">
        <span class="value-icon">🎨</span>
        <span>艺术市场投资机会分析</span>
      </div>
      <div class="value-item">
        <span class="value-icon">📊</span>
        <span>艺术品作为资产配置的一部分建议</span>
      </div>
      <div class="value-item">
        <span class="value-icon">💼</span>
        <span>艺术收藏的投资建议和风险评估</span>
      </div>
    </div>
    
    <div class="notification-actions">
      <button class="btn-primary">查看详情</button>
      <button class="btn-secondary">稍后再说</button>
    </div>
  </div>
</div>
```

---

## 3. Relationship Resonance Engine 页面 - The "Resonance Simulator"

### 替代 ROI 计算器的新模块：关系共鸣模拟器

**设计意图**: 这是一个交互式演示，展示 AI 如何通过"理解"来打破隔阂，而不是通过"推销"来赚钱。

**模块名称**: Relationship Resonance Engine (关系共鸣引擎)

### 交互式共鸣滑块设计

**Empathy Level 滑块交互**:
```html
<div class="resonance-simulator">
  <div class="simulator-header">
    <h2>Relationship Resonance Engine</h2>
    <p>Experience how empathy transforms silence into dialogue</p>
  </div>
  
  <!-- Empathetic Resonance Slider -->
  <div class="empathy-slider-section">
    <div class="slider-header">
      <h3>Empathy Level</h3>
      <span class="slider-value" id="empathyValue">50</span>
    </div>
    <input type="range" id="empathySlider" min="0" max="100" value="50" step="1">
    <div class="slider-scale">
      <span class="scale-label">Standard Banking</span>
      <span class="scale-label">Personalized</span>
      <span class="scale-label">Deep Resonance</span>
    </div>
  </div>
  
  <!-- Dynamic Visualization -->
  <div class="resonance-visualization" id="resonanceViz">
    <!-- Level 0: Standard Banking -->
    <div class="resonance-level" data-level="0">
      <div class="customer-silhouette">
        <div class="ice-layer"></div>
        <div class="silhouette-graphic"></div>
      </div>
      <div class="banking-action">
        <span class="action-icon">📧</span>
        <span class="action-text">Generic Email: "Low Interest Rate Offer"</span>
      </div>
      <div class="customer-reaction">
        <span class="reaction-status">Ignored</span>
        <div class="ice-indicator"></div>
      </div>
    </div>
    
    <!-- Level 50: Personalized -->
    <div class="resonance-level active" data-level="50">
      <div class="customer-silhouette">
        <div class="ice-layer cracked"></div>
        <div class="silhouette-graphic clear" style="background-image: url('avatars/alexandra-wong.svg')"></div>
        <div class="customer-name">Alexandra Wong</div>
      </div>
      <div class="banking-action">
        <span class="action-icon">🎨</span>
        <span class="action-text">"Investment Report for Asian Market"</span>
      </div>
      <div class="customer-reaction">
        <span class="reaction-status">Noticed</span>
        <div class="connection-indicators">
          <div class="connection-line"></div>
        </div>
      </div>
    </div>
    
    <!-- Level 100: Deep Resonance -->
    <div class="resonance-level" data-level="100">
      <div class="customer-silhouette">
        <div class="ice-layer melted"></div>
        <div class="silhouette-graphic vibrant">
          <img src="avatars/alexandra-wong-fullcolor.svg" alt="Alexandra Wong">
        </div>
        <div class="warm-aura"></div>
      </div>
      <div class="banking-action">
        <span class="action-icon">🎭</span>
        <span class="action-text">"Art Financing & Legacy Planning"</span>
      </div>
      <div class="customer-reaction">
        <span class="reaction-status">Activated</span>
        <div class="bidirectional-flow">
          <div class="flow-indicator customer-to-bank"></div>
          <div class="flow-indicator bank-to-customer"></div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Trust Metrics -->
  <div class="trust-metrics" id="trustMetrics">
    <div class="metric">
      <span class="metric-label">Trust Score</span>
      <span class="metric-value" id="trustScore">15 → 98/100</span>
      <div class="metric-progress">
        <div class="progress-bar" style="width: 15%"></div>
      </div>
    </div>
    
    <div class="metric">
      <span class="metric-label">Response Time</span>
      <span class="metric-value" id="responseTime">3 Months → Instant</span>
    </div>
    
    <div class="metric">
      <span class="metric-label">Relationship Status</span>
      <span class="metric-value" id="relationshipStatus">Dormant → Trusted Advisor</span>
    </div>
  </div>
</div>
```

**实时计算逻辑**:
```javascript
function updateROI() {
  const activationRate = parseFloat(document.getElementById('activationRateSlider').value);
  const aumGrowth = parseFloat(document.getElementById('aumGrowthSlider').value);
  const churnReduction = parseFloat(document.getElementById('churnReductionSlider').value);
  
  // 基于滑块值计算ROI
  const baseRevenue = 1200; // $1.2B base
  const adjustment = (activationRate / 15) * (aumGrowth / 50) * (churnReduction / 10);
  const totalRevenue = baseRevenue * adjustment;
  const roi = ((totalRevenue - 20) / 20) * 100;
  const paybackMonths = Math.max(8, 24 - (adjustment - 1) * 8);
  
  // 更新UI
  document.getElementById('fiveYearROI').textContent = `${Math.round(roi)}%`;
  document.getElementById('paybackPeriod').textContent = `${Math.round(paybackMonths)} months`;
  document.getElementById('totalRevenue').textContent = `${(totalRevenue/1000).toFixed(1)}B`;
  
  // 更新趋势指示
  updateTrendIndicators(adjustment);
  
  // 动态更新柱状图
  updateRevenueBars(totalRevenue);
  
  // 确保最保守设置也显示正向ROI
  if (roi > 0) {
    showPositiveIndicator();
  }
}
```

### 收益预测可视化

**动态图表**:
```javascript
// ROI趋势图
function renderROIChart(data) {
  const margin = {top: 20, right: 30, bottom: 40, left: 50};
  const width = 800 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;
  
  const svg = d3.select("#roiChart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);
    
  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
    
  // 绘制投资线
  const investmentLine = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.investment));
    
  // 绘制收益线
  const revenueLine = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.revenue));
    
  g.append("path")
    .datum(data)
    .attr("class", "investment-line")
    .attr("d", investmentLine);
    
  g.append("path")
    .datum(data)
    .attr("class", "revenue-line")
    .attr("d", revenueLine);
}
```

---

## 4. 成功案例展示

### 客户激活前后对比

**案例展示卡片**:
```html
<div class="success-stories">
  <div class="case-study">
    <div class="case-header">
      <h3>Case Study: Christopher Liu</h3>
      <div class="case-metrics">
        <div class="metric">
          <span class="metric-label">激活前</span>
          <span class="metric-value">15% RM互动率</span>
        </div>
        <div class="metric">
          <span class="metric-label">激活后</span>
          <span class="metric-value">85% RM互动率</span>
        </div>
      </div>
    </div>
    
    <div class="case-timeline">
      <div class="timeline-point" data-time="Day 0">
        <div class="point-marker">🔍</div>
        <div class="point-content">
          <h4>Life Event Detected</h4>
          <p>搜索香港房价走势和房贷利率</p>
        </div>
      </div>
      
      <div class="timeline-point" data-time="Day 1">
        <div class="point-marker">💬</div>
        <div class="point-content">
          <h4>Personalized Message</h4>
          <p>AI推送香港房市分析报告</p>
        </div>
      </div>
      
      <div class="timeline-point" data-time="Week 2">
        <div class="point-marker">🤝</div>
        <div class="point-content">
          <h4>RM Connection</h4>
          <p>与RM建立定期联系</p>
        </div>
      </div>
      
      <div class="timeline-point" data-time="Month 6">
        <div class="point-marker">✅</div>
        <div class="point-content">
          <h4>Goal Achieved</h4>
          <p>成功购房，资产配置优化</p>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## 5. 分级配额与智能降级系统 (Smart Downgrade)

### 5.1 客户感知重构：从“限制”到“升级”

**核心原则**: 将硬性限制转化为AI能力感知的升级体验，确保Premium用户零感知限制。

**分层客户配额策略**:
```html
<div class="tiered-quota-system">
  <div class="customer-tier" data-tier="elite">
    <div class="tier-header">
      <span class="tier-icon">👑</span>
      <h3>Premier Elite</h3>
      <span class="tier-badge">无限制</span>
    </div>
    <div class="quota-info">
      <span class="quota-amount">500万 Token/月</span>
      <span class="quota-desc">覆盖99.99%使用场景</span>
    </div>
    <div class="downgrade-message" style="display: none;">
      <span class="message">正在启动备用专属计算池，请稍候。</span>
    </div>
  </div>
  
  <div class="customer-tier" data-tier="premier">
    <div class="tier-header">
      <span class="tier-icon">💎</span>
      <h3>Premier</h3>
      <span class="tier-badge">高配额</span>
    </div>
    <div class="quota-info">
      <span class="quota-amount">150万 Token/月</span>
      <span class="quota-desc">覆盖日常和复杂场景</span>
    </div>
    <div class="downgrade-message" style="display: none;">
      <span class="message">您的专属顾问配额已用完。如需继续深入分析，请升级至基础助手模式。</span>
    </div>
  </div>
  
  <div class="customer-tier" data-tier="basic">
    <div class="tier-header">
      <span class="tier-icon">💼</span>
      <h3>基础等级</h3>
      <span class="tier-badge">基础配额</span>
    </div>
    <div class="quota-info">
      <span class="quota-amount">50万 Token/月</span>
      <span class="quota-desc">主要用于信息查询</span>
    </div>
    <div class="downgrade-message" style="display: none;">
      <span class="message">本月咨询配额已用尽。您可等待下月重置，或升级到Premier等级获取无限咨询服务。</span>
    </div>
  </div>
</div>
```

### 5.2 LLM智能降级机制 (Smart Downgrade Flow)

**技术架构可视化**:
```html
<div class="llm-tier-architecture">
  <div class="tier-flow">
    <!-- Level 1: Elite AGI -->
    <div class="llm-tier" data-level="1">
      <div class="tier-header">
        <span class="tier-level">Level 1</span>
        <span class="tier-name">Elite AGI</span>
        <span class="target-customer">Premier Elite</span>
      </div>
      <div class="tier-specs">
        <span class="model">Gemini Ultra/GPT-4o</span>
        <span class="cost">最高成本/最高智能</span>
        <span class="pool">P0池：按需调用，零感知延迟</span>
      </div>
    </div>
    
    <!-- Level 2: Premier Pro -->
    <div class="llm-tier" data-level="2">
      <div class="tier-header">
        <span class="tier-level">Level 2</span>
        <span class="tier-name">Premier Pro</span>
        <span class="target-customer">Premier</span>
      </div>
      <div class="tier-specs">
        <span class="model">Gemini 3.5 Pro/GPT-4</span>
        <span class="cost">中等成本/高智能</span>
        <span class="pool">P1池：硬性Token配额，配额耗尽后降级</span>
      </div>
    </div>
    
    <!-- Level 3: Base Agent -->
    <div class="llm-tier" data-level="3">
      <div class="tier-header">
        <span class="tier-level">Level 3</span>
        <span class="tier-name">Base Agent</span>
        <span class="target-customer">基础等级</span>
      </div>
      <div class="tier-specs">
        <span class="model">Gemini Flash/GPT-3.5</span>
        <span class="cost">低成本/标准智能</span>
        <span class="pool">P2池：硬性Token配额，配额耗尽后停止服务</span>
      </div>
    </div>
    
    <!-- Level 4: Fallback -->
    <div class="llm-tier" data-level="4">
      <div class="tier-header">
        <span class="tier-level">Level 4</span>
        <span class="tier-name">Fallback</span>
        <span class="target-customer">所有配额耗尽用户</span>
      </div>
      <div class="tier-specs">
        <span class="model">RAG检索模型</span>
        <span class="cost">最低成本</span>
        <span class="pool">仅信息检索和FAQ，切断LLM对话能力</span>
      </div>
    </div>
  </div>
  
  <!-- 降级流程指示器 -->
  <div class="downgrade-indicators">
    <div class="indicator" data-direction="downgrade">
      <span class="arrow">⬇️</span>
      <span class="label">智能降级</span>
    </div>
  </div>
</div>
```

### 5.3 实时配额监控界面

**配额使用可视化**:
```html
<div class="quota-monitor">
  <div class="monitor-header">
    <h3>实时配额监控</h3>
    <span class="tier-display">当前等级: Premier 💎</span>
  </div>
  
  <div class="quota-usage">
    <div class="usage-bar">
      <div class="usage-fill" style="width: 65%"></div>
      <div class="usage-threshold warning" style="left: 80%"></div>
      <div class="usage-threshold critical" style="left: 95%"></div>
    </div>
    <div class="usage-labels">
      <span class="used">已用: 975,000 / 1,500,000</span>
      <span class="percentage">65%</span>
    </div>
  </div>
  
  <div class="tier-benefits">
    <div class="benefit active">
      <span class="icon">✨</span>
      <span class="desc">专属AI顾问服务</span>
    </div>
    <div class="benefit upcoming">
      <span class="icon">🔄</span>
      <span class="desc">配额耗尽后: 基础助手模式</span>
    </div>
  </div>
</div>
```

---

## 6. 技术实现细节

### 响应式设计

**断点设置**:
```css
/* 移动端 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-stats {
    flex-direction: column;
    gap: 2rem;
  }
  
  .persona-grid {
    grid-template-columns: 1fr;
  }
}

/* 平板端 */
@media (min-width: 769px) and (max-width: 1024px) {
  .persona-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 桌面端 */
@media (min-width: 1025px) {
  .persona-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### 性能优化

**懒加载实现**:
```javascript
// 客户卡片懒加载
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const card = entry.target;
      loadPersonaCard(card.dataset.persona);
      observer.unobserve(card);
    }
  });
});

// 图表按需渲染
function renderChart(chartId) {
  if (!chartData[chartId]) {
    loadChartData(chartId).then(data => {
      renderChartWithData(chartId, data);
    });
  }
}
```

### 动画效果

**交互动画**:
```css
/* 激活脉冲动画 */
@keyframes activationPulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.activation-pulse {
  animation: activationPulse 2s infinite;
}

/* 步骤切换动画 */
.step {
  transition: all 0.3s ease;
}

.step.active {
  transform: scale(1.05);
  background-color: #FFD700;
}

.step.completed {
  background-color: #4CAF50;
  color: white;
}
```

---

## 设计验收标准

### 功能性验收
- [ ] 所有交互元素响应正常
- [ ] 动画效果流畅（60fps）
- [ ] 数据可视化准确显示
- [ ] 跨浏览器兼容性测试

### 性能验收
- [ ] 首屏加载时间 < 3秒
- [ ] 交互响应时间 < 100ms
- [ ] 移动端适配完整
- [ ] 无内存泄漏

### 用户体验验收
- [ ] 导航清晰直观
- [ ] 信息层级合理
- [ ] 操作流程顺畅
- [ ] 视觉设计一致

## 结尾价值主张 (The Closing Statement)

由于去掉了理性的 ROI，我们需要用感性的 Brand Promise 来结尾。

### 感性价值主张文案

**核心Brand Promise**:
```html
<div class="brand-promise">
  <h2>The Life-Goal Achievement Engine</h2>
  <p class="promise-subtitle">Not just managing wealth. Honoring the person behind it.</p>
  
  <div class="emotional-statement">
    <h3>"In a world of automated transactions, understanding is the ultimate luxury."</h3>
    <p>在自动交易的世界里，<strong>“理解”</strong>才是终极的奢华。</p>
  </div>
  
  <div class="value-proposition">
    <div class="proposition-item">
      <span class="prop-icon">🤝</span>
      <span class="prop-text">从沉默到对话</span>
    </div>
    <div class="proposition-item">
      <span class="prop-icon">💝</span>
      <span class="prop-text">从数据到情感</span>
    </div>
    <div class="proposition-item">
      <span class="prop-icon">✨</span>
      <span class="prop-text">从交易到关系</span>
    </div>
  </div>
</div>
```

### 感性与理性平衡

这种修改完全剔除了功利性，将 AI 包装成一种**“高情商的伴侣”**而非“高效率的销售”。这更符合HSBC "Relationship Banking"的定义：

- **从收入导向转向关系导向**: 不再强调"$150B Revenue Potential"，而是展示"Trust Score: 98/100"
- **从功能展示转向情感共鸣**: 重点展示AI如何理解和关怀客户
- **从数字指标转向人性温度**: 强调"Building Trust"而非"Product Sales"

---

这套详细的页面布局规范确保了UC-02网页设计既能满足技术展示需求，又能提供优秀的用户体验，有效传达"Turning Silence into Dialogue"的核心理念和HSBC关系银行的品牌价值。