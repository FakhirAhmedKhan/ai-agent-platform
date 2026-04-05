import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { aiProviderFactory } from './ai-provider.factory';
import { GeminiAiProvider } from './implementations/gemini-ai.provider';
import { MockAiProvider } from './implementations/mock-ai.provider';

@Module({
  imports: [ConfigModule],
  providers: [MockAiProvider, GeminiAiProvider, aiProviderFactory],
  exports: [aiProviderFactory, MockAiProvider, GeminiAiProvider],
})
export class AiModule {}