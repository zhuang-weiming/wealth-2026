const screens = ['screen-login', 'screen-dashboard', 'screen-wealth'];

// Initial AI Agent conversation data
const initialCopilotChat = `
            <div class="flex gap-3 chat-bubble-in mb-4">
                <div class="w-8 h-8 bg-gray-900 flex-shrink-0 flex items-center justify-center text-white"><i class="fa-solid fa-robot"></i></div>
                <div class="bg-gray-100 p-3 shadow-sm text-gray-700 w-full">
                    Hello Jennifer. I'm your Wealth AI Agent. What action would you like to take?
                </div>
            </div>`;

function showScreen(screenId) {
  screens.forEach(id => {
    const screen = document.getElementById(id);
    if (screen) {
      screen.classList.remove('active-screen');
      screen.style.display = 'none';
    }
  });
  const activeScreen = document.getElementById(screenId);
  if (activeScreen) {
    activeScreen.classList.add('active-screen');
    activeScreen.style.display = 'flex';
  }
}
function toggleCommonCopilot() {
  const w = document.getElementById("copilot-widget"); 
  const t = document.getElementById("copilot-trigger");
  w.classList.toggle("active");
  if (w.classList.contains("active")) {
    t.style.transform = "scale(0)";
  } else {
    t.style.transform = "scale(1)";
  }
  console.log(11)
}
function handleCopilotChat() {
  const i = document.getElementById("copilot-input");
  const c = document.getElementById("chat-container");
  if (i.value.trim()) {
    c.innerHTML += `<div class="flex gap-3 justify-end mb-4"><div class="bg-green-600 text-white p-3 rounded-lg rounded-tr-none shadow-sm">${i.value}</div></div>`; c.innerHTML += `<div class="flex gap-3 mb-4"><div class="w-8 h-8 bg-gray-900 rounded-full flex-shrink-0 flex items-center justify-center text-white"><i class="fa-solid fa-robot"></i></div><div class="bg-white p-3 rounded-lg rounded-tl-none shadow-sm border border-gray-200 text-gray-700 w-full">Analyzing your request...</div></div>`;
    c.scrollTop = c.scrollHeight; i.value = "";
  }
}
function toggleCopilot(show) {
  console.log(22)
  const modal = document.getElementById('copilot-modal');
  const chat = document.getElementById('copilot-chat-container');
  if (show) {
    // Reset chat content on open
    chat.innerHTML = initialCopilotChat;
    modal.classList.add('active');
    // Ensure scroll to bottom on open, important for mobile UX
    setTimeout(() => chat.scrollTop = chat.scrollHeight, 10);
  } else {
    modal.classList.remove('active');
  }
}

function sendChatMessage(message, isUser = true) {
  const chatContainer = document.getElementById('copilot-chat-container');

  if (isUser) {
    // User message bubble
    chatContainer.innerHTML += `<div class="flex gap-3 justify-end chat-bubble-in mb-4"><div class="bg-success p-3 shadow-sm">${message}</div></div>`;
  } else {
    // AI response bubble
    chatContainer.innerHTML += `<div class="flex gap-3 chat-bubble-in mb-4"><div class="w-8 h-8 bg-gray-900 flex-shrink-0 flex items-center justify-center text-white"><i class="fa-solid fa-robot"></i></div><div class="bg-gray-100 p-3 shadow-sm text-gray-700 w-full">${message}</div></div>`;
  }

  // Scroll to bottom
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function sendActionFromChip(action) {
  sendChatMessage(action, true);

  let response = '';

  if (action.includes('Book Meeting with Relationship Manager')) {
    response = 'Confirmed: I have checked your Relationship Manager\'s schedule and booked a call for you tomorrow at 11:00 AM. A calendar invite has been sent. Your Relationship Manager will be ready to discuss your mortgage rate or gold alert.';
  } else if (action.includes('Analyze recent Gold price movements')) {
    response = 'The recent price surge is driven by increased geopolitical uncertainty and inflation fears. The AI Agent forecasts short-term stability, but recommends reviewing your portfolio for potential overexposure to precious metals.';
  }

  setTimeout(() => {
    sendChatMessage(response, false);
  }, 500);
}

function handleCopilotInput() {
  const input = document.getElementById('copilot-input');
  if (input.value.trim() !== '') {
    const message = input.value.trim();
    sendChatMessage(message, true);

    // Simulate AI response based on generic text input
    setTimeout(() => {
      sendChatMessage(`I've received your query: ${message}. I am processing that request now and will respond shortly.`, false);
    }, 500);

    input.value = '';
  }
}

function sendActionToCopilot(actionText, showModal = false) {
  if (showModal) {
    // Open the copilot modal
    toggleCopilot(true);
    // Wait for the modal to open before sending the message
    setTimeout(() => sendActionFromChip(actionText), 400);
  } else {
    sendActionFromChip(actionText);
  }
}

function toggleRebalancingModal(show) {
  const modal = document.getElementById('rebalancing-modal');
  if (show) {
    modal.classList.add('active');
  } else {
    modal.classList.remove('active');
  }
}

function confirmRebalancing() {
  alert('✅ Recommendation Confirmed!\nStatus: Pending Investment Officer Review\nExpected completion within 2 hours');
  localStorage.setItem('rebalancing_status', 'pending_approval');
  toggleRebalancingModal(false);
}

function viewDetails() {
  // Placeholder for future enhancement
  alert('View Details: Will display detailed historical backtest data and risk analysis report');
}

// Initialize view
showScreen('screen-login');