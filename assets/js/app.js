/**
 * Astrixa — Main Application Controller
 */

const App = {
  init: () => {
    // Check if first launch
    const isFirstLaunch = !Storage.get(STORAGE_KEYS.USER);
    if (isFirstLaunch) {
      App.showOnboarding();
    } else {
      document.getElementById('onboarding-overlay').style.display = 'none';
      App.loadAppData();
    }

    App.bindEvents();
    Chat.init();
  },

  loadAppData: () => {
    App.updateUserInfo();
    App.renderChatList();
    
    // Set initial model display
    const settings = Storage.getSettings();
    App.updateModelDisplay(settings.defaultProvider, settings.defaultModel);
  },

  bindEvents: () => {
    // New Chat
    document.getElementById('new-chat-btn').addEventListener('click', () => {
      Chat.createNewChat();
      if (window.innerWidth <= 768) App.toggleSidebar(false);
    });

    // Send Message
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');

    chatInput.addEventListener('input', () => {
      sendBtn.disabled = !chatInput.value.trim();
      chatInput.style.height = 'auto';
      chatInput.style.height = Math.min(chatInput.scrollHeight, 200) + 'px';
    });

    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        App.handleSend();
      }
    });

    sendBtn.addEventListener('click', App.handleSend);

    // Sidebar Toggle
    document.getElementById('mobile-sidebar-toggle').addEventListener('click', () => App.toggleSidebar(true));
    document.getElementById('sidebar-overlay').addEventListener('click', () => App.toggleSidebar(false));

    // Settings & Vault
    document.getElementById('open-settings-btn').addEventListener('click', Settings.open);
    document.getElementById('open-vault-btn').addEventListener('click', Settings.open); // Both open settings for now

    // Theme
    document.getElementById('theme-toggle-app').addEventListener('click', () => {
      const next = Theme.toggle();
      document.getElementById('theme-toggle-app').textContent = next === 'dark' ? '☀️' : '🌙';
    });

    // Model Selector
    document.getElementById('model-selector-trigger').addEventListener('click', (e) => {
      const providers = Object.values(window.PROVIDERS);
      const items = [];
      
      providers.forEach(p => {
        items.push({ divider: true });
        items.push({ label: p.name.toUpperCase(), icon: p.icon, onClick: () => {} }); // Label only
        
        p.models.forEach(m => {
          items.push({
            label: m.name,
            onClick: () => {
              App.changeModel(p.id, m.id);
            }
          });
        });
      });
      
      UI.createDropdown(e.currentTarget, items.slice(1));
    });

    // Clear Chat
    document.getElementById('clear-chat-btn').addEventListener('click', () => {
      if (confirm('Clear all messages in this chat?')) {
        Storage.saveMessages(Chat.currentChatId, []);
        App.renderMessages([]);
      }
    });

    // Suggestions
    document.querySelectorAll('.suggestion-card').forEach(card => {
      card.addEventListener('click', () => {
        chatInput.value = card.dataset.prompt;
        chatInput.focus();
        sendBtn.disabled = false;
      });
    });
  },

  handleSend: () => {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text || Chat.isGenerating) return;

    input.value = '';
    input.style.height = 'auto';
    document.getElementById('send-btn').disabled = true;
    
    Chat.sendMessage(text);
  },

  renderMessages: (messages) => {
    const container = document.getElementById('messages-container');
    const emptyState = document.getElementById('empty-state');
    
    if (messages.length === 0) {
      container.innerHTML = '';
      emptyState.style.display = 'flex';
      return;
    }

    emptyState.style.display = 'none';
    container.innerHTML = messages.map((m, i) => `
      <div class="message-row ${m.role}">
        <div class="message-avatar ${m.role === 'assistant' ? 'ai' : ''}">
          ${m.role === 'assistant' ? 'A' : (Storage.get(STORAGE_KEYS.USER, 'U')[0].toUpperCase())}
        </div>
        <div class="message-content">
          <div class="message-bubble ${m.role}">
            ${UI.renderMarkdown(m.content)}
          </div>
          <div class="message-meta">
            <span>${new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <div class="message-actions">
              <button class="message-action-btn" onclick="App.copyMessage(this)" data-tooltip="Copy">📋</button>
              ${m.role === 'assistant' ? `<button class="message-action-btn" onclick="App.regenerateMessage(${i})" data-tooltip="Regenerate">🔄</button>` : ''}
            </div>
          </div>
        </div>
      </div>
    `).join('');
    
    App.scrollToBottom();
  },

  updateLastMessage: (content) => {
    const container = document.getElementById('messages-container');
    const lastMsg = container.querySelector('.message-row.assistant:last-child .message-bubble');
    if (lastMsg) {
      lastMsg.innerHTML = UI.renderMarkdown(content);
      App.scrollToBottom();
    }
  },

  renderChatList: () => {
    const container = document.getElementById('chat-list-container');
    const chats = Storage.getChats();
    
    container.innerHTML = chats.map(c => `
      <div class="sidebar-item ${c.id === Chat.currentChatId ? 'active' : ''}" onclick="Chat.loadChat('${c.id}')">
        <span>💬</span>
        <span class="truncate flex-1">${c.title}</span>
        <div class="item-actions">
          <button onclick="event.stopPropagation(); App.renameChat('${c.id}')">✏️</button>
          <button onclick="event.stopPropagation(); Chat.deleteChat('${c.id}')">🗑️</button>
        </div>
      </div>
    `).join('');
  },

  updateSidebarActive: (id) => {
    document.querySelectorAll('.sidebar-item').forEach(el => {
      el.classList.toggle('active', el.getAttribute('onclick')?.includes(id));
    });
  },

  updateUserInfo: () => {
    const username = Storage.get(STORAGE_KEYS.USER, 'User');
    document.getElementById('username-display').textContent = username;
    document.getElementById('user-avatar-small').textContent = username[0].toUpperCase();
  },

  updateModelDisplay: (providerId, modelId) => {
    const provider = window.PROVIDERS[providerId];
    if (!provider) return;
    const model = provider.models.find(m => m.id === modelId) || provider.models[0];
    
    document.getElementById('current-provider-icon').textContent = provider.icon;
    document.getElementById('current-model-name').textContent = model.name;
  },

  changeModel: (providerId, modelId) => {
    const chats = Storage.getChats();
    const chat = chats.find(c => c.id === Chat.currentChatId);
    if (chat) {
      chat.provider = providerId;
      chat.model = modelId;
      Storage.saveChats(chats);
      App.updateModelDisplay(providerId, modelId);
      UI.toast(`Switched to ${modelId}`, 'info');
    }
  },

  setLoading: (loading) => {
    const sendBtn = document.getElementById('send-btn');
    if (loading) {
      sendBtn.innerHTML = '<div class="spinner" style="width:16px;height:16px;border-width:2px;border-top-color:white;"></div>';
      sendBtn.onclick = () => Chat.stopGeneration();
      sendBtn.disabled = false;
      sendBtn.setAttribute('data-tooltip', 'Stop Generation');
    } else {
      sendBtn.innerHTML = '↑';
      sendBtn.onclick = App.handleSend;
      sendBtn.disabled = !document.getElementById('chat-input').value.trim();
      sendBtn.removeAttribute('data-tooltip');
    }
  },

  scrollToBottom: () => {
    const container = document.getElementById('chat-container');
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
  },

  toggleSidebar: (show) => {
    document.getElementById('app-sidebar').classList.toggle('open', show);
    document.getElementById('sidebar-overlay').classList.toggle('open', show);
  },

  showOnboarding: () => {
    const overlay = document.getElementById('onboarding-overlay');
    const providerList = document.getElementById('onboarding-provider-list');
    
    overlay.style.display = 'flex';
    
    // Populate providers
    providerList.innerHTML = Object.values(window.PROVIDERS).slice(0, 5).map(p => `
      <button class="btn btn-secondary justify-start gap-3" onclick="App.selectOnboardingProvider('${p.id}')">
        <span style="width:24px">${p.icon}</span> ${p.name}
      </button>
    `).join('');

    document.getElementById('onboarding-start').onclick = () => App.showOnboardingStep(2);
    document.getElementById('onboarding-back-2').onclick = () => App.showOnboardingStep(2);
    document.getElementById('onboarding-next-3').onclick = () => App.showOnboardingStep(4);
    
    document.getElementById('onboarding-finish').onclick = () => {
      const username = document.getElementById('onboarding-username').value || 'User';
      Storage.save(STORAGE_KEYS.USER, username);
      overlay.style.display = 'none';
      App.loadAppData();
      Chat.createNewChat();
      UI.toast(`Welcome to Astrixa, ${username}!`, 'success');
    };
  },

  showOnboardingStep: (step) => {
    document.querySelectorAll('.onboarding-step').forEach((el, i) => {
      el.classList.toggle('active', i + 1 === step);
    });
  },

  selectOnboardingProvider: (id) => {
    const settings = Storage.getSettings();
    settings.defaultProvider = id;
    settings.defaultModel = window.PROVIDERS[id].models[0].id;
    Storage.saveSettings(settings);
    App.showOnboardingStep(3);
  },

  copyMessage: (btn) => {
    const text = btn.closest('.message-content').querySelector('.message-bubble').innerText;
    navigator.clipboard.writeText(text).then(() => UI.toast('Copied to clipboard', 'success'));
  },

  renameChat: (id) => {
    const chats = Storage.getChats();
    const chat = chats.find(c => c.id === id);
    const newTitle = prompt('Enter new chat title:', chat.title);
    if (newTitle) {
      chat.title = newTitle;
      Storage.saveChats(chats);
      App.renderChatList();
    }
  }
};

window.App = App;
document.addEventListener('DOMContentLoaded', App.init);
