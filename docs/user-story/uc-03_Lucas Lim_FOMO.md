这是一个非常符合 **HSBC Global Wealth Banking** 调性的升级版 User Story。

作为一家拥有全球视野的沉稳大行，HSBC 的服务核心在于 **"Empowerment through Choice" (通过选择赋能)**。面对激进客户，我们不应该只提供“唯一解”，而应该像一位资深的投资顾问 (IC)，摆出**上、中、下三策**，清晰阐述每种方案的**风险收益比 (Risk/Reward Trade-off)**，最终由客户根据自己的心态掌控决策权。

-----

# User Story 3: Lucas 的“趋势问诊” (The Strategic Choice)

## 1\. 人物设定 (Persona Profile)

  * **姓名**: Lucas Lim (32岁, Tech Senior PM)
  * **客户等级**: HSBC Premier Elite / Jade (尚玉)
  * **投资心态**:
      * **Aggressive (激进)**: 相信科技改变世界，愿意承担波动。
      * **Impatient (缺乏耐心)**: 讨厌复杂的流程，喜欢 App 上一键操作的快感。
      * **Sophisticated (成熟)**: 虽然冲动，但听得懂金融术语 (RSI, Volatility, Options)。
  * **场景**: 看到半导体 ETF (`AI-X`) 盘前暴涨 5%，手握 SGD 50,000 闲置资金。他打开 App，不仅想买，还想知道“怎么买最划算”。

## 2\. 核心冲突 (The Market Conflict)

  * **客户视角**: "我觉得它还会涨，我想现在就进场。但我也不想做‘韭菜’接在最高点。"
  * **银行视角**:
      * **认可**: 长期看好该板块 (Long-term Bullish)。
      * **担忧**: 短期指标过热 (Short-term Overheated)。
      * **职责**: 既然客户意已决，银行不应阻拦，但必须提供**不同风险维度的进入路径**，防止客户只有“市价梭哈”一种选择。

## 3\. AI-Agent ("Wealth Compass") 的定位 & 推荐逻辑

**定位**: **"The Portfolio Architect" (投资组合架构师)**。
AI 的作用是\*\*"Unpack the Options" (拆解选项)\*\* —— 将一个简单的“买入”指令，拆解为三种不同成熟度的策略。

### 推荐逻辑：提供“激进、稳健、保守”三套方案

1.  **Option A: Direct Market Access (直接进场)**

      * *逻辑*: 满足 FOMO，立刻成交。
      * *风险*: 成本最高，承担全部波动。
      * *银行态度*: "这是你的权利，但风险自负。"

2.  **Option B: Smart Accumulator (智能分批 - 推荐)**

      * *逻辑*: 30% 现价 + 70% 逢低限价。
      * *优势*: 平滑成本，攻守兼备。
      * *银行态度*: "这是性价比最高的策略。"

3.  **Option C: Capital Protection Note (保本结构 - 尊享)**

      * *逻辑*: 鲨鱼鳍 (Shark Fin) 结构。看涨期权 + 零息债券。
      * *优势*: 100% 本金保护，享受部分上涨红利。
      * *银行态度*: "这是私人银行级别的避险方案。"

## 4\. 用户旅程 (User Journey Map)

| 阶段 | 场景 / 触点 | 客户心理 / 行为 | AI-Agent (HSBC 风格) 动作 |
| :--- | :--- | :--- | :--- |
| **1. 主动询问** | Lucas 输入: "AI-X is rallying. I have 50k SGD. How should I play this?" | 开放式提问。他不确定是该梭哈还是该等。 | **NLP 识别**: 意图是“寻求建议”而非简单的“下单”。调用 House View + Technicals。 |
| **2. 市场诊断** | AI 展示 **Market Diagnostic**: "HSBC View: Overweight ✅. / RSI: 82 (Overbought) ⚠️." | 看到红色的 RSI 警示，意识到直接追高有风险。 | **客观陈述**: "Sector is strong, but entry price is extended." (板块强，但价格贵)。 |
| **3. 方案呈现 (核心)** | AI: "Lucas, given the volatility, here are **3 ways** to enter this trade." (展示三张卡片) | 感到惊喜。原来“买股票”还有这么多花样。 | **展示三策**: <br>1. **Aggressive**: Market Buy (全部市价)<br>2. **Balanced**: Smart Entry (分批)<br>3. **Defensive**: Protected Note (保本) |
| **4. 权衡选择** | Lucas 查看对比。Option A 风险太大；Option C 锁定期太长。他倾向于 **Option B**。 | 掌控感。这是他自己选的，不是银行强加的。 | 提供交互式滑块，让客户微调 Option B 的挂单价格 (-5% 或 -8%)。 |
| **5. 确认执行** | Lucas 点击 "Execute Option B"。 | 满意。感觉自己既抓住了机会，又控制了风险。 | **Digital Handshake**: 弹出交易综述与风险披露，生物识别确认。 |
| **6. 闭环反馈** | 交易完成。 | 安心。 | 生成 **"Strategy Memo"**，记录这次决策的逻辑，便于日后复盘。 |

## 5\. 对话示例 (交互式选择)

**Lucas**: "Hey, `AI-X` is flying\! I want to deploy SGD 50k. What's the best move?"

**AI-Agent**: **"Great sector choice, Lucas."**
Our CIO Office maintains an **'Overweight'** view on AI. However, with RSI at **82**, short-term volatility is highly likely.

Instead of just buying at the peak, I've prepared **3 Strategies** for you to consider. Which one fits your mood?

-----

**(UI 展示三个可点击的选项卡)**

  * **Option 1: The Sprinter (Direct Buy)** 🏃‍♂️

      * **Action**: Buy SGD 50k at Market Price ($142.50).
      * **Pro**: 100% invested immediately. Max profit if it never dips.
      * **Con**: Maximum risk. If it drops 10% tomorrow, you lose SGD 5k immediately.
      * *AI Note: "High Risk / High FOMO."*

  * **Option 2: The Strategist (Smart Accumulator)** 🧠 **(Recommended)**

      * **Action**: Buy 30% Now ($142.50) + Limit Buy 70% at Dips ($135 / $131).
      * **Pro**: You catch the rally, but lower your average cost if it corrects.
      * **Con**: If it goes straight up, you only have 30% invested.
      * *AI Note: "Balanced approach. Best risk-adjusted return."*

  * **Option 3: The Fortress (Protected Note)** 🛡️

      * **Action**: Subscribe to a 12-Month Shark Fin Note linked to `AI-X`.
      * **Pro**: **100% Principal Protection**. You cannot lose money even if AI crashes.
      * **Con**: Upside capped at 15%. Liquidity locked for 12 months.
      * *AI Note: "Wealth Preservation focus."*

-----

**Lucas**: "Option 3 is too slow for me. Option 1 is too scary at this price. **Let's go with Option 2 (The Strategist).**"

**AI-Agent**: **"Wise choice."**
This strategy balances your desire to enter with prudent cost management.
I have drafted the **Multi-Leg Order**:

  * Leg 1: Buy Market (SGD 15k)
  * Leg 2: Buy Limit @ -5% (SGD 15k)
  * Leg 3: Buy Limit @ -8% (SGD 20k)

*(用户可以点击调整比例，例如改为 50/50)*

**Lucas**: Looks good. Execute.

**AI-Agent**: **(Digital Handshake)**
Please confirm via FaceID.
*Note: Limit orders may not fill. Unfilled cash remains in your savings account.*

## 6\. 成功标准 & 风险披露

  * **成功标准**:
      * **Decision Quality**: 客户不仅仅是“买了”，而是“思考后选择了最适合自己的方案”。
      * **Perceived Value**: 客户认为 HSBC 提供了比 Robinhood/富途 更高级的 advisory 服务。
  * **合规披露**:
      * **Suitability**: 如果客户选择 Option 3 (结构性产品)，系统后台需实时校验客户的风险等级 (Risk Rating) 是否匹配。如果不匹配，该选项置灰不可选。
      * **Execution**: 明确告知 AI 仅提供策略执行工具，不对市场涨跌负责。

-----

### 这个版本的升级点：

1.  **尊重用户主权**: 不再是 AI 教用户做事，而是 AI 提供选项，用户自己做主。
2.  **体现大行深度**: 能够拿出 "Structured Note" (保本票据) 这种券商很难提供的产品作为选项，凸显 HSBC 私人银行的供应链优势。
3.  **教育意义**: 通过对比三个选项，潜移默化地教育了用户关于“风险、收益、流动性”的三角关系。