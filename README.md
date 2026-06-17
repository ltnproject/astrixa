# 🌌 Astrixa — The Ultimate AI Platform

**One Platform. Every AI Model. Unlimited Power.**

Astrixa is a production-quality, privacy-first AI platform designed for power users who want full control over their AI experience. Built with a modern glassmorphism UI and a modular architecture, Astrixa allows you to connect to 16+ AI providers using your own API keys.

**Live Demo:** [drk.qzz.io/astrixa](https://drk.qzz.io/astrixa)

---

## ✨ Features

### 💬 Astrixa Chat
A premium ChatGPT-style interface powered by **Astra**, your dedicated AI assistant.
*   **Markdown Support:** Full rendering for tables, lists, and formatting.
*   **Syntax Highlighting:** Beautiful code blocks with one-click copy.
*   **Streaming Responses:** Real-time token delivery for instant feedback.
*   **Conversation Management:** Unlimited local chats, folders, pinning, and search.

### 🔌 Astrixa Connect
Universal compatibility with every major AI provider.
*   **Supported Providers:** OpenAI, Anthropic Claude, Google Gemini, Groq, xAI Grok, Mistral AI, DeepSeek, Qwen, NVIDIA, Kimi, and more.
*   **Modular Architecture:** Add new providers via configuration without changing core code.
*   **API Key Safety:** Your keys are stored locally and never touch a server.

### 🔒 Astrixa Vault
Your data belongs to you.
*   **Local Storage:** All chats, settings, and keys are stored in your browser's `localStorage`.
*   **Zero Tracking:** No analytics, no cookies, no data collection.
*   **Export/Import:** Backup your entire vault as a JSON file or export individual chats as Markdown.

### 📦 Astrixa Models
Advanced model management.
*   **Dynamic Selector:** Switch between models mid-conversation.
*   **Capability Tags:** Quickly see which models support Vision, Reasoning, or Coding.
*   **Context Info:** View context window limits and model speeds.

---

## 🚀 Quick Start

### Deployment (GitHub Pages)
1.  **Fork/Clone** this repository.
2.  Go to your repository **Settings** > **Pages**.
3.  Select the **main** branch and the **root** folder.
4.  Click **Save**. Your site will be live at `https://<username>.github.io/<repo-name>/`.

### Local Development
Since Astrixa is built with vanilla HTML/CSS/JS, you don't need to install any dependencies.
1.  Clone the repo: `git clone https://github.com/yourusername/astrixa.git`
2.  Open `index.html` in your browser.
3.  (Optional) Use a local server like `Live Server` in VS Code for a better experience.

---

## 🛠️ Project Structure

```text
/
├── index.html          # Marketing Landing Page
├── astrixa.html        # Main AI Platform Application
├── get-api.html        # Astrixa Connect Guide Page
└── assets/
    ├── css/
    │   └── styles.css  # Core Glassmorphism UI System
    └── js/
        ├── app.js      # Main Application Controller
        ├── chat.js     # Chat Engine & API Logic
        ├── providers.js # Provider & Model Configurations
        ├── storage.js  # Astrixa Vault Management
        ├── ui.js       # Shared UI Components
        └── theme.js    # Theme Management System
```

---

## 🎨 Customization

### Adding a New Provider
Open `assets/js/providers.js` and add a new entry to the `PROVIDERS` object:

```javascript
my_provider: {
  id: 'my_provider',
  name: 'New AI',
  baseUrl: 'https://api.newai.com/v1',
  icon: '✨',
  color: '#ff0000',
  models: [
    { id: 'model-1', name: 'Model 1', context: 32000, tags: ['Fast'] }
  ]
}
```

---

## 📜 License
Built with ❤️ for the AI community. This project is open-source and free to use.

---

**Developed by AstrixaWorld** 🌌
