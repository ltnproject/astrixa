/**
 * Astrixa Models — Provider Configuration
 * Modular architecture for AI providers
 */

const PROVIDERS = {
  openai: {
    id: 'openai',
    name: 'OpenAI',
    baseUrl: 'https://api.openai.com/v1',
    website: 'https://openai.com',
    apiKeyUrl: 'https://platform.openai.com/api-keys',
    docsUrl: 'https://platform.openai.com/docs',
    icon: 'GPT',
    color: '#10a37f',
    models: [
      { id: 'gpt-4o', name: 'GPT-4o', context: 128000, tags: ['Vision', 'Fast', 'Smart'] },
      { id: 'gpt-4o-mini', name: 'GPT-4o Mini', context: 128000, tags: ['Vision', 'Fast'] },
      { id: 'o1', name: 'o1', context: 128000, tags: ['Reasoning', 'Smart'] },
      { id: 'o1-mini', name: 'o1-mini', context: 128000, tags: ['Reasoning', 'Fast'] },
      { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', context: 128000, tags: ['Vision'] }
    ]
  },
  anthropic: {
    id: 'anthropic',
    name: 'Anthropic Claude',
    baseUrl: 'https://api.anthropic.com/v1',
    website: 'https://anthropic.com',
    apiKeyUrl: 'https://console.anthropic.com/settings/keys',
    docsUrl: 'https://docs.anthropic.com',
    icon: 'C',
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
    icon: 'G',
    color: '#4285f4',
    models: [
      { id: 'gemini-2.0-flash-exp', name: 'Gemini 2.0 Flash', context: 1000000, tags: ['Vision', 'Fast', 'Huge Context'] },
      { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', context: 2000000, tags: ['Vision', 'Smart', 'Huge Context'] },
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
    icon: '⚡',
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
    icon: 'DS',
    color: '#4a90d9',
    models: [
      { id: 'deepseek-chat', name: 'DeepSeek-V3', context: 64000, tags: ['Smart', 'Coding'] },
      { id: 'deepseek-reasoner', name: 'DeepSeek-R1', context: 64000, tags: ['Reasoning', 'Smart'] }
    ]
  },
  xai: {
    id: 'xai',
    name: 'xAI Grok',
    baseUrl: 'https://api.x.ai/v1',
    website: 'https://x.ai',
    apiKeyUrl: 'https://console.x.ai',
    docsUrl: 'https://docs.x.ai',
    icon: 'xAI',
    color: '#1a1a2e',
    models: [
      { id: 'grok-2-latest', name: 'Grok-2', context: 128000, tags: ['Vision', 'Smart'] },
      { id: 'grok-beta', name: 'Grok Beta', context: 128000, tags: ['Fast'] }
    ]
  },
  mistral: {
    id: 'mistral',
    name: 'Mistral AI',
    baseUrl: 'https://api.mistral.ai/v1',
    website: 'https://mistral.ai',
    apiKeyUrl: 'https://console.mistral.ai/api-keys',
    docsUrl: 'https://docs.mistral.ai',
    icon: 'M',
    color: '#ff7000',
    models: [
      { id: 'mistral-large-latest', name: 'Mistral Large', context: 128000, tags: ['Smart'] },
      { id: 'pixtral-large-latest', name: 'Pixtral Large', context: 128000, tags: ['Vision'] },
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
    icon: 'OR',
    color: '#6c5ce7',
    models: [
      { id: 'auto', name: 'Auto (Best for Price)', context: 128000, tags: ['Smart'] },
      { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', context: 200000, tags: ['Vision'] }
    ]
  },
  qwen: {
    id: 'qwen',
    name: 'Qwen (Alibaba)',
    baseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    website: 'https://help.aliyun.com/product/2399480.html',
    apiKeyUrl: 'https://dashscope.console.aliyun.com/apiKey',
    icon: 'Q',
    color: '#6c5ce7',
    models: [
      { id: 'qwen-max', name: 'Qwen Max', context: 32000, tags: ['Smart'] },
      { id: 'qwen-plus', name: 'Qwen Plus', context: 128000, tags: ['Fast'] }
    ]
  },
  nvidia: {
    id: 'nvidia',
    name: 'NVIDIA Nemotron',
    baseUrl: 'https://integrate.api.nvidia.com/v1',
    website: 'https://build.nvidia.com',
    apiKeyUrl: 'https://build.nvidia.com/nvidia/llama-3_1-nemotron-70b-instruct',
    icon: 'NV',
    color: '#76b900',
    models: [
      { id: 'nvidia/llama-3.1-nemotron-70b-instruct', name: 'Nemotron 70B', context: 128000, tags: ['Smart'] }
    ]
  },
  kimi: {
    id: 'kimi',
    name: 'Kimi (Moonshot)',
    baseUrl: 'https://api.moonshot.cn/v1',
    website: 'https://moonshot.cn',
    apiKeyUrl: 'https://platform.moonshot.cn/console/api-keys',
    icon: 'K',
    color: '#ff6b6b',
    models: [
      { id: 'moonshot-v1-8k', name: 'Kimi V1 8K', context: 8000, tags: ['Fast'] },
      { id: 'moonshot-v1-32k', name: 'Kimi V1 32K', context: 32000, tags: ['Smart'] }
    ]
  },
  poolside: {
    id: 'poolside',
    name: 'Poolside Laguna',
    baseUrl: 'https://api.poolside.ai/v1',
    website: 'https://poolside.ai',
    icon: 'PL',
    color: '#0984e3',
    models: [
      { id: 'laguna-base', name: 'Laguna Base', context: 32000, tags: ['Coding'] }
    ]
  },
  nex: {
    id: 'nex',
    name: 'Nex AI',
    baseUrl: 'https://api.nexai.com/v1',
    website: 'https://nexai.com',
    icon: 'NX',
    color: '#00cec9',
    models: [
      { id: 'nex-pro', name: 'Nex Pro', context: 64000, tags: ['Fast'] }
    ]
  },
  inclusion: {
    id: 'inclusion',
    name: 'Inclusion AI',
    baseUrl: 'https://api.inclusion.ai/v1',
    website: 'https://inclusion.ai',
    icon: 'IN',
    color: '#fab1a0',
    models: [
      { id: 'inclusion-1', name: 'Inclusion-1', context: 32000, tags: ['Safe'] }
    ]
  },
  mage: {
    id: 'mage',
    name: 'Mage',
    baseUrl: 'https://api.mage.ai/v1',
    website: 'https://mage.ai',
    icon: 'MG',
    color: '#fdcb6e',
    models: [
      { id: 'mage-1', name: 'Mage-1', context: 32000, tags: ['Creative'] }
    ]
  }
};

window.PROVIDERS = PROVIDERS;
