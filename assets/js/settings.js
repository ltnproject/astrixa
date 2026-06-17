/**
 * Astrixa Settings — Settings Panel Logic
 */

const Settings = {
  open: () => {
    const settings = Storage.getSettings();
    const apiKeys = Storage.getApiKeys();
    
    const body = `
      <div class="flex flex-col gap-6">
        <!-- Profile Section -->
        <section>
          <h3 class="text-sm font-bold uppercase tracking-wider opacity-50 mb-3">User Profile</h3>
          <div class="flex flex-col gap-3">
            <div class="flex flex-col gap-1">
              <label class="text-xs font-semibold">Username</label>
              <input type="text" id="settings-username" class="input-field" value="${Storage.get(STORAGE_KEYS.USER, 'User')}">
            </div>
          </div>
        </section>

        <!-- API Keys Section -->
        <section>
          <h3 class="text-sm font-bold uppercase tracking-wider opacity-50 mb-3">Astrixa Connect (API Keys)</h3>
          <div class="flex flex-col gap-3 max-h-80 overflow-y-auto pr-2" id="settings-keys-list">
            ${Object.values(window.PROVIDERS).map(p => `
              <div class="flex items-center gap-3 p-3 glass rounded-lg border border-transparent hover:border-brand-primary/30 transition-all">
                <div class="w-8 h-8 rounded flex items-center justify-center p-1.5" style="background:${p.color};color:white">${p.icon}</div>
                <div class="flex-1">
                  <div class="text-xs font-bold">${p.name}</div>
                  <div class="text-[10px] opacity-40 font-mono">${apiKeys[p.id] ? 'Key Active' : 'No Key Set'}</div>
                </div>
                <button class="btn-icon text-xs" onclick="Settings.editKey('${p.id}')">✏️</button>
              </div>
            `).join('')}
          </div>
          <a href="get-api.html" target="_blank" class="text-xs text-brand font-bold mt-2 inline-block">Need an API key? View Setup Guide</a>
        </section>

        <!-- AI Parameters -->
        <section>
          <h3 class="text-sm font-bold uppercase tracking-wider opacity-50 mb-3">Astrixa Studio (Parameters)</h3>
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
              <div class="flex justify-between text-xs">
                <label class="font-semibold">Temperature</label>
                <span id="val-temp">${settings.temperature}</span>
              </div>
              <input type="range" id="settings-temp" min="0" max="2" step="0.1" value="${settings.temperature}" oninput="document.getElementById('val-temp').innerText = this.value">
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-xs font-semibold">System Prompt</label>
              <textarea id="settings-system" class="input-field text-xs" rows="3">${settings.systemPrompt}</textarea>
            </div>
          </div>
        </section>
      </div>
    `;

    const footer = `
      <button class="btn btn-ghost" id="settings-cancel">Cancel</button>
      <button class="btn btn-primary" id="settings-save">Save Changes</button>
    `;

    const modal = UI.modal({ title: 'Settings', body, footer });

    document.getElementById('settings-cancel').addEventListener('click', () => modal.close());
    document.getElementById('settings-save').addEventListener('click', () => {
      // Save username
      const username = document.getElementById('settings-username').value;
      Storage.save(STORAGE_KEYS.USER, username);
      
      // Save AI params
      const newSettings = {
        ...settings,
        temperature: parseFloat(document.getElementById('settings-temp').value),
        systemPrompt: document.getElementById('settings-system').value
      };
      Storage.saveSettings(newSettings);
      
      App.updateUserInfo();
      UI.toast('Settings saved successfully', 'success');
      modal.close();
    });
  },

  editKey: (providerId) => {
    const provider = window.PROVIDERS[providerId];
    const keys = Storage.getApiKeys();
    
    const body = `
      <div class="flex flex-col gap-4">
        <p class="text-sm text-secondary">Enter your API key for <strong>${provider.name}</strong>. It will be stored locally.</p>
        <input type="password" id="new-api-key" class="input-field" placeholder="sk-..." value="${keys[providerId] || ''}">
        <a href="${provider.apiKeyUrl}" target="_blank" class="text-xs text-brand font-bold">Get ${provider.name} API Key ↗</a>
      </div>
    `;
    
    const footer = `
      <button class="btn btn-ghost" id="key-cancel">Cancel</button>
      <button class="btn btn-primary" id="key-save">Update Key</button>
    `;
    
    const modal = UI.modal({ title: `Update ${provider.name} Key`, body, footer });
    
    document.getElementById('key-cancel').addEventListener('click', () => modal.close());
    document.getElementById('key-save').addEventListener('click', () => {
      const key = document.getElementById('new-api-key').value;
      Storage.saveApiKey(providerId, key);
      UI.toast(`${provider.name} key updated`, 'success');
      modal.close();
    });
  },

  exportVault: () => {
    const data = Storage.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `astrixa-vault-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    UI.toast('Vault data exported', 'success');
  },

  importVault: () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (Storage.importData(event.target.result)) {
          UI.toast('Vault data imported. Reloading...', 'success');
          setTimeout(() => location.reload(), 1500);
        } else {
          UI.toast('Failed to import data', 'error');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  },

  openVault: () => {
    const body = `
      <div class="flex flex-col gap-6">
        <div class="p-4 bg-brand-primary/10 border border-brand-primary/20 rounded-xl">
          <div class="text-sm font-bold mb-1">Your Data is Local</div>
          <p class="text-xs text-secondary">Astrixa stores everything in your browser's LocalStorage. We never see your keys or chats.</p>
        </div>

        <section>
          <h3 class="text-sm font-bold uppercase tracking-wider opacity-50 mb-3">Backup & Recovery</h3>
          <div class="flex flex-col gap-2">
            <button class="btn btn-secondary justify-start gap-3" onclick="Settings.exportVault()">
              <span>📤</span> Export Astrixa Vault (.json)
            </button>
            <button class="btn btn-secondary justify-start gap-3" onclick="Settings.importVault()">
              <span>📥</span> Import Astrixa Vault (.json)
            </button>
          </div>
        </section>

        <section>
          <h3 class="text-sm font-bold uppercase tracking-wider opacity-50 mb-3">Danger Zone</h3>
          <div class="p-4 border border-red-500/20 bg-red-500/5 rounded-xl">
            <p class="text-xs text-secondary mb-3">This will permanently delete all your data, including API keys and chat history.</p>
            <button class="btn btn-primary bg-red-600 hover:bg-red-700 border-none w-full text-xs" onclick="Settings.clearVault()">
              Purge All Local Data
            </button>
          </div>
        </section>
      </div>
    `;

    const footer = `<button class="btn btn-ghost" id="vault-close">Close Vault</button>`;
    const modal = UI.modal({ title: 'Astrixa Vault', body, footer });
    document.getElementById('vault-close').addEventListener('click', () => modal.close());
  },

  clearVault: () => {
    if (confirm('Are you absolutely sure? This will delete all chats, settings, and API keys permanently.')) {
      localStorage.clear();
      location.reload();
    }
  }
};

window.Settings = Settings;
