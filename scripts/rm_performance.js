// Helper function to render messages in the chat panel
function sendChatMessage(message, isUser = false) {
  const chatContainer = document.getElementById('chat-container');
  const newChat = document.createElement('div');
  newChat.className = `flex gap-3 chat-bubble-in mb-4 ${isUser ? 'justify-end' : ''}`;

  const messageContent = `<div class="p-3 border w-full max-w-xs ${isUser ? 'p-3 shadow-sm w-full max-w-xs bg-info text-info' : 'bg-white text-gray-700 rounded-tl-none border-gray-200'}">${message}</div>`;
  const avatar = `<div class="w-8 h-8 bg-gray-900 flex-shrink-0 flex items-center justify-center text-white"><i class="fa-solid ${isUser ? 'fa-user' : 'fa-robot'}"></i></div>`;

  if (isUser) {
    newChat.innerHTML = `${messageContent}${avatar}`;
  } else {
    newChat.innerHTML = `${avatar}${messageContent}`;
  }

  chatContainer.appendChild(newChat);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Handle user input from the text field or action buttons
function handleCopilotInput(presetMessage = '') {
  const input = document.getElementById('copilot-input');
  let message = presetMessage || input.value.trim();

  if (message !== '') {
    // Append User Msg
    sendChatMessage(message, true);

    // Clear input if it wasn't a preset
    if (!presetMessage) {
      input.value = '';
    }

    // Simulate AI response based on message
    let response = `Analysis requested for: **${message}**. Please wait for the results.`;
    if (message.includes('Pacific Northwest struggling')) {
      response = `The Pacific Northwest region's primary gap is **lack of confidence in new ESG product documentation**. A targeted training session is recommended. I've sent a detailed plan to your inbox.`;
    } else if (message.includes('growth this quarter')) {
      response = `Top 3 growth drivers: **Robert Chen** (Liquidity Event), **Alice Num** (New ETF allocation), and **Sarah Jenkins** (New client onboard).`;
    } else if (message.includes('ESG coaching plan')) {
      response = `Coaching Plan Generated: Focus on product knowledge (iShares ESG Advanced vs. Vanguard ESG Global). Schedule sent to Regional leaders.`;
    } else if (message.includes('Schedule Pacific Northwest ESG coaching')) {
      response = `Meeting scheduled with Pacific Northwest leaders for **Tuesday, 10:00 AM** to review ESG process. Calendar invites sent.`;
    }

    setTimeout(() => {
      sendChatMessage(response, false);
    }, 800);
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