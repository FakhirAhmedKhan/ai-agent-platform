import { Injectable } from '@nestjs/common';
import { TasksRepository } from '../tasks/tasks.repository';

@Injectable()
export class UsageService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async getSummary(tenantId: string) {
    return this.tasksRepository.aggregateUsageSummary(tenantId);
  }

  async getOverview(tenantId: string) {
    const summary = await this.tasksRepository.aggregateUsageSummary(tenantId);
    return {
      totalTokens: summary.totalTokens,
      totalCost: summary.totalEstimatedCost,
      avgCostPerTask: 
        summary.totalTasks > 0 
          ? summary.totalEstimatedCost / summary.totalTasks 
          : 0,
      ...summary
    };
  }
}