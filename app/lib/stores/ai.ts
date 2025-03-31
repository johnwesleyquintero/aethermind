import { atom } from 'nanostores';
import { AIProvider, type AIConfig } from '../providers';
import { GeminiProvider } from '../providers/gemini';

export const aiConfigStore = atom<AIConfig>({
  defaultProvider: 'openai'
});

export const providerStore = atom<AIProvider | null>(null);

export function initializeAI(config: AIConfig) {
  // Prioritize Gemini if API key is available
  if (config.geminiApiKey) {
    const geminiProvider = new GeminiProvider({ 
      apiKey: config.geminiApiKey,
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        maxTokens: 8192
      },
      safetySettings: [
        {
          category: 'HARM_CATEGORY_DANGEROUS',
          threshold: 'BLOCK_ONLY_HIGH'
        }
      ]
    });
    providerStore.set(new AIProvider({ 
      ...config,
      defaultProvider: 'gemini',
      provider: geminiProvider
    }));
  } else {
    providerStore.set(new AIProvider(config));
  }
  aiConfigStore.set(config);
}

export function updateAIConfig(config: Partial<AIConfig>) {
  const currentConfig = aiConfigStore.get();
  const newConfig = { ...currentConfig, ...config };
  initializeAI(newConfig);
}

export function getSystemPrompt(type: 'code' | 'review' | 'refactor' | 'debug' = 'code') {
  return GEMINI_PROMPTS[`${type}Generation`] || GEMINI_PROMPTS.codeGeneration;
}
