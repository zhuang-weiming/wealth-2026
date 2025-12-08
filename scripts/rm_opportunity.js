// Helper function to render messages in the chat panel
function sendChatMessage(message, isUser = false) {
  const chatContainer = document.getElementById('chat-container');
  const newChat = document.createElement('div');
  newChat.className = `flex gap-3 chat-bubble-in mb-4 ${isUser ? 'justify-end' : ''}`;

  const messageContent = `<div class="p-3 shadow-sm w-full max-w-xs ${isUser ? 'bg-info text-info' : 'bg-white text-gray-700 rounded-tl-none border-gray-200'}">${message}</div>`;
  const avatar = `<div class="w-8 h-8 flex-shrink-0 flex items-center justify-center text-white ${isUser ? 'bg-gray-400' : 'bg-gray-900'}"><i class="fa-solid ${isUser ? 'fa-user' : 'fa-robot'}"></i></div>`;

  if (isUser) {
    newChat.innerHTML = `${messageContent}${avatar}`;
  } else {
    newChat.innerHTML = `${avatar}${messageContent}`;
  }

  chatContainer.appendChild(newChat);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Search logic — render results based on simple keyword matching
(function () {
  const clients = {
    robert: {
      id: 'robert',
      href: 'rm_planning.html?client=robert',
      title: 'Robert Chen',
      subtitle: 'Business Owner (Tech) • Age 52',
      category: 'Cash & Equivalents',
      amount: '$3,145,200',
      textColor: 'text-primary',
      text: 'High Liquidity (Cash Drag)',
      tagHtml: '<div class="px-4 py-1 btn-danger">High Liquidity (Cash Drag)</div>',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert'
    },
    alice: {
      id: 'alice',
      href: 'rm_planning.html?client=alice',
      title: 'Alice Num',
      subtitle: 'Premier Client • Age 57',
      category: 'Reviewing First Home Mortgage',
      amount: '',
      textColor: 'text-primary',
      text: 'Reviewing First Home Mortgage',
      tagHtml: '<div class="text-brand-red mt-1 font-semibold flex items-center">Reviewing First Home Mortgage <i class="fa-solid fa-arrow-right ml-1"></i></div>',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice'
    },
    sarah: {
      id: 'sarah',
      href: 'rm_planning.html?client=sarah',
      title: 'Sarah Jenkins',
      subtitle: 'Director @ GlobalTech • Age 48',
      category: 'Investable Cash',
      amount: '$1,152,430',
      textColor: 'text-default',
      text: 'High Income',
      tagHtml: '<a class="px-4 py-1 bg-gray-100 text-gray-600 font-bold">High Income</div>',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    }
  };

  function renderCard(c) {
    // Use the same card structure as other result cards
    return `
                    <div
                        class="bg-white p-4 border border-gray-200 hover:border-gray-400 transition-colors cursor-pointer flex flex-col justify-between">
                        <div class="flex justify-between items-start">
                          <div >
                            <div class="flex items-center gap-4"> 
                              <img src="${c.avatar}" class="w-10 h-10 rounded-full bg-blue-50">
                              <h4 class="font-bold text-lg">${c.title}</h4>
                            </div>
                            
                            <p class="text-gray-500">${c.subtitle}</p>
                          </div>
                          <div class="text-right mt-3">
                              <p class="text-gray-500 uppercase">${c.category}</p>
                              <p class="font-bold text-gray-800">${c.amount}</p>
                          </div>
                        </div>
                        <a href="${c.href}" class="link-with-right-chevron mt-10 ${c.textColor}"
                        >
                          <span>
                            <span class="hsbc-right-chevron" aria-hidden="true"></span>
                          <span>${c.text}</span>
                          <span class="empty" aria-hidden="true"></span>
                        </span>
                      </a>
                    </div>
                `;
  }

  function showResults(clientIds, searchText) {
    const container = document.getElementById('opportunity-results');

    // Build results header (keeps same structure as original)
    const headerHtml = `
                    <div class="flex justify-between items-end mb-4 px-2">
                        <h3 class="font-bold text-gray-700 flex items-center">Search Results (${clientIds.length})</h3>
                        <button onclick="clearSearch()" class="btn-link flex items-center"><i class="fa-solid fa-xmark mr-1"></i><span>Clear Search</span></button>
                    </div>
                `;

    // Build grid wrapper and cards
    let cardsHtml = '';
    for (const id of clientIds) {
      if (clients[id]) cardsHtml += renderCard(clients[id]);
    }

    const gridHtml = `<div class="grid grid-cols-1 md:grid-cols-2 gap-5">${cardsHtml}</div>`;

    // Replace container content entirely to avoid leftover blocks
    container.innerHTML = headerHtml + gridHtml;
    container.classList.remove('hidden');

    // chat feedback
    sendChatMessage(`Searching for: ${searchText}`, true);
    setTimeout(() => {
      sendChatMessage(`Found ${clientIds.length} client${clientIds.length > 1 ? 's' : ''} matching your criteria.`, false);
    }, 500);
  }

  window.triggerSearch = function () {
    const searchText = document.getElementById('crm-search-input').value.trim();
    if (searchText === '') return;

    // Hide recent contacts and nudge card
    document.getElementById('recent-contacts-section').classList.add('hidden');
    document.getElementById('copilot-insight-card').classList.add('hidden');

    const q = searchText.toLowerCase();

    // Case 2: maturing fixed-income next week -> Robert + Alice
    if (q.includes('maturing') && q.includes('fixed') || q.includes('fixed-income') || q.includes('fixed income') || q.includes('next week')) {
      showResults(['robert', 'alice'], searchText);
      return;
    }

    // Case 3: missing an Education Fund -> Sarah
    if (q.includes('education') || (q.includes('missing') && q.includes('education'))) {
      showResults(['sarah'], searchText);
      return;
    }

    // Case 1: Clients over 50 in Tech sector with >$1M cash -> Robert
    const isOver50 = q.includes('over 50') || q.includes('age 50') || q.includes('50-60') || /\b50\b/.test(q) || /\b52\b/.test(q);
    const isTech = q.includes('tech') || q.includes('technology');
    const hasMillion = q.includes('1m') || q.includes('$1') || q.includes('1 million') || q.includes('> $1');
    if ((isOver50 && isTech && hasMillion) || (isTech && hasMillion && q.includes('age'))) {
      showResults(['robert'], searchText);
      return;
    }

    // Default: if query contains 'tech' show Robert, if contains 'education' show Sarah, otherwise fall back to a generic response
    if (q.includes('tech')) {
      showResults(['robert'], searchText);
      return;
    }

    if (q.includes('education')) {
      showResults(['sarah'], searchText);
      return;
    }

    // Fallback: no results
    const container = document.getElementById('opportunity-results');
    container.innerHTML = `<div class="px-2">\n<div class=\"text-gray-600\">No clients matched your search. Try different criteria.</div>\n</div>`;
    container.classList.remove('hidden');
    sendChatMessage(`No clients matched '${searchText}'.`, false);
  };

  window.fillSearch = function (query) {
    document.getElementById('crm-search-input').value = query;
    triggerSearch();
  };

  window.clearSearch = function () {
    document.getElementById('recent-contacts-section').classList.remove('hidden');
    // Ensure nudge is visible when clearing search
    document.getElementById('copilot-insight-card').classList.remove('hidden');
    const container = document.getElementById('opportunity-results');
    container.classList.add('hidden');
    // remove any dynamic results content so we don't leak old cards
    const innerGrid = container.querySelector('.grid');
    if (innerGrid) innerGrid.remove();
    document.getElementById('crm-search-input').value = '';
  };
})();

function handleCopilotInput() {
  const input = document.getElementById('copilot-input');
  if (input.value.trim() !== '') {
    const message = input.value.trim();
    sendChatMessage(message, true);

    // Simulate AI response
    setTimeout(() => {
      sendChatMessage(`Analysis requested for: ${message}. Please wait for the results.`, false);
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

// Suggestions logic: show recommended search criteria when user types 'client'
(function () {
  const input = document.getElementById('crm-search-input');
  const suggestionsEl = document.getElementById('suggestions-list');
  const suggestions = [
    {
      label: 'Clients over 50 in Tech sector with >$1M cash',
      query: "Clients over 50 in Tech sector with >$1M cash"
    },
    {
      label: 'Clients with maturing fixed-income next week',
      query: 'Clients with maturing fixed-income next week'
    },
    {
      label: 'Show clients missing an Education Fund',
      query: 'Show clients missing an Education Fund'
    }
  ];

  let activeIndex = -1;

  function renderSuggestions(filtered) {
    if (!filtered || filtered.length === 0) {
      suggestionsEl.classList.add('hidden');
      suggestionsEl.setAttribute('aria-hidden', 'true');
      return;
    }

    suggestionsEl.innerHTML = '';
    filtered.forEach((s, i) => {
      const item = document.createElement('div');
      item.className = 'suggestion-item';
      item.setAttribute('role', 'button');
      item.setAttribute('tabindex', '0');
      item.innerText = s.label;
      item.addEventListener('click', () => {
        fillSearch(s.query);
        hideSuggestions();
      });
      item.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter') {
          fillSearch(s.query);
          hideSuggestions();
        }
      });
      suggestionsEl.appendChild(item);
    });

    activeIndex = -1;
    suggestionsEl.classList.remove('hidden');
    suggestionsEl.setAttribute('aria-hidden', 'false');
  }

  function hideSuggestions() {
    suggestionsEl.classList.add('hidden');
    suggestionsEl.setAttribute('aria-hidden', 'true');
    activeIndex = -1;
  }

  function filterSuggestions(q) {
    // only show suggestions when user types the word 'client' (or 'clients')
    if (!q) return [];
    const lower = q.toLowerCase();
    if (lower.includes('client')) return suggestions;
    // also show if user typed only 'c' or 'cl' to be helpful
    if (/^c(l)?(i)?/.test(lower)) return suggestions;
    return [];
  }

  input.addEventListener('input', (e) => {
    const q = e.target.value || '';
    const filtered = filterSuggestions(q);
    renderSuggestions(filtered);
  });

  input.addEventListener('keydown', (e) => {
    const items = Array.from(suggestionsEl.querySelectorAll('.suggestion-item'));
    if (items.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIndex = Math.min(activeIndex + 1, items.length - 1);
      items.forEach((it, idx) => it.classList.toggle('active', idx === activeIndex));
      items[activeIndex].focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
      items.forEach((it, idx) => it.classList.toggle('active', idx === activeIndex));
      items[activeIndex].focus();
    } else if (e.key === 'Escape') {
      hideSuggestions();
    }
  });

  // hide suggestions when clicking outside
  document.addEventListener('click', (ev) => {
    if (!suggestionsEl.contains(ev.target) && ev.target !== input) {
      hideSuggestions();
    }
  });
})();