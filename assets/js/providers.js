/**
 * Astrixa Models — Provider Configuration
 * Modular architecture for AI providers with official SVG icons
 */

const PROVIDERS = {
  openai: {
    id: 'openai',
    name: 'OpenAI',
    baseUrl: 'https://api.openai.com/v1',
    website: 'https://openai.com',
    apiKeyUrl: 'https://platform.openai.com/api-keys',
    docsUrl: 'https://platform.openai.com/docs',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5153-4.9108 6.0462 6.0462 0 0 0-4.7471-3.1248 6.0296 6.0296 0 0 0-5.2027 1.2047 6.045 6.045 0 0 0-4.4069-1.9333 6.0356 6.0356 0 0 0-5.4351 3.3634 6.0262 6.0262 0 0 0-.6392 4.9054A6.0449 6.0449 0 0 0 3.58 12.334a5.9851 5.9851 0 0 0 .5154 4.9108 6.0462 6.0462 0 0 0 4.7472 3.1248 6.0297 6.0297 0 0 0 5.2027-1.2047 6.045 6.045 0 0 0 4.4069 1.9333 6.0356 6.0356 0 0 0 5.4351-3.3634 6.0262 6.0262 0 0 0 .6392-4.9054 6.0449 6.0449 0 0 0-2.2446-2.5085zM14.5123 18.7216a3.7403 3.7403 0 0 1-1.8879.512 3.741 3.741 0 0 1-3.1325-1.683l4.5155-2.607a.1687.1687 0 0 0 .0844-.1461v-6.3266l1.7987 1.0384a.1688.1688 0 0 1 .0844.1461v5.2772a3.7357 3.7357 0 0 1-1.4626 3.789zm-8.049-1.0576a3.7404 3.7404 0 0 1-1.1099-1.6124 3.741 3.741 0 0 1 .3081-3.5469l4.5155 2.607a.1687.1687 0 0 0 .2301-.0615L4.5518 7.3914l1.7987-1.0384a.1688.1688 0 0 1 .2301.0615L9.4018 11.384a3.7358 3.7358 0 0 1 2.327 3.328 3.7359 3.7359 0 0 1-2.327 3.328 3.7357 3.7357 0 0 1-2.9385-.376zm-2.1399-8.8139a3.7403 3.7403 0 0 1 .7788-1.8004 3.741 3.741 0 0 1 3.4406-1.8639l4.5155 2.607a.1687.1687 0 0 0 .1457.0846h5.8552l-1.7987 1.0384a.1688.1688 0 0 1-.1457.0846h-6.0955a3.7358 3.7358 0 0 1-3.789-1.4626 3.7359 3.7359 0 0 1-3.789-1.4626 3.7357 3.7357 0 0 1 .8385-2.7107zM9.4877 5.2784a3.7403 3.7403 0 0 1 1.8879-.512 3.741 3.741 0 0 1 3.1325 1.683l-4.5155 2.607a.1687.1687 0 0 0-.0844.1461v6.3266L8.1095 14.4907a.1688.1688 0 0 1-.0844-.1461V9.0674a3.7357 3.7357 0 0 1 1.4626-3.789zm8.049 1.0576a3.7404 3.7404 0 0 1 1.1099 1.6124 3.741 3.741 0 0 1-.3081 3.5469l-4.5155-2.607a.1687.1687 0 0 0-.2301.0615l5.8552 7.6612-1.7987 1.0384a.1688.1688 0 0 1-.2301-.0615L14.5982 12.616a3.7358 3.7358 0 0 1-2.327-3.328 3.7359 3.7359 0 0 1 2.327-3.328 3.7357 3.7357 0 0 1 2.9385.376zm2.1399 8.8139a3.7403 3.7403 0 0 1-.7788 1.8004 3.741 3.741 0 0 1-3.4406 1.8639l-4.5155-2.607a.1687.1687 0 0 0-.1457-.0846H4.9088l1.7987-1.0384a.1688.1688 0 0 1 .1457-.0846h6.0955a3.7358 3.7358 0 0 1 3.789 1.4626 3.7359 3.7359 0 0 1 3.789 1.4626 3.7357 3.7357 0 0 1-.8385 2.7107zM12 10.5193l2.5634 1.4801v2.9602l-2.5634 1.4801-2.5634-1.4801v-2.9602L12 10.5193z"/></svg>`,
    color: '#10a37f',
    models: [
      { id: 'gpt-4o', name: 'GPT-4o', context: 128000, tags: ['Vision', 'Fast', 'Smart'] },
      { id: 'gpt-4o-mini', name: 'GPT-4o Mini', context: 128000, tags: ['Vision', 'Fast'] },
      { id: 'o1', name: 'o1', context: 128000, tags: ['Reasoning', 'Smart'] },
      { id: 'o1-mini', name: 'o1-mini', context: 128000, tags: ['Reasoning', 'Fast'] }
    ]
  },
  anthropic: {
    id: 'anthropic',
    name: 'Anthropic Claude',
    baseUrl: 'https://api.anthropic.com/v1',
    website: 'https://anthropic.com',
    apiKeyUrl: 'https://console.anthropic.com/settings/keys',
    docsUrl: 'https://docs.anthropic.com',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M16.5 12.5L12 3L7.5 12.5M16.5 12.5L21 21H3L7.5 12.5M16.5 12.5H7.5"/></svg>`,
    color: '#cc785c',
    models: [
      { id: 'claude-3-5-sonnet-latest', name: 'Claude 3.5 Sonnet', context: 200000, tags: ['Vision', 'Smart', 'Coding'] },
      { id: 'claude-3-5-haiku-latest', name: 'Claude 3.5 Haiku', context: 200000, tags: ['Fast'] },
      { id: 'claude-3-opus-latest', name: 'Claude 3 Opus', context: 200000, tags: ['Smart'] }
    ]
  },
  google: {
    id: 'google',
    name: 'Google Gemini',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai',
    website: 'https://ai.google.dev',
    apiKeyUrl: 'https://aistudio.google.com/app/apikey',
    docsUrl: 'https://ai.google.dev/docs',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z"/></svg>`,
    color: '#4285f4',
    models: [
      { id: 'gemini-2.0-flash-exp', name: 'Gemini 2.0 Flash', context: 1000000, tags: ['Vision', 'Fast'] },
      { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', context: 2000000, tags: ['Vision', 'Smart'] },
      { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', context: 1000000, tags: ['Vision', 'Fast'] }
    ]
  },
  groq: {
    id: 'groq',
    name: 'Groq',
    baseUrl: 'https://api.groq.com/openai/v1',
    website: 'https://groq.com',
    apiKeyUrl: 'https://console.groq.com/keys',
    docsUrl: 'https://console.groq.com/docs',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z"/></svg>`,
    color: '#f55036',
    models: [
      { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B', context: 128000, tags: ['Fast', 'Smart'] },
      { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B', context: 128000, tags: ['Instant'] },
      { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B', context: 32768, tags: ['Fast'] }
    ]
  },
  deepseek: {
    id: 'deepseek',
    name: 'DeepSeek',
    baseUrl: 'https://api.deepseek.com',
    website: 'https://deepseek.com',
    apiKeyUrl: 'https://platform.deepseek.com/api_keys',
    docsUrl: 'https://platform.deepseek.com/api-docs',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7L12 12L22 7L12 2Z M2 17L12 22L22 17M2 12L12 17L22 12"/></svg>`,
    color: '#4d6bff',
    models: [
      { id: 'deepseek-chat', name: 'DeepSeek V3', context: 64000, tags: ['Smart', 'Cheap'] },
      { id: 'deepseek-reasoner', name: 'DeepSeek R1', context: 64000, tags: ['Reasoning'] }
    ]
  },
  xai: {
    id: 'xai',
    name: 'xAI Grok',
    baseUrl: 'https://api.x.ai/v1',
    website: 'https://x.ai',
    apiKeyUrl: 'https://console.x.ai',
    docsUrl: 'https://docs.x.ai',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.494h2.039L6.486 3.24H4.298l13.311 17.407z"/></svg>`,
    color: '#ffffff',
    models: [
      { id: 'grok-beta', name: 'Grok Beta', context: 128000, tags: ['Vision', 'Smart'] }
    ]
  },
  mistral: {
    id: 'mistral',
    name: 'Mistral AI',
    baseUrl: 'https://api.mistral.ai/v1',
    website: 'https://mistral.ai',
    apiKeyUrl: 'https://console.mistral.ai/api-keys',
    docsUrl: 'https://docs.mistral.ai',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.11 12.11L12.11 12.11C10.45 13.77 8.11 14.5 5.67 14.5H2V22H5.67C9.33 22 12.67 20.67 15.11 18.22L15.11 18.22C17.56 15.78 18.89 12.44 18.89 8.78V2H15.22V8.78C15.22 10.03 14.72 11.22 13.84 12.11L12.11 12.11Z"/></svg>`,
    color: '#f3d122',
    models: [
      { id: 'mistral-large-latest', name: 'Mistral Large', context: 128000, tags: ['Smart'] },
      { id: 'pixtral-12b-2409', name: 'Pixtral 12B', context: 128000, tags: ['Vision'] },
      { id: 'mistral-small-latest', name: 'Mistral Small', context: 32000, tags: ['Fast'] }
    ]
  },
  openrouter: {
    id: 'openrouter',
    name: 'OpenRouter',
    baseUrl: 'https://openrouter.ai/api/v1',
    website: 'https://openrouter.ai',
    apiKeyUrl: 'https://openrouter.ai/settings/keys',
    docsUrl: 'https://openrouter.ai/docs',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z"/></svg>`,
    color: '#6563ff',
    models: [
      { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet (OR)', context: 200000 },
      { id: 'google/gemini-pro-1.5', name: 'Gemini 1.5 Pro (OR)', context: 2000000 },
      { id: 'meta-llama/llama-3.1-405b', name: 'Llama 3.1 405B (OR)', context: 128000 }
    ]
  },
  qwen: {
    id: 'qwen',
    name: 'Qwen (Alibaba)',
    baseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    website: 'https://help.aliyun.com/zh/dashscope/',
    apiKeyUrl: 'https://dashscope.console.aliyun.com/apiKey',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"/></svg>`,
    color: '#6347d9',
    models: [
      { id: 'qwen-max', name: 'Qwen Max', context: 32000 },
      { id: 'qwen-plus', name: 'Qwen Plus', context: 32000 },
      { id: 'qwen-turbo', name: 'Qwen Turbo', context: 32000 }
    ]
  },
  nvidia: {
    id: 'nvidia',
    name: 'NVIDIA Nemotron',
    baseUrl: 'https://integrate.api.nvidia.com/v1',
    website: 'https://build.nvidia.com',
    apiKeyUrl: 'https://build.nvidia.com/nvidia/llama-3_1-nemotron-70b-instruct',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7L12 12L22 7L12 2Z"/></svg>`,
    color: '#76b900',
    models: [
      { id: 'nvidia/llama-3.1-nemotron-70b-instruct', name: 'Nemotron 70B', context: 128000 }
    ]
  },
  kimi: {
    id: 'kimi',
    name: 'Kimi (Moonshot)',
    baseUrl: 'https://api.moonshot.cn/v1',
    website: 'https://moonshot.cn',
    apiKeyUrl: 'https://platform.moonshot.cn/console/api-keys',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L4 22L12 18L20 22L12 2Z"/></svg>`,
    color: '#ff4d00',
    models: [
      { id: 'moonshot-v1-8k', name: 'Kimi V1 8K', context: 8000 },
      { id: 'moonshot-v1-32k', name: 'Kimi V1 32K', context: 32000 }
    ]
  },
  poolside: {
    id: 'poolside',
    name: 'Poolside Laguna',
    baseUrl: 'https://api.poolside.ai/v1',
    website: 'https://poolside.ai',
    apiKeyUrl: 'https://poolside.ai/beta',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"/></svg>`,
    color: '#00d1ff',
    models: [
      { id: 'laguna-beta', name: 'Laguna Beta', context: 32000 }
    ]
  },
  together: {
    id: 'together',
    name: 'Together AI',
    baseUrl: 'https://api.together.xyz/v1',
    website: 'https://together.ai',
    apiKeyUrl: 'https://api.together.xyz/settings/api-keys',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 22L12 18L22 22L12 2Z"/></svg>`,
    color: '#0f67ff',
    models: [
      { id: 'meta-llama/Llama-3-70b-chat-hf', name: 'Llama 3 70B', context: 8192 }
    ]
  },
  perplexity: {
    id: 'perplexity',
    name: 'Perplexity',
    baseUrl: 'https://api.perplexity.ai',
    website: 'https://perplexity.ai',
    apiKeyUrl: 'https://www.perplexity.ai/settings/api',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7L12 12L22 7L12 2Z"/></svg>`,
    color: '#20b2aa',
    models: [
      { id: 'llama-3-sonar-large-32k-online', name: 'Sonar Large Online', context: 32000 }
    ]
  },
  minimax: {
    id: 'minimax',
    name: 'MiniMax',
    baseUrl: 'https://api.minimax.chat/v1',
    website: 'https://minimax.chat',
    apiKeyUrl: 'https://platform.minimaxi.com/user-center/basic-information/interface-key',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7L12 12L22 7L12 2Z"/></svg>`,
    color: '#ff3b30',
    models: [
      { id: 'abab6.5-chat', name: 'Abab 6.5', context: 32000 }
    ]
  }
};

window.PROVIDERS = PROVIDERS;
