import { Injectable } from '@nestjs/common';
import {
  AiExecutionRequest,
  AiExecutionResponse,
  AiProvider,
} from '../interfaces/ai-provider.interface';


@Injectable()
export class MockAiProvider implements AiProvider {
  async generate(
    request: AiExecutionRequest,
  ): Promise<AiExecutionResponse> {
    const output = `Mock AI response for: "${request.userInput}"`;

    const promptTokens = Math.ceil(
      (request.systemPrompt.length + request.userInput.length) / 4,
    );
    const outputTokens = Math.ceil(output.length / 4);
    const totalTokens = promptTokens + outputTokens;
    const estimatedCost = Number((totalTokens * 0.00001).toFixed(6));

    return {
      output,
      promptTokens,
      outputTokens,
      totalTokens,
      estimatedCost,
    };
  }
}