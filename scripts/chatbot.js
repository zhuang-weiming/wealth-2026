function sendActionToAgent(action) {
  sendChatMessage(action, true);

  // Simulate AI response
  setTimeout(() => {
    let botResp = `Confirmed: Task initiated for **${action}**. Results will appear shortly.`;
    if (action.includes('ESG Report Summary') || action.includes('Report')) {
      botResp = `**Top 3 Findings:**<br>1. **Renewables:** Funds >30% solar/wind exposure beat MSCI World (+1.5% YTD).<br>2. **Carbon Risk:** 2 reports flag excessive carbon in 4 funds.<br>3. **Compliance:** European ESG funds show higher regulation alignment.`;
    }
    sendChatMessage(botResp, false);
  }, 800);
}

function sendChatMessage(message, isUser = true) {
  const chatContainer = document.getElementById('chat-container');
  const newChat = document.createElement('div');

  // Styling differentiation
  if (isUser) {
    newChat.className = `flex gap-3 chat-bubble-in justify-end`;
    newChat.innerHTML = `
            <div class="bg-[#2d2d2d] text-white p-3 shadow-sm max-w-[85%]">
                ${message}
            </div>
            <div class="bg-gray-400 text-white flex items-center justify-center shrink-0"><i class="fa-solid fa-user"></i></div>
        `;
  } else {
    newChat.className = `flex gap-3 chat-bubble-in`;
    newChat.innerHTML = `
            <div class="bg-[#db0011] text-white flex items-center justify-center shrink-0">HSBC</div>
            <div class="bg-white border border-gray-200 p-3 text-[#2d2d2d] shadow-sm max-w-[85%]">
                ${message}
            </div>
        `;
  }

  chatContainer.appendChild(newChat);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function handleCopilotInput() {
  const input = document.getElementById('copilot-input');
  if (input.value.trim() !== '') {
    const message = input.value.trim();
    sendChatMessage(message, true);

    setTimeout(() => {
      sendChatMessage(`Search initiated for: **${message}**. Analyzing portfolio data...`, false);
    }, 800);

    input.value = '';
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