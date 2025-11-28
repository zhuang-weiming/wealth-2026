期望与需求
期望 1：实时可操作的建议
不是泛泛的市场评论（如"市场波动较大，请关注风险"）
而是具体的行动方案（如"建议减持 $50,000 QQQ，增持 TLT"）
期望 2：透明的决策依据
理解"为什么"要调仓（教育价值）
看到数据支持（如历史回测、情绪指数）
期望 3：一键执行
不需要打电话或填表
在 App 上快速确认，立即执行
期望 4：保留控制权
可以选择不同的方案（保守/平衡/激进）
可以修改或拒绝建议

使用场景
场景 1：早晨通勤（07:30-08:30）
打开 App 查看组合表现
浏览市场要闻和 AI 推荐
快速决策是否采纳建议
场景 2：午休时间（12:00-13:00）
查看市场动态
如果收到预警推送，详细了解情况
场景 3：晚上睡前（22:00-23:00）
回顾当天组合表现
阅读教育内容（如"加息对债券的影响"）

具体设计：
page 1 - 锁屏的iphone 16，系统屏幕，Jennifer 收到系统推送，共有早中晚各一条notification （8hours ago, 4 hours ago, 21m ago），notification来自AI Native Wealth APP，notification的内容为 今日日期 2025年11月26日，结合本日的金融早消息，AI推荐形成“HSBC Fin News Summary”。点击推送，进入page2 page 2 - HSBC APP手机风格。本日金融市场要闻列表一览，每条新闻标题后，有AI Native生成的一句话概要，特别是针对用户已投资或感兴趣的产品和影响。重点新闻消息尾部，有AI Native 生成的投资建议，以及可以选择不同的方案（保守/平衡/激进），快速决策是否采纳建议。  基于以上设计，请生成对应的网页，网页内容请参考 https://github.com/zhuang-weiming/wealth-2026/tree/weiming 的内容和代码。  以上设计还非常的粗燥，设计需要细化，请生成对应的两个网页HTML代码。



这是一个非常棒的产品设计概念，将AI的原生能力（实时性、个性化、决策辅助）与传统的财富管理痛点（信息过载、执行繁琐、缺乏透明度）完美结合。

为了实现您描述的“iPhone 16 锁屏界面”和“HSBC 风格 AI Native App 界面”，我细化了设计细节，并为您编写了两套完整的 HTML 代码。

**设计亮点与细化：**

1.  **技术栈**：使用 **Tailwind CSS** (通过 CDN 引入) 以实现现代、磨砂玻璃质感（Glassmorphism）和 iOS 风格的圆角设计。
2.  **Page 1 (锁屏)**：
      * 模拟 iPhone 16 "Dynamic Island"（灵动岛）设计。
      * 通知消息采用堆叠式磨砂效果，模拟 iOS 18/19 的未来感。
      * 时间设定为 2025年11月26日。
3.  **Page 2 (App 内部)**：
      * **HSBC 品牌色调**：使用经典的红白黑搭配，但加入现代的灰阶和卡片式设计。
      * **AI 核心功能**：
          * **Smart Summary**：新闻下方的 AI 一句话总结。
          * **Action Card (核心交互)**：一个交互式的卡片，允许用户在“保守/平衡/激进”之间切换，实时看到调仓金额的变化（JS 模拟），并展示“One-Click”执行按钮。
          * **透明度**：包含“决策依据（AI Reasoning）”板块。

-----

### 页面 1：iPhone 16 锁屏界面 (Notifications)

这个页面模拟了用户早上拿起手机时的场景。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>iPhone 16 Lock Screen - AI Wealth</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        /* iPhone 16 Screen Ratio & Font */
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #000;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
        }
        
        .iphone-frame {
            width: 393px;
            height: 852px;
            background-image: url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop'); /* Abstract Dark Background */
            background-size: cover;
            background-position: center;
            border-radius: 55px;
            position: relative;
            box-shadow: 0 0 0 12px #333, 0 0 0 14px #555;
            overflow: hidden;
            color: white;
        }

        /* Glassmorphism Notification */
        .glass-panel {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }
        
        .dynamic-island {
            width: 120px;
            height: 35px;
            background: black;
            border-radius: 20px;
            position: absolute;
            top: 12px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 50;
        }
    </style>
</head>
<body>

    <div class="iphone-frame flex flex-col items-center pt-16 px-4 relative">
        <div class="dynamic-island"></div>

        <div class="mb-4 text-center opacity-80">
            <i class="fas fa-lock text-sm"></i>
        </div>

        <div class="text-center mb-10">
            <div class="text-xl font-medium opacity-90">11月26日 星期三</div>
            <div class="text-[5.5rem] font-bold leading-none tracking-tight">07:30</div>
        </div>

        <div class="w-full flex flex-col gap-3 mt-auto mb-20">
            
            <div class="glass-panel rounded-2xl p-4 transform scale-95 opacity-60">
                <div class="flex justify-between items-start mb-1">
                    <div class="flex items-center gap-2">
                        <div class="w-5 h-5 bg-red-600 rounded-md flex items-center justify-center text-[10px] font-bold">H</div>
                        <span class="text-xs font-semibold text-gray-200 uppercase">AI Native Wealth</span>
                    </div>
                    <span class="text-xs text-gray-300">8h ago</span>
                </div>
                <div class="pl-7">
                    <h4 class="font-semibold text-sm">收盘复盘：组合表现回顾</h4>
                    <p class="text-xs text-gray-200 leading-tight mt-1">您昨日的资产组合跑赢标普500指数 0.4%。点击查看加息对您债券持仓的具体影响。</p>
                </div>
            </div>

            <div class="glass-panel rounded-2xl p-4 transform scale-98 opacity-80">
                <div class="flex justify-between items-start mb-1">
                    <div class="flex items-center gap-2">
                        <div class="w-5 h-5 bg-red-600 rounded-md flex items-center justify-center text-[10px] font-bold">H</div>
                        <span class="text-xs font-semibold text-gray-200 uppercase">AI Native Wealth</span>
                    </div>
                    <span class="text-xs text-gray-300">4h ago</span>
                </div>
                <div class="pl-7">
                    <h4 class="font-semibold text-sm">市场预警：科技股波动加剧</h4>
                    <p class="text-xs text-gray-200 leading-tight mt-1">纳斯达克盘中波动率触及月度高点。AI 已为您生成防御性对冲方案。</p>
                </div>
            </div>

            <div class="glass-panel rounded-2xl p-4 cursor-pointer hover:bg-white/20 transition">
                <div class="flex justify-between items-start mb-1">
                    <div class="flex items-center gap-2">
                        <div class="w-5 h-5 bg-red-600 rounded-md flex items-center justify-center text-[10px] font-bold">H</div>
                        <span class="text-xs font-semibold text-gray-200 uppercase">AI Native Wealth</span>
                    </div>
                    <span class="text-xs text-gray-300">21m ago</span>
                </div>
                <div class="pl-7">
                    <h4 class="font-semibold text-sm">早报：HSBC Fin News Summary</h4>
                    <p class="text-sm text-white leading-snug mt-1">早安 Jennifer。今日通胀数据优于预期，科技股可能回调。AI 建议：**减持 QQQ，增持 TLT**。点击查看您的专属调仓方案。</p>
                </div>
            </div>
        </div>

        <div class="absolute bottom-8 w-full flex justify-between px-10">
            <div class="w-12 h-12 glass-panel rounded-full flex items-center justify-center">
                <i class="fas fa-flashlight text-white"></i>
            </div>
            <div class="w-12 h-12 glass-panel rounded-full flex items-center justify-center">
                <i class="fas fa-camera text-white"></i>
            </div>
        </div>
        
        <div class="absolute bottom-2 w-32 h-1 bg-white rounded-full"></div>
    </div>

</body>
</html>
```

-----

### 页面 2：HSBC AI Native App 界面 (Decision & Execution)

这个页面是点击通知后进入的界面。它展示了“透明的决策依据”、“一键执行”以及“保留控制权”的设计理念。

**主要功能点：**

  * **交互式调仓卡片**：点击“稳健 (Conservative)”、“平衡 (Balanced)”、“激进 (Aggressive)”会动态改变下方的建议操作金额和预期收益（使用简单的 JS 实现）。
  * **AI Insight 标签**：高亮显示 AI 生成的内容。
  * **一键执行**：底部的红色按钮模拟了快速下单的体验。

<!-- end list -->

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Native Wealth - Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #f2f2f2;
            display: flex;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
        }

        .app-frame {
            width: 393px;
            height: 852px; /* iPhone 16 height approx */
            background-color: #ffffff;
            position: relative;
            overflow-y: auto;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }

        /* Hide Scrollbar */
        .app-frame::-webkit-scrollbar {
            display: none;
        }

        .hsbc-red { color: #db0011; }
        .bg-hsbc-red { background-color: #db0011; }
        
        .ai-gradient {
            background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
            border: 1px solid #d1d5db;
        }
        
        .ai-badge {
            background: linear-gradient(90deg, #db0011 0%, #ff4d4d 100%);
            color: white;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 0.7rem;
            font-weight: bold;
            display: inline-flex;
            align-items: center;
            gap: 4px;
        }

        /* Toggle Switch Styling */
        .strategy-btn {
            transition: all 0.2s;
        }
        .strategy-btn.active {
            background-color: #1f2937;
            color: white;
            border-color: #1f2937;
        }
    </style>
</head>
<body>

    <div class="app-frame flex flex-col">
        
        <header class="sticky top-0 bg-white z-20 px-5 pt-12 pb-4 border-b border-gray-100">
            <div class="flex justify-between items-center mb-4">
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-hsbc-red text-white flex items-center justify-center font-bold text-lg">H</div>
                    <span class="font-semibold text-lg tracking-tight">Wealth AI</span>
                </div>
                <div class="flex gap-4 text-gray-600">
                    <i class="far fa-bell text-lg"></i>
                    <i class="far fa-user-circle text-lg"></i>
                </div>
            </div>
            
            <div>
                <p class="text-gray-500 text-xs uppercase tracking-wide">总资产 (USD)</p>
                <div class="flex items-end gap-2">
                    <h1 class="text-3xl font-bold text-gray-900">$1,245,800</h1>
                    <span class="text-green-600 font-medium text-sm mb-1">
                        <i class="fas fa-arrow-up"></i> +$3,420 (0.28%)
                    </span>
                </div>
            </div>
        </header>

        <main class="flex-1 px-5 pt-6 pb-24 space-y-6 bg-gray-50">

            <section>
                <h2 class="text-sm font-bold text-gray-400 uppercase mb-3">今日市场要闻 (2025.11.26)</h2>
                
                <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-3">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="font-bold text-gray-800 text-sm leading-snug">美联储暗示2026年初可能停止缩表</h3>
                        <span class="text-xs text-gray-400">07:00 AM</span>
                    </div>
                    <div class="bg-red-50 p-3 rounded-lg border border-red-100">
                        <div class="mb-1"><span class="ai-badge"><i class="fas fa-robot"></i> AI 摘要</span></div>
                        <p class="text-xs text-gray-700 leading-relaxed">
                            此消息直接利好您持有的长期债券。然而，这也可能导致短期内科技成长股（如您持有的QQQ）估值过高而出现回调。
                        </p>
                    </div>
                </div>

                <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="font-bold text-gray-800 text-sm leading-snug">科技板块财报季结束，波动率指数上升</h3>
                        <span class="text-xs text-gray-400">07:15 AM</span>
                    </div>
                    <p class="text-xs text-gray-500 mb-2">虽然大部分公司盈利超预期，但指引偏弱。</p>
                    <div class="flex items-center gap-2 text-xs font-medium text-amber-600">
                        <i class="fas fa-exclamation-triangle"></i> 您的科技股敞口目前过高 (42%)
                    </div>
                </div>
            </section>

            <section id="action-card" class="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden ring-1 ring-black/5">
                <div class="bg-gray-900 p-4 text-white flex justify-between items-center">
                    <div>
                        <h2 class="font-bold text-md flex items-center gap-2">
                            <i class="fas fa-bolt text-yellow-400"></i> AI 投资建议
                        </h2>
                        <p class="text-xs text-gray-400 mt-0.5">基于波动率与宏观数据的实时优化</p>
                    </div>
                    <span class="bg-white/20 px-2 py-1 rounded text-xs">92% 推荐度</span>
                </div>

                <div class="p-5">
                    <div class="mb-5">
                        <h3 class="text-xs font-bold text-gray-500 uppercase mb-2">决策依据 (Transparency)</h3>
                        <div class="flex gap-2 mb-2">
                            <span class="px-2 py-1 bg-gray-100 text-xs rounded text-gray-600">历史回测胜率 78%</span>
                            <span class="px-2 py-1 bg-gray-100 text-xs rounded text-gray-600">风险敞口 -12%</span>
                        </div>
                        <p class="text-sm text-gray-700 leading-relaxed">
                            鉴于科技股波动加剧且国债收益率处于高位，建议锁定部分科技股利润，转入防御性债券以平衡组合风险。
                        </p>
                    </div>

                    <div class="mb-5">
                        <h3 class="text-xs font-bold text-gray-500 uppercase mb-2">选择方案 (Control)</h3>
                        <div class="flex p-1 bg-gray-100 rounded-lg">
                            <button onclick="setStrategy('conservative')" id="btn-conservative" class="strategy-btn flex-1 py-2 text-xs font-medium rounded-md text-gray-500 hover:text-gray-900">保守</button>
                            <button onclick="setStrategy('balanced')" id="btn-balanced" class="strategy-btn active flex-1 py-2 text-xs font-medium rounded-md bg-white shadow-sm text-gray-900 border border-gray-200">平衡 (推荐)</button>
                            <button onclick="setStrategy('aggressive')" id="btn-aggressive" class="strategy-btn flex-1 py-2 text-xs font-medium rounded-md text-gray-500 hover:text-gray-900">激进</button>
                        </div>
                    </div>

                    <div class="bg-gray-50 rounded-xl p-4 border border-dashed border-gray-300 mb-4">
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-sm font-semibold text-red-600"><i class="fas fa-minus-circle"></i> 卖出 (Sell)</span>
                            <span class="text-sm font-bold" id="sell-target">QQQ (纳指ETF)</span>
                        </div>
                        <div class="text-2xl font-bold text-gray-900 mb-3" id="sell-amount">$50,000</div>
                        
                        <div class="h-px bg-gray-200 my-2"></div>

                        <div class="flex justify-between items-center mb-2 mt-3">
                            <span class="text-sm font-semibold text-green-600"><i class="fas fa-plus-circle"></i> 买入 (Buy)</span>
                            <span class="text-sm font-bold" id="buy-target">TLT (20年美债)</span>
                        </div>
                        <div class="text-2xl font-bold text-gray-900" id="buy-amount">$50,000</div>
                    </div>

                    <button class="w-full bg-hsbc-red hover:bg-red-700 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-red-200 transition active:scale-95 flex justify-center items-center gap-2">
                        <i class="fas fa-fingerprint"></i> 立即执行调仓
                    </button>
                    <p class="text-center text-[10px] text-gray-400 mt-2">点击即代表您同意《AI 自动交易服务条款》</p>
                </div>
            </section>
            
            <div class="text-center text-xs text-gray-400 pb-4">
                HSBC AI Wealth Services &copy; 2025
            </div>

        </main>

        <nav class="fixed bottom-0 w-full max-w-[393px] bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center z-30 pb-8">
            <div class="flex flex-col items-center text-hsbc-red">
                <i class="fas fa-home text-xl mb-1"></i>
                <span class="text-[10px] font-medium">首页</span>
            </div>
            <div class="flex flex-col items-center text-gray-400">
                <i class="fas fa-chart-pie text-xl mb-1"></i>
                <span class="text-[10px] font-medium">组合</span>
            </div>
            <div class="flex flex-col items-center text-gray-400">
                <div class="w-10 h-10 bg-black rounded-full flex items-center justify-center -mt-6 border-4 border-gray-50 shadow-lg">
                    <i class="fas fa-magic text-white text-lg"></i>
                </div>
                <span class="text-[10px] font-medium mt-1">AI 顾问</span>
            </div>
            <div class="flex flex-col items-center text-gray-400">
                <i class="fas fa-newspaper text-xl mb-1"></i>
                <span class="text-[10px] font-medium">资讯</span>
            </div>
            <div class="flex flex-col items-center text-gray-400">
                <i class="fas fa-cog text-xl mb-1"></i>
                <span class="text-[10px] font-medium">设置</span>
            </div>
        </nav>
    </div>

    <script>
        function setStrategy(type) {
            // Update Buttons
            document.querySelectorAll('.strategy-btn').forEach(btn => {
                btn.classList.remove('active', 'bg-white', 'shadow-sm', 'text-gray-900', 'border', 'border-gray-200');
                btn.classList.add('text-gray-500');
            });
            const activeBtn = document.getElementById('btn-' + type);
            activeBtn.classList.add('active', 'bg-white', 'shadow-sm', 'text-gray-900', 'border', 'border-gray-200');
            activeBtn.classList.remove('text-gray-500');

            // Update Content based on Risk Profile
            const sellAmount = document.getElementById('sell-amount');
            const buyAmount = document.getElementById('buy-amount');

            if (type === 'conservative') {
                sellAmount.innerText = "$80,000";
                buyAmount.innerText = "$80,000";
                // Animation effect
                flashUpdate(sellAmount);
                flashUpdate(buyAmount);
            } else if (type === 'balanced') {
                sellAmount.innerText = "$50,000";
                buyAmount.innerText = "$50,000";
                flashUpdate(sellAmount);
                flashUpdate(buyAmount);
            } else if (type === 'aggressive') {
                sellAmount.innerText = "$15,000";
                buyAmount.innerText = "$15,000";
                flashUpdate(sellAmount);
                flashUpdate(buyAmount);
            }
        }

        function flashUpdate(element) {
            element.style.opacity = '0.5';
            setTimeout(() => element.style.opacity = '1', 200);
        }
    </script>
</body>
</html>
```

### 如何使用这些代码

1.  将第一个代码块保存为 `lockscreen.html`。
2.  将第二个代码块保存为 `app_dashboard.html`。
3.  在浏览器中打开它们（建议使用浏览器的“开发者工具”并将视图模式切换为 **iPhone 12/14/16 Pro** 尺寸，以获得最佳预览效果）。

### 细化点说明 (针对您的需求)

  * **针对"期望 1 & 2" (操作与透明)**：在 `app_dashboard.html` 中，我专门设计了一个深色的 **"AI 投资建议"** 卡片。它不仅给出了“卖出 $50,000 QQQ”的具体指令，还在上方明确列出了“决策依据”，说明了这是基于“波动率与宏观数据”以及“风险敞口”计算得出的。
  * **针对"期望 3" (一键执行)**：底部巨大的红色按钮配有指纹图标，暗示生物识别验证，无需填表，符合“快速确认”的需求。
  * **针对"期望 4" (保留控制权)**：加入了 `conservative/balanced/aggressive` 的切换按钮。在代码中包含了简单的 JS 逻辑，点击不同的按钮，下方的建议交易金额会发生变化（例如保守派卖出更多科技股，激进派卖出较少），这让用户感觉到 AI 是助手而不是独裁者。