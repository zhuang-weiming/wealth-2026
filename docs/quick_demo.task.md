# Quick Demo Tasks (Total 8 tasks, approx 4-6 hours)

## Phase 1: 准备静态数据（内嵌在HTML中）

- [ ] **TASK-001** - 在customer.html中添加市场预警卡片
  - **Context**:
    - 修改 `customer.html` 的 `screen-wealth` 部分
    - 在现有蓝色预警卡片下方，复制一个新的红色预警卡片
    - 内容："⚠️ 市场预警：硅谷银行(SVB)倒闭，您的科技股持仓风险暴露65%"
    - 添加按钮：【查看AI调仓建议】
  - **Verification**: 打开customer.html → Wealth页面，看到红色预警卡片

- [ ] **TASK-002** - 创建调仓建议模态框
  - **Context**:
    - 在 `customer.html` 中复制现有的 `copilot-modal` 结构
    - 创建新的 `rebalancing-modal`（ID: `rebalancing-modal`）
    - 内容包含：
      - 标题："AI调仓建议 - SVB事件应对"
      - 当前持仓：QQQ $200K (65%) | TLT $50K (15%) | 现金 $50K (20%)
      - 建议持仓：QQQ $100K (35%) | TLT $150K (50%) | 现金 $50K (15%)
      - 预期效果：风险降低30% | 预计避免损失 $30K
      - AI解释："SVB倒闭引发科技股恐慌，建议减持科技ETF，增持美债避险"
      - 三个按钮：【一键采纳】【查看详情】【忽略】
  - **Verification**: 点击预警卡片的按钮，模态框弹出并显示完整内容

- [ ] **TASK-003** - 实现一键采纳功能
  - **Context**:
    - 在 `customer.html` 的 `<script>` 中添加函数：
      ```javascript
      function confirmRebalancing() {
        alert('✅ 已确认调仓建议！\n状态：等待投资官审核\n预计2小时内完成');
        localStorage.setItem('rebalancing_status', 'pending_approval');
        document.getElementById('rebalancing-modal').classList.remove('active');
      }
      ```
    - 【一键采纳】按钮绑定 `onclick="confirmRebalancing()"`
  - **Verification**: 点击【一键采纳】，弹出确认提示，模态框关闭

## Phase 2: 投资官审核界面

- [ ] **TASK-004** - 在investment.html添加待审核队列卡片
  - **Context**:
    - 在 `investment.html` 主面板中，现有的"Product Vetting Queue"卡片上方
    - 添加新卡片："AI调仓建议审核队列"
    - 内容：
      - 🔴 紧急 | Jennifer Wu | SVB事件调仓 | 风险暴露65% | AUM $300K
      - 🟡 重要 | Michael Chen | 美联储加息应对 | 风险暴露45% | AUM $500K
      - 🟢 常规 | Sarah Lee | 黄金配置机会 | 风险暴露20% | AUM $200K
      - 每行添加按钮：【查看详情】
  - **Verification**: 打开investment.html，看到新的审核队列卡片

- [ ] **TASK-005** - 创建建议详情展开面板
  - **Context**:
    - 在 `investment.html` 中添加隐藏的详情面板（ID: `advice-detail-panel`）
    - 点击【查看详情】时，使用JavaScript显示面板（`display: block`）
    - 面板内容：
      - 客户信息：Jennifer Wu | Premier客户 | AUM $300K
      - 触发事件：SVB倒闭，科技股暴跌60%
      - 当前持仓 vs 建议持仓（表格对比）
      - AI解释 + 历史回测数据（文字说明）
      - 合规检查：✅ 符合客户风险等级 | ✅ 无持仓限制冲突
      - 三个按钮：【批准】【修改】【拒绝】
  - **Verification**: 点击队列中的【查看详情】，详情面板展开

- [ ] **TASK-006** - 实现批准功能
  - **Context**:
    - 在 `investment.html` 的 `<script>` 中添加函数：
      ```javascript
      function approveRebalancing() {
        alert('✅ 已批准调仓建议！\n客户将收到执行通知\n交易将在2小时内完成');
        localStorage.setItem('rebalancing_status', 'approved');
        document.getElementById('advice-detail-panel').style.display = 'none';
      }
      ```
    - 【批准】按钮绑定 `onclick="approveRebalancing()"`
  - **Verification**: 点击【批准】，弹出确认提示，面板关闭

## Phase 3: 演示流程集成

- [ ] **TASK-007** - 在index.html添加演示模式按钮
  - **Context**:
    - 在 `index.html` 的标题下方添加醒目的演示按钮
    - 样式：大号红色按钮，带闪烁动画
    - 文字："🎬 观看完整演示：SVB事件应对流程（30秒）"
    - 按钮绑定 `onclick="startDemo()"`
  - **Verification**: 打开index.html，看到演示按钮

- [ ] **TASK-008** - 实现自动演示流程
  - **Context**:
    - 在 `index.html` 的 `<script>` 中添加函数：
      ```javascript
      function startDemo() {
        alert('📢 演示开始！\n\n场景：2023年3月10日，SVB银行倒闭\n\n接下来将自动展示：\n1. 客户收到预警（5秒后）\n2. 查看AI建议（10秒后）\n3. 投资官审核（15秒后）\n\n请保持当前窗口打开');
        setTimeout(() => {
          window.open('customer.html', '_blank');
          alert('👤 客户端：Jennifer Wu收到市场预警推送\n\n请在新窗口中：\n1. 点击"Wealth"标签\n2. 查看红色预警卡片\n3. 点击【查看AI调仓建议】');
        }, 5000);
        setTimeout(() => {
          alert('💡 提示：现在请点击【一键采纳】确认建议');
        }, 15000);
        setTimeout(() => {
          window.open('investment.html', '_blank');
          alert('👨‍💼 投资官端：收到Jennifer的调仓请求\n\n请在新窗口中：\n1. 查看"AI调仓建议审核队列"\n2. 点击第一行的【查看详情】\n3. 点击【批准】');
        }, 25000);
      }
      ```
  - **Verification**: 点击演示按钮，按提示完成完整流程

## 🎨 样式优化（可选，30分钟）

- [ ] **TASK-009** - 添加动画效果（可选）
  - **Context**:
    - 在 `customer.html` 和 `investment.html` 的 `<style>` 中添加：
      ```css
      @keyframes urgent-pulse {
        0%, 100% { border-color: #dc2626; }
        50% { border-color: #f87171; }
      }
      .urgent-card {
        animation: urgent-pulse 2s infinite;
      }
      ```
    - 给红色预警卡片添加 `class="urgent-card"`
  - **Verification**: 预警卡片边框闪烁

## 📊 故事线映射（Quick Demo版本）

**完整演示流程（30秒）**

```
[index.html]
    ↓ 点击"观看完整演示"按钮

[customer.html - Wealth页面]
    ↓ 看到红色预警："SVB倒闭，科技股风险暴露65%"
    ↓ 点击【查看AI调仓建议】
    ↓ 模态框显示：当前持仓 vs 建议持仓
    ↓ 点击【一键采纳】
    ↓ 提示："等待投资官审核"

[investment.html - 审核队列]
    ↓ 看到"Jennifer Wu - SVB事件调仓"（红色紧急标签）
    ↓ 点击【查看详情】
    ↓ 详情面板展开：客户信息 + AI建议 + 合规检查
    ↓ 点击【批准】
    ↓ 提示："已批准，交易将在2小时内完成"

[演示结束]
```

## ✅ 验收标准

**客户端体验：**

✅ 能看到醒目的市场预警

✅ 能理解AI建议的内容（当前 vs 建议）

✅ 能一键确认，操作简单

**投资官体验：**

✅ 能看到优先级排序的审核队列

✅ 能查看完整的建议详情

✅ 能快速批准/拒绝

**演示流程：**

✅ 30秒内完成完整故事线

✅ 逻辑清晰，无需额外解释

✅ 视觉效果突出关键信息

## 🚀 实施优先级

**必做（P0）- 核心演示**

- TASK-001, 002, 003（客户端）
- TASK-004, 005, 006（投资官端）
- TASK-007, 008（演示流程）

**可选（P1）- 锦上添花**

- TASK-009（动画效果）

## ⏱️ 预计工时

- TASK-001~003: 1.5小时（客户端）
- TASK-004~006: 1.5小时（投资官端）
- TASK-007~008: 1小时（演示流程）
- TASK-009: 0.5小时（可选动画）

**总计**: 4-5小时（半个工作日）

## 💡 Quick Demo 设计原则

- **零后端依赖**：所有数据硬编码在HTML中
- **零外部文件**：不需要单独的JS/CSS/JSON文件
- **零学习成本**：观众30秒内理解完整流程
- **最大视觉冲击**：红色预警 + 对比表格 + 明确按钮
- **可独立演示**：每个页面都能单独展示功能
