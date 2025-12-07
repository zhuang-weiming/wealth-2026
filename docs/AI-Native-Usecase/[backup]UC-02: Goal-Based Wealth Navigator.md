UC-02: Goal-Based Wealth Navigator (人生目标导航)

## Context

中产富裕阶层投资的终极目的不是“跑赢大盘”，而是“实现生活目标”（买房、养老、子女教育）。目前的APP只展示收益率（%），与用户的生活目标脱节。

## Problem Statement

用户不知道“现在的资产配置能否支持我5年后在伦敦买房”。市场波动时，他们容易因恐慌而偏离长期计划。

## Goals

将投资行为与人生目标强绑定。

提供动态的路径规划和纠偏机制。

## Non-Goals

提供短期的投机性交易建议。

保证100%的目标达成率（市场有风险）。

## User Personas

The Chens (32岁，新婚夫妇): 目标明确（3年首付，15年留学），但不知道如何分配资金，也不知道目前的进度是否落后。

## User Journey

Setup: 用户输入目标：“2028年买房，首付$500k”。

Allocation: AI建立专属的“买房Pot”，推荐较低风险的股债组合。

Tracking: 市场第一年大涨，AI提示：“由于市场表现优异，您的首付目标达成率已达105%。”

Rebalancing: AI建议：“为确保3年后必定能买房，建议现在将‘买房Pot’中的超额收益锁定，转入保本国债。”

### Screen Flow

Goal Onboarding (选择目标类型 -> 输入金额/期限)

Plan Visualization (进度条 + 预计达成时间预测曲线)

Scenario Play (调整每月投入额滑块 -> 实时更新达成日期)

Smart Rebalance (一键调整仓位以匹配目标)

## Key Features

GBI (Goal-Based Investing) 引擎: 逆向计算所需的收益率和储蓄率。

动态路径规划: 类似Google Maps，路况（市场）变了，自动计算新路线（投资组合）。

情景模拟: "What-if" 分析（如果失业半年，对养老目标的影响）。

## AI-Native Advantages

超个性化策略: 每个目标的风险承受能力不同（买房钱不能亏，闲钱可以博），AI能同时管理多个具有不同风险属性的子账户（Sub-portfolios）。

自然语言交互: 用户问“我还能按时退休吗？”，AI能综合通胀、社保、当前持仓给出详细答复。

重点展示AI-Native的动态规划能力，在遇到市场波动时，在遇到人生突发事件时，AI能自动调整投资（存款）组合，确保目标达成。

自动推荐-下单到HSBC的产品