UC-05: Market & Portfolio Interpreter (市场解读官)

## Context

市场波动是财富管理中最大的“客户流失点”。传统的市场周报（PDF）晦涩难懂，与用户无关。用户需要的是“针对我”的解释和安抚。

## Problem Statement

当美股大跌，用户感到焦虑，想知道“我的钱受了多大影响？”和“我该怎么办？”。此时RM通常忙不过来，无法一对一安抚。

## Goals

提供高度个性化的市场影响分析。

提供情绪价值，防止用户恐慌性抛售（Panic Selling）。

将市场事件转化为投资者教育机会。

## Non-Goals

预测具体的市场底部。

粉饰亏损，误导用户。

## User Personas

David (50岁，传统行业): 持有科技基金，看到新闻说“纳斯达克崩盘”，非常恐慌，准备全部赎回。

## User Journey

Trigger: 纳斯达克单日下跌3%。

Notification: AI主动推送：“David，关于昨晚市场的波动，这是对您投资组合的具体分析。”

Explanation: “虽然纳斯达克下跌3%，但您组合中只有20%是科技股，且您的美债上涨了，对冲了部分风险。您整体仅回撤0.5%。”

Education: “下跌原因是美联储鹰派发言，但这通常是短期情绪释放。历史数据显示，此类回调后通常伴随反弹...”

Action: “建议：保持持有（Hold）。”

### Screen Flow

Impact Alert (锁屏通知：个性化摘要)

Attribution Analysis (瀑布图：是谁在跌？是谁在抗跌？)

Reasoning Chat (对话框：为什么跌？还会跌吗？)

Historical Comparison (历史相似情景走势图)

## Key Features

组合归因分析: 精确到个股/基金的贡献度计算。

5-Why 深度解读: 即使小白用户也能看懂的因果链条。

情绪安抚引擎: 识别用户焦虑等级，调整对话语气（Tone of Voice）。

## AI-Native Advantages

NLG (自然语言生成): 不再是模板填空，而是像真人RM一样写一封有温度的信。

实时知识库: 结合最新的实时新闻（News API）和用户持仓（Portfolio Data），秒级生成解读。

“关于昨晚市场的波动，这是对您投资组合的具体分析。” 和 Use Case 2: Market AI Forecast - "What's AI's view on Gold year 2026?" ， Use Case 6: Trending Assets Ranking - "What's everyone buying this Month?" 等高频问题都属于必须要解的题目的，时必须要回答的。可以放在一个showcase里面，做成一个demo。