import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import {
  AiExecutionRequest,
  AiExecutionResponse,
  AiProvider,
} from '../interfaces/ai-provider.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GeminiAiProvider implements AiProvider {
  constructor(private readonly configService: ConfigService) {}

  async generate(
    request: AiExecutionRequest,
  ): Promise<AiExecutionResponse> {
    const apiKey = request.apiKey || this.configService.get<string>('GEMINI_API_KEY');
    
    if (!apiKey) {
      throw new Error('Gemini API key is missing. Please provide it in settings or .env file');
    }

    if (apiKey === 'fake-dev-key') {
      throw new Error('You are using a placeholder Gemini API key. Please update it in your .env file or the Settings page with a real key from Google AI Studio.');
    }

    const rawModel = request.model || 'gemini-flash-latest';
    // Normalize model name
    let normalizedModel = rawModel.toLowerCase().trim().replace(/\s+/g, '-');
    
    // Google AI API in 2026 has retired gemini-1.5-flash in favor of newer models.
    // Map legacy names or generic choices to the stable aliases available for this key
    if (normalizedModel.includes('flash')) {
      normalizedModel = 'gemini-2.5-flash';
    } else if (normalizedModel.includes('pro')) {
      normalizedModel = 'gemini-2.5-pro';
    } else {
      normalizedModel = 'gemini-2.5-flash'; // Ultimate fallback
    }
    
    // Initialize Gemini API
    const genAI = new GoogleGenerativeAI(apiKey);
    
    const model = genAI.getGenerativeModel({
      model: normalizedModel,
      generationConfig: {
        maxOutputTokens: request.maxTokens,
        temperature: request.temperature,
      },
    });

    const chat = model.startChat({
        history: [
            {
                role: 'user',
                parts: [{ text: `System context: ${request.systemPrompt}` }],
            },
            {
                role: 'model',
                parts: [{ text: 'Acknowledged. I will act based on this context.' }],
            },
        ],
    });

    const result = await chat.sendMessage(request.userInput);
    const outputText = result.response.text();

    const promptTokens = (await model.countTokens(`System context: ${request.systemPrompt} UserInput: ${request.userInput}`)).totalTokens;
    const outputTokens = (await model.countTokens(outputText)).totalTokens;
    const totalTokens = promptTokens + outputTokens;

    // Fixed mock rates based on Gemini 1.5 Flash pricing
    const promptRate = 0.075 / 1_000_000;
    const outputRate = 0.3 / 1_000_000;
    const estimatedCost = promptTokens * promptRate + outputTokens * outputRate;

    return {
      output: outputText,
      promptTokens,
      outputTokens,
      totalTokens,
      estimatedCost: Number(estimatedCost.toFixed(6)),
    };
  }
}