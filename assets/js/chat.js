/**
 * Astrixa Chat Engine
 * Handles message history, API streaming, and conversation management
 */

const Chat = {
  currentChatId: null,
  isGenerating: false,
  abortController: null,

  init: () => {
    const chats = Storage.getChats();
    if (chats.length > 0) {
      Chat.loadChat(chats[0].id);
    }
  },

  createNewChat: () => {
    const id = Date.now().toString();
    const newChat = {
      id,
      title: 'New Conversation',
      createdAt: new Date().toISOString(),
      provider: Storage.getSettings().defaultProvider,
      model: Storage.getSettings().defaultModel
    };

    const chats = Storage.getChats();
    chats.unshift(newChat);
    Storage.saveChats(chats);
    Chat.loadChat(id);
    return id;
  },

  loadChat: (id) => {
    Chat.currentChatId = id;
    const messages = Storage.getMessages(id);
    App.renderMessages(messages);
    App.updateSidebarActive(id);
    
    const chats = Storage.getChats();
    const chat = chats.find(c => c.id === id);
    if (chat) {
      App.updateModelDisplay(chat.provider, chat.model);
    }
  },

  deleteChat: (id) => {
    let chats = Storage.getChats();
    chats = chats.filter(c => c.id !== id);
    Storage.saveChats(chats);
    Storage.deleteMessages(id);
    
    if (Chat.currentChatId === id) {
      if (chats.length > 0) {
        Chat.loadChat(chats[0].id);
      } else {
        Chat.createNewChat();
      }
    }
    App.renderChatList();
  },

  sendMessage: async (text, files = []) => {
    if (!text.trim() && files.length === 0) return;
    if (Chat.isGenerating) return;

    if (!Chat.currentChatId) {
      Chat.createNewChat();
    }

    const messages = Storage.getMessages(Chat.currentChatId);
    
    // Add user message
    const userMsg = {
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
      files: files
    };
    messages.push(userMsg);
    Storage.saveMessages(Chat.currentChatId, messages);
    App.renderMessages(messages);
    
    // Update chat title if it's the first message
    if (messages.length === 1) {
      const chats = Storage.getChats();
      const chat = chats.find(c => c.id === Chat.currentChatId);
      if (chat) {
        chat.title = text.substring(0, 30) + (text.length > 30 ? '...' : '');
        Storage.saveChats(chats);
        App.renderChatList();
      }
    }

    // Prepare for AI response
    Chat.isGenerating = true;
    Chat.abortController = new AbortController();
    App.setLoading(true);

    const aiMsg = {
      role: 'assistant',
      content: '',
      timestamp: new Date().toISOString(),
      provider: '',
      model: ''
    };
    messages.push(aiMsg);
    
    // Immediately render the placeholder for the assistant message
    App.renderMessages(messages);
    
    const settings = Storage.getSettings();
    const apiKeys = Storage.getApiKeys();
    const chats = Storage.getChats();
    const currentChat = chats.find(c => c.id === Chat.currentChatId);
    
    const providerId = currentChat.provider || settings.defaultProvider;
    const modelId = currentChat.model || settings.defaultModel;
    const provider = window.PROVIDERS[providerId];
    const apiKey = apiKeys[providerId];

    if (!apiKey) {
      aiMsg.content = `Error: No API key found for ${provider.name}. Please go to Settings to add your key.`;
      Chat.finishGeneration(messages);
      return;
    }

    // Set model in message for display
    aiMsg.provider = providerId;
    aiMsg.model = modelId;

    try {
      // Prepare message payload with system prompt
      const username = Storage.get(STORAGE_KEYS.USER, 'User');
      const systemMessage = {
        role: 'system',
        content: `${settings.systemPrompt}\n\nThe user's name is ${username}. Address them as ${username} when appropriate.`
      };

      const payloadMessages = [
        systemMessage,
        ...messages.slice(0, -1).map(m => ({ role: m.role, content: m.content }))
      ];

      const response = await fetch(`${provider.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: currentChat.model || settings.defaultModel,
          messages: payloadMessages,
          temperature: settings.temperature,
          max_tokens: settings.maxTokens,
          stream: true
        }),
        signal: Chat.abortController.signal
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error?.message || 'Failed to connect to AI provider');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop(); // Keep the incomplete line in buffer

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith('data: ')) continue;
          
          const dataStr = trimmed.slice(6);
          if (dataStr === '[DONE]') break;
          
          try {
            const data = JSON.parse(dataStr);
            const content = data.choices[0]?.delta?.content || '';
            if (content) {
              aiMsg.content += content;
              App.updateLastMessage(aiMsg.content);
            }
          } catch (e) {
            console.error('Stream parse error', e);
          }
        }
      }
    } catch (e) {
      if (e.name === 'AbortError') {
        aiMsg.content += '\n\n[Generation stopped by user]';
      } else {
        aiMsg.content = `Error: ${e.message}`;
      }
      App.updateLastMessage(aiMsg.content);
    } finally {
      Chat.finishGeneration(messages);
    }
  },

  finishGeneration: (messages) => {
    Chat.isGenerating = false;
    Chat.abortController = null;
    Storage.saveMessages(Chat.currentChatId, messages);
    App.setLoading(false);
  },

  stopGeneration: () => {
    if (Chat.abortController) {
      Chat.abortController.abort();
    }
  }
};

window.Chat = Chat;
