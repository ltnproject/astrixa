/**
 * Astrixa Vault — Local Storage Management
 * Handles chats, messages, settings, and API keys
 */

const STORAGE_KEYS = {
  CHATS: 'astrixa_chats',
  MESSAGES: 'astrixa_messages',
  SETTINGS: 'astrixa_settings',
  API_KEYS: 'astrixa_api_keys',
  THEME: 'astrixa_theme',
  USER: 'astrixa_user',
  FOLDERS: 'astrixa_folders',
  ADDONS: 'astrixa_addons'
};

const Storage = {
  save: (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('Storage Save Error:', e);
      return false;
    }
  },

  get: (key, defaultValue = null) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.error('Storage Get Error:', e);
      return defaultValue;
    }
  },

  remove: (key) => {
    localStorage.removeItem(key);
  },

  // Helper for chats
  getChats: () => Storage.get(STORAGE_KEYS.CHATS, []),
  saveChats: (chats) => Storage.save(STORAGE_KEYS.CHATS, chats),

  // Helper for messages
  getMessages: (chatId) => {
    const allMessages = Storage.get(STORAGE_KEYS.MESSAGES, {});
    return allMessages[chatId] || [];
  },
  saveMessages: (chatId, messages) => {
    const allMessages = Storage.get(STORAGE_KEYS.MESSAGES, {});
    allMessages[chatId] = messages;
    Storage.save(STORAGE_KEYS.MESSAGES, allMessages);
  },
  deleteMessages: (chatId) => {
    const allMessages = Storage.get(STORAGE_KEYS.MESSAGES, {});
    delete allMessages[chatId];
    Storage.save(STORAGE_KEYS.MESSAGES, allMessages);
  },

  // Helper for API Keys
  getApiKeys: () => Storage.get(STORAGE_KEYS.API_KEYS, {}),
  saveApiKey: (providerId, key) => {
    const keys = Storage.getApiKeys();
    keys[providerId] = key;
    Storage.save(STORAGE_KEYS.API_KEYS, keys);
  },

  // Helper for Addons
  getAddons: () => Storage.get(STORAGE_KEYS.ADDONS, {}),
  saveAddonKey: (addonId, key) => {
    const addons = Storage.getAddons();
    addons[addonId] = key;
    Storage.save(STORAGE_KEYS.ADDONS, addons);
  },

  // Helper for Settings
  getSettings: () => Storage.get(STORAGE_KEYS.SETTINGS, {
    defaultProvider: 'openai',
    defaultModel: 'gpt-4o',
    temperature: 0.7,
    maxTokens: 4000,
    topP: 1,
    systemPrompt: 'You are Astra, a helpful and highly capable AI assistant within the Astrixa platform. You provide clear, accurate, and insightful responses. You are professional yet approachable.',
    stream: true
  }),
  saveSettings: (settings) => Storage.save(STORAGE_KEYS.SETTINGS, settings),

  // Export/Import
  exportData: () => {
    const data = {};
    Object.values(STORAGE_KEYS).forEach(key => {
      data[key] = localStorage.getItem(key);
    });
    return JSON.stringify(data);
  },

  importData: (jsonData) => {
    try {
      const data = JSON.parse(jsonData);
      Object.entries(data).forEach(([key, value]) => {
        if (value) localStorage.setItem(key, value);
      });
      return true;
    } catch (e) {
      console.error('Import Error:', e);
      return false;
    }
  }
};

window.Storage = Storage;
window.STORAGE_KEYS = STORAGE_KEYS;
