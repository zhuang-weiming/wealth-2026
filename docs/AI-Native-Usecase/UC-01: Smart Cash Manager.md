UC-01: Smart Cash Manager (智能现金管家)

## Context

HSBC的卓越理财客户通常拥有较高收入，但现金流管理粗放。他们经常在支票账户（Checking）留存过多无息现金，或者因突发支出（税单、学费）被迫在市场低点赎回长期理财。他们需要一个既能赚钱又能保命（流动性）的自动机制。

## Problem Statement

用户缺乏时间和工具来精确计算“这一刻我到底有多少钱是闲置的”，也无法预测未来的流动性缺口，导致资金效率低下或被迫产生不必要的交易成本。

## Goals

最大化闲置资金收益（通过自动扫单）。

确保未来3个月的流动性安全（通过预测支出）。

连接支付账户与理财账户，形成闭环。

## Non-Goals

鼓励用户透支消费。

将必要的紧急备用金也投入高风险资产。

## User Personas

Alex (35岁，科技公司中层): 月薪高但开销杂，常年有$50k躺在活期账户睡觉，没空打理，年底又要交一大笔税。

## User Journey

Detection: 发薪日，Alex账户进账$15k。

Prediction: AI分析Alex过去12个月的支出规律及日历（下月有“滑雪之旅”），预测未来30天需预留$6k。

Suggestion: AI弹出建议：“Alex，除去预留开支，您有$9k安全闲钱，建议转入收益率4.8%的Tokenized Deposit。”

Action: Alex点击“确认”。

Alert: 2个月后，AI检测到即将支付房产税，提示：“下周需支付$10k税款，建议将部分理财赎回或使用即时信贷，成本对比如下...”

### Screen Flow

Dashboard (现金流健康度仪表盘 + 闲钱气泡)

Insight Card (未来3个月收支预测柱状图)

Action Sheet (一键划转：Checking -> Money Market Fund/Tokenized Deposit)

Scenario Simulator (突发支出模拟器：如果下月多花$5k会怎样？)

## Key Features

闲钱自动扫单 (Auto-Sweep): 基于规则自动划转。

支出预测模型: 识别周期性账单（房贷/学费）和非周期性大额支出（旅行/税）。

流动性压力测试: 模拟失业或急用钱场景下的资金链。

资金来源推荐: 在“赎回理财”和“抵押贷款”之间计算最优解。

## AI-Native Advantages

非结构化数据理解: 能读取日历事件（"Europe Trip"）或邮件（"Tuition Invoice"）来修正支出预测，比传统基于历史均值的预测更准。

动态阈值: “安全闲钱”的定义是动态变化的，而非固定的$10k。