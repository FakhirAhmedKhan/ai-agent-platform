import { Injectable, Logger } from '@nestjs/common';
import { TaskStatus } from '../../../common/enums/task-status.enum';
import { AgentsRepository } from '../../agents/agents.repository';
import { SettingsService } from '../../settings/settings.service';
import { GeminiAiProvider } from '../../../providers/ai/implementations/gemini-ai.provider';
import { MockAiProvider } from '../../../providers/ai/implementations/mock-ai.provider';
import { TasksRepository } from '../tasks.repository';

@Injectable()
export class TasksRunnerService {
  private readonly logger = new Logger(TasksRunnerService.name);

  constructor(
    private readonly tasksRepository: TasksRepository,
    private readonly agentsRepository: AgentsRepository,
    private readonly settingsService: SettingsService,
    private readonly mockAiProvider: MockAiProvider,
    private readonly geminiAiProvider: GeminiAiProvider,
  ) {}

  async runTask(taskId: string, tenantId: string) {
    try {
      const task = await this.tasksRepository.findRawById(taskId, tenantId);
      const agent = await this.agentsRepository.findById(task.agentId.toString(), tenantId);
      const settings = await this.settingsService.getRawSettings(tenantId);

      await this.tasksRepository.updateById(taskId, {
        status: TaskStatus.RUNNING,
        startedAt: new Date(),
        errorMessage: '',
      }, tenantId);

      const providerType = settings.api?.provider || 'mock';
      const geminiKey = settings.api?.geminiKey;
      const hasApiKey = !!geminiKey && geminiKey !== 'fake-dev-key';

      this.logger.log(
        `Running task ${taskId} | provider: ${providerType} | apiKey present: ${hasApiKey}`,
      );

      // Final fallback: if provider is 'gemini' but key is missing/fake, use mock
      const finalProviderType = (providerType === 'gemini' && !hasApiKey) ? 'mock' : providerType;
      const provider = finalProviderType === 'gemini' ? this.geminiAiProvider : this.mockAiProvider;

      const result = await provider.generate({
        systemPrompt: agent.systemPrompt,
        userInput: task.input,
        model: agent.model,
        temperature: agent.temperature,
        maxTokens: agent.maxTokens,
        apiKey: settings.api?.geminiKey,
      });

      return await this.tasksRepository.updateById(taskId, {
        output: result.output,
        promptTokens: result.promptTokens,
        outputTokens: result.outputTokens,
        totalTokens: result.totalTokens,
        estimatedCost: result.estimatedCost,
        status: TaskStatus.COMPLETED,
        completedAt: new Date(),
      }, tenantId);
    } catch (error) {
      this.logger.error(`Task ${taskId} failed: ${error.message}`, error.stack);
      return await this.tasksRepository.updateById(taskId, {
        status: TaskStatus.FAILED,
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
        completedAt: new Date(),
      }, tenantId);
    }
  }
}