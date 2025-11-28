# 实时市场情绪驱动的投资组合再平衡系统 - 实施任务清单

## 项目概述

基于设计文档，本系统需要在现有的三个角色视图中集成新功能：

- **客户端 (customer_portfolio.html)**: 接收AI调仓建议、一键确认执行
- **投资官端 (rm_investment.html)**: 审核AI建议、批量处理客户请求
- **关系经理端 (rm_opportunity.html/rm_planning.html)**: 监控客户组合风险、主动联系

## Phase 1: Infrastructure & Setup (脚手架与配置)

- [ ] **TASK-001** - 创建项目基础架构
  - **Context**: 新建 `/js/sentiment-engine.js` - 市场情绪分析模拟
    - 新建 `/js/rebalancing-engine.js` - 调仓建议生成逻辑
    - 新建 `/data/mock-data.json` - 模拟市场数据和客户组合
  - **Verification**: 文件创建完成，可在浏览器控制台导入无报错

- [ ] **TASK-002** - 配置共享样式和组件
  - **Context**: 在 `/css/hsbc.css` 中添加情绪预警卡片样式
    - 添加调仓建议卡片样式（包含风险指标、收益预测）
  - **Verification**: 样式类可在HTML中正常引用和渲染

## Phase 2: Database/Models (数据层)

- [ ] **TASK-003** - 创建模拟市场情绪数据
  - **Context**: 在 `/data/mock-data.json` 中定义市场事件数据结构
    - 包含：事件名称、情绪得分(-1到+1)、影响的资产类别、时间戳
    - 示例：SVB倒闭事件、美联储加息、地缘政治冲突
  - **Verification**: JSON格式正确，可被JavaScript读取

- [ ] **TASK-004** - 创建客户组合数据模型
  - **Context**: 在 `/data/mock-data.json` 中定义客户组合结构
    - 包含：客户ID、持仓列表（股票/债券/ETF）、风险等级、AUM
    - 至少创建3个典型客户画像（保守/平衡/激进）
  - **Verification**: 数据结构完整，覆盖设计文档中的Alex Chen案例

- [ ] **TASK-005** - 创建调仓建议数据结构
  - **Context**: 定义AI建议的JSON Schema
    - 包含：建议ID、触发事件、当前持仓、建议持仓、预期收益、风险降低比例、解释文本
  - **Verification**: 数据结构可支持前端渲染所有必需字段

## Phase 3: Backend Logic/API (业务逻辑)

- [ ] **TASK-006** - 实现市场情绪监控引擎
  - **Context**: 在 `/js/sentiment-engine.js` 中实现 `detectMarketAnomaly()` 函数
    - 模拟检测情绪得分突变（Δ > 0.5）
    - 返回触发预警的事件列表
  - **Verification**: 调用函数返回正确的预警事件，控制台输出日志

- [ ] **TASK-007** - 实现组合风险分析逻辑
  - **Context**: 在 `/js/rebalancing-engine.js` 中实现 `analyzePortfolioRisk(clientId, marketEvent)` 函数
    - 计算客户组合对特定市场事件的暴露度
    - 返回风险评分（0-100）
  - **Verification**: 输入客户ID和事件，返回合理的风险评分

- [ ] **TASK-008** - 实现调仓建议生成器
  - **Context**: 在 `/js/rebalancing-engine.js` 中实现 `generateRebalancingAdvice(clientId, riskScore)` 函数
    - 基于风险评分生成具体的买入/卖出建议
    - 包含自然语言解释（使用模板生成）
  - **Verification**: 生成的建议包含所有必需字段，解释文本清晰易懂

- [ ] **TASK-009** - 实现客户优先级排序算法
  - **Context**: 在 `/js/rebalancing-engine.js` 中实现 `prioritizeClients(clientList, marketEvent)` 函数
    - 按"潜在损失金额 × 客户价值"排序
    - 返回排序后的客户列表
  - **Verification**: 高风险高价值客户排在列表前列

## Phase 4: Frontend Components (UI 组件)

### 客户端 (customer_portfolio.html)

- [ ] **TASK-010** - 在客户端添加市场预警推送卡片
  - **Context**: 修改 `customer_portfolio.html` 的 `screen-dashboard` 和 `screen-wealth` 部分
    - 在现有蓝色预警卡片下方添加新的"市场情绪预警"卡片
    - 显示：事件名称、情绪指数、影响的持仓、建议操作按钮
  - **Verification**: 卡片在Dashboard和Wealth页面正确显示，样式一致

- [ ] **TASK-011** - 创建调仓建议详情模态框
  - **Context**: 在 `customer_portfolio.html` 中添加新的模态框组件
    - 显示：当前持仓 vs 建议持仓对比表、风险降低百分比、预期收益、AI解释
    - 包含三个按钮：【一键采纳】【查看详情】【忽略】
  - **Verification**: 点击预警卡片的"查看建议"按钮，模态框正确弹出并显示数据

- [ ] **TASK-012** - 实现一键确认调仓功能
  - **Context**: 在 `customer_portfolio.html` 的JavaScript中添加 `confirmRebalancing(adviceId)` 函数
    - 点击【一键采纳】后显示确认动画
    - 更新UI状态为"等待投资官审核"
  - **Verification**: 点击按钮后，状态正确更新，显示确认提示

- [ ] **TASK-013** - 集成调仓建议到AI Agent对话
  - **Context**: 修改 `customer_portfolio.html` 中的 `sendActionFromChip()` 函数
    - 添加新的快捷操作："查看最新调仓建议"、"解释为什么要调仓"
    - AI Agent返回自然语言解释
  - **Verification**: 在AI Agent中询问调仓建议，返回正确的解释文本

### 投资官端 (rm_investment.html)

- [ ] **TASK-014** - 添加待审核调仓建议队列
  - **Context**: 在 `rm_investment.html` 的主面板中添加新的"待审核调仓建议"卡片
    - 显示：客户姓名、建议摘要、风险等级、优先级标签
    - 按优先级排序（红色=紧急、黄色=重要、绿色=常规）
  - **Verification**: 队列正确显示，优先级标签颜色正确

- [ ] **TASK-015** - 创建调仓建议审核界面
  - **Context**: 点击队列中的某个建议，展开详情面板
    - 显示：客户组合详情、AI建议、历史回测数据、合规性检查结果
    - 包含按钮：【批准】【修改】【拒绝】
  - **Verification**: 点击建议后，详情面板正确展开，数据完整

- [ ] **TASK-016** - 实现批量审核功能
  - **Context**: 在队列顶部添加"批量操作"工具栏
    - 支持多选建议，一键批准/拒绝
    - 显示批量操作进度条
  - **Verification**: 选中多个建议，点击批量批准，状态正确更新

- [ ] **TASK-017** - 集成到AI Agent工作台
  - **Context**: 修改 `rm_investment.html` 的AI Agent对话
    - 添加快捷操作："显示今日高优先级客户"、"生成调仓建议摘要报告"
    - AI Agent返回结构化数据
  - **Verification**: AI Agent正确响应新的快捷操作

### 关系经理端 (rm_opportunity.html / rm_planning.html)

- [ ] **TASK-018** - 在rm_opportunity.html添加风险预警仪表盘
  - **Context**: 在 `rm_opportunity.html` 顶部添加"客户风险热力图"
    - 显示：当前市场情绪最激烈的板块、受影响的客户数量
    - 点击板块，展开受影响客户列表
  - **Verification**: 热力图正确显示，点击交互正常

- [ ] **TASK-019** - 在rm_planning.html集成调仓建议追踪
  - **Context**: 在 `rm_planning.html` 的客户财务规划页面中添加"最近调仓建议"时间线
    - 显示：建议时间、采纳状态、实际收益对比
    - 用于向客户展示AI建议的历史表现
  - **Verification**: 时间线正确显示历史建议，数据准确

- [ ] **TASK-020** - 添加主动联系客户提醒
  - **Context**: 在 `rm_opportunity.html` 中添加"待联系客户"列表
    - 显示：拒绝了AI建议的客户、需要人工解释的复杂情况
    - 包含一键拨号按钮（模拟）
  - **Verification**: 列表正确显示，点击拨号按钮触发模拟通话界面

## Phase 5: Integration (集成)

- [ ] **TASK-021** - 实现跨页面状态同步
  - **Context**: 使用 localStorage 模拟后端状态同步
    - 客户确认建议后，投资官端队列实时更新
    - 投资官批准后,客户端显示"已批准"状态
  - **Verification**: 在不同页面操作，状态正确同步

- [ ] **TASK-022** - 添加实时推送通知模拟
  - **Context**: 在 `customer_portfolio.html` 中添加浏览器通知API调用（需用户授权）
    - 模拟市场预警触发时推送通知
    - 通知内容：事件名称、风险等级、快捷操作链接
  - **Verification**: 触发预警时，浏览器显示通知（需用户授权）

- [ ] **TASK-023** - 创建端到端演示流程
  - **Context**: 在 `index.html` 中添加"演示模式"按钮
    - 点击后自动触发完整流程：市场事件 → AI分析 → 客户推送 → 投资官审核 → 执行
    - 使用定时器模拟各个步骤的延迟
  - **Verification**: 演示模式完整运行，所有页面状态正确更新

- [ ] **TASK-024** - 添加透明度中心页面
  - **Context**: 在 `customer_portfolio.html` 中添加新的 `screen-transparency` 页面
    - 显示：AI决策逻辑解释、历史回测数据、情绪指数趋势图
    - 使用Chart.js绘制可视化图表
  - **Verification**: 透明度中心页面正确显示，图表渲染正常

- [ ] **TASK-025** - 实现合规性审计日志
  - **Context**: 在所有关键操作中记录审计日志（存储在localStorage）
    - 包含：操作时间、操作人、操作类型、相关数据
    - 在 rm_investment.html 中添加"审计日志查看器"
  - **Verification**: 审计日志正确记录，查看器可显示完整历史

## Phase 6: Testing & Optimization (测试与优化)

- [ ] **TASK-026** - 创建测试场景数据集
  - **Context**: 在 `/data/test-scenarios.json` 中定义5个典型场景
    - 场景1：SVB倒闭事件（高风险科技股客户）
    - 场景2：美联储加息（高债券持仓客户）
    - 场景3：地缘政治冲突（能源股暴露客户）
    - 场景4：AI板块波动（科技ETF客户）
    - 场景5：黄金价格上涨（贵金属配置机会）
  - **Verification**: 每个场景可独立触发，系统响应正确

- [ ] **TASK-027** - 添加性能监控指标
  - **Context**: 在JavaScript中添加性能计时器
    - 测量：预警触发时间、建议生成时间、UI渲染时间
    - 在控制台输出性能报告
  - **Verification**: 所有关键操作的响应时间 < 2秒

- [ ] **TASK-028** - 优化移动端响应式布局
  - **Context**: 检查所有新增组件在移动端的显示效果
    - 调整调仓建议卡片、模态框的移动端样式
    - 确保按钮大小适合触摸操作
  - **Verification**: 在iPhone和Android模拟器中测试，布局正常

- [ ] **TASK-029** - 添加错误处理和降级策略
  - **Context**: 在所有API调用中添加try-catch
    - 当数据加载失败时，显示友好的错误提示
    - 提供"重试"按钮
  - **Verification**: 模拟数据加载失败，错误提示正确显示

- [ ] **TASK-030** - 创建用户引导教程
  - **Context**: 在首次访问时显示引导浮层（使用intro.js或自定义）
    - 引导步骤：1) 查看预警 2) 查看建议详情 3) 一键确认 4) 查看透明度中心
    - 添加"跳过教程"选项
  - **Verification**: 首次访问时教程正确显示，可正常跳过

## Phase 7: Documentation & Deployment (文档与部署)

- [ ] **TASK-031** - 更新README.md
  - **Context**: 在 README.md 中添加新功能说明
    - 包含：功能概述、演示流程、技术栈、文件结构
    - 添加截图和演示视频链接
  - **Verification**: README内容完整，格式正确

- [ ] **TASK-032** - 创建功能演示视频脚本
  - **Context**: 编写3分钟演示视频的脚本
    - 场景：SVB事件触发 → 客户收到预警 → 查看建议 → 一键确认 → 投资官审核 → 执行完成
    - 突出关键价值点：2小时响应、透明解释、人机协作
  - **Verification**: 脚本逻辑清晰，覆盖核心功能

- [ ] **TASK-033** - 配置Docker部署
  - **Context**: 更新 Dockerfile 以包含新的静态资源
    - 确保所有JavaScript和CSS文件正确打包
    - 测试Docker镜像构建和运行
  - **Verification**: Docker容器成功启动，应用正常访问

## 故事线入口映射

核心用户旅程在项目中的实现位置：

1. **客户发现市场预警 (customer_portfolio.html)**
   - 入口: Dashboard页面的蓝色预警卡片（已有）
   - 新增: 市场情绪预警卡片（TASK-010）
   - 按钮: "查看AI建议" → 打开调仓建议详情模态框（TASK-011）

2. **客户查看调仓建议 (customer_portfolio.html)**
   - 入口: 调仓建议详情模态框
   - 显示: 当前持仓 vs 建议持仓、风险指标、AI解释
   - 按钮: 【一键采纳】（TASK-012）、【查看详情】（跳转到透明度中心 TASK-024）、【忽略】

3. **客户通过AI Agent咨询 (customer_portfolio.html)**
   - 入口: Dashboard底部的"Ask AI Agent"按钮（已有）
   - 新增: 快捷操作芯片 - "查看最新调仓建议"（TASK-013）
   - 对话: AI Agent解释调仓原因、历史表现

4. **投资官审核建议 (rm_investment.html)**
   - 入口: 主面板的"待审核调仓建议队列"（TASK-014）
   - 点击: 展开建议详情面板（TASK-015）
   - 按钮: 【批准】【修改】【拒绝】、批量操作工具栏（TASK-016）

5. **关系经理监控客户风险 (rm_opportunity.html)**
   - 入口: 顶部的"客户风险热力图"（TASK-018）
   - 显示: 受影响客户列表、优先级排序
   - 按钮: "联系客户"（TASK-020）

6. **关系经理展示历史表现 (rm_planning.html)**
   - 入口: 客户财务规划页面的"调仓建议时间线"（TASK-019）
   - 显示: 历史建议、采纳率、实际收益对比

7. **演示完整流程 (index.html)**
   - 入口: 首页添加"演示模式"按钮（TASK-023）
   - 流程: 自动触发SVB事件 → 所有页面状态联动更新

## 优先级说明

- **P0 (Must-Have)**: TASK-001 ~ TASK-017, TASK-021, TASK-023
  - 核心功能，必须在MVP中完成

- **P1 (Should-Have)**: TASK-018 ~ TASK-020, TASK-024, TASK-026 ~ TASK-028
  - 增强用户体验，建议在Beta版本中完成

- **P2 (Nice-to-Have)**: TASK-022, TASK-025, TASK-029 ~ TASK-033
  - 锦上添花的功能，可在后续迭代中完成

## 技术栈

- **前端**: HTML5, TailwindCSS, Vanilla JavaScript
- **图表**: Chart.js (用于透明度中心的可视化)
- **数据存储**: localStorage (模拟后端状态)
- **通知**: Browser Notification API
- **部署**: Docker + Nginx

## 预计工时

- Phase 1-2: 4小时
- Phase 3: 8小时
- Phase 4: 16小时
- Phase 5: 12小时
- Phase 6: 8小时
- Phase 7: 4小时

**总计**: 约52小时（6-7个工作日）
