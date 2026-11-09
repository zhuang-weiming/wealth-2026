# HSBC AI-Native Wealth Management System
## 面向终端客户的智能理财助手 - 技术设计文档

**版本**: v2.0  
**最后更新**: 2024-12-19  
**文档状态**: 详细设计阶段  
**目标用户**: 终端客户（End Customer）

---

## 📋 文档目录

1. [项目概述](#1-项目概述)
2. [系统架构设计](#2-系统架构设计)
3. [LLM 能力设计](#3-llm-能力设计)
4. [Agent 协作系统](#4-agent-协作系统) *(待续)*
5. [RAG 系统设计](#5-rag-系统设计) *(待续)*
6. [Memory 系统设计](#6-memory-系统设计) *(待续)*
7. [MCP 集成方案](#7-mcp-集成方案) *(待续)*
8. [Opportunity 转化流程](#8-opportunity-转化流程) *(待续)*
9. [合规与安全](#9-合规与安全) *(待续)*
10. [实施路线图](#10-实施路线图) *(待续)*

---

## 1. 项目概述

### 1.1 项目背景

本项目旨在构建一个 **AI-Native** 的财富管理系统，核心目标用户是**终端客户**（而非 Relationship Manager）。系统通过 AI 技术降低理财门槛，提供 7×24 小时的智能投资咨询服务。

**核心需求来源**:
- 客户需要即时获取 HSBC CIO（Chief Investment Office）的专业观点
- 金融新闻（英文/中文）需要智能翻译和解读
- 专业术语（PE/PB/Duration 等）需要通俗化解释
- 对话历史需要转化为 RM 的销售机会（Opportunity）

### 1.2 核心价值主张

| 维度 | 传统财富管理 | HSBC AI-Native Wealth |
|------|-------------|---------------------|
| **服务时间** | 工作日 9:00-18:00 | 7×24 全天候 |
| **响应速度** | 数小时到数天 | <3 秒实时响应 |
| **信息获取** | 等待 RM 邮件/电话 | 主动推送 + 即时问答 |
| **专业门槛** | 需理解金融术语 | AI 自动翻译成"人话" |
| **个性化** | 季度通用报告 | 基于持仓的实时建议 |
| **语言支持** | 英文/中文 | 5 种语言实时翻译 |
| **销售转化** | 被动等待客户咨询 | AI 识别意向自动转 RM |

### 1.3 系统目标

**Phase 1 目标（3 个月内）**:
- ✅ 实现 CIO 报告的智能解读（中英文）
- ✅ 集成外部新闻源（Bloomberg/Reuters）
- ✅ 构建金融术语词典（500+ 术语）
- ✅ 实现多 Agent 协作（CIO Agent + Search Agent）
- ✅ 建立客户记忆系统（短期 + 长期）
- ✅ 对话转 RM Opportunity 的自动化流程

**关键指标（KPI）**:

**用户体验**:
- 首次响应时间: <2s
- 术语解释准确率: >95%
- 用户满意度: >9/10

**业务影响**:
- 对话转 Opportunity 率: >8%
- RM 跟进转化率: >20%
- 客户月活跃度: +50%

### 1.4 技术选型原则

**优先使用 AWS 托管服务**:
1. **Amazon Bedrock** - AI 模型托管（Claude 3.5 Sonnet）
2. **Amazon RDS (Aurora PostgreSQL)** - 客户档案和对话历史
3. **Amazon DynamoDB** - 会话状态和短期记忆
4. **Amazon OpenSearch Serverless** - 向量检索和全文搜索
5. **Amazon S3** - CIO 报告和产品文档存储
6. **AWS Lambda** - 无服务器计算
7. **Amazon EventBridge** - 事件驱动架构
8. **AWS Step Functions** - 工作流编排
9. **Amazon Timestream** - 时序数据（市场行情）
10. **Amazon Bedrock Guardrails** - 合规护栏

---

## 2. 系统架构设计

### 2.1 整体架构图

```text
┌─────────────────────────────────────────────────────────────────────┐
│                     客户端层 (Client Layer)                          │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐                  │
│ │   iOS App    │ │ Android App  │ │  Web Portal  │                  │
│ └──────────────┘ └──────────────┘ └──────────────┘                  │
└─────────────────────────────────────────────────────────────────────┘
                              ↓ HTTPS/WSS
┌─────────────────────────────────────────────────────────────────────┐
│                    API 网关层 (API Gateway)                          │
│ ┌──────────────────────────────────────────────────────────────┐    │
│ │   Amazon API Gateway + AWS WAF + Cognito Authentication      │    │
│ └──────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│                   AI 编排层 (AI Orchestration)                       │
│ ┌────────────────────────────────────────────────────────────┐      │
│ │          AWS Step Functions (工作流编排)                     │      │
│ │ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐         │      │
│ │ │   Intent     │→│   Agent      │→│  Response    │         │      │
│ │ │ Recognition  │ │ Orchestrator │ │  Generator   │         │      │
│ │ └──────────────┘ └──────────────┘ └──────────────┘         │      │
│ └────────────────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│                  Agent 协作层 (Agent Layer)                          │
│                      **并行执行 3 个 Agent**                          │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐                  │
│ │  CIO Agent   │ │ Search Agent │ │Product Agent │                  │
│ │  (Bedrock)   │ │ (Bedrock)    │ │ (Bedrock)    │                  │
│ └──────┬───────┘ └──────┬───────┘ └──────┬───────┘                  │
│        │                │                │                          │
│        └────────────────┼────────────────┘                          │
│                         ↓                                           │
│ ┌──────────────────────────────────────────────────────────────┐    │
│ │        Agent Voting & Consensus Mechanism                    │    │
│ │        Lambda Function - 投票与结果融合                        │    │
│ └──────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
         ↓                ↓                ↓
    (并行访问下面三层，每个 Agent 访问不同的数据源)
         ↓                ↓                ↓
┌─────────────────────────────────────────────────────────────────────┐
│              数据服务层 (Data Services Layer)                         │
│                    **3 个 Agent 并行访问**                            │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐                  │
│ │ Knowledge    │ │   Memory     │ │ Holdings     │                  │
│ │  Base (RAG)  │ │   System     │ │   Service    │                  │
│ │              │ │              │ │              │                  │
│ │ OpenSearch   │ │ DynamoDB +   │ │  Lambda +    │                  │
│ │ Serverless   │ │ RDS Aurora   │ │ VPC Endpoint │                  │
│ └──────────────┘ └──────────────┘ └──────────────┘                  │
└─────────────────────────────────────────────────────────────────────┘
         ↓                ↓                ↓
┌─────────────────────────────────────────────────────────────────────┐
│                    存储层 (Storage Layer)                            │
│                    **3 个 Agent 并行访问**                            │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐                  │
│ │     S3       │ │ RDS Aurora   │ │   DynamoDB   │                  │
│ │(CIO Reports) │ │(Customer     │ │ (Sessions)   │                  │
│ │              │ │ Profiles)    │ │              │                  │
│ └──────────────┘ └──────────────┘ └──────────────┘                  │
└─────────────────────────────────────────────────────────────────────┘
         ↓                ↓                ↓
┌─────────────────────────────────────────────────────────────────────┐
│                    集成层 (Integration Layer)                        │
│                    **3 个 Agent 并行访问**                            │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐                  │
│ │ MCP Servers  │ │   RM CRM     │ │  HSBC Core   │                  │
│ │(Bloomberg/   │ │ (Salesforce) │ │  Banking     │                  │
│ │  Reuters)    │ │              │ │  System)     │                  │
│ └──────────────┘ └──────────────┘ └──────────────┘                  │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│                监控与合规层 (Monitoring & Compliance)                 │
│ ┌──────────────────────────────────────────────────────────────┐    │
│ │ CloudWatch + X-Ray + Bedrock Guardrails + Audit Logs         │    │
│ └──────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
```

**架构说明**:

1. **AI 编排层** → **Agent 协作层**: Step Functions 触发 3 个 Agent **并行执行**

2. **Agent 协作层** → **数据服务层/存储层/集成层**: 
   - **CIO Agent** → Knowledge Base (OpenSearch) → S3 (CIO Reports)
   - **Search Agent** → MCP Connectors → Bloomberg/Reuters API
   - **Product Agent** → RDS Aurora (Product Catalog) + Holdings Service → HSBC Core Banking
   - **所有 Agent 同时访问** Memory System (DynamoDB + RDS)

3. **并行执行优势**:
   - 总响应时间 = max(Agent1, Agent2, Agent3) 而非 sum()
   - 3 个 Agent 各需 1-2 秒 → 总计 ~2 秒（而非 6 秒）
   - 提升用户体验，满足 <3 秒响应目标

### 2.2 核心数据流

**典型对话流程**（以"黄金怎么看？"为例）:

1. 用户输入 ↓ "黄金现在能买吗？我担心美联储加息"

2. API Gateway (认证 + 限流) ↓
   - Cognito 验证 JWT Token
   - WAF 检查恶意请求
   - 获取 user_id: "customer_12345"

3. Step Functions (意图识别) ↓ Lambda: intent-classifier
   - 调用 Bedrock Claude 3 Haiku (快速分类)
   - 识别结果: 
     ```json
     {
       "intent": "investment_advice", 
       "asset_class": "gold", 
       "concerns": ["fed_rate_hike"], 
       "requires_agents": ["cio_agent", "search_agent"]
     }
     ```

4. Memory System (上下文注入) ↓ Lambda: load-context
   - DynamoDB 读取短期记忆 (当前会话)
   - RDS Aurora 读取长期记忆 (客户画像)
   - 返回: 
     ```json
     {
       "user_profile": {
         "risk_level": "R3", 
         "current_holdings": {"gold_exposure": 0}, 
         "preferences": ["prefers_etf_over_physical"], 
         "language": "zh-CN"
       }, 
       "session_context": ["5分钟前问过'美联储什么时候加息'"]
     }
     ```

5. Agent Orchestration (并行调用) ↓ Step Functions 并行分支:
   - **Branch 1: CIO Agent**
     - Lambda: cio-agent
     - 调用 Bedrock Knowledge Base
     - 检索 CIO 2024 Q4 报告
     - 返回: "CIO 维持黄金'超配'评级，目标价 $2,100"
     - 引用来源: "CIO 2024 Q4 Report, Page 23"

   - **Branch 2: Search Agent**
     - Lambda: search-agent
     - 通过 MCP 调用 Bloomberg API
     - 返回: "美联储暗示暂停加息（2小时前）"
     - 引用来源: "Bloomberg, 2024-12-19 14:30 UTC"

   - **Branch 3: Product Agent**
     - Lambda: product-agent
     - 查询 HSBC 黄金产品
     - 返回: "SPDR Gold ETF (GLD), 管理费 0.4%"
     - 引用来源: "HSBC Product Catalog"

6. **Agent Voting (结果融合)** ↓ Lambda: agent-consensus
   - 输入: 3个 Agent 的结果
   - 投票权重: CIO Agent (50%), Search Agent (30%), Product Agent (20%)
   - 融合策略:
     - CIO 观点为主
     - 新闻作为补充
     - 产品作为行动建议

7. **GenerateResponse 节点** ↓ Lambda: response-generator
   - 调用 Bedrock Claude 3.5 Sonnet (with Guardrails applied)
   - System Prompt 注入:
     - 客户风险等级 R3
     - 必须引用 CIO 原文
     - 用通俗语言解释
   - Bedrock Guardrails 自动检查输入/输出
   - 生成结构化回答: 
     ```json
     {
       "summary": "根据 HSBC CIO 最新观点...",
       "cio_view": {
         "rating": "超配", 
         "target_price": "$2,100", 
         "source": "CIO 2024 Q4 Report, Page 23"
       },
       "market_context": "美联储暗示暂停加息...",
       "recommendation": "建议配置 5-10% 黄金 ETF",
       "products": ["SPDR Gold ETF (GLD)"],
       "risk_warning": "黄金价格波动较大...",
       "citations": [
         {"type": "cio_report", "title": "CIO 2024 Q4", "page": 23},
         {"type": "news", "source": "Bloomberg", "timestamp": "2024-12-19 14:30"}
       ]
     }
     ```

8. **CheckCompliance 节点** (条件判断)
   - 检查 Guardrails 是否触发阻止
   - 验证风险等级匹配 (适当性检查)
   - 确保包含风险披露
   - 如需人工审核 → EscalateToRM

9. **AsyncProcessing 并行分支** (后台异步执行，不阻塞用户响应)

   **Branch 1: DeliverResponse 节点** ⚡ **立即返回用户**
   - Lambda: deliver-response → API Gateway → Client
   - 返回内容:
     * 文本回答（带术语解释）
     * 引用来源链接（可点击查看原文）
     * 产品卡片
     * "联系 RM" 按钮
   - **响应时间: ~2-3秒**

   **Branch 2: OpportunityDetection 节点**
   - Lambda: opportunity-detector
   - 分析对话内容
   - 检测到: 客户对黄金有明确兴趣
   - 判断: 需要转 RM 跟进
   - 写入 RDS Aurora: 
     ```sql
     INSERT INTO opportunities 
     (customer_id, intent, confidence, dialogue_summary, created_at, status) 
     VALUES ('customer_12345', 'gold_investment', 0.85, '客户询问黄金投资，关注美联储加息影响', NOW(), 'ai_detected')
     ```
   - 通知 RM (SNS)

**客户后续行为追踪:**

- **场景 1: 客户点击 "联系 RM" 按钮**
  - 更新 Opportunity 状态: `ai_detected` → `customer_requested`
  - 优先级提升 (High Priority)
  - RM 立即收到通知
  - 记录客户主动意向

- **场景 2: 客户未点击，但继续对话**
  - 持续追踪对话内容
  - 如果再次提及相关话题 → 提升 Opportunity 置信度
  - 如果询问具体操作步骤 → 自动升级为 `ready_to_invest`

- **场景 3: 客户未点击，结束会话**
  - Opportunity 保持 `ai_detected` 状态
  - RM 在 Portal 看到该机会（低优先级）
  - 系统在 24-48 小时后发送温和提醒:
    * App 推送: "您之前关注的黄金投资，CIO 最新观点已更新"
    * 邮件: 个性化投资建议摘要
  - 如果客户点击提醒 → 状态更新为 `customer_engaged`

- **场景 4: 客户完全无响应**
  - 7 天后 Opportunity 自动标记为 `low_priority`
  - 30 天后归档到 `historical_interest`
  - 数据用于长期客户画像分析

### 2.3 客户持仓数据集成

**从 HSBC 内部系统获取客户持仓信息**，用于个性化投资建议：

#### 2.3.1 持仓数据结构

```json
{
  "customer_id": "customer_12345",
  "total_aum": 1500000,
  "currency": "HKD",
  "last_updated": "2024-12-19T10:00:00Z",
  "holdings": {
    "deposit": {
      "amount": 300000,
      "percentage": 20.0,
      "products": [
        {"type": "savings", "amount": 150000, "currency": "HKD"},
        {"type": "time_deposit", "amount": 150000, "currency": "USD", "maturity": "2025-03-15"}
      ]
    },
    "funds": {
      "amount": 600000,
      "percentage": 40.0,
      "products": [
        {"name": "HSBC Asia Pacific Equity Fund", "amount": 300000, "type": "equity"},
        {"name": "HSBC China QDII Fund", "amount": 200000, "type": "qdii"},
        {"name": "HSBC Bond Fund", "amount": 100000, "type": "bond"}
      ]
    },
    "gold": {
      "amount": 150000,
      "percentage": 10.0,
      "products": [
        {"name": "SPDR Gold ETF (GLD)", "shares": 75, "value": 150000}
      ]
    },
    "structured_products": {
      "amount": 300000,
      "percentage": 20.0,
      "products": [
        {"name": "HSBC Equity Linked Note", "amount": 300000, "maturity": "2025-06-30"}
      ]
    },
    "insurance": {
      "amount": 150000,
      "percentage": 10.0,
      "products": [
        {"name": "HSBC Life Insurance", "premium": 150000, "type": "whole_life"}
      ]
    }
  },
  "asset_allocation": {
    "cash": 20.0,
    "equity": 30.0,
    "fixed_income": 20.0,
    "alternative": 20.0,
    "insurance": 10.0
  }
}
```

#### 2.3.2 持仓数据获取 Lambda

```python
# Lambda: get-customer-holdings
import boto3
import json
import requests

secrets_manager = boto3.client('secretsmanager')

def lambda_handler(event, context):
    """
    从 HSBC 内部系统获取客户持仓
    
    通过 VPC PrivateLink 连接核心银行系统
    """
    customer_id = event['customer_id']
    
    # 1. 获取内部 API 凭证
    secret = secrets_manager.get_secret_value(SecretId='hsbc-core-banking-api')
    api_key = json.loads(secret['SecretString'])['api_key']
    
    # 2. 调用 HSBC Core Banking API (通过 VPC Endpoint)
    response = requests.get(
        f'https://internal-api.hsbc.com/wealth/v1/customers/{customer_id}/holdings',
        headers={
            'X-API-Key': api_key,
            'X-Request-ID': context.request_id
        },
        timeout=5
    )
    
    if response.status_code != 200:
        return {'statusCode': 500, 'body': 'Failed to fetch holdings'}
    
    holdings_data = response.json()
    
    # 3. 计算资产配置
    total_aum = holdings_data['total_aum']
    asset_allocation = calculate_asset_allocation(holdings_data['holdings'])
    
    # 4. 分析持仓特征
    portfolio_analysis = {
        'total_aum': total_aum,
        'holdings': holdings_data['holdings'],
        'asset_allocation': asset_allocation,
        'insights': {
            'gold_exposure': asset_allocation.get('alternative', 0),
            'equity_exposure': asset_allocation.get('equity', 0),
            'cash_ratio': asset_allocation.get('cash', 0),
            'diversification_score': calculate_diversification(holdings_data['holdings'])
        }
    }
    
    return {
        'statusCode': 200,
        'body': json.dumps(portfolio_analysis, ensure_ascii=False)
    }

def calculate_asset_allocation(holdings):
    """计算资产配置比例"""
    total = sum(h['amount'] for h in holdings.values())
    return {k: (v['amount'] / total * 100) for k, v in holdings.items()}

def calculate_diversification(holdings):
    """计算投资组合分散度 (0-100)"""
    num_categories = len([h for h in holdings.values() if h['amount'] > 0])
    return min(num_categories * 20, 100)
```

#### 2.3.3 在 AI 对话中使用持仓数据

**集成到 Memory System (Step 4)**:

```python
# 在 load-context Lambda 中添加
def load_context(event):
    customer_id = event['customer_id']
    
    # 获取客户持仓
    holdings = get_customer_holdings(customer_id)
    
    return {
        'user_profile': {...},
        'session_context': {...},
        'current_holdings': holdings,  # 新增持仓数据
        'portfolio_insights': {
            'gold_exposure': holdings['insights']['gold_exposure'],
            'needs_rebalancing': holdings['insights']['gold_exposure'] < 5,  # 黄金配置不足
            'cash_ratio_high': holdings['insights']['cash_ratio'] > 30
        }
    }
```

**AI 使用持仓数据生成个性化建议**:

```python
# 在 response-generator 的 System Prompt 中注入
SYSTEM_PROMPT = f"""
## 客户当前持仓
- 总资产: {holdings['total_aum']:,.0f} HKD
- 黄金配置: {holdings['insights']['gold_exposure']:.1f}%
- 现金比例: {holdings['insights']['cash_ratio']:.1f}%
- 股票配置: {holdings['insights']['equity_exposure']:.1f}%

## 投资建议要求
- 基于客户当前持仓提供具体建议
- 如果黄金配置 < 5%，建议增配
- 如果现金比例 > 30%，建议优化配置
- 考虑整体资产配置平衡
"""
```

**示例对话效果**:

```
用户: "黄金现在能买吗？"

AI: "根据您的持仓情况，您目前的黄金配置仅为 10%（约 15 万港币），
低于 HSBC CIO 建议的 15-20% 配置比例。

考虑到：
1. CIO 维持黄金'超配'评级，目标价 $2,100/盎司
2. 您的现金比例较高（20%），有配置空间
3. 美联储暗示暂停加息，利好黄金

建议：从现金账户中配置 5-10 万港币增持黄金 ETF (GLD)，
将黄金配置提升至 15% 左右，优化整体资产配置。

⚠️ 风险提示：黄金价格波动较大，请根据您的风险承受能力决策。"
```

### 2.4 AWS 服务映射表

| 功能模块 | AWS 服务 | 用途说明 |
|---------|---------|---------|
| **AI 推理** | Amazon Bedrock | Claude 3.5 Sonnet/Haiku 模型托管 |
| **向量检索** | OpenSearch Serverless | CIO 报告、产品文档的语义搜索 |
| **客户档案** | RDS Aurora PostgreSQL | 长期记忆、客户画像、Opportunity 记录 |
| **会话状态** | DynamoDB | 短期记忆、实时会话上下文 |
| **文档存储** | S3 | CIO PDF 报告、产品说明书 |
| **时序数据** | Timestream | 市场行情、价格历史 |
| **工作流编排** | Step Functions | Agent 协作、人工审核节点 |
| **无服务器计算** | Lambda | 业务逻辑、Agent 实现 |
| **API 管理** | API Gateway | RESTful API、WebSocket |
| **身份认证** | Cognito | 用户登录、JWT Token |
| **合规护栏** | Bedrock Guardrails | 内容过滤、PII 保护 |
| **事件总线** | EventBridge | CIO 报告更新、定时任务 |
| **消息推送** | SNS/Pinpoint | App 推送、短信、邮件 |
| **监控告警** | CloudWatch + X-Ray | 日志、指标、分布式追踪 |
| **密钥管理** | Secrets Manager + KMS | API Key、数据库密码、加密密钥 |

---

## 3. LLM 能力设计

### 3.1 模型选择策略

**不需要 Fine-tune 的理由**:
- Claude 3.5 Sonnet 已具备强大的金融理解能力
- 通过 **Prompt Engineering** + **RAG** 可达到 95%+ 准确率
- Fine-tune 成本高（$10K+）且维护复杂
- **仅在以下情况考虑 Fine-tune**:
  * 术语理解错误率 >5%
  * 需要特定的 HSBC 话术风格
  * 监管要求模型可解释性

**模型分工**:
claude 3? 3.5? 4? 4.5? depends on the **cost** and latency requirements.
```python
MODEL_SELECTION = {
    "intent_classification": {
        "model": "anthropic.claude-3-haiku-20240307-v1:0",
        "reason": "低延迟 (<1s)，成本低 50%",
        "use_cases": ["意图识别", "情感分析", "语言检测"]
    },
    "main_conversation": {
        "model": "anthropic.claude-3-5-sonnet-20241022-v2:0",
        "reason": "金融理解力强，200K context window",
        "use_cases": ["CIO 解读", "投资建议", "复杂推理"]
    },
    "document_summary": {
        "model": "anthropic.claude-3-5-sonnet-20241022-v2:0",
        "reason": "长文本处理能力",
        "use_cases": ["CIO 报告摘要", "新闻聚合"]
    },
    "translation": {
        "model": "anthropic.claude-3-5-sonnet-20241022-v2:0",
        "reason": "保持金融术语准确性",
        "use_cases": ["英文→中文", "术语本地化"]
    }
}
```

### 3.2 金融术语翻译与对齐

**核心挑战**:
- 英文 CIO 报告 → 中文客户理解
- 专业术语（PE/PB/Duration）→ 通俗解释
- 不同地区的术语差异（香港 vs 大陆）

**解决方案: 三层术语处理**

#### 3.2.1 术语词典（存储在 DynamoDB）

DynamoDB 是全托管、无服务器的 NoSQL 数据库服务。它专门为需要高性能、无缝扩展以及低延迟的互联网级应用而设计

```json
{
    "term_id": "PE_RATIO",
    "term_en": "P/E Ratio",
    "term_zh_cn": "市盈率",
    "term_zh_hk": "市盈率",
    "term_zh_tw": "本益比",
    "simple_explanation": {
        "zh-CN": "股价 ÷ 每股收益。数值越低，股票越便宜",
        "zh-HK": "股價 ÷ 每股盈利。數值越低，股票越平",
        "en": "Stock price ÷ Earnings per share. Lower = cheaper"
    },
    "detailed_explanation": {
        "zh-CN": "市盈率是衡量股票估值的常用指标。例如 PE=20 意味着股价是每股收益的20倍，表示投资者愿意为每1元盈利支付20元。",
        "zh-HK": "市盈率是衡量股票估值的常用指標。例如 PE=20 意味著股價是每股收益的20倍。",
        "en": "P/E ratio is a common metric for stock valuation. For example, P/E=20 means the stock price is 20 times its earnings per share."
    }
    """
"""
    在文本中自动注入术语解释
    
    Args:
        text: 原始文本
        user_language: 用户语言
        mode: 'inline' (行内注释) 或 'footnote' (脚注)
    """
    """
    enriched_text = text
    footnotes = []
    
    for pattern, term_id in TERM_PATTERNS.items():
        if re.search(pattern, text, re.IGNORECASE):
            response = glossary_table.get_item(Key={'term_id': term_id})
            term_data = response.get('Item', {})
            
            if mode == 'inline':
                explanation = term_data['simple_explanation'][user_language]
                term_local = term_data[f'term_{user_language.lower().replace("-", "_")}']
                replacement = f"{term_local}（{explanation}）"
                enriched_text = re.sub(pattern, replacement, enriched_text, count=1)
            
            elif mode == 'footnote':
                footnote_num = len(footnotes) + 1
                term_local = term_data[f'term_{user_language.lower().replace("-", "_")}']
                footnotes.append({
                    'num': footnote_num,
                    'term': term_local,
                    'explanation': term_data['detailed_explanation'][user_language]
                })
                replacement = f"{term_local}[{footnote_num}]"
                enriched_text = re.sub(pattern, replacement, enriched_text, count=1)
    
    return {
        'enriched_text': enriched_text,
        'footnotes': footnotes
    }


### 3.2.3 Prompt Engineering（术语解释）

```python
# System Prompt 模板
SYSTEM_PROMPT_TEMPLATE = """
你是 HSBC 的 AI 理财助手，专门为{user_segment}客户服务。

## 核心规则
1. **术语处理**:
   - 首次出现专业术语时，必须用括号注释
   - 格式: "市盈率（PE Ratio，股价÷每股收益）"
   - 使用{user_language}语言
   
2. **引用来源**:
   - 必须标注信息来源
   - 格式: "根据 HSBC CIO 2024 Q4 报告（第23页）..."
   - 新闻来源: "据彭博社报道（2024-12-19）..."
   
3. **风险披露**:
   - 任何投资建议必须包含风险提示
   - 客户风险等级: {risk_level}
   
4. **语言风格**:
   - 使用通俗易懂的语言
   - 避免过度专业化表述
   - 举例说明复杂概念

## 客户背景
- 风险等级: {risk_level}
- 投资经验: {investment_experience}
- 当前持仓: {current_holdings}
- 语言偏好: {user_language}
- 禁忌: {blacklist}

## 金融术语词典（自动参考）
{glossary_context}
"""

def build_system_prompt(user_profile, relevant_terms):
    """构建个性化 System Prompt"""
    glossary_context = "\n".join([
        f"- {term['term_en']}: {term['simple_explanation'][user_profile['language']]}"
        for term in relevant_terms
    ])
    
    return SYSTEM_PROMPT_TEMPLATE.format(
        user_segment=user_profile.get('segment', '高净值'),
        user_language=user_profile.get('language', 'zh-CN'),
        risk_level=user_profile.get('risk_level', 'R3'),
        investment_experience=user_profile.get('experience', '中等'),
        current_holdings=user_profile.get('holdings', '无'),
        blacklist=user_profile.get('blacklist', '无'),
        glossary_context=glossary_context
    )
```

### 3.3 多语言支持
优先支持的语言列表:

🇨🇳 简体中文 (zh-CN) 🇭🇰 繁体中文-香港 (zh-HK) 🇬🇧 英语 (en-GB) 🇺🇸 英语-美国 (en-US) 🇸🇦 阿拉伯语 (ar-SA)

实现方案:

```python
# Lambda: language-handler
import boto3
import json

bedrock = boto3.client('bedrock-runtime')

def translate_with_context(text, source_lang, target_lang, domain='finance'):
    """
    金融领域的上下文翻译
    
    特点:
    - 保持术语一致性
    - 保留数字和日期格式
    - 适配地区习惯
    """
    prompt = f"""
    将以下金融文本从 {source_lang} 翻译为 {target_lang}。
    
    要求:
    1. 保持金融术语的专业性和准确性
    2. 数字格式按目标地区习惯（如: 10,000 vs 10.000）
    3. 日期格式本地化（如: 12/31/2024 vs 2024-12-31）
    4. 保留原文中的品牌名称（如 HSBC, Bloomberg）
    5. 货币符号本地化（$ → ¥ 如果适用）
    
    原文:
    {text}
    
    译文:
    """
    
    response = bedrock.invoke_model(
        modelId='anthropic.claude-3-5-sonnet-20241022-v2:0',
        body=json.dumps({
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 4000,
            "messages": [{"role": "user", "content": prompt}]
        })
    )
    
    result = json.loads(response['body'].read())
    return result['content'][0]['text']

# 使用示例
english_text = "HSBC CIO maintains Overweight on Gold with target price $2,100/oz"

# 翻译为简体中文
chinese_text = translate_with_context(
    text=english_text,
    source_lang='en-US',
    target_lang='zh-CN'
)
print(chinese_text)
# 输出: "汇丰银行首席投资办公室维持黄金'超配'评级，目标价 2,100 美元/盎司"

# 翻译为繁体中文（香港）
hk_text = translate_with_context(
    text=english_text,
    source_lang='en-US',
    target_lang='zh-HK'
)
print(hk_text)
# 输出: "滙豐銀行首席投資辦公室維持黃金'超配'評級，目標價 2,100 美元/盎司"

# 翻译为阿拉伯语
arabic_text = translate_with_context(
    text=english_text,
    source_lang='en-US',
    target_lang='ar-SA'
)
print(arabic_text)
# 输出: "يحافظ مكتب الاستثمار الرئيسي في HSBC على تصنيف 'زيادة الوزن' للذهب بسعر مستهدف 2,100 دولار/أونصة"
```

## 4. Agent 协作系统

### 4.1 Agent 架构设计

**三个核心 Agent**:

```text
                    ┌─────────────────────────────────┐
                    │     Agent Orchestrator          │
                    │   (Step Functions 编排)          |
                    └─────────────────────────────────┘
                                  │
                ┌─────────────────┼─────────────────┐
                │                 │                 │
                ▼                 ▼                 ▼
        ┌───────────────┐ ┌───────────────┐ ┌───────────────┐
        │  CIO Agent    │ │ Search Agent  │ │Product Agent  │
        │               │ │               │ │               │
        │  权威观点      │  │  市场新闻      │ │  产品推荐      │
        │  权重: 50%     │ │  权重: 30%    │ │  权重: 20%     │
        └───────────────┘ └───────────────┘ └───────────────┘
                │                 │                 │
                ▼                 ▼                 ▼
        ┌───────────────┐ ┌───────────────┐ ┌───────────────┐
        │  Bedrock KB   │ │ MCP Connector │ │ RDS Product   │
        │ (CIO Reports) │ │  (Bloomberg)  │ │   Catalog     │
        └───────────────┘ └───────────────┘ └───────────────┘
```


### 4.2 CIOAgent 节点实现

**功能**: 检索并解读 HSBC CIO 研究报告

```python
# Lambda: cio-agent
import boto3
import json

bedrock_agent = boto3.client('bedrock-agent-runtime')
bedrock = boto3.client('bedrock-runtime')

def lambda_handler(event, context):
    """
    CIOAgent 节点主函数
    
    输入:
    {
        "query": "黄金投资观点",
        "asset_class": "gold",
        "user_language": "zh-CN"
    }
    
    输出:
    {
        "cio_view": "超配",
        "target_price": "$2,100",
        "reasoning": "...",
        "source": "CIO 2024 Q4 Report, Page 23",
        "confidence": 0.92
    }
    """
    query = event['query']
    asset_class = event.get('asset_class', '')
    user_language = event.get('user_language', 'zh-CN')
    
    # 1. 调用 Bedrock Knowledge Base 检索
    kb_response = bedrock_agent.retrieve_and_generate(
        input={'text': f"{asset_class} investment outlook"},
        retrieveAndGenerateConfiguration={
            'type': 'KNOWLEDGE_BASE',
            'knowledgeBaseConfiguration': {
                'knowledgeBaseId': 'HSBC_CIO_KB_ID',
                'modelArn': 'arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-5-sonnet-20241022-v2:0',
                'retrievalConfiguration': {
                    'vectorSearchConfiguration': {
                        'numberOfResults': 5,
                        'overrideSearchType': 'HYBRID'  # 混合检索
                    }
                }
            }
        }
    )
    
    # 2. 提取检索结果
    retrieved_docs = kb_response['citations']
    cio_content = kb_response['output']['text']
    
    # 3. 使用 Claude 生成结构化回答
    prompt = f"""
    基于以下 HSBC CIO 报告内容，提取关键投资观点。
    
    CIO 报告内容:
    {cio_content}
    
    要求:
    1. 提取资产评级（超配/标配/低配）
    2. 提取目标价格（如有）
    3. 提取核心理由（3条以内）
    4. 必须引用原文页码
    5. 用{user_language}语言回答
    
    输出 JSON 格式:
    {{
        "rating": "超配/标配/低配",
        "target_price": "$X,XXX",
        "reasoning": ["理由1", "理由2", "理由3"],
        "source": "CIO 2024 QX Report, Page XX",
        "confidence": 0.XX
    }}
    """
    
    response = bedrock.invoke_model(
        modelId='anthropic.claude-3-5-sonnet-20241022-v2:0',
        body=json.dumps({
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 2000,
            "messages": [{"role": "user", "content": prompt}]
        })
    )
    
    result = json.loads(response['body'].read())
    cio_view = json.loads(result['content'][0]['text'])
    
    # 4. 添加引用来源
    cio_view['citations'] = [
        {
            'type': 'cio_report',
            'title': doc['retrievedReferences'][0]['location']['s3Location']['uri'],
            'page': doc['retrievedReferences'][0]['location'].get('page', 'N/A')
        }
        for doc in retrieved_docs
    ]
    
    return {
        'statusCode': 200,
        'body': json.dumps(cio_view, ensure_ascii=False)
    }


### 4.3 SearchAgent 节点实现
功能: 通过 MCP 连接外部新闻源（Bloomberg/Reuters）

```python
# Lambda: search-agent
import boto3
import json
import requests
from datetime import datetime, timedelta

secrets_manager = boto3.client('secretsmanager')
bedrock = boto3.client('bedrock-runtime')

def lambda_handler(event, context):
    """
    SearchAgent 节点主函数
    
    输入:
    {
        "query": "黄金价格",
        "keywords": ["gold", "federal reserve"],
        "time_range": "24h"
    }
    
    输出:
    {
        "news": [
            {
                "headline": "美联储暗示暂停加息",
                "source": "Bloomberg",
                "timestamp": "2024-12-19 14:30 UTC",
                "summary": "...",
                "url": "https://..."
            }
        ],
        "market_sentiment": "positive",
        "confidence": 0.85
    }
    """
    query = event['query']
    keywords = event.get('keywords', [])
    time_range = event.get('time_range', '24h')
    
    # 1. 获取 Bloomberg API Key (通过 Secrets Manager)
    secret = secrets_manager.get_secret_value(SecretId='bloomberg-api-key')
    api_key = json.loads(secret['SecretString'])['api_key']
    
    # 2. 调用 Bloomberg API (通过 MCP)
    news_results = search_bloomberg_news(
        keywords=keywords,
        time_range=time_range,
        api_key=api_key
    )
    
    # 3. 使用 Claude 进行新闻摘要和情感分析
    news_text = "\n\n".join([
        f"标题: {n['headline']}\n内容: {n['body']}"
        for n in news_results[:5]
    ])
    
    prompt = f"""
    分析以下财经新闻，提取关键信息。
    
    新闻内容:
    {news_text}
    
    要求:
    1. 总结核心事件（50字以内）
    2. 判断市场情绪（positive/neutral/negative）
    3. 提取对{query}的影响
    
    输出 JSON 格式:
    {{
        "summary": "核心事件总结",
        "sentiment": "positive/neutral/negative",
        "impact_on_asset": "影响分析",
        "confidence": 0.XX
    }}
    """
    
    response = bedrock.invoke_model(
        modelId='anthropic.claude-3-5-sonnet-20241022-v2:0',
        body=json.dumps({
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 1500,
            "messages": [{"role": "user", "content": prompt}]
        })
    )
    
    result = json.loads(response['body'].read())
    analysis = json.loads(result['content'][0]['text'])
    
    # 4. 组装返回结果
    return {
        'statusCode': 200,
        'body': json.dumps({
            'news': [
                {
                    'headline': n['headline'],
                    'source': 'Bloomberg',
                    'timestamp': n['published_at'],
                    'summary': n['summary'],
                    'url': n['url']
                }
                for n in news_results[:3]
            ],
            'analysis': analysis,
            'citations': [
                {
                    'type': 'news',
                    'source': 'Bloomberg',
                    'timestamp': news_results[0]['published_at']
                }
            ]
        }, ensure_ascii=False)
    }

def search_bloomberg_news(keywords, time_range, api_key):
    """调用 Bloomberg API"""
    # 计算时间范围
    hours = int(time_range.replace('h', ''))
    start_time = (datetime.utcnow() - timedelta(hours=hours)).isoformat()
    
    # MCP 连接配置
    mcp_endpoint = "https://mcp.bloomberg.com/v1/news/search"
    
    response = requests.post(
        mcp_endpoint,
        headers={
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json'
        },
        json={
            'query': ' '.join(keywords),
            'start_time': start_time,
            'limit': 10
        }
    )
    
    return response.json()['results']
```

### 4.4 ProductAgent 节点实现
功能: 查询 HSBC 产品目录，推荐合适产品

```python
# Lambda: product-agent
import boto3
import json

rds_data = boto3.client('rds-data')
bedrock = boto3.client('bedrock-runtime')

def lambda_handler(event, context):
    """
    ProductAgent 节点主函数
    
    输入:
    {
        "asset_class": "gold",
        "user_risk_level": "R3",
        "investment_amount": 10000
    }
    
    输出:
    {
        "products": [
            {
                "name": "SPDR Gold ETF (GLD)",
                "type": "ETF",
                "min_investment": 200,
                "management_fee": "0.40%",
                "risk_level": "R3",
                "liquidity": "high"
            }
        ],
        "recommendation": "基于您的风险等级...",
        "confidence": 0.88
    }
    """
    asset_class = event['asset_class']
    user_risk_level = event.get('user_risk_level', 'R3')
    investment_amount = event.get('investment_amount', 0)
    
    # 1. 查询 RDS Aurora 产品目录
    sql = """
    SELECT 
        product_id, product_name, product_type, 
        min_investment, management_fee, risk_level,
        liquidity, description
    FROM hsbc_products
    WHERE asset_class = :asset_class
      AND risk_level <= :user_risk_level
      AND min_investment <= :investment_amount
      AND status = 'active'
    ORDER BY popularity DESC
    LIMIT 5
    """
    
    response = rds_data.execute_statement(
        resourceArn='arn:aws:rds:us-east-1:xxx:cluster:hsbc-wealth-db',
        secretArn='arn:aws:secretsmanager:us-east-1:xxx:secret:rds-password',
        database='wealth_management',
        sql=sql,
        parameters=[
            {'name': 'asset_class', 'value': {'stringValue': asset_class}},
            {'name': 'user_risk_level', 'value': {'stringValue': user_risk_level}},
            {'name': 'investment_amount', 'value': {'longValue': investment_amount}}
        ]
    )
    
    products = parse_rds_response(response['records'])
    
    # 2. 使用 Claude 生成产品推荐理由
    products_text = "\n".join([
        f"- {p['product_name']}: {p['description']}"
        for p in products
    ])
    
    prompt = f"""
    基于以下产品信息，为客户生成推荐理由。
    
    客户情况:
    - 风险等级: {user_risk_level}
    - 投资金额: ${investment_amount}
    - 关注资产: {asset_class}
    
    可选产品:
    {products_text}
    
    要求:
    1. 推荐最合适的1-2个产品
    2. 说明推荐理由（流动性、费用、风险匹配）
    3. 提示注意事项
    
    输出 JSON 格式:
    {{
        "recommended_products": ["产品1", "产品2"],
        "reasoning": "推荐理由",
        "considerations": "注意事项"
    }}
    """
    
    response = bedrock.invoke_model(
        modelId='anthropic.claude-3-5-sonnet-20241022-v2:0',
        body=json.dumps({
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 1500,
            "messages": [{"role": "user", "content": prompt}]
        })
    )
    
    result = json.loads(response['body'].read())
    recommendation = json.loads(result['content'][0]['text'])
    
    return {
        'statusCode': 200,
        'body': json.dumps({
            'products': products,
            'recommendation': recommendation,
            'citations': [
                {
                    'type': 'product_catalog',
                    'source': 'HSBC Product Database'
                }
            ]
        }, ensure_ascii=False)
    }

def parse_rds_response(records):
    """解析 RDS Data API 响应"""
    products = []
    for record in records:
        products.append({
            'product_id': record[0]['stringValue'],
            'product_name': record[1]['stringValue'],
            'product_type': record[2]['stringValue'],
            'min_investment': record[3]['longValue'],
            'management_fee': record[4]['stringValue'],
            'risk_level': record[5]['stringValue'],
            'liquidity': record[6]['stringValue'],
            'description': record[7]['stringValue']
        })
    return products
```

### 4.5 AgentConsensus 节点实现
功能: 融合多个 Agent 的结果，生成最终回答

```python
# Lambda: agent-consensus
import json

def lambda_handler(event, context):
    """
    Agent 共识机制
    
    输入:
    {
        "cio_agent_result": {...},
        "search_agent_result": {...},
        "product_agent_result": {...},
        "user_profile": {...}
    }
    
    输出:
    {
        "consensus": {
            "primary_view": "CIO 观点",
            "supporting_evidence": "新闻支持",
            "action_items": "产品推荐"
        },
        "confidence": 0.90,
        "citations": [...]
    }
    """
    cio_result = event['cio_agent_result']
    search_result = event['search_agent_result']
    product_result = event['product_agent_result']
    user_profile = event['user_profile']
    
    # 1. 定义投票权重
    weights = {
        'cio': 0.50,      # CIO 观点最重要
        'search': 0.30,   # 新闻作为补充
        'product': 0.20   # 产品推荐权重最低
    }
    
    # 2. 计算综合置信度
    confidence = (
        cio_result.get('confidence', 0) * weights['cio'] +
        search_result.get('analysis', {}).get('confidence', 0) * weights['search'] +
        product_result.get('confidence', 0) * weights['product']
    )
    
    # 3. 检查一致性
    consistency_check = check_consistency(
        cio_view=cio_result.get('rating'),
        market_sentiment=search_result.get('analysis', {}).get('sentiment')
    )
    
    # 4. 生成共识结果
    consensus = {
        'primary_view': {
            'source': 'CIO',
            'rating': cio_result.get('rating'),
            'target_price': cio_result.get('target_price'),
            'reasoning': cio_result.get('reasoning', [])
        },
        'market_context': {
            'source': 'Market News',
            'sentiment': search_result.get('analysis', {}).get('sentiment'),
            'summary': search_result.get('analysis', {}).get('summary'),
            'recent_news': search_result.get('news', [])[:2]
        },
        'action_items': {
            'source': 'Product Catalog',
            'recommended_products': product_result.get('recommendation', {}).get('recommended_products', []),
            'reasoning': product_result.get('recommendation', {}).get('reasoning')
        },
        'consistency': consistency_check,
        'confidence': confidence
    }
    
    # 5. 合并所有引用来源
    all_citations = []
    all_citations.extend(cio_result.get('citations', []))
    all_citations.extend(search_result.get('citations', []))
    all_citations.extend(product_result.get('citations', []))
    
    return {
        'statusCode': 200,
        'body': json.dumps({
            'consensus': consensus,
            'confidence': confidence,
            'citations': all_citations
        }, ensure_ascii=False)
    }

def check_consistency(cio_view, market_sentiment):
    """
    检查 CIO 观点与市场情绪的一致性
    
    一致性矩阵:
    CIO超配 + 市场positive = 高度一致
    CIO超配 + 市场negative = 需要解释
    """
    consistency_matrix = {
        ('超配', 'positive'): {'level': 'high', 'note': 'CIO 观点与市场情绪一致'},
        ('超配', 'neutral'): {'level': 'medium', 'note': '市场观望，但 CIO 看好'},
        ('超配', 'negative'): {'level': 'low', 'note': '⚠️ CIO 看好但市场悲观，需谨慎'},
        ('标配', 'positive'): {'level': 'medium', 'note': '市场乐观，CIO 保持中性'},
        ('标配', 'neutral'): {'level': 'high', 'note': 'CIO 与市场观点一致'},
        ('标配', 'negative'): {'level': 'medium', 'note': '市场悲观，CIO 保持中性'},
        ('低配', 'positive'): {'level': 'low', 'note': '⚠️ 市场乐观但 CIO 看淡，需关注'},
        ('低配', 'neutral'): {'level': 'medium', 'note': 'CIO 看淡，市场观望'},
        ('低配', 'negative'): {'level': 'high', 'note': 'CIO 观点与市场情绪一致'}
    }
    
    return consistency_matrix.get((cio_view, market_sentiment), {
        'level': 'unknown',
        'note': '无法判断一致性'
    })
```

### 4.6 Step Functions 工作流定义

Step Functions 是完全托管的AWS云服务。它的核心是定义一个状态机 (State Machine)，所使用的语言是 Amazon States Language (ASL)

完整的 Agent 编排流程:

```json
{
  "Comment": "HSBC AI Wealth - Agent Orchestration Workflow",
  "StartAt": "IntentClassification",
  "States": {
    "IntentClassification": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:xxx:function:intent-classification",
      "Next": "LoadUserContext"
    },
    "LoadUserContext": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:xxx:function:load-context",
      "Next": "ParallelAgentExecution"
    },
    "ParallelAgentExecution": {
      "Type": "Parallel",
      "Branches": [
        {
          "StartAt": "CIOAgent",
          "States": {
            "CIOAgent": {
              "Type": "Task",
              "Resource": "arn:aws:lambda:us-east-1:xxx:function:cio-agent",
              "End": true
            }
          }
        },
        {
          "StartAt": "SearchAgent",
          "States": {
            "SearchAgent": {
              "Type": "Task",
              "Resource": "arn:aws:lambda:us-east-1:xxx:function:search-agent",
              "End": true
            }
          }
        },
        {
          "StartAt": "ProductAgent",
          "States": {
            "ProductAgent": {
              "Type": "Task",
              "Resource": "arn:aws:lambda:us-east-1:xxx:function:product-agent",
              "End": true
            }
          }
        }
      ],
      "Next": "AgentConsensus"
    },
    "AgentConsensus": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:xxx:function:agent-consensus",
      "Next": "GenerateResponse"
    },
    "GenerateResponse": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:xxx:function:response-generator",
      "ResultPath": "$.response",
      "Next": "DeliverResponse"
    },
    "DeliverResponse": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:xxx:function:deliver-response",
      "Next": "AsyncProcessing"
    },
    "AsyncProcessing": {
      "Type": "Parallel",
      "End": true,
      "Branches": [
        {
          "StartAt": "CheckCompliance",
          "States": {
            "CheckCompliance": {
              "Type": "Choice",
              "Choices": [
                {
                  "Variable": "$.response.requires_rm_review",
                  "BooleanEquals": true,
                  "Next": "EscalateToRM"
                }
              ],
              "Default": "CompliancePass"
            },
            "EscalateToRM": {
              "Type": "Task",
              "Resource": "arn:aws:lambda:us-east-1:xxx:function:escalate-to-rm",
              "End": true
            },
            "CompliancePass": {
              "Type": "Pass",
              "End": true
            }
          }
        },
        {
          "StartAt": "OpportunityDetection",
          "States": {
            "OpportunityDetection": {
              "Type": "Task",
              "Resource": "arn:aws:lambda:us-east-1:xxx:function:opportunity-detector",
              "End": true
            }
          }
        }
      ]
    }
  }
}
```

## 5. RAG 系统设计

### 5.1 Knowledge Base 架构
数据源组织:

```
S3 Bucket: hsbc-wealth-knowledge-base/
├── cio-reports/
│   ├── quarterly/
│   │   ├── 2024-Q4/
│   │   │   ├── global-outlook.pdf
│   │   │   ├── asia-outlook.pdf
│   │   │   └── metadata.json
│   │   ├── 2024-Q3/
│   │   └── ...
│   └── daily/
│       ├── 2024-12-19-gold-update.pdf
│       └── ...
├── product-docs/
│   ├── etf/
│   │   ├── GLD-prospectus.pdf
│   │   └── ...
│   ├── funds/
│   └── structured-products/
└── research-notes/
    ├── macro-analysis/
    └── sector-reports/
```

### 5.2 Bedrock Knowledge Base 配置

```python
# 创建 Knowledge Base
import boto3

bedrock_agent = boto3.client('bedrock-agent')

kb_response = bedrock_agent.create_knowledge_base(
    name='hsbc-cio-knowledge-base',
    description='HSBC CIO 研究报告和产品文档库',
    roleArn='arn:aws:iam::xxx:role/BedrockKnowledgeBaseRole',
    knowledgeBaseConfiguration={
        'type': 'VECTOR',
        'vectorKnowledgeBaseConfiguration': {
            'embeddingModelArn': 'arn:aws:bedrock:us-east-1::foundation-model/amazon.titan-embed-text-v2:0'
        }
    },
    storageConfiguration={
        'type': 'OPENSEARCH_SERVERLESS',
        'opensearchServerlessConfiguration': {
            'collectionArn': 'arn:aws:aoss:us-east-1:xxx:collection/hsbc-kb',
            'vectorIndexName': 'hsbc-cio-index',
            'fieldMapping': {
                'vectorField': 'embedding',
                'textField': 'text',
                'metadataField': 'metadata'
            }
        }
    }
)

kb_id = kb_response['knowledgeBase']['knowledgeBaseId']

# 添加数据源
ds_response = bedrock_agent.create_data_source(
    knowledgeBaseId=kb_id,
    name='cio-reports-datasource',
    dataSourceConfiguration={
        'type': 'S3',
        's3Configuration': {
            'bucketArn': 'arn:aws:s3:::hsbc-wealth-knowledge-base',
            'inclusionPrefixes': ['cio-reports/']
        }
    },
    vectorIngestionConfiguration={
        'chunkingConfiguration': {
            'chunkingStrategy': 'SEMANTIC',
            'semanticChunkingConfiguration': {
                'maxTokens': 300,
                'bufferSize': 20,
                'breakpointPercentileThreshold': 95
            }
        },
        'parsingConfiguration': {
            'parsingStrategy': 'BEDROCK_FOUNDATION_MODEL',
            'bedrockFoundationModelConfiguration': {
                'modelArn': 'arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-sonnet-20240229-v1:0'
            }
        }
    }
)
```

### 5.3 元数据增强
为每个文档添加丰富的元数据:

```python
# Lambda: enrich-document-metadata
import boto3
import json
from datetime import datetime

s3 = boto3.client('s3')
bedrock = boto3.client('bedrock-runtime')

def lambda_handler(event, context):
    """
    S3 触发器: 当新 PDF 上传时自动提取元数据
    
    触发条件: s3:ObjectCreated:* on hsbc-wealth-knowledge-base/cio-reports/
    """
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']
    
    # 1. 下载 PDF
    pdf_obj = s3.get_object(Bucket=bucket, Key=key)
    pdf_content = pdf_obj['Body'].read()
    
    # 2. 使用 Textract 提取文本
    textract = boto3.client('textract')
    textract_response = textract.analyze_document(
        Document={'Bytes': pdf_content},
        FeatureTypes=['TABLES', 'FORMS']
    )
    
    full_text = extract_text_from_textract(textract_response)
    
    # 3. 使用 Claude 提取元数据
    prompt = f"""
    分析以下 CIO 报告，提取关键元数据。
    
    报告内容（前2000字）:
    {full_text[:2000]}
    
    提取以下信息:
    1. 报告标题
    2. 发布日期
    3. 涉及的资产类别（股票/债券/黄金/外汇等）
    4. 涉及的地区（全球/美国/欧洲/亚洲等）
    5. 核心观点摘要（100字以内）
    6. 关键数字（目标价、预测等）
    
    输出 JSON 格式:
    {{
        "title": "报告标题",
        "publication_date": "YYYY-MM-DD",
        "asset_classes": ["gold", "equity"],
        "regions": ["global", "asia"],
        "summary": "核心观点摘要",
        "key_figures": {{"gold_target": "$2,100"}}
    }}
    """
    
    response = bedrock.invoke_model(
        modelId='anthropic.claude-3-5-sonnet-20241022-v2:0',
        body=json.dumps({
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 2000,
            "messages": [{"role": "user", "content": prompt}]
        })
    )
    
    result = json.loads(response['body'].read())
    metadata = json.loads(result['content'][0]['text'])
    
    # 4. 保存元数据到 S3
    metadata_key = key.replace('.pdf', '_metadata.json')
    s3.put_object(
        Bucket=bucket,
        Key=metadata_key,
        Body=json.dumps(metadata, ensure_ascii=False, indent=2),
        ContentType='application/json'
    )
    
    # 5. 触发 Knowledge Base 同步
        bedrock_agent.start_ingestion_job(
        knowledgeBaseId=kb_id,
        dataSourceId=ds_response['dataSource']['dataSourceId']
    )
    
    return {
        'statusCode': 200,
        'body': json.dumps({
            'message': 'Metadata extracted and KB sync triggered',
            'metadata': metadata
        }, ensure_ascii=False)
    }

def extract_text_from_textract(textract_response):
    """从 Textract 响应中提取纯文本"""
    text_blocks = []
    for block in textract_response['Blocks']:
        if block['BlockType'] == 'LINE':
            text_blocks.append(block['Text'])
    return '\n'.join(text_blocks)
```

### 5.4 检索优化策略
混合检索（Hybrid Search）:

```python
# Lambda: optimized-retrieval
import boto3
import json

bedrock_agent = boto3.client('bedrock-agent-runtime')
opensearch = boto3.client('opensearchserverless')

def lambda_handler(event, context):
    """
    优化的检索策略
    
    策略:
    1. 向量检索（语义相似度）
    2. 关键词检索（精确匹配）
    3. 元数据过滤（时间、资产类别）
    4. 重排序（Rerank）
    """
    query = event['query']
    filters = event.get('filters', {})
    
    # 1. Bedrock Knowledge Base 检索（向量 + 混合）
    kb_response = bedrock_agent.retrieve(
        knowledgeBaseId='HSBC_CIO_KB_ID',
        retrievalQuery={'text': query},
        retrievalConfiguration={
            'vectorSearchConfiguration': {
                'numberOfResults': 10,
                'overrideSearchType': 'HYBRID',  # 混合检索
                'filter': build_metadata_filter(filters)
            }
        }
    )
    
    # 2. 提取检索结果
    results = []
    for result in kb_response['retrievalResults']:
        results.append({
            'content': result['content']['text'],
            'score': result['score'],
            'location': result['location'],
            'metadata': result.get('metadata', {})
        })
    
    # 3. 使用 Claude 进行重排序
    reranked_results = rerank_with_claude(query, results)
    
    return {
        'statusCode': 200,
        'body': json.dumps({
            'results': reranked_results[:5],  # 返回 Top 5
            'total_found': len(results)
        }, ensure_ascii=False)
    }

def build_metadata_filter(filters):
    """构建元数据过滤器"""
    filter_conditions = []
    
    if 'asset_class' in filters:
        filter_conditions.append({
            'equals': {
                'key': 'asset_class',
                'value': filters['asset_class']
            }
        })
    
    if 'date_from' in filters:
        filter_conditions.append({
            'greaterThanOrEquals': {
                'key': 'publication_date',
                'value': filters['date_from']
            }
        })
    
    if len(filter_conditions) == 0:
        return None
    
    return {
        'andAll': filter_conditions
    }

def rerank_with_claude(query, results):
    """使用 Claude 对检索结果重排序"""
    bedrock = boto3.client('bedrock-runtime')
    
    # 构建重排序 prompt
    results_text = "\n\n".join([
        f"[{i+1}] {r['content'][:500]}..."
        for i, r in enumerate(results)
    ])
    
    prompt = f"""
    用户查询: {query}
    
    以下是检索到的文档片段，请根据与查询的相关性重新排序。
    
    {results_text}
    
    输出格式: 返回最相关的文档编号列表，如 [3, 1, 5, 2, 4]
    """
    
    response = bedrock.invoke_model(
        modelId='anthropic.claude-3-5-sonnet-20241022-v2:0',
        body=json.dumps({
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 500,
            "messages": [{"role": "user", "content": prompt}]
        })
    )
    
    result = json.loads(response['body'].read())
    ranking = json.loads(result['content'][0]['text'])
    
    # 按新排序返回结果
    return [results[i-1] for i in ranking if i <= len(results)]
```

## 6. Memory 系统设计

### 6.1 双层记忆架构

```text
┌─────────────────────────────────────────────────────────┐
│                    Memory System                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────────────┐  ┌──────────────────────┐     │
│  │  Short-term Memory   │  │  Long-term Memory    │     │
│  │  (DynamoDB)          │  │  (RDS Aurora)        │     │
│  │                      │  │                      │     │
│  │ - 会话上下文           │  │ - 客户画像            │     │
│  │ - 最近5轮对话          │  │ - 投资偏好            │     │
│  │ - TTL: 1小时          │  │ - 生活事件            │     │
│  │ - 实时读写            │  │ - 历史对话向量         │     │
│  └──────────────────────┘  └──────────────────────┘     │
│           ↓                          ↓                  │
│  ┌──────────────────────────────────────────────────┐   │
│  │         Memory Activation Engine                 │   │
│  │         (Lambda + OpenSearch)                    │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### 6.2 短期记忆实现（DynamoDB）
表结构设计:

```json
# DynamoDB Table: conversation_sessions
{
    "session_id": "sess_12345_20241219",  # Partition Key
    "timestamp": 1702987654,              # Sort Key
    "user_id": "customer_12345",
    "conversation_history": [
        {
            "turn": 1,
            "timestamp": "2024-12-19T10:30:00Z",
            "user_message": "黄金现在能买吗？",
            "assistant_message": "根据 HSBC CIO 最新观点...",
            "intent": "investment_advice",
            "entities": {
                "asset_class": "gold",
                "sentiment": "curious"
            }
        },
        {
            "turn": 2,
            "timestamp": "2024-12-19T10:32:00Z",
            "user_message": "那我该买多少？",
            "assistant_message": "建议配置 5-10%...",
            "intent": "portfolio_allocation",
            "entities": {
                "asset_class": "gold",
                "amount_range": "5-10%"
            }
        }
    ],
    "context_summary": "客户询问黄金投资，关注美联储加息影响，风险等级 R3",
    "detected_intents": ["investment_advice", "portfolio_allocation"],
    "ttl": 1703001254  # 1小时后过期
}
```

### 短期记忆操作:

```python
# Lambda: short-term-memory-manager
import boto3
import json
from datetime import datetime, timedelta

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('conversation_sessions')

def save_conversation_turn(session_id, user_id, user_message, assistant_message, metadata):
    """保存一轮对话到短期记忆"""
    
    # 1. 获取当前会话
    response = table.get_item(Key={'session_id': session_id})
    
    if 'Item' in response:
        session = response['Item']
    else:
        # 创建新会话
        session = {
            'session_id': session_id,
            'user_id': user_id,
            'conversation_history': [],
            'detected_intents': [],
            'ttl': int((datetime.utcnow() + timedelta(hours=1)).timestamp())
        }
    
    # 2. 添加新的对话轮次
    turn = {
        'turn': len(session['conversation_history']) + 1,
        'timestamp': datetime.utcnow().isoformat(),
        'user_message': user_message,
        'assistant_message': assistant_message,
        'intent': metadata.get('intent'),
        'entities': metadata.get('entities', {})
    }
    
    session['conversation_history'].append(turn)
    session['detected_intents'].append(metadata.get('intent'))
    
    # 3. 生成上下文摘要（使用 Claude）
    if len(session['conversation_history']) >= 3:
        session['context_summary'] = generate_context_summary(
            session['conversation_history']
        )
    
    # 4. 保存到 DynamoDB
    table.put_item(Item=session)
    
    return session

def get_session_context(session_id):
    """获取会话上下文"""
    response = table.get_item(Key={'session_id': session_id})
    
    if 'Item' not in response:
        return None
    
    session = response['Item']
    
    # 格式化为 Claude 可用的上下文
    context = {
        'recent_turns': session['conversation_history'][-5:],  # 最近5轮
        'summary': session.get('context_summary', ''),
        'detected_intents': list(set(session['detected_intents']))
    }
    
    return context

def generate_context_summary(conversation_history):
    """使用 Claude 生成对话摘要"""
    bedrock = boto3.client('bedrock-runtime')
    
    conversation_text = "\n".join([
        f"用户: {turn['user_message']}\nAI: {turn['assistant_message']}"
        for turn in conversation_history
    ])
    
    prompt = f"""
    总结以下对话的核心内容（50字以内）:
    
    {conversation_text}
    
    输出格式: 一句话总结
    """
    
    response = bedrock.invoke_model(
        modelId='anthropic.claude-3-haiku-20240307-v1:0',  # 使用 Haiku 快速生成
        body=json.dumps({
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 200,
            "messages": [{"role": "user", "content": prompt}]
        })
    )
    
    result = json.loads(response['body'].read())
    return result['content'][0]['text']

def archive_session_to_long_term(session_id):
    """
    会话结束时，将短期记忆归档到长期记忆
    
    触发条件:
    - 会话超时（1小时无活动）
    - 用户主动结束会话
    - 检测到重要对话（高置信度 Opportunity）
    """
    # 1. 从 DynamoDB 获取会话
    response = table.get_item(Key={'session_id': session_id})
    if 'Item' not in response:
        return
    
    session = response['Item']
    user_id = session['user_id']
    conversation_summary = session.get('context_summary', '')
    detected_intents = session.get('detected_intents', [])
    
    # 2. 生成对话向量（用于未来相似对话检索）
    embedding = generate_embedding(conversation_summary)
    
    # 3. 保存到 RDS 长期记忆
    save_conversation_vector(
        customer_id=user_id,
        conversation_summary=conversation_summary,
        embedding=embedding,
        intent_tags=detected_intents
    )
    
    # 4. 更新客户偏好（从对话中推断）
    update_customer_preferences(
        customer_id=user_id,
        conversation_summary=conversation_summary,
        detected_intents=detected_intents
    )
    
    # 5. 可选：删除 DynamoDB 中的会话（或等待 TTL 自动过期）
    # table.delete_item(Key={'session_id': session_id})
    
    return {'status': 'archived', 'session_id': session_id}

def save_conversation_vector(customer_id, conversation_summary, embedding, intent_tags):
    """保存对话向量到 RDS"""
    conn = get_db_connection()
    cur = conn.cursor()
    
    sql = """
    INSERT INTO conversation_vectors 
    (customer_id, conversation_date, conversation_summary, embedding, intent_tags)
    VALUES (%s, CURRENT_DATE, %s, %s, %s)
    """
    
    cur.execute(sql, (customer_id, conversation_summary, embedding, intent_tags))
    conn.commit()
    cur.close()
    conn.close()
```

### 6.3 长期记忆实现（RDS Aurora）
数据库表结构:

```sql
-- 客户画像表
CREATE TABLE customer_profiles (
    customer_id VARCHAR(50) PRIMARY KEY,
    risk_level VARCHAR(10) NOT NULL,  -- R1-R5
    investment_experience VARCHAR(20),  -- beginner/intermediate/advanced
    preferred_language VARCHAR(10) DEFAULT 'zh-CN',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 客户偏好表
CREATE TABLE customer_preferences (
    preference_id SERIAL PRIMARY KEY,
    customer_id VARCHAR(50) REFERENCES customer_profiles(customer_id),
    preference_type VARCHAR(50),  -- blacklist/whitelist/life_event
    preference_value TEXT,
    confidence DECIMAL(3,2),  -- 0.00-1.00
    source VARCHAR(50),  -- explicit/inferred
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_customer_type (customer_id, preference_type)
);

-- 示例数据
INSERT INTO customer_preferences (customer_id, preference_type, preference_value, confidence, source) VALUES
('customer_12345', 'blacklist', '不投资烟草股', 1.00, 'explicit'),
('customer_12345', 'whitelist', '偏好 ESG 投资', 0.85, 'inferred'),
('customer_12345', 'life_event', '2026年9月子女留学', 0.95, 'explicit');

-- 对话历史向量表（用于相似对话检索）
CREATE TABLE conversation_vectors (
    vector_id SERIAL PRIMARY KEY,
    customer_id VARCHAR(50) REFERENCES customer_profiles(customer_id),
    conversation_date DATE,
    conversation_summary TEXT,
    embedding vector(1536),  -- 使用 pgvector 扩展
    intent_tags TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_customer_date (customer_id, conversation_date)
);

-- 创建向量索引（加速相似度搜索）
CREATE INDEX ON conversation_vectors USING ivfflat (embedding vector_cosine_ops);
```

### 长期记忆操作:

```python
# Lambda: long-term-memory-manager
import boto3
import json
import psycopg2
from pgvector.psycopg2 import register_vector

rds_data = boto3.client('rds-data')
secrets_manager = boto3.client('secretsmanager')
bedrock = boto3.client('bedrock-runtime')

def get_customer_profile(customer_id):
    """获取客户完整画像"""
    
    # 1. 获取基本信息
    sql_profile = """
    SELECT risk_level, investment_experience, preferred_language
    FROM customer_profiles
    WHERE customer_id = :customer_id
    """
    
    profile_response = rds_data.execute_statement(
        resourceArn='arn:aws:rds:us-east-1:xxx:cluster:hsbc-wealth-db',
        secretArn='arn:aws:secretsmanager:us-east-1:xxx:secret:rds-password',
        database='wealth_management',
        sql=sql_profile,
        parameters=[{'name': 'customer_id', 'value': {'stringValue': customer_id}}]
    )
    
    profile = parse_rds_record(profile_response['records'][0])
    
    # 2. 获取偏好和禁忌
    sql_preferences = """
    SELECT preference_type, preference_value, confidence
    FROM customer_preferences
    WHERE customer_id = :customer_id
    ORDER BY confidence DESC
    """
    
    pref_response = rds_data.execute_statement(
        resourceArn='arn:aws:rds:us-east-1:xxx:cluster:hsbc-wealth-db',
        secretArn='arn:aws:secretsmanager:us-east-1:xxx:secret:rds-password',
        database='wealth_management',
        sql=sql_preferences,
        parameters=[{'name': 'customer_id', 'value': {'stringValue': customer_id}}]
    )
    
    preferences = {
        'blacklist': [],
        'whitelist': [],
        'life_events': []
    }
    
    for record in pref_response['records']:
        pref = parse_rds_record(record)
        if pref['preference_type'] == 'blacklist':
            preferences['blacklist'].append(pref['preference_value'])
        elif pref['preference_type'] == 'whitelist':
            preferences['whitelist'].append(pref['preference_value'])
        elif pref['preference_type'] == 'life_event':
            preferences['life_events'].append(pref['preference_value'])
    
    return {
        'customer_id': customer_id,
        'risk_level': profile['risk_level'],
        'experience': profile['investment_experience'],
        'language': profile['preferred_language'],
        'preferences': preferences
    }

def search_similar_conversations(customer_id, current_query):
    """检索相似的历史对话"""
    
    # 1. 将当前查询向量化
    query_embedding = generate_embedding(current_query)
    
    # 2. 使用 pgvector 进行相似度搜索
    conn = get_db_connection()
    cur = conn.cursor()
    
    sql = """
    SELECT conversation_summary, intent_tags, conversation_date,
           1 - (embedding <=> %s::vector) AS similarity
    FROM conversation_vectors
    WHERE customer_id = %s
    ORDER BY embedding <=> %s::vector
    LIMIT 5
    """
    
    cur.execute(sql, (query_embedding, customer_id, query_embedding))
    results = cur.fetchall()
    
    similar_conversations = [
        {
            'summary': row[0],
            'intents': row[1],
            'date': row[2].isoformat(),
            'similarity': float(row[3])
        }
        for row in results
        if row[3] > 0.7  # 相似度阈值
    ]
    
    cur.close()
    conn.close()
    
    return similar_conversations

def update_customer_preferences(customer_id, conversation_summary, detected_intents):
    """从对话中推断并更新客户偏好"""
    
    # 1. 使用 Claude 分析对话，提取隐含偏好
    prompt = f"""
    分析以下对话，提取客户的投资偏好或生活事件。
    
    对话摘要: {conversation_summary}
    
    提取以下信息:
    1. 明确表达的偏好（如"我不投资烟草"）
    2. 隐含的偏好（如多次询问 ESG 产品）
    3. 生活事件（如"明年孩子出国留学"）
    
    输出 JSON 格式:
    {{
        "explicit_preferences": ["偏好1", "偏好2"],
        "implicit_preferences": ["偏好3"],
        "life_events": ["事件1"]
    }}
    """
    
    response = bedrock.invoke_model(
        modelId='anthropic.claude-3-5-sonnet-20241022-v2:0',
        body=json.dumps({
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 1000,
            "messages": [{"role": "user", "content": prompt}]
        })
    )
    
    result = json.loads(response['body'].read())
    extracted_prefs = json.loads(result['content'][0]['text'])
    
    # 2. 保存到数据库
    for pref in extracted_prefs.get('explicit_preferences', []):
        save_preference(customer_id, 'whitelist', pref, 1.0, 'explicit')
    
    for pref in extracted_prefs.get('implicit_preferences', []):
        save_preference(customer_id, 'whitelist', pref, 0.7, 'inferred')
    
    for event in extracted_prefs.get('life_events', []):
        save_preference(customer_id, 'life_event', event, 0.9, 'explicit')
    
    # 3. 保存对话向量
    embedding = generate_embedding(conversation_summary)
    save_conversation_vector(customer_id, conversation_summary, embedding, detected_intents)

def generate_embedding(text):
    """使用 Bedrock Titan 生成文本向量"""
    response = bedrock.invoke_model(
        modelId='amazon.titan-embed-text-v2:0',
        body=json.dumps({"inputText": text})
    )
    
    result = json.loads(response['body'].read())
    return result['embedding']

def save_preference(customer_id, pref_type, pref_value, confidence, source):
    """保存客户偏好"""
    sql = """
    INSERT INTO customer_preferences 
    (customer_id, preference_type, preference_value, confidence, source)
    VALUES (:customer_id, :pref_type, :pref_value, :confidence, :source)
    ON CONFLICT (customer_id, preference_type, preference_value) 
    DO UPDATE SET confidence = :confidence, updated_at = CURRENT_TIMESTAMP
    """
    
    rds_data.execute_statement(
        resourceArn='arn:aws:rds:us-east-1:xxx:cluster:hsbc-wealth-db',
        secretArn='arn:aws:secretsmanager:us-east-1:xxx:secret:rds-password',
        database='wealth_management',
        sql=sql,
        parameters=[
            {'name': 'customer_id', 'value': {'stringValue': customer_id}},
            {'name': 'pref_type', 'value': {'stringValue': pref_type}},
            {'name': 'pref_value', 'value': {'stringValue': pref_value}},
            {'name': 'confidence', 'value': {'doubleValue': confidence}},
            {'name': 'source', 'value': {'stringValue': source}}
        ]
    )

def get_db_connection():
    """获取数据库连接"""
    secret = secrets_manager.get_secret_value(SecretId='rds-db-credentials')
    creds = json.loads(secret['SecretString'])
    
    conn = psycopg2.connect(
        host=creds['host'],
        database='wealth_management',
        user=creds['username'],
        password=creds['password']
    )
    
    register_vector(conn)
    return conn
```

### 6.4 记忆激活策略
在生成回答时注入记忆上下文:

```python
# Lambda: memory-activation
def activate_memory_for_query(customer_id, session_id, current_query):
    """
    为当前查询激活相关记忆
    
    返回:
    {
        "short_term": {...},  # 当前会话上下文
        "long_term": {...},   # 客户画像
        "similar_past": [...] # 相似历史对话
    }
    """
    
    # 1. 获取短期记忆（当前会话）
    short_term = get_session_context(session_id)
    
    # 2. 获取长期记忆（客户画像）
    long_term = get_customer_profile(customer_id)
    
    # 3. 检索相似历史对话
    similar_past = search_similar_conversations(customer_id, current_query)
    
    # 4. 组装为 Claude System Prompt
    memory_context = f"""
    ## 客户背景（长期记忆）
    - 风险等级: {long_term['risk_level']}
    - 投资经验: {long_term['experience']}
    - 语言偏好: {long_term['language']}
    - 投资禁忌: {', '.join(long_term['preferences']['blacklist'])}
    - 偏好方向: {', '.join(long_term['preferences']['whitelist'])}
    - 生活事件: {', '.join(long_term['preferences']['life_events'])}
    
    ## 当前会话上下文（短期记忆）
    {short_term.get('summary', '新会话')}
    
    最近对话:
    {format_recent_turns(short_term.get('recent_turns', []))}
    
    ## 相似历史对话
    {format_similar_conversations(similar_past)}
    """
    
    return {
        'short_term': short_term,
        'long_term': long_term,
        'similar_past': similar_past,
        'formatted_context': memory_context
    }

def format_recent_turns(turns):
    """格式化最近对话轮次"""
    return "\n".join([
        f"- 用户: {turn['user_message']}\n  AI: {turn['assistant_message'][:100]}..."
        for turn in turns[-3:]  # 最近3轮
    ])

def format_similar_conversations(similar_convs):
    """格式化相似历史对话"""
    if not similar_convs:
        return "无相关历史对话"
    
    return "\n".join([
        f"- {conv['date']}: {conv['summary']} (相似度: {conv['similarity']:.2f})"
        for conv in similar_convs[:3]
    ])



7. MCP 集成方案
7.1 MCP 架构设计
Model Context Protocol (MCP) 用于连接外部数据源:

```text
┌─────────────────────────────────────────────────────────┐
│                   Claude (Bedrock)                      │
└─────────────────────────────────────────────────────────┘
                         ↓ MCP Protocol
┌─────────────────────────────────────────────────────────┐
│                   MCP Gateway (Lambda)                  │
│  - 认证管理                                              │
│  - 请求路由                                              │
│  - 速率限制                                              │
└─────────────────────────────────────────────────────────┘
         ↓                    ↓                    ↓
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Bloomberg    │    │ Reuters      │    │ HSBC Core    │
│ MCP Server   │    │ MCP Server   │    │ Banking API  │
└──────────────┘    └──────────────┘    └──────────────┘
```

### 7.2 MCP Server 实现
Bloomberg MCP Server:

```python
# Lambda: mcp-bloomberg-server
import boto3
import json
import requests
from datetime import datetime

secrets_manager = boto3.client('secretsmanager')

def lambda_handler(event, context):
    """
    Bloomberg MCP Server
    
    支持的工具:
    1. search_news - 搜索新闻
    2. get_quote - 获取实时报价
    3. get_historical_data - 获取历史数据
    """
    
    tool_name = event['tool_name']
    tool_input = event['tool_input']
    
    # 获取 Bloomberg API 凭证
    secret = secrets_manager.get_secret_value(SecretId='bloomberg-api-credentials')
    creds = json.loads(secret['SecretString'])
    
    if tool_name == 'search_news':
        return search_bloomberg_news(tool_input, creds)
    elif tool_name == 'get_quote':
        return get_bloomberg_quote(tool_input, creds)
    elif tool_name == 'get_historical_data':
        return get_bloomberg_historical(tool_input, creds)
    else:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': f'Unknown tool: {tool_name}'})
        }

def search_bloomberg_news(params, creds):
    """搜索 Bloomberg 新闻"""
    
    response = requests.post(
        'https://api.bloomberg.com/v1/news/search',
        headers={
            'Authorization': f'Bearer {creds["api_key"]}',
            'Content-Type': 'application/json'
        },
        json={
            'query': params['keywords'],
            'start_time': params.get('start_time', datetime.utcnow().isoformat()),
            'limit': params.get('limit', 10),
            'language': params.get('language', 'en')
        }
    )
    
    if response.status_code != 200:
        return {
            'statusCode': response.status_code,
            'body': json.dumps({'error': 'Bloomberg API error'})
        }
    
    news_data = response.json()
    
    # 格式化返回结果
    formatted_news = [
        {
            'headline': article['headline'],
            'summary': article['summary'],
            'published_at': article['published_at'],
            'url': article['url'],
            'source': 'Bloomberg'
        }
        for article in news_data['results']
    ]
    
    return {
        'statusCode': 200,
        'body': json.dumps({
            'tool': 'search_news',
            'results': formatted_news,
            'citation': {
                'source': 'Bloomberg',
                'timestamp': datetime.utcnow().isoformat()
            }
        }, ensure_ascii=False)
    }

def get_bloomberg_quote(params, creds):
    """获取实时报价"""
    
    symbol = params['symbol']
    
    response = requests.get(
        f'https://api.bloomberg.com/v1/quote/{symbol}',
        headers={'Authorization': f'Bearer {creds["api_key"]}'}
    )
    
    if response.status_code != 200:
        return {
            'statusCode': response.status_code,
            'body': json.dumps({'error': 'Bloomberg API error'})
        }
    
    quote_data = response.json()
    
    return {
        'statusCode': 200,
        'body': json.dumps({
            'tool': 'get_quote',
            'symbol': symbol,
            'price': quote_data['last_price'],
            'change': quote_data['change'],
            'change_percent': quote_data['change_percent'],
            'volume': quote_data['volume'],
            'timestamp': quote_data['timestamp'],
            'citation': {
                'source': 'Bloomberg',
                'timestamp': datetime.utcnow().isoformat()
            }
        })
    }
```

### HSBC Internal Systems MCP Server:

```python
# Lambda: mcp-hsbc-internal-server
import boto3
import json

def lambda_handler(event, context):
    """
    HSBC Internal Systems MCP Server
    
    支持的工具:
    1. get_customer_portfolio - 获取客户持仓
    2. get_product_details - 获取产品详情
    3. check_transaction_limit - 检查交易限额
    """
    
    tool_name = event['tool_name']
    tool_input = event['tool_input']
    
        # 验证请求来源（只允许来自 Bedrock Agent）
    if not validate_request_source(event):
        return {
            'statusCode': 403,
            'body': json.dumps({'error': 'Unauthorized'})
        }
    
    if tool_name == 'get_customer_portfolio':
        return get_customer_portfolio(tool_input)
    elif tool_name == 'get_product_details':
        return get_product_details(tool_input)
    elif tool_name == 'check_transaction_limit':
        return check_transaction_limit(tool_input)
    else:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': f'Unknown tool: {tool_name}'})
        }

def get_customer_portfolio(params):
    """获取客户持仓（通过 PrivateLink 连接内部系统）"""
    
    # 通过 VPC Endpoint 调用内部 API
    response = requests.get(
        f'https://internal-api.hsbc.com/portfolio/{params["customer_id"]}',
        headers={
            'X-API-Key': get_internal_api_key(),
            'X-Request-ID': params.get('request_id')
        }
    )
    
    portfolio_data = response.json()
    
    return {
        'statusCode': 200,
        'body': json.dumps({
            'tool': 'get_customer_portfolio',
            'customer_id': params['customer_id'],
            'total_value': portfolio_data['total_value'],
            'holdings': portfolio_data['holdings'],
            'asset_allocation': portfolio_data['asset_allocation'],
            'citation': {
                'source': 'HSBC Core Banking System',
                'timestamp': datetime.utcnow().isoformat()
            }
        })
    }

def validate_request_source(event):
    """验证请求来源"""
    # 检查请求是否来自 Bedrock Agent
    source_arn = event.get('requestContext', {}).get('identity', {}).get('userArn', '')
    return 'bedrock' in source_arn.lower()

def get_internal_api_key():
    """从 Secrets Manager 获取内部 API Key"""
    secret = secrets_manager.get_secret_value(SecretId='hsbc-internal-api-key')
    return json.loads(secret['SecretString'])['api_key']
```

## 8. Opportunity 转化流程

### 8.1 对话意向识别
核心功能: 从对话中识别客户的投资意向，自动转化为 RM 的销售机会

```python
# Lambda: opportunity-detector
import boto3
import json
from datetime import datetime

bedrock = boto3.client('bedrock-runtime')
rds_data = boto3.client('rds-data')

def lambda_handler(event, context):
    """
    Opportunity 检测器
    
    输入:
    {
        "customer_id": "customer_12345",
        "conversation_history": [...],
        "consensus_result": {...}
    }
    
    输出:
    {
        "opportunity_detected": true,
        "opportunity_id": "opp_67890",
        "confidence": 0.85,
        "recommended_action": "assign_to_rm"
    }
    """
    
    customer_id = event['customer_id']
    conversation_history = event['conversation_history']
    consensus_result = event['consensus_result']
    
    # 1. 使用 Claude 分析对话意向
    intent_analysis = analyze_investment_intent(
        conversation_history,
        consensus_result
    )
    
    # 2. 判断是否需要转 RM
    if intent_analysis['confidence'] >= 0.75 and intent_analysis['intent_strength'] == 'strong':
        # 创建 Opportunity
        opportunity_id = create_opportunity(
            customer_id=customer_id,
            intent_data=intent_analysis,
            conversation_summary=generate_conversation_summary(conversation_history)
        )
        
        # 3. 通知 RM（通过 SNS）
        notify_rm(customer_id, opportunity_id, intent_analysis)
        
        return {
            'statusCode': 200,
            'body': json.dumps({
                'opportunity_detected': True,
                'opportunity_id': opportunity_id,
                'confidence': intent_analysis['confidence'],
                'recommended_action': 'assign_to_rm'
            })
        }
    else:
        return {
            'statusCode': 200,
            'body': json.dumps({
                'opportunity_detected': False,
                'reason': 'Intent not strong enough',
                'confidence': intent_analysis['confidence']
            })
        }

def analyze_investment_intent(conversation_history, consensus_result):
    """分析投资意向强度"""
    
    # 构建对话文本
    conversation_text = "\n".join([
        f"用户: {turn['user_message']}\nAI: {turn['assistant_message']}"
        for turn in conversation_history
    ])
    
    prompt = f"""
    分析以下对话，判断客户的投资意向强度。
    
    对话内容:
    {conversation_text}
    
    AI 推荐结果:
    {json.dumps(consensus_result, ensure_ascii=False)}
    
    评估以下维度:
    1. 意向强度 (weak/medium/strong)
       - weak: 仅咨询，无明确行动意愿
       - medium: 表现出兴趣，但仍在犹豫
       - strong: 明确表达购买意愿或询问具体操作
    
    2. 意向类型
       - information_seeking: 仅寻求信息
       - consideration: 正在考虑投资
       - ready_to_invest: 准备投资
    
    3. 关注的资产类别
    
    4. 预计投资金额（如有提及）
    
    5. 需要 RM 介入的理由
    
    输出 JSON 格式:
    {{
        "intent_strength": "weak/medium/strong",
        "intent_type": "...",
        "asset_classes": ["gold", "equity"],
        "estimated_amount": 10000,
        "confidence": 0.85,
        "rm_intervention_reason": "客户询问具体产品细节，需要专业指导",
        "key_signals": ["询问产品费用", "提及投资金额", "询问如何购买"]
    }}
    """
    
    response = bedrock.invoke_model(
        modelId='anthropic.claude-3-5-sonnet-20241022-v2:0',
        body=json.dumps({
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 2000,
            "messages": [{"role": "user", "content": prompt}]
        })
    )
    
    result = json.loads(response['body'].read())
    return json.loads(result['content'][0]['text'])

def create_opportunity(customer_id, intent_data, conversation_summary):
    """创建 Opportunity 记录"""
    
    opportunity_id = f"opp_{int(datetime.utcnow().timestamp())}"
    
    sql = """
    INSERT INTO opportunities (
        opportunity_id, customer_id, intent_type, intent_strength,
        asset_classes, estimated_amount, confidence,
        conversation_summary, rm_intervention_reason,
        status, created_at
    ) VALUES (
        :opp_id, :customer_id, :intent_type, :intent_strength,
        :asset_classes, :estimated_amount, :confidence,
        :conversation_summary, :rm_reason,
        'new', CURRENT_TIMESTAMP
    )
    """
    
    rds_data.execute_statement(
        resourceArn='arn:aws:rds:us-east-1:xxx:cluster:hsbc-wealth-db',
        secretArn='arn:aws:secretsmanager:us-east-1:xxx:secret:rds-password',
        database='wealth_management',
        sql=sql,
        parameters=[
            {'name': 'opp_id', 'value': {'stringValue': opportunity_id}},
            {'name': 'customer_id', 'value': {'stringValue': customer_id}},
            {'name': 'intent_type', 'value': {'stringValue': intent_data['intent_type']}},
            {'name': 'intent_strength', 'value': {'stringValue': intent_data['intent_strength']}},
            {'name': 'asset_classes', 'value': {'stringValue': json.dumps(intent_data['asset_classes'])}},
            {'name': 'estimated_amount', 'value': {'longValue': intent_data.get('estimated_amount', 0)}},
            {'name': 'confidence', 'value': {'doubleValue': intent_data['confidence']}},
            {'name': 'conversation_summary', 'value': {'stringValue': conversation_summary}},
            {'name': 'rm_reason', 'value': {'stringValue': intent_data['rm_intervention_reason']}}
        ]
    )
    
    return opportunity_id

def notify_rm(customer_id, opportunity_id, intent_data):
    """通知 RM 有新的 Opportunity"""
    
    sns = boto3.client('sns')
    
    # 1. 查询客户的 RM
    rm_info = get_customer_rm(customer_id)
    
    # 2. 发送通知
    message = f"""
    新的投资机会

    客户: {customer_id}
    Opportunity ID: {opportunity_id}
    意向强度: {intent_data['intent_strength']}
    关注资产: {', '.join(intent_data['asset_classes'])}
    预计金额: ${intent_data.get('estimated_amount', 'N/A')}
    置信度: {intent_data['confidence']:.0%}
    
    理由: {intent_data['rm_intervention_reason']}
    
    关键信号:
    {chr(10).join(['- ' + signal for signal in intent_data['key_signals']])}
    
    请在 RM Portal 查看详情: https://rm.hsbc.com/opportunities/{opportunity_id}
    """
    
    sns.publish(
        TopicArn=f'arn:aws:sns:us-east-1:xxx:rm-notifications-{rm_info["rm_id"]}',
        Subject=f'新投资机会 - {customer_id}',
        Message=message
    )
    
    # 3. 同时写入 RM CRM 系统（通过 API）
    sync_to_crm(opportunity_id, customer_id, intent_data, rm_info)

def get_customer_rm(customer_id):
    """获取客户的 RM 信息"""
    sql = """
    SELECT rm_id, rm_name, rm_email
    FROM customer_rm_mapping
    WHERE customer_id = :customer_id
    """
    
    response = rds_data.execute_statement(
        resourceArn='arn:aws:rds:us-east-1:xxx:cluster:hsbc-wealth-db',
        secretArn='arn:aws:secretsmanager:us-east-1:xxx:secret:rds-password',
        database='wealth_management',
        sql=sql,
        parameters=[{'name': 'customer_id', 'value': {'stringValue': customer_id}}]
    )
    
    if len(response['records']) == 0:
        return None
    
    record = response['records'][0]
    return {
        'rm_id': record[0]['stringValue'],
        'rm_name': record[1]['stringValue'],
        'rm_email': record[2]['stringValue']
    }

def sync_to_crm(opportunity_id, customer_id, intent_data, rm_info):
    """同步到 Salesforce CRM"""
    
    # 使用 AWS AppFlow 或直接调用 Salesforce API
    import requests
    
    salesforce_token = get_salesforce_token()
    
    response = requests.post(
        'https://hsbc.my.salesforce.com/services/data/v58.0/sobjects/Opportunity',
        headers={
            'Authorization': f'Bearer {salesforce_token}',
            'Content-Type': 'application/json'
        },
        json={
            'Name': f'AI Detected - {customer_id} - {intent_data["intent_type"]}',
            'AccountId': get_salesforce_account_id(customer_id),
            'OwnerId': rm_info['rm_id'],
            'StageName': 'Prospecting',
            'Amount': intent_data.get('estimated_amount', 0),
            'Probability': int(intent_data['confidence'] * 100),
            'LeadSource': 'AI Wealth Assistant',
            'Description': intent_data['rm_intervention_reason'],
            'Custom_AI_Confidence__c': intent_data['confidence'],
            'Custom_Intent_Strength__c': intent_data['intent_strength']
        }
    )
    
    return response.json()
```

### 8.2 Opportunity 数据库设计

```sql
-- Opportunity 表
CREATE TABLE opportunities (
    opportunity_id VARCHAR(50) PRIMARY KEY,
    customer_id VARCHAR(50) NOT NULL,
    intent_type VARCHAR(50) NOT NULL,  -- information_seeking/consideration/ready_to_invest
    intent_strength VARCHAR(20) NOT NULL,  -- weak/medium/strong
    asset_classes JSONB,  -- ["gold", "equity"]
    estimated_amount DECIMAL(15,2),
    confidence DECIMAL(3,2),  -- 0.00-1.00
    conversation_summary TEXT,
    rm_intervention_reason TEXT,
    status VARCHAR(20) DEFAULT 'new',  -- new/assigned/contacted/converted/closed
    assigned_rm_id VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    converted_at TIMESTAMP,
    INDEX idx_customer (customer_id),
    INDEX idx_status (status),
    INDEX idx_created (created_at)
);

-- Opportunity 跟进记录表
CREATE TABLE opportunity_followups (
    followup_id SERIAL PRIMARY KEY,
    opportunity_id VARCHAR(50) REFERENCES opportunities(opportunity_id),
    rm_id VARCHAR(50),
    action_type VARCHAR(50),  -- called/emailed/met/converted
    notes TEXT,
    next_action VARCHAR(100),
    next_action_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Opportunity 转化表
CREATE TABLE opportunity_conversions (
    conversion_id SERIAL PRIMARY KEY,
    opportunity_id VARCHAR(50) REFERENCES opportunities(opportunity_id),
    customer_id VARCHAR(50),
    product_purchased VARCHAR(100),
    transaction_amount DECIMAL(15,2),
    transaction_date TIMESTAMP,
    commission_amount DECIMAL(15,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 8.3 RM Portal 集成
RM 查看 Opportunity 的 API:

```python
# Lambda: rm-opportunity-api
import boto3
import json

rds_data = boto3.client('rds-data')

def lambda_handler(event, context):
    """
    RM Portal API - 获取 Opportunity 列表
    
    GET /opportunities?rm_id=rm_001&status=new
    """
    
    rm_id = event['queryStringParameters'].get('rm_id')
    status = event['queryStringParameters'].get('status', 'new')
    
    sql = """
    SELECT 
        o.opportunity_id, o.customer_id, o.intent_type, o.intent_strength,
        o.asset_classes, o.estimated_amount, o.confidence,
        o.conversation_summary, o.rm_intervention_reason,
        o.status, o.created_at,
        c.customer_name, c.risk_level, c.aum
    FROM opportunities o
    JOIN customer_profiles c ON o.customer_id = c.customer_id
    WHERE o.assigned_rm_id = :rm_id
      AND o.status = :status
    ORDER BY o.confidence DESC, o.created_at DESC
    LIMIT 50
    """
    
    response = rds_data.execute_statement(
        resourceArn='arn:aws:rds:us-east-1:xxx:cluster:hsbc-wealth-db',
        secretArn='arn:aws:secretsmanager:us-east-1:xxx:secret:rds-password',
        database='wealth_management',
        sql=sql,
        parameters=[
            {'name': 'rm_id', 'value': {'stringValue': rm_id}},
            {'name': 'status', 'value': {'stringValue': status}}
        ]
    )
    
    opportunities = []
    for record in response['records']:
        opportunities.append({
            'opportunity_id': record[0]['stringValue'],
            'customer_id': record[1]['stringValue'],
            'intent_type': record[2]['stringValue'],
            'intent_strength': record[3]['stringValue'],
            'asset_classes': json.loads(record[4]['stringValue']),
            'estimated_amount': float(record[5]['doubleValue']),
            'confidence': float(record[6]['doubleValue']),
            'conversation_summary': record[7]['stringValue'],
            'rm_intervention_reason': record[8]['stringValue'],
            'status': record[9]['stringValue'],
            'created_at': record[10]['stringValue'],
            'customer_name': record[11]['stringValue'],
            'risk_level': record[12]['stringValue'],
            'aum': float(record[13]['doubleValue'])
        })
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json'},
        'body': json.dumps({
            'opportunities': opportunities,
            'total': len(opportunities)
        }, ensure_ascii=False)
    }
```

## 9. 合规与安全

### 9.1 Bedrock Guardrails 配置
完整的合规护栏设置:

```python
# 创建 Guardrail
import boto3

bedrock = boto3.client('bedrock')

guardrail_response = bedrock.create_guardrail(
    name='hsbc-wealth-guardrail-v2',
    description='HSBC Wealth Management AI 合规护栏 - 完整版',
    
    # 1. 内容过滤
    contentPolicyConfig={
        'filtersConfig': [
            {'type': 'SEXUAL', 'inputStrength': 'HIGH', 'outputStrength': 'HIGH'},
            {'type': 'VIOLENCE', 'inputStrength': 'HIGH', 'outputStrength': 'HIGH'},
            {'type': 'HATE', 'inputStrength': 'HIGH', 'outputStrength': 'HIGH'},
            {'type': 'INSULTS', 'inputStrength': 'MEDIUM', 'outputStrength': 'HIGH'},
            {'type': 'MISCONDUCT', 'inputStrength': 'MEDIUM', 'outputStrength': 'HIGH'},
            {'type': 'PROMPT_ATTACK', 'inputStrength': 'HIGH', 'outputStrength': 'NONE'}
        ]
    },
    
    # 2. 主题限制（金融合规）
    topicPolicyConfig={
        'topicsConfig': [
            {
                'name': 'Cryptocurrency',
                'definition': '关于加密货币的投资建议（香港监管限制）',
                'examples': ['比特币能买吗', '以太坊投资', '加密货币推荐'],
                'type': 'DENY'
            },
            {
                'name': 'Guaranteed_Returns',
                'definition': '任何保证收益或承诺无风险的表述（违反 MiFID II）',
                'examples': ['保证赚钱', '稳赚不赔', '零风险投资', '保本保息'],
                'type': 'DENY'
            },
            {
                'name': 'Insider_Trading',
                'definition': '涉及内幕消息或非公开信息',
                'examples': ['内幕消息', '提前知道业绩', '未公开重组'],
                'type': 'DENY'
            },
            {
                'name': 'Tax_Evasion',
                'definition': '关于逃税避税的非法建议',
                'examples': ['如何逃税', '避税天堂', '隐藏资产'],
                'type': 'DENY'
            },
            {
                'name': 'Unauthorized_Products',
                'definition': '推荐非 HSBC 授权的金融产品',
                'examples': ['某某P2P平台', '私募基金推荐', '非持牌产品'],
                'type': 'DENY'
            }
        ]
    },
    
    # 3. 敏感信息保护（GDPR/PDPA 合规）
    sensitiveInformationPolicyConfig={
        'piiEntitiesConfig': [
            {'type': 'CREDIT_DEBIT_CARD_NUMBER', 'action': 'BLOCK'},
            {'type': 'BANK_ACCOUNT_NUMBER', 'action': 'ANONYMIZE'},
            {'type': 'BANK_ROUTING', 'action': 'BLOCK'},
            {'type': 'US_SOCIAL_SECURITY_NUMBER', 'action': 'BLOCK'},
            {'type': 'UK_NATIONAL_INSURANCE_NUMBER', 'action': 'BLOCK'},
            {'type': 'PASSPORT_NUMBER', 'action': 'ANONYMIZE'},
            {'type': 'DRIVER_ID', 'action': 'ANONYMIZE'},
            {'type': 'EMAIL', 'action': 'ANONYMIZE'},
            {'type': 'PHONE', 'action': 'ANONYMIZE'},
            {'type': 'IP_ADDRESS', 'action': 'ANONYMIZE'},
            {'type': 'MAC_ADDRESS', 'action': 'BLOCK'}
        ],
        'regexesConfig': [
            {
                'name': 'HKID',
                'description': '香港身份证号码',
                'pattern': r'[A-Z]{1,2}\d{6}\([0-9A]\)',
                'action': 'ANONYMIZE'
            },
            {
                'name': 'China_ID',
                'description': '中国身份证号码',
                'pattern': r'\d{17}[\dXx]',
                'action': 'ANONYMIZE'
            }
        ]
    },
    
    # 4. 禁止词汇
    wordPolicyConfig={
        'wordsConfig': [
            {'text': '一定会涨'},
            {'text': '绝对安全'},
            {'text': '内幕消息'},
            {'text': '保本保息'},
            {'text': '躺着赚钱'},
            {'text': '稳赚不赔'},
            {'text': '无风险'},
            {'text': '保证收益'}
        ],
        'managedWordListsConfig': [
            {'type': 'PROFANITY'}
        ]
    },
    
    # 5. 上下文 Grounding（确保回答基于检索内容）
    contextualGroundingPolicyConfig={
        'filtersConfig': [
            {
                'type': 'GROUNDING',
                'threshold': 0.75  # 75% 的内容必须来自检索结果
            },
            {
                'type': 'RELEVANCE',
                'threshold': 0.70  # 70% 的相关性阈值
            }
        ]
    },
    
    blockedInputMessaging='抱歉，您的问题包含不当内容或违反监管要求，我无法回答。如需帮助，请联系您的客户经理。',
    blockedOutputsMessaging='抱歉，我无法提供此类建议。根据监管要求，请联系专业的客户经理获取帮助。'
)

guardrail_id = guardrail_response['guardrailId']
guardrail_version = guardrail_response['version']
```

### 9.2 适当性检查（Suitability Check）
MiFID II 合规要求:

```python
# Lambda: suitability-checker
import boto3
import json

def lambda_handler(event, context):
    """
    适当性检查 - 确保推荐的产品符合客户风险等级
    
    输入:
    {
        "customer_id": "customer_12345",
        "recommended_products": ["SPDR Gold ETF"],
        "conversation_context": {...}
    }
    
    输出:
    {
        "suitable": true/false,
        "warnings": [...],
        "required_disclosures": [...]
    }
    """
    
    customer_id = event['customer_id']
    recommended_products = event['recommended_products']
    
    # 1. 获取客户风险等级
    customer_profile = get_customer_profile(customer_id)
    customer_risk = int(customer_profile['risk_level'][1])  # "R3" -> 3
    
    # 2. 检查每个产品的风险等级
    suitability_results = []
    warnings = []
    required_disclosures = []
    
    for product in recommended_products:
        product_info = get_product_info(product)
        product_risk = int(product_info['risk_level'][1])
        
        # 适当性规则
        if product_risk > customer_risk + 1:
            # 产品风险超过客户风险等级 1 级以上
            suitability_results.append({
                'product': product,
                'suitable': False,
                'reason': f'产品风险等级 {product_info["risk_level"]} 超过客户风险承受能力 {customer_profile["risk_level"]}'
            })
            warnings.append(f'{product}: 风险等级不匹配，需要 RM 确认')
        
        elif product_risk == customer_risk + 1:
            # 产品风险刚好高 1 级，需要额外披露
            suitability_results.append({
                'product': product,
                'suitable': True,
                'condition': 'requires_disclosure'
                        })
            required_disclosures.append({
                'product': product,
                'disclosure': f'该产品风险等级为 {product_info["risk_level"]}，略高于您的风险承受能力。投资前请仔细阅读产品说明书。'
            })
        
        else:
            # 产品风险匹配
            suitability_results.append({
                'product': product,
                'suitable': True
            })
    
    # 3. 综合判断
    all_suitable = all(r['suitable'] for r in suitability_results)
    
    # 4. 添加强制披露（所有产品都需要）
    required_disclosures.extend([
        '投资有风险，过往业绩不代表未来表现',
        '请根据自身财务状况和风险承受能力做出投资决策',
        '如有疑问，请咨询您的客户经理'
    ])
    
    return {
        'statusCode': 200,
        'body': json.dumps({
            'suitable': all_suitable,
            'suitability_results': suitability_results,
            'warnings': warnings,
            'required_disclosures': required_disclosures,
            'requires_rm_approval': not all_suitable
        }, ensure_ascii=False)
    }
```

### 9.3 审计日志系统
所有对话必须记录用于监管审计:

```python
# Lambda: audit-logger
import boto3
import json
from datetime import datetime
import hashlib

cloudwatch = boto3.client('logs')
s3 = boto3.client('s3')

def log_conversation(event):
    """
    记录完整对话用于审计
    
    合规要求:
    - MiFID II: 保留 7 年
    - GDPR: 用户可请求删除（需匿名化处理）
    - 香港 SFC: 保留 7 年
    """
    
    user_id = event['user_id']
    conversation_id = event['conversation_id']
    
    # 1. 脱敏处理（PII 匿名化）
    anonymized_user_id = hashlib.sha256(user_id.encode()).hexdigest()[:16]
    
    audit_log = {
        'timestamp': datetime.utcnow().isoformat(),
        'conversation_id': conversation_id,
        'user_id_hash': anonymized_user_id,  # 脱敏后的用户 ID
        'user_query': event['user_query'],
        'ai_response': event['ai_response'],
        'agents_used': event.get('agents_used', []),
        'citations': event.get('citations', []),
        'guardrails_triggered': event.get('guardrails_triggered', []),
        'suitability_check': event.get('suitability_check', {}),
        'opportunity_created': event.get('opportunity_created', False),
        'model_version': 'claude-3-5-sonnet-20241022-v2:0',
        'session_id': event.get('session_id'),
        'ip_address_hash': hashlib.sha256(event.get('ip_address', '').encode()).hexdigest()[:16]
    }
    
    # 2. 写入 CloudWatch Logs（实时查询）
    cloudwatch.put_log_events(
        logGroupName='/hsbc/ai-wealth/audit',
        logStreamName=f'{datetime.utcnow().strftime("%Y/%m/%d")}/{anonymized_user_id}',
        logEvents=[{
            'timestamp': int(datetime.utcnow().timestamp() * 1000),
            'message': json.dumps(audit_log, ensure_ascii=False)
        }]
    )
    
    # 3. 归档到 S3（长期存储，7年保留）
    s3_key = f'audit-logs/{datetime.utcnow().strftime("%Y/%m/%d")}/{conversation_id}.json'
    s3.put_object(
        Bucket='hsbc-wealth-audit-logs',
        Key=s3_key,
        Body=json.dumps(audit_log, ensure_ascii=False, indent=2),
        ServerSideEncryption='aws:kms',
        SSEKMSKeyId='arn:aws:kms:us-east-1:xxx:key/audit-log-key',
        StorageClass='GLACIER_IR',  # 立即检索的冰川存储（成本优化）
        Metadata={
            'retention_years': '7',
            'compliance': 'MiFID_II,SFC_HK'
        }
    )
    
    # 4. 写入 RDS（结构化查询）
    rds_data = boto3.client('rds-data')
    rds_data.execute_statement(
        resourceArn='arn:aws:rds:us-east-1:xxx:cluster:hsbc-wealth-db',
        secretArn='arn:aws:secretsmanager:us-east-1:xxx:secret:rds-password',
        database='wealth_management',
        sql="""
        INSERT INTO audit_logs (
            conversation_id, user_id_hash, timestamp, 
            user_query, ai_response, agents_used, 
            guardrails_triggered, opportunity_created
        ) VALUES (
            :conv_id, :user_hash, :timestamp,
            :query, :response, :agents,
            :guardrails, :opp_created
        )
        """,
        parameters=[
            {'name': 'conv_id', 'value': {'stringValue': conversation_id}},
            {'name': 'user_hash', 'value': {'stringValue': anonymized_user_id}},
            {'name': 'timestamp', 'value': {'stringValue': audit_log['timestamp']}},
            {'name': 'query', 'value': {'stringValue': event['user_query']}},
            {'name': 'response', 'value': {'stringValue': event['ai_response']}},
            {'name': 'agents', 'value': {'stringValue': json.dumps(event.get('agents_used', []))}},
            {'name': 'guardrails', 'value': {'stringValue': json.dumps(event.get('guardrails_triggered', []))}},
            {'name': 'opp_created', 'value': {'booleanValue': event.get('opportunity_created', False)}}
        ]
    )
    
    return {
        'statusCode': 200,
        'audit_log_id': conversation_id,
        's3_location': f's3://hsbc-wealth-audit-logs/{s3_key}'
    }
```

### 9.4 数据加密策略
端到端加密:

```python
# 加密配置
ENCRYPTION_CONFIG = {
    "data_at_rest": {
        "s3": {
            "method": "SSE-KMS",
            "kms_key": "arn:aws:kms:us-east-1:xxx:key/s3-encryption-key",
            "rotation": "automatic_annual"
        },
        "rds": {
            "method": "TDE",  # Transparent Data Encryption
            "kms_key": "arn:aws:kms:us-east-1:xxx:key/rds-encryption-key"
        },
        "dynamodb": {
            "method": "KMS",
            "kms_key": "arn:aws:kms:us-east-1:xxx:key/dynamodb-encryption-key"
        },
        "opensearch": {
            "method": "KMS",
            "kms_key": "arn:aws:kms:us-east-1:xxx:key/opensearch-encryption-key"
        }
    },
    "data_in_transit": {
        "api_gateway": "TLS 1.3",
        "vpc_endpoints": "PrivateLink (encrypted)",
        "bedrock": "HTTPS with AWS SigV4"
    },
    "key_management": {
        "rotation_period": "365 days",
        "backup": "automatic to S3 Glacier",
        "access_control": "IAM policies + KMS key policies"
    }
}
```

## 10. 实施路线图

### 10.1 Phase 1: MVP（3个月）
目标: 验证核心功能，服务 1,000 个内测用户

Week 1-2: 基础设施搭建

- ✅ AWS 账号设置和 IAM 配置
- ✅ VPC 网络架构部署
- ✅ RDS Aurora 数据库创建
- ✅ S3 存储桶和生命周期策略
- ✅ Bedrock 模型访问申请

Week 3-4: CIO Agent 开发

- ✅ 上传 20 份 CIO 报告到 S3
- ✅ 创建 Bedrock Knowledge Base
- ✅ 实现 CIO Agent Lambda 函数
- ✅ 测试检索准确率（目标 >90%）

Week 5-6: Search Agent 开发

- ✅ 集成 Bloomberg API（MCP）
- ✅ 实现 Search Agent Lambda 函数
- ✅ 新闻摘要和情感分析

Week 7-8: Agent 协作与共识

- ✅ 实现 Agent Voting 机制
- ✅ Step Functions 工作流编排
- ✅ 端到端测试

Week 9-10: Memory 系统

- ✅ DynamoDB 短期记忆表
- ✅ RDS 长期记忆表（含 pgvector）
- ✅ 记忆激活逻辑

Week 11-12: 前端与测试

- ✅ API Gateway 配置
- ✅ Cognito 用户认证
- ✅ 简单 Web UI（React）
- ✅ 内测用户招募和反馈收集

- ✅ API Gateway 配置
- ✅ Cognito 用户认证
- ✅ 简单 Web UI（React）
- ✅ 内测用户招募和反馈收集

**交付物:**

- ✅ 可工作的 MVP 系统
- ✅ 内测报告（用户满意度、准确率）
- ✅ 技术文档

### 10.2 Phase 2: 生产就绪（3-6个月）

**目标:** 扩展到 10,000 用户，完善合规和安全

**Month 4: 合规强化**

- ✅ Bedrock Guardrails 完整配置
- ✅ 适当性检查系统
- ✅ 审计日志系统
- ✅ 合规测试（模拟监管审查）

**Month 5: Opportunity 转化**

- ✅ Opportunity 检测器
- ✅ RM Portal API
- ✅ Salesforce CRM 集成
- ✅ 转化率跟踪

**Month 6: 性能优化**

- ✅ Lambda 并发优化
- ✅ DynamoDB 按需扩展
- ✅ CloudFront CDN 部署
- ✅ 压力测试（10K 并发用户）

**交付物:**

- ✅ 生产环境部署
- ✅ 合规认证文档
- ✅ 运维手册

### 10.3 Phase 3: 规模化（6-12个月）

**目标:** 支持 100,000+ 用户，多地区部署

**Month 7-8: 多地区部署**

- ✅ 香港区域部署
- ✅ 新加坡区域部署
- ✅ 跨区域数据同步（DynamoDB Global Tables）

**Month 9-10: 高级功能**

- ✅ 多模态内容生成（图表、对比表）
- ✅ 主动推送系统（EventBridge + SNS）
- ✅ 个性化推荐引擎

**Month 11-12: AI 优化**

- ✅ Fine-tune 评估（如需要）
- ✅ Prompt 优化（A/B 测试）
- ✅ 检索质量提升（Rerank）

**交付物:**

- ✅ 全球化部署
- ✅ 高级功能上线
- ✅ AI 性能报告


## 11. 成本分析

### 11.1 AWS 服务成本估算

**假设:** 10,000 活跃用户，每人每天 3 次对话

```python
# 月度成本计算
MONTHLY_COSTS = {
    "compute": {
        "lambda": {
            "invocations": 10000 * 3 * 30 * 10,  # 900万次（含内部调用）
            "duration_avg_ms": 2000,
            "memory_mb": 2048,
            "cost": "$1,200"
        },
        "step_functions": {
            "state_transitions": 10000 * 3 * 30 * 8,  # 720万次状态转换
            "cost": "$180"
        }
    },
    "ai_services": {
        "bedrock_claude": {
            "input_tokens": 10000 * 3 * 30 * 1000,  # 9亿 tokens
            "output_tokens": 10000 * 3 * 30 * 500,  # 4.5亿 tokens
            "cost": "$2,700"  # $0.003/1K input, $0.015/1K output
        },
        "bedrock_knowledge_base": {
            "queries": 10000 * 3 * 30,  # 90万次
            "cost": "$180"  # $0.0002/query
        },
        "bedrock_guardrails": {
            "text_units": 10000 * 3 * 30 * 2,  # 180万次（输入+输出）
            "cost": "$135"  # $0.000075/text unit
        }
    },
    "databases": {
        "rds_aurora": {
            "instance": "db.r6g.xlarge (4 vCPU, 32GB)",
            "storage_gb": 500,
            "cost": "$450"
        },
        "dynamodb": {
            "read_units": 10000 * 3 * 30 * 5,  # 450万次读
            "write_units": 10000 * 3 * 30 * 2,  # 180万次写
            "storage_gb": 100,
            "cost": "$280"
        },
        "opensearch_serverless": {
            "ocu_hours": 2 * 24 * 30,  # 2 OCU
            "cost": "$700"
        }
    },
    "storage": {
        "s3": {
            "storage_gb": 1000,  # CIO 报告 + 审计日志
            "requests": 10000 * 3 * 30 * 3,  # 270万次
            "cost": "$50"
        },
        "timestream": {
            "storage_gb": 50,
            "queries": 10000 * 3 * 30 * 0.5,  # 45万次
            "cost": "$120"
        }
    },
    "networking": {
        "api_gateway": {
            "requests": 10000 * 3 * 30,  # 90万次
            "cost": "$3"
        },
        "cloudfront": {
            "data_transfer_gb": 10000 * 3 * 30 * 0.5,  # 13.5TB
            "cost": "$1,200"
        },
        "vpc_endpoints": {
            "hours": 5 * 24 * 30,  # 5个 endpoint
            "cost": "$75"
        }
    },
    "monitoring": {
        "cloudwatch": {
            "logs_gb": 500,
            "metrics": 1000,
            "cost": "$150"
        },
        "x_ray": {
            "traces": 10000 * 3 * 30,  # 90万次
            "cost": "$45"
        }
    },
    "security": {
        "secrets_manager": {
            "secrets": 10,
            "api_calls": 10000 * 3 * 30 * 2,  # 180万次
            "cost": "$5"
        },
        "kms": {
            "keys": 5,
            "requests": 10000 * 3 * 30 * 5,  # 450万次
            "cost": "$25"
        }
    }
}

# 总计
TOTAL_MONTHLY_COST = "$7,498"
COST_PER_USER_PER_MONTH = "$0.75"
```

### 11.2 成本优化建议

**短期优化（立即实施）:**

1. **Lambda 内存优化**
   - 当前: 2048MB
   - 优化后: 1536MB（性能测试后）
   - 节省: ~25% Lambda 成本 = $300/月

2. **DynamoDB 按需计费**
   - 当前: 预配置容量
   - 优化后: 按需计费（流量波动大）
   - 节省: ~30% = $84/月

3. **S3 生命周期策略**
   - 审计日志 30 天后转 Glacier
   - 节省: ~60% 存储成本 = $20/月

**中期优化（3-6个月）:**

1. **Reserved Capacity**
   - RDS Aurora: 1年预留实例
   - 节省: ~40% = $180/月

2. **Bedrock 批量折扣**
   - 与 AWS 谈判企业折扣
   - 预计节省: 15-20% = $400/月

3. **CloudFront 优化**
   - 启用压缩
   - 缓存策略优化
   - 节省: ~30% = $360/月

### 11.3 ROI 分析

**投资回报计算:**

**初始投资:**
- 开发成本: 3人 × 6个月 × $10K/月 = $180K
- AWS 成本: 6个月 × $7.5K/月 = $45K
- **总计: $225K**

**年度运营成本:**
- AWS: $7.5K/月 × 12 = $90K
- 维护: 1人 × $120K/年 = $120K
- **总计: $210K/年**

**业务收益（假设 10K 用户）:**
- 提升交易转化率: 5% → 8% (+3%)
- 平均 AUM: $100K/用户
- 平均佣金率: 0.5%
- 额外收入: 10K × $100K × 3% × 0.5% = $150K/年

- 减少 RM 工作量: 30%
- RM 成本节省: 10人 × $80K × 30% = $240K/年

**总收益:** $390K/年  
**ROI:** ($390K - $210K) / $225K = 80% (第一年)  
**回本周期:** 15 个月

---

## 12. 监控与告警

### 12.1 关键指标

```python
# CloudWatch 自定义指标
MONITORING_METRICS = {
    "business_metrics": {
        "active_users_daily": {
            "namespace": "HSBC/Wealth/Business",
            "unit": "Count",
            "alarm_threshold": "<5000"
        },
        "conversation_count": {
            "namespace": "HSBC/Wealth/Business",
            "unit": "Count",
            "alarm_threshold": "<10000/day"
        },
        "opportunity_conversion_rate": {
            "namespace": "HSBC/Wealth/Business",
            "unit": "Percent",
            "alarm_threshold": "<5%"
        }
    },
    "ai_quality_metrics": {
        "cio_citation_accuracy": {
            "namespace": "HSBC/Wealth/AI",
            "unit": "Percent",
            "alarm_threshold": "<90%"
        },
        "guardrails_block_rate": {
            "namespace": "HSBC/Wealth/AI",
            "unit": "Percent",
            "alarm_threshold": ">10%"
        },
        "user_satisfaction_score": {
            "namespace": "HSBC/Wealth/AI",
            "unit": "None",
            "alarm_threshold": "<4.0/5"
        }
    },
    "technical_metrics": {
        "api_latency_p95": {
            "namespace": "HSBC/Wealth/Technical",
            "unit": "Milliseconds",
            "alarm_threshold": ">3000ms"
        },
        "lambda_error_rate": {
            "namespace": "HSBC/Wealth/Technical",
            "unit": "Percent",
            "alarm_threshold": ">1%"
        },
        "bedrock_throttle_rate": {
            "namespace": "HSBC/Wealth/Technical",
            "unit": "Percent",
            "alarm_threshold": ">0.1%"
        }
    }
}
```

### 12.2 告警配置

```python
# SNS 告警主题
import boto3

sns = boto3.client('sns')
cloudwatch = boto3.client('cloudwatch')

# 创建告警主题
topic_response = sns.create_topic(Name='hsbc-wealth-critical-alerts')
topic_arn = topic_response['TopicArn']

# 订阅告警（发送到 PagerDuty/Slack）
sns.subscribe(
    TopicArn=topic_arn,
    Protocol='https',
    Endpoint='https://events.pagerduty.com/integration/xxx/enqueue'
)

# 创建 CloudWatch 告警
cloudwatch.put_metric_alarm(
    AlarmName='HSBC-Wealth-High-Error-Rate',
    ComparisonOperator='GreaterThanThreshold',
    EvaluationPeriods=2,
    MetricName='Errors',
    Namespace='AWS/Lambda',
    Period=300,
    Statistic='Sum',
    Threshold=50,
    ActionsEnabled=True,
    AlarmActions=[topic_arn],
    AlarmDescription='Lambda error rate exceeds threshold',
    Dimensions=[
        {'Name': 'FunctionName', 'Value': 'cio-agent'}
    ]
)
```

---

## 13. 总结

### 13.1 核心亮点

- **AI-Native 设计:** 以 AI 为核心，而非功能附加
- **多 Agent 协作:** CIO + Search + Product 三方投票共识
- **完整记忆系统:** 短期（DynamoDB）+ 长期（RDS + pgvector）
- **MCP 集成:** 灵活连接外部数据源（Bloomberg/Reuters）
- **Opportunity 自动转化:** 对话意向识别 → RM 销售机会
- **合规内建:** Bedrock Guardrails + 适当性检查 + 审计日志
- **引用溯源:** 所有回答必须标注来源（CIO 报告页码/新闻链接）
- **AWS 原生:** 充分利用托管服务，零运维

### 13.2 技术决策总结

| 决策点 | 选择 | 理由 |
|--------|------|------|
| LLM | Claude 3.5 Sonnet | 金融理解力强，无需 Fine-tune |
| 向量数据库 | OpenSearch Serverless | AWS 托管，自动扩展 |
| 关系数据库 | RDS Aurora PostgreSQL | 支持 pgvector，ACID 保证 |
| NoSQL | DynamoDB | 毫秒级延迟，按需扩展 |
| 工作流编排 | Step Functions | 可视化，内置重试，合规审计 |
| 合规护栏 | Bedrock Guardrails | 开箱即用，持续更新 |
| MCP 集成 | Lambda + API Gateway | 灵活路由，速率限制 |

### 13.3 下一步行动

**本周可做:**

- ✅ 申请 AWS Bedrock 模型访问权限
- ✅ 准备 20 份 CIO 报告（PDF 格式）
- ✅ 搭建 AWS 基础设施（VPC + RDS + S3）

**下周可做:**

- ✅ 创建 Bedrock Knowledge Base
- ✅ 实现第一个 CIO Agent
- ✅ 测试检索准确率

**本月目标:**

- ✅ 完成 MVP 核心功能
- ✅ 招募 50 个内测用户
- ✅ 收集反馈并迭代

---

## 附录 A: 完整代码仓库结构

```text
hsbc-ai-wealth/
├── infrastructure/
│   ├── terraform/
│   │   ├── main.tf
│   │   ├── vpc.tf
│   │   ├── rds.tf
│   │   ├── dynamodb.tf
│   │   └── bedrock.tf
│   └── cloudformation/
├── lambda-functions/
│   ├── intent-classification/
│   ├── load-context/
│   ├── cio-agent/
│   ├── search-agent/
│   ├── product-agent/
│   ├── agent-consensus/
│   ├── response-generator/          # Guardrails applied in Bedrock call
│   ├── escalate-to-rm/
│   ├── opportunity-detector/
│   └── deliver-response/
├── step-functions/
│   └── agent-orchestration.json
├── database/
│   ├── schema.sql
│   └── seed-data.sql
├── frontend/
│   ├── web-app/
│   └── mobile-app/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/
│   ├── api-reference.md
│   ├── deployment-guide.md
│   └── runbook.md
└── README.md
```

---

## 附录 B: 参考资料

### AWS 文档

- [Amazon Bedrock Developer Guide](https://docs.aws.amazon.com/bedrock/)
- [Bedrock Knowledge Base](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html)
- [Bedrock Guardrails](https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html)

### 合规标准

- [MiFID II: ESMA Guidelines](https://www.esma.europa.eu/policy-rules/mifid-ii-and-mifir)
- [香港 SFC: Code of Conduct](https://www.sfc.hk/en/Rules-and-standards/Codes-and-guidelines)
- [GDPR: Official Text](https://gdpr-info.eu/)

### 技术博客

- [Building RAG Applications with Amazon Bedrock](https://aws.amazon.com/blogs/machine-learning/)
- [Multi-Agent Systems with Claude](https://www.anthropic.com/research)

---

**文档结束**
