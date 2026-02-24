这份 User Story 的修改版已经非常接近成熟，**真实感 (Realism)** 和 **业务贴合度 (Business Fit)** 都有了显著提升。

特别是您引入的 **"Digital Handshake" (数字握手)** 和 **"Explainable Guidance" (解释型引导)** 概念，非常精准地击中了银行在 AI 应用中的痛点——**合规边界**。在英国市场，FCA 对于 "Advice"（建议）和 "Guidance"（指引）有着严格的区分，您的设计巧妙地卡在了 "Guidance" 的安全区内，这是非常专业的处理。

以下是经过最终打磨、**HSBC 味道 (HSBC Flavor)** 更浓郁、逻辑更严密的升级版 User Story。

---

# User Story 9: 砖瓦的智慧 (The Bricks & Mortar Wisdom)
**—— 针对“英国存量房贷客户 (BTL) & 绿色金融升级”**

## 1. 人物设定 (Persona Profile)

* **姓名**: **David Thompson** (主贷人) & **Emma Thompson** (联名借款人)
* **身份**: 45岁，NHS 资深外科医生 (Consultant Surgeon)。
    * *特征*: 高收入但极度忙碌 (Time-poor)，没有时间去线下网点，也讨厌并在工作时间接听 Broker 的电话。
* **HSBC 关系**: **Premier (卓越理财)** 15年老客户。
    * *粘性*: 工资代发户，深度信任 HSBC 的数字化体验。
* **资产组合 (Property Portfolio)**:
    1.  **自住房**: 伦敦 Zone 3 (HSBC 按揭，低利率锁定中)。
    2.  **投资房 (Target Asset)**: 伯明翰两居室公寓 (BTL Interest Only Mortgage)。
        * *现状*: 2年固定利率 (2.19%) 即将到期。
        * *EPC 等级*: **D** (面临 2028 年必须达到 C 的法规风险)。
* **核心焦虑**:
    * **利率悬崖**: 从 2% 跳到 5%+，租金还能覆盖按揭吗？(Interest Coverage Ratio 压力)。
    * **合规恐慌**: 听说老房子如果不升级 EPC 就不能出租了，但我不知道装修要花多少钱，值得吗？

## 2. 核心冲突 (The Macro-Mismatch)

**“长期资产持有 vs. 短期现金流冲击”**

* **Trigger (触发点)**: 距离固定利率到期仅剩 45 天。
* **The Trap (陷阱)**:
    * 如果 David 什么都不做，贷款将自动转为 **HSBC SVR (标准浮动利率，约 7.5%+)**。
    * **后果**: 月供将翻倍，现金流从“正收益”瞬间变成“倒贴钱”。
* **The Friction (摩擦)**:
    * David 知道要转贷 (Remortgage)，但他想顺便解决 EPC 问题。
    * 传统路径：找 Broker 咨询 -> 找装修队报价 -> 找银行评估。**链路太长，医生没时间。**

## 3. AI-Agent 解决方案：HSBC Mortgage Navigator

**定位**: **"Your Proactive Property Partner" (您主动的房产伙伴)**

**核心逻辑 (Logic Framework)**:
1.  **Retention (留客)**: 优先确保客户在 HSBC 内部完成转贷 (Product Transfer)，防止流失。
2.  **Value-Add (增值)**: 利用 **Green Mortgage** 作为钩子，解决客户 EPC 焦虑，同时增加贷款额度 (Additional Borrowing) 用于装修。
3.  **Compliance-First (合规优先)**: 所有的模拟均基于“情景假设 (Scenario Based)”，而非“理财建议 (Investment Advice)”。

## 4. 用户旅程 (User Journey Map)

| 阶段 | 场景 / 触点 | 客户心理 | AI-Agent (HSBC 风格) 动作 |
| :--- | :--- | :--- | :--- |
| **1. 唤醒** | App 首页推送 | “又要处理这麻烦事了...” | **Proactive Alert**: “David，您的伯明翰房产固定利率将在 45天后到期。若转为 SVR，月供预计增加 £450。” |
| **2. 模拟** | 进入 Navigator | “现在的利率太贵了，有没有得选？” | **Scenario Planner**: 动态对比 2年/5年固定利率 vs Tracker 利率的现金流影响。 |
| **3. 洞察** | 房产健康检查 | “EPC D级是什么意思？” | **Compliance Lens**: “检测到该房产 EPC 为 D。若升级至 C，可解锁 **HSBC 绿色按揭** (利率优惠 0.1%)。” |
| **4. 测算** | 装修 ROI 计算器 | “装修要花多少钱？划算吗？” | **Green Retrofit Sim**: “基于同类房产数据，预计投入 £3k-£5k (隔热/锅炉)。新利率节省 + 租金潜力提升，预计 4 年回本。” |
| **5. 确认** | 数字握手 | “听起来靠谱，但我需要确认。” | **Digital Handshake**: 明确提示“模拟数据仅供参考”。生成《转贷与升级意向书》供下载。 |
| **6. 行动** | 执行/预约 | “那就办吧。” | **Hybrid Path**: 小额装修贷 + 转贷 -> 直接在线申请 (Straight Through)；复杂情况 -> 一键预约 Mortgage Specialist。 |

## 5. 对话详细内容 (Script with Compliance Guardrails)

**场景**: 晚上 9 点，David 在医院休息室打开手机。

**David**: "AI，我伯明翰那套房的按揭要到期了。如果我不想交 SVR 那个冤枉钱，我现在有什么选择？"

**AI-Agent (Wealth Compass)**:
"晚上好，David。您的顾虑非常及时。
根据您当前的贷款余额，如果 45 天后转为 SVR (标准浮动利率)，您的月供将从 **£450** 激增至 **£920** (+104%)。

作为 Premier 客户，您现在可以通过 **‘内部转贷 (Product Transfer)’** 锁定新利率，无需重新进行复杂的信用评估。
目前适合您的主流方案有：
1.  **2年固定**: 5.49% (灵活性高)
2.  **5年固定**: 4.99% (锁定长期成本，现金流更稳)"

**David**: "5年固定不到 5% 还可以。但我听说以后出租房必须达到 EPC C 级？这套房现在才 D 级，我是不是得卖了它？"

**AI-Agent**:
"不需要急着出售。根据英国政府的拟议法规，提升能效是长期趋势。
系统检测到该房产主要失分项在于**‘屋顶隔热’**和**‘老式锅炉’**。

**这里有一个‘绿色升级’的情景模拟 (Scenario Analysis)**：
如果您投资约 **£4,000** 进行针对性改造，有望将 EPC 提升至 C 级。
这不仅能满足合规要求，还能让您有资格申请 **HSBC Green Mortgage**。

**模拟收益 (非承诺)**：
* **利率优惠**: 绿色按揭利率可低至 **4.89%**。
* **利息节省**: 5年累计约节省 **£1,200**。
* **租金潜力**: 节能房产在伯明翰租赁市场更具吸引力。

您是否想看看这个方案的详细对比？"

**David**: "听起来不错。但这 £4,000 我不想动用现金，能一起贷出来吗？"

**AI-Agent**:
"可以的。在申请转贷时，您可以同时申请 **‘追加借款 (Additional Borrowing)’** 用于房屋修缮。
鉴于您良好的还款记录，这通常可以通过数字化流程快速预批。

⚠️ **重要提示 (Digital Handshake)**：
以上改造成本及评级提升仅基于房产大数据的估算，实际装修报价及最终 EPC 评级需以专业评估师为准。此模拟不构成贷款承诺。

**您希望如何进行？**
[A] 仅办理利率转换 (2分钟完成)
[B] 生成‘绿色升级+追加贷款’意向书，并预约 Specialist 明早回电 (推荐)"

**David**: "选 B。生成意向书发给我和 Emma，我们商量一下。"

---

## 6. 为什么这个 Case 是 "HSBC Flavor"？

1.  **Product Transfer (PT)**: 这是英国银行业特有的术语（指老客户内部转贷）。这是 HSBC UK 维系存量客户最核心的业务流程。AI 将原本冷冰冰的 PT 变成了一次“资产增值咨询”。
2.  **Green Mortgage**: HSBC 是英国“绿色按揭”的领军者之一。将 AI、EPC 数据、绿色产品结合，完美契合银行的 ESG 战略。
3.  **Additional Borrowing**: 这是一个非常真实的银行获客点。不仅留住了客户的贷款，还通过装修贷增加了贷款余额 (Interest Income)。
4.  **Non-Advised Process**: 整个对话中，AI 始终在做 **"Information Giving" (提供信息)** 和 **"Scenario Planning" (情景模拟)**，小心翼翼地避开了 "Advice" (建议客户具体买哪个) 的红线，最后把复杂决策导向了 **Human Specialist**，非常符合合规要求。

这个 Story 真实、准确，且具有极高的商业价值（留客+增贷）。