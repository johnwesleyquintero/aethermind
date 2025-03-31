import { GoogleGenerativeAI } from '@google/generative-ai';
import { z } from 'zod';

const GEMINI_CONFIG = {
  model: 'gemini-pro',
  temperature: 0.7,
  maxTokens: 4096,
  topP: 0.95,
} as const;

const CODE_GENERATION_CONFIG = {
  ...GEMINI_CONFIG,
  temperature: 0.2, // Lower temperature for code
  topP: 0.99,
  maxTokens: 8192,
  stopSequences: ['```'],
} as const;

export const geminiConfigSchema = z.object({
  apiKey: z.string(),
  safetySettings: z.array(z.object({
    category: z.string(),
    threshold: z.string()
  })).optional(),
  generationConfig: z.object({
    temperature: z.number(),
    topP: z.number(),
    maxTokens: z.number(),
  }).optional(),
});

export class GeminiProvider {
  private model: any;
  private chat: any;

  constructor(config: z.infer<typeof geminiConfigSchema>) {
    const genAI = new GoogleGenerativeAI(config.apiKey);
    this.model = genAI.getGenerativeModel({
      model: GEMINI_CONFIG.model,
      generationConfig: {
        temperature: config.generationConfig?.temperature ?? GEMINI_CONFIG.temperature,
        topP: config.generationConfig?.topP ?? GEMINI_CONFIG.topP,
        maxOutputTokens: config.generationConfig?.maxTokens ?? GEMINI_CONFIG.maxTokens,
      },
    });
    this.chat = this.model.startChat();
  }

  async generateResponse(prompt: string) {
    try {
      const result = await this.chat.sendMessage(prompt);
      const response = await result.response;
      return {
        text: response.text(),
        usage: {
          promptTokens: 0, // Gemini doesn't provide token counts
          completionTokens: 0,
          totalTokens: 0
        }
      };
    } catch (error) {
      console.error('Gemini generation error:', error);
      throw error;
    }
  }

  async generateCode(prompt: string, language?: string) {
    try {
      const formattedPrompt = this.formatCodePrompt(prompt, language);
      const result = await this.model.generateContent(formattedPrompt);
      const response = await result.response;
      return this.extractCodeFromResponse(response.text(), language);
    } catch (error) {
      console.error('Code generation error:', error);
      throw error;
    }
  }

  async streamResponse(prompt: string) {
    try {
      const result = await this.chat.sendMessageStream(prompt);
      return result;
    } catch (error) {
      console.error('Streaming error:', error);
      throw error;
    }
  }

  private formatCodePrompt(prompt: string, language?: string): string {
    return `You are an expert developer. Generate only the code without explanation.
Language: ${language || 'typescript'}
Requirements: ${prompt}
Response format: Only code wrapped in triple backticks
`;
  }

  private extractCodeFromResponse(response: string, language?: string): string {
    const codeRegex = /```(?:\w+)?\s*([\s\S]+?)\s*```/;
    const match = response.match(codeRegex);
    return match ? match[1].trim() : response;
  }
}
