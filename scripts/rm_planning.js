// Client data structure (Model)
const clients = {
  robert: {
    name: "Robert Chen",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
    status: "Premier Elite Customer | Client since 2014",
    risk: "Balanced",
    demographics: "52 / Married, 1 Child (16yo)",
    job: "Business Owner (Tech)",
    aum: "$5,254,100",
    timeline: "8 Yrs to Retirement",
    allocation: [
      { label: "Cash & Equivalents", value: "60%", color: "bg-primary", note: "High Liquidity for Business" },
      { label: "Equities", value: "30%", color: "bg-gray-600", note: "Underweight" },
      { label: "Fixed Income", value: "10%", color: "bg-gray-400", note: "Stable" }
    ],
    holdingsMsg: "<div class='text-center'><p>Current Strategy: <span class='font-bold text-gray-700'>Short-term Liquidity Focus</span></p><p class='text-lg'>Client holds $3.14M in Money Market Funds</p></div>",
    copilotInit: {
      color: 'danger',
      icon: 'fa-solid fa-circle-exclamation',
      title: 'ALERT: Cash Drag Risk',
      message: "I've analyzed Robert's portfolio. He is holding **60% in Cash ($3.14M)**. As he plans to retire in 8 years, this cash drag will miss his $8M target.",
      actionText: "Run Retirement Projection",
      action: "funds"
    },
    chips: [
      { label: "Suggest Growth Funds", action: "funds" },
      { label: "Show Florida Property", action: "property" }
    ],
    // Robert's Goals (Original structure)
    goalsHtml: `
                    <div class="border-b pb-3 mb-5">
                        <p class="font-semibold text-gray-700 flex justify-between items-center">Retirement (Age 60) <span class="font-normal px-2 py-0.5 bg-success text-success">On Track</span></p>
                        <div class="w-full bg-gray-200 rounded-full h-1.5 mt-2"><div class="bg-success h-1.5 rounded-full" style="width: 75%"></div></div>
                        <p class="text-gray-500 mt-1 flex justify-between">
                            <span>Target: $8.0M</span>
                            <span>Current Projection: $6.1M</span>
                        </p>
                    </div>
                    <div class="border-b pb-3 mb-5">
                        <p class="font-semibold text-gray-700 flex justify-between items-center">Education Fund (Child Age 18) <span class="font-normal px-2 py-0.5 bg-danger text-danger">Behind</span></p>
                        <div class="w-full bg-gray-200 rounded-full h-1.5 mt-2"><div class="bg-danger h-1.5 rounded-full" style="width: 25%"></div></div>
                        <p class="text-gray-500 mt-1 flex justify-between">
                            <span>Target: $450,000</span>
                            <span>Current: $124K</span>
                        </p>
                    </div>
                    <div>
                        <p class="font-semibold text-gray-700 flex justify-between items-center">New Property (Florida) <span class="font-normal px-2 py-0.5 bg-warning text-warning">Review</span></p>
                        <div class="w-full bg-gray-200 h-1.5 mt-2"><div class="bg-warning h-1.5 " style="width: 60%"></div></div>
                        <p class="text-gray-500 mt-1 flex justify-between">
                            <span>Target: $1.2M</span>
                            <span>Available: $755K</span>
                        </p>
                    </div>
                `
  },
  sarah: {
    name: "Sarah Jenkins",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    status: "New Premier Client | Onboarding",
    risk: "Undetermined",
    demographics: "48 / Married, 2 Children (8yo, 12yo)",
    job: "Director @ GlobalTech",
    aum: "$1,850,400",
    // Updated timeline for new client discovery focus
    timeline: "Focus on Wealth Discovery",
    // Updated allocation to reflect Unknown status
    allocation: [
      { label: "Temporary Holdings (Pre-Allocation)", value: "100%", color: "bg-warning", note: "Waiting for Risk Profile" },
    ],
    holdingsMsg: "<div class='text-center'><p>Status: <span class='font-bold text-primary'>Portfolio Allocation Unknown</span></p><p class='text-gray-500'>Initial AUM is in a temporary Holding Account pending risk profiling and goal setting. Only insurance needs are confirmed.</p></div>",
    copilotInit: {
      color: 'info',
      icon: 'fa-solid fa-handshake',
      title: 'Actionable: Complete Discovery',
      message: "We've gathered all static data. Use the conversation starters to confirm her risk appetite and long-term goals.",
      actionText: "Generate Discovery Questions",
      action: "talking_points"
    },
    chips: [
      { label: "Generate Discovery Questions", action: "talking_points" },
    ],
    // New Goals HTML for newly onboarded client
    goalsHtml: `
                    <div class="py-10 text-center bg-gray-50 rounded-lg">
                        <i class="fa-solid fa-flag-checkered text-3xl text-gray-400 mb-3"></i>
                        <p class="text-md font-semibold text-gray-700">Financial Goal Discovery In Progress</p>
                        <p class="text-gray-500">Use AI Agent for conversation starters to determine goals.</p>
                    </div>
                `
  },
  alice: {
    name: "Alice Num",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    status: "Premier Client | Client since 2022",
    risk: "Growth",
    demographics: "31 / Single",
    job: "Software Engineer (Startup)",
    aum: "$452,100",
    // Updated timeline for Singapore home focus
    timeline: "Focus on First Home (Singapore)",
    // Updated allocation for home purchase focus
    allocation: [
      { label: "Equities (Growth)", value: "60%", color: "bg-success", note: "Long-term growth" },
      { label: "Fixed Income (Short Term)", value: "30%", color: "bg-info", note: "Liquidity for downpayment" },
      { label: "Cash & Equivalents", value: "10%", color: "bg-gray-400", note: "Emergency fund" }
    ],
    holdingsMsg: "<div class='text-center'><p>Current Strategy: <span class='font-bold text-gray-700'>First Home Capital Accumulation</span></p><p class='text-xs'>Focus on low-cost global ETFs and liquid assets.</p></div>",
    copilotInit: {
      color: 'success',
      icon: 'fa-solid fa-circle-check',
      title: 'Actionable Insight',
      message: "Alice's portfolio is **on track** for her Singapore home goal. Review her mortgage options and loan-to-value ratio.",
      actionText: "Check Mortgage Pre-Approval",
      action: "mortgage"
    },
    chips: [
      { label: "Review Mortgage Pre-Approval", action: "mortgage" },
      { label: "Introduce new ETF", action: "etf" }
    ],
    // New Goals HTML: Only First Home goal
    goalsHtml: `
                    <div>
                        <p class="font-semibold text-gray-700 flex justify-between items-center">First Home (Singapore) <span class="font-normal px-2 py-0.5 bg-info text-info">On Track</span></p>
                        <div class="w-full bg-gray-200 rounded-full h-1.5 mt-2"><div class="bg-info h-1.5 rounded-full" style="width: 70%"></div></div>
                        <p class="text-gray-500 mt-1 flex justify-between">
                            <span>Target: $1.0M SGD</span>
                            <span>Saved: $712K SGD</span>
                        </p>
                    </div>
                `
  }
};

let currentClient = 'robert';

// Helper function to get URL parameter
function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// View Rendering Logic
function renderClientData(client) {
  document.getElementById('header-title').textContent = `Financial Planning: ${client.name}`;
  document.getElementById('p-img').src = client.img;
  document.getElementById('p-name').textContent = client.name;
  document.getElementById('p-status').textContent = client.status;
  document.getElementById('p-risk').textContent = client.risk;
  document.getElementById('p-demographics').textContent = client.demographics;
  document.getElementById('p-job').textContent = client.job;
  document.getElementById('p-aum').textContent = client.aum;
  document.getElementById('p-timeline').textContent = client.timeline;
  document.getElementById('p-holdings-msg').innerHTML = client.holdingsMsg;
  document.getElementById('p-goals').innerHTML = client.goalsHtml; // Renders the dynamic goals

  // Render Allocation
  const holdingsContainer = document.getElementById('p-holdings');
  holdingsContainer.innerHTML = client.allocation.map(item => `
                <div class="flex justify-between items-center">
                    <p class="text-gray-700">${item.label}</p>
                    <div class="flex items-center gap-2">
                        <span class="text-gray-500">${item.note}</span>
                        <span class="font-bold text-gray-900">${item.value}</span>
                        <div class="w-2.5 h-2.5 rounded-full ${item.color}"></div>
                    </div>
                </div>
            `).join('');

  // Render Copilot Insight Card (Main)
  const insightCard = document.getElementById('copilot-insight-main-card');
  const insight = client.copilotInit;
  const insightColor = insight.color; // 'red', 'purple', or 'green'

  insightCard.innerHTML = `
                <div class="mt-10 bg-${insightColor} p-5 border-l-8 border-${insightColor} transition duration-300">
                    <div class="flex items-start gap-4">
                        <div class="text-${insightColor}"></div>
                        <div class="flex-1">
                            <h3 class="font-bold text-${insightColor} mb-2 flex items-center">
                              ${insight.title}
                            </h3>
                            <p class="text-gray-700">${insight.message}</p>
                            <div class="flex gap-3 mt-3">
                                <button onclick="chatAction('${insight.action}')" class="font-semibold text-${insightColor} flex items-center btn-${insightColor} p-2">
                                    ${insight.actionText}
                                </button>
                                <a href="rm_investment.html" class="font-semibold text-${insightColor} hover:underline flex items-center">
                                    View Investment Options
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `;

  // Render Action Chips (Copilot Panel)
  const chipsContainer = document.getElementById('action-chips');
  chipsContainer.innerHTML = client.chips.map(chip => `
                <button onclick="chatAction('${chip.action}')" class="px-3 py-1 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300 transition whitespace-nowrap">${chip.label}</button>
            `).join('');

  // Reset Chat and set client welcome
  const chatContainer = document.getElementById('chat-container');
  chatContainer.innerHTML = `
                <div class="flex gap-3 chat-bubble-in mb-4">
                    <div class="w-8 h-8 bg-gray-900 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs"><i class="fa-solid fa-robot"></i></div>
                    <div class="bg-white p-3 rounded-lg rounded-tl-none shadow-sm border border-gray-200 text-gray-700 w-full">Welcome. I have loaded ${client.name}'s Financial Planning profile.</div>
                </div>
                <div id="action-chips" class="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                    </div>
            `;
  // Re-render chips into the newly cleared chat container
  document.getElementById('action-chips').innerHTML = client.chips.map(chip => `
                <button onclick="chatAction('${chip.action}')" class="px-3 py-1 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300 transition whitespace-nowrap">${chip.label}</button>
            `).join('');

}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  const clientFromUrl = getUrlParameter('client');
  if (clientFromUrl && clients[clientFromUrl]) {
    currentClient = clientFromUrl;
  }
  renderClientData(clients[currentClient]);
});


// Copilot Chat Functions
function sendChatMessage(message, isUser) {
  const chatContainer = document.getElementById('chat-container');

  if (isUser) {
    // User message bubble
    chatContainer.innerHTML += `<div class="flex gap-3 justify-end chat-bubble-in mb-4"><div class="bg-brand-red text-white p-3 rounded-lg rounded-tr-none shadow-sm text-sm">${message}</div></div>`;
  } else {
    // AI response bubble
    chatContainer.innerHTML += `<div class="flex gap-3 chat-bubble-in mb-4"><div class="w-8 h-8 bg-gray-900 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs"><i class="fa-solid fa-robot"></i></div><div class="bg-white p-3 rounded-lg rounded-tl-none shadow-sm border border-gray-200 text-gray-700 w-full">${message}</div></div>`;
  }

  // Scroll to bottom
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function chatAction(action) {
  let userText = '';
  let botResp = '';

  if (currentClient === 'robert') {
    if (action === 'funds') {
      userText = "Run Retirement Projection";
      botResp = `**Projection Run:** If Robert maintains 60% cash, he will miss his $8M target by **$2.0M**. Recommended action: Reallocate $1.5M of cash to Growth Strategy Funds.`;
    } else if (action === 'property') {
      userText = "Show Florida Property Details";
      botResp = `**Florida Property:** Estimated value $1.2M. Robert has a pre-approved $450,000 bridge loan. The current strategy is to use $750,000 from his liquidity cash.`;
    }
  } else if (currentClient === 'sarah') {
    if (action === 'talking_points') {
      userText = "Generate Discovery Questions";
      // Updated QnA for new client discovery
      botResp = `**Discovery Conversation Starters for Sarah Jenkins:**<br><br> <ul class="list-disc pl-4 space-y-1"> <li>"Given your high focus on protection products, is your main goal capital preservation or wealth transfer to the next generation?"</li> <li>"How comfortable are you with market volatility for the portion of your portfolio outside of insurance products?"</li> <li>"What are your top 3 non-negotiable financial priorities over the next five years?"</li> </ul>`;
    }
    // No other actions defined for Sarah
  } else if (currentClient === 'alice') {
    if (action === 'mortgage') {
      userText = "Check Mortgage Pre-Approval";
      botResp = `Alice's pre-approval for a loan up to **$600,000 SGD** is valid until Jan 2026. Current best fixed rate is **3.1% for 3 years**. Advise her to utilize her liquid assets for the downpayment.`;
    } else if (action === 'etf') {
      userText = "Suggest new low-cost global ETF";
      botResp = `The Vanguard FTSE Global All Cap UCITS ETF (VWRA) is a suitable, low-cost (**0.22% OCF**) option to diversify her core holdings.`;
    }
  }

  // Append User Msg
  sendChatMessage(userText, true);

  // Append Bot Msg
  setTimeout(() => {
    sendChatMessage(botResp, false);
  }, 600);
}

function handleChat() {
  const input = document.getElementById('copilot-input');
  if (input.value) {
    const txt = input.value;
    sendChatMessage(txt, true);
    input.value = '';
    setTimeout(() => {
      sendChatMessage("I've noted that in the meeting minutes.", false);
    }, 500);
  }
}

function toggleCopilot() {
  const widget = document.getElementById('copilot-widget');
  const trigger = document.getElementById('copilot-trigger');
  widget.classList.toggle('active');

  if (widget.classList.contains('active')) {
    trigger.style.transform = 'scale(0)';
    setTimeout(() => {
      const input = document.getElementById('copilot-input');
      if (input) input.focus();
    }, 100);
  } else {
    trigger.style.transform = 'scale(1)';
  }
}