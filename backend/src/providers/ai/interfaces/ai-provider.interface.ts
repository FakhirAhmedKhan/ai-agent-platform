export interface AiExecutionRequest {
  systemPrompt: string;
  userInput: string;
  model: string;
  temperature: number;
  maxTokens: number;
  apiKey?: string;
}

export interface AiExecutionResponse {
  output: string;
  promptTokens: number;
  outputTokens: number;
  totalTokens: number;
  estimatedCost: number;
}

export interface AiProvider {
  generate(request: AiExecutionRequest): Promise<AiExecutionResponse>;
}