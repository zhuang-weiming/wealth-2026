UC-03: Total Wealth Orchestrator (全资产指挥官)

## Context

HSBC Premier客户通常是“资产富人，现金穷人”。他们最大的财富往往是房产或企业股权，但银行App里只看得到存款和股票，导致资产配置建议极其片面。

## Problem Statement

用户缺乏全资产视角，容易出现“隐形风险集中”（如工作在科技大厂 + 房产在湾区 + 股票全买纳斯达克）。且在急用钱时，不懂得利用非流动性资产融资。

## Goals

建立完整的家庭资产负债表（含房产、私募、贷款）。

提供跨资产类别的宏观风险对冲建议。

解决流动性错配问题。

## Non-Goals

直接进行房地产交易中介服务。

核实用户自行录入资产的真实性（初期）。

## User Personas

Mr. Zhang (55岁，中小企业主): 净资产5M，但3M在房产，1M在公司，银行里只有500k。担心房地产泡沫，想分散风险。

## User Journey

Integration: 用户授权连接Zillow/Redfin获取房产估值。

Analysis: AI生成总览图：“您80%的财富集中在房地产，且与科技行业高度相关。”

Proposal: “建议利用Home Equity Line of Credit (HELOC) 释放部分流动性，并投资于与房地产负相关的国债或黄金，构建安全垫。”

Execution: 引导办理资产抵押或调整金融资产配置。

### Screen Flow

Net Worth Overview (包含房产、负债的层级图)

Correlation Heatmap (资产相关性热力图：显示房产与股票的同步跌涨风险)

Liquidity Analysis (流动资产 vs 固化资产比例)

Optimization Proposal (优化后的资产饼图)

## Key Features

外部资产接入: API连接房产估值、车辆估值、外部券商账户。

相关性矩阵计算: 跨资产类别（如房产vs黄金）的风险联动分析。

流动性防火墙构建: 根据总负债计算所需的最低现金储备。

## AI-Native Advantages

复杂推理: 能够处理“房产周期”、“利率变化”、“股市波动”之间的复杂宏观逻辑，给出类似Family Office CIO（首席投资官）级别的建议。


AI-Native Agent： 您可以否提供完整的财富信息，以便于更好的帮忙服务？
1. 存款 / 现金
2. 股票 / 基金
3. 房产
4. 企业股权
5. 贷款
6. 负债
7. 其他