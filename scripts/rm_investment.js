function generateRebalancingProposal() {
  // Hide action chips
  document.getElementById('action-chips').style.display = 'none';

  // User message
  sendChatMessage('Generate rebalancing proposal for Jennifer Wu (SVB Crisis)', true);

  // Step 1: Analyzing
  setTimeout(() => {
    sendChatMessage('<div class="flex items-center"><div class="animate-spin mr-2 text-info"><i class="fa-solid fa-spinner"></i></div><span>🔍 Analyzing SVB crisis impact on portfolio...</span></div>', false);
  }, 500);

  // Step 2: Calculating
  setTimeout(() => {
    sendChatMessage('<div class="flex items-center"><div class="animate-spin mr-2 text-info"><i class="fa-solid fa-spinner"></i></div><span>📊 Calculating optimal asset allocation...</span></div>', false);
  }, 1500);

  // Step 3: Ready
  setTimeout(() => {
    sendChatMessage('<div class="flex items-center text-success"><i class="fa-solid fa-check-circle mr-2"></i><span>✅ Rebalancing proposal ready</span></div>', false);
  }, 2500);

  // Final summary with button
  setTimeout(() => {
    const summary = `
                    <div class="border border-blue-200 rounded-lg p-3 bg-info">
                        <div class="font-bold text-info mb-2 flex items-center">
                            <i class="fa-solid fa-file-invoice mr-2"></i>Rebalancing Proposal Generated
                        </div>
                        <div class="space-y-1 text-gray-700 mb-3">
                            <p><strong>Client:</strong> Jennifer Wu</p>
                            <p><strong>Trigger:</strong> SVB Crisis - Tech sector exposure 65%</p>
                            <p><strong>Recommendation:</strong> Reduce QQQ by $100K, increase TLT by $100K</p>
                            <hr class="my-2 border-blue-200">
                            <p class="text-green-700"><strong>Expected Outcome:</strong></p>
                            <p class="text-green-700">• Risk reduction: <strong>30%</strong></p>
                            <p class="text-green-700">• Estimated loss avoided: <strong>$30,000</strong></p>
                        </div>
                        <button onclick="viewFullDetails()" class="w-full btn-success text-sm py-2 rounded transition">
                            <i class="fa-solid fa-eye mr-1"></i>View Full Details
                        </button>
                    </div>
                `;
    sendChatMessage(summary, false);
  }, 3500);
}

function checkCompliance() {
  document.getElementById('action-chips').style.display = 'none';
  sendChatMessage('Does the current rebalancing recommendation for Jennifer Wu comply with all regulatory requirements?', true);

  setTimeout(() => {
    const response = `✅ <strong>Yes, fully compliant.</strong><br><br>The rebalancing recommendation has passed all compliance checks:<br>• Client risk profile: Moderate-Aggressive ✓<br>• Regulatory requirements: Hong Kong SFC ✓<br>• Position limits: Within thresholds ✓<br>• Suitability assessment: Approved ✓<br><br>You can proceed with confidence.`;
    sendChatMessage(response, false);
  }, 1000);
}

function viewFullDetails() {
  // Close copilot
  toggleCopilot();

  // Show detail panel
  setTimeout(() => {
    showAdviceDetail('jennifer');
  }, 300);
}

function sendActionToAgent(action) {
  sendChatMessage(action, true); // Send the action text as user message
  sendChatMessage(action, true);

  // Simulate AI response
  setTimeout(() => {
    let botResp = `Confirmed: I have initiated the task for **${action}**. Results will be available in the chat shortly.`;
    if (action.includes('ESG Report Summary')) {
      botResp = `**Top 3 Findings:**<br>1. **Renewables Overperform:** Funds with >30% solar/wind exposure beat MSCI World by 1.5% YTD.<br>2. **Carbon Risk:** 2 reports flag excessive carbon exposure in 4 currently-approved funds.<br>3. **Regional Focus:** European ESG funds show higher regulation compliance scores.`;
    }
    sendChatMessage(botResp, false);
  }, 800);
}

function sendChatMessage(message, isUser = true) {
  const chatContainer = document.getElementById('chat-container');
  const newChat = document.createElement('div');
  newChat.className = `flex gap-3 chat-bubble-in mb-4 ${isUser ? 'justify-end' : ''}`;

  const messageContent = `<div class="p-3 shadow-sm w-full max-w-xs ${isUser ? 'bg-info text-info ' : 'bg-white text-gray-700 rounded-tl-none border-gray-200'}">${message}</div>`;
  const avatar = `<div class="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white ${isUser ? 'bg-gray-400' : 'bg-gray-900'}"><i class="fa-solid ${isUser ? 'fa-user' : 'fa-robot'}"></i></div>`;

  if (isUser) {
    newChat.innerHTML = `${messageContent}${avatar}`;
  } else {
    newChat.innerHTML = `${avatar}${messageContent}`;
  }

  chatContainer.appendChild(newChat);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function handleCopilotInput() {
  const input = document.getElementById('copilot-input');
  if (input.value.trim() !== '') {
    const message = input.value.trim();
    sendChatMessage(message, true);

    // Simulate AI response
    setTimeout(() => {
      sendChatMessage(`Search initiated for: **${message}**. Results are being synthesized now.`, false);
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

function showAdviceDetail(clientId) {
  const panel = document.getElementById('advice-detail-panel');
  panel.style.display = 'block';
  // 滚动到面板位置
  panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function hideAdviceDetail() {
  document.getElementById('advice-detail-panel').style.display = 'none';
}

function approveRebalancing() {
  const viewCustomer = confirm('✅ Rebalancing advice approved\n\nClient Jennifer Wu will receive notification.\nTrade will complete within 2 hours.\n\nWould you like to view customer notification?');
  showComplianceReview();
}

function showComplianceReview() {
  const modal = document.createElement('div');
  modal.id = 'compliance-modal';
  modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center';
  modal.innerHTML = `
                <div class="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4">
                    <div class="text-center mb-6">
                        <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="fa-solid fa-shield-halved text-info text-3xl"></i>
                        </div>
                        <h3 class="text-xl font-bold text-gray-900 mb-2">Compliance Agent Review</h3>
                        <p class="text-sm text-gray-600">Automated compliance verification in progress...</p>
                    </div>
                    
                    <div id="compliance-checks" class="space-y-3 mb-6">
                        <div id="check-1" class="flex items-center p-3 bg-gray-50 rounded-lg">
                            <div class="animate-spin mr-3 text-info"><i class="fa-solid fa-spinner"></i></div>
                            <span class="text-sm text-gray-700">Verifying client risk profile...</span>
                        </div>
                        <div id="check-2" class="flex items-center p-3 bg-gray-50 rounded-lg opacity-50">
                            <div class="mr-3 text-gray-400"><i class="fa-solid fa-clock"></i></div>
                            <span class="text-sm text-gray-500">Checking regulatory requirements...</span>
                        </div>
                        <div id="check-3" class="flex items-center p-3 bg-gray-50 rounded-lg opacity-50">
                            <div class="mr-3 text-gray-400"><i class="fa-solid fa-clock"></i></div>
                            <span class="text-sm text-gray-500">Validating position limits...</span>
                        </div>
                        <div id="check-4" class="flex items-center p-3 bg-gray-50 rounded-lg opacity-50">
                            <div class="mr-3 text-gray-400"><i class="fa-solid fa-clock"></i></div>
                            <span class="text-sm text-gray-500">Assessing suitability...</span>
                        </div>
                    </div>
                    
                    <div id="compliance-result" class="hidden">
                        <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                            <div class="flex items-start">
                                <div class="text-success text-2xl mr-3"><i class="fa-solid fa-check-circle"></i></div>
                                <div>
                                    <h4 class="font-bold text-green-900 mb-1">Compliance Approved</h4>
                                    <p class="text-sm text-green-800">All regulatory requirements have been met. The rebalancing recommendation is fully compliant.</p>
                                </div>
                            </div>
                        </div>
                        <button onclick="finalizeApproval()" class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition">
                            <i class="fa-solid fa-check mr-2"></i>Proceed to Client Notification
                        </button>
                    </div>
                </div>
            `;
  document.body.appendChild(modal);

  setTimeout(() => completeCheck(1, 'Client risk profile verified ✓'), 1200);
  setTimeout(() => completeCheck(2, 'Regulatory requirements met ✓'), 2400);
  setTimeout(() => completeCheck(3, 'Position limits validated ✓'), 3600);
  setTimeout(() => completeCheck(4, 'Suitability assessment passed ✓'), 4800);
  setTimeout(() => showComplianceResult(), 5500);
}

function completeCheck(checkNum, message) {
  const check = document.getElementById(`check-${checkNum}`);
  if (check) {
    check.className = 'flex items-center p-3 bg-green-50 rounded-lg border border-green-200';
    check.innerHTML = `
                    <div class="mr-3 text-success"><i class="fa-solid fa-check-circle"></i></div>
                    <span class="text-sm text-green-800 font-medium">${message}</span>
                `;
  }

  const nextCheck = document.getElementById(`check-${checkNum + 1}`);
  if (nextCheck) {
    nextCheck.className = 'flex items-center p-3 bg-gray-50 rounded-lg';
    nextCheck.querySelector('div').className = 'animate-spin mr-3 text-info';
    nextCheck.querySelector('div').innerHTML = '<i class="fa-solid fa-spinner"></i>';
    nextCheck.querySelector('span').className = 'text-sm text-gray-700';
  }
}

function showComplianceResult() {
  document.getElementById('compliance-checks').style.display = 'none';
  document.getElementById('compliance-result').classList.remove('hidden');
}

function finalizeApproval() {
  const modal = document.getElementById('compliance-modal');
  if (modal) modal.remove();

  const viewCustomer = confirm('✅ Compliance Approved & Rebalancing Authorized\n\nClient Jennifer Wu will receive notification.\nTrade will complete within 2 hours.\n\nWould you like to view customer notification?');
  localStorage.setItem('rebalancing_status', 'approved');
  document.getElementById('advice-detail-panel').style.display = 'none';

  if (viewCustomer) {
    // Redirect to customer view
    window.location.href = 'customer_lockscreen.html';
  }
}

function modifyRebalancing() {
  alert('Modify function: Allow investment officer to adjust AI recommendation parameters');
}