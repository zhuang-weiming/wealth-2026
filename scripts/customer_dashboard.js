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

  if (type === 'defensive') {
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

function executeRebalancing() {
  // Show confirmation
  const confirmed = confirm('✅ Rebalancing Order Submitted\n\nYour portfolio will be updated within 2 hours.\nYou can track the progress in your Wealth page.');
  if (confirmed) {
    // Redirect to customer_portfolio.html
    window.location.href = 'customer_portfolio.html';
  }
}
function toggleCopilot() {
  const w = document.getElementById("copilot-widget");
  const t = document.getElementById("copilot-trigger");
  w.classList.toggle("active");
  if (w.classList.contains("active")) { t.style.transform = "scale(0)"; }
  else { t.style.transform = "scale(1)"; }
}
function handleCopilotChat() { 
  const i = document.getElementById("copilot-input"); 
  const c = document.getElementById("chat-container"); 
  if (i.value.trim()) { 
    c.innerHTML += `<div class="flex gap-3 justify-end mb-4"><div class="bg-green-600 text-white p-3 rounded-lg rounded-tr-none shadow-sm">${i.value}</div></div>`;
    c.innerHTML += `<div class="flex gap-3 mb-4"><div class="w-8 h-8 bg-gray-900 rounded-full flex-shrink-0 flex items-center justify-center text-white"><i class="fa-solid fa-robot"></i></div><div class="bg-white p-3 rounded-lg rounded-tl-none shadow-sm border border-gray-200 text-gray-700 w-full">Analyzing your request...</div></div>`;
    c.scrollTop = c.scrollHeight; i.value = ""; 
  }
}
