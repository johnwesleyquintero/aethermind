import { GoogleGenerativeAI } from '@google/generative-ai';
import { OpenAI } from 'openai';
import { z } from 'zod';
import type { GeminiProvider } from './gemini';

const configSchema = z.object({
  openaiApiKey: z.string().optional(),
  geminiApiKey: z.string().optional(),
  defaultProvider: z.enum(['openai', 'gemini']).default('openai'),
});

export type AIConfig = z.infer<typeof configSchema>;

export class AIProvider {
  #openai?: OpenAI;
  #gemini?: GeminiProvider;
  #config: AIConfig;

  constructor(config: AIConfig & { provider?: GeminiProvider }) {
    this.#config = configSchema.parse(config);
    if (config.provider) {
      this.#gemini = config.provider;
    } else {
      this.initProviders();
    }
  }

  private initProviders() {
    if (this.#config.openaiApiKey) {
      this.#openai = new OpenAI({ apiKey: this.#config.openaiApiKey });
    }
    if (this.#config.geminiApiKey) {
      this.#gemini = new GoogleGenerativeAI(this.#config.geminiApiKey);
    }
  }

  async chat(messages: Array<{ role: string; content: string }>) {
    try {
      if (this.#gemini) {
        return this.geminiChat(messages);
      } else if (this.#openai) {
        return this.openaiChat(messages);
      }
      throw new Error('No AI provider configured');
    } catch (error) {
      console.error('Chat error:', error);
      throw error;
    }
  }

  private async openaiChat(messages: Array<{ role: string; content: string }>) {
    const response = await this.#openai!.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages,
      temperature: 0.7,
    });
    return response.choices[0].message;
  }

  private async geminiChat(messages: Array<{ role: string; content: string }>) {
    const lastMessage = messages[messages.length - 1];
    const result = await this.#gemini!.generateResponse(lastMessage.content);
    return { 
      role: 'assistant', 
      content: result.text 
    };
  }
}
