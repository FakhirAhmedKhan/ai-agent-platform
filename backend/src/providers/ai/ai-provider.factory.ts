import { ConfigService } from '@nestjs/config';
import { AI_PROVIDER_TOKEN } from '../../common/constants/ai-provider.token';
import { AiProviderType } from '../../common/enums/ai-provider.enum';
import { GeminiAiProvider } from './implementations/gemini-ai.provider';
import { MockAiProvider } from './implementations/mock-ai.provider';


export const aiProviderFactory = {
  provide: AI_PROVIDER_TOKEN,
  inject: [ConfigService, MockAiProvider, GeminiAiProvider],
  useFactory: (
    configService: ConfigService,
    mockAiProvider: MockAiProvider,
    geminiAiProvider: GeminiAiProvider,
  ) => {
    const provider = configService.get<string>('AI_PROVIDER');

    if (provider === AiProviderType.GEMINI) {
      return geminiAiProvider;
    }

    return mockAiProvider;
  },
};