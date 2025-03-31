export const aiConfig = {
  defaultModel: 'gemini-pro',
  models: {
    'gemini-pro': {
      name: 'Gemini Pro',
      maxTokens: 4096,
      temperature: 0.7,
      provider: 'google',
    },
  },
  features: {
    codeCompletion: true,
    codeExplanation: true,
    debugging: true,
    documentation: true,
  },
  prompts: {
    systemMessage: `You are Aethermind, an AI-powered development environment focused on helping developers write better code.`,
  },
};

export type AiConfig = typeof aiConfig;
