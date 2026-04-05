// src/modules/dashboard/dashboard.service.ts
import { Injectable } from '@nestjs/common';
import { AgentsRepository } from '../agents/agents.repository';
import { TasksRepository } from '../tasks/tasks.repository';
import { DashboardQueryDto } from './dto/dashboard.dto';
import { AgentDocument } from '../agents/schemas/agent.schema';
import { TaskDocument } from '../tasks/schemas/task.schema';

@Injectable()
export class DashboardService {
  constructor(
    private readonly agentsRepository: AgentsRepository,
    private readonly tasksRepository: TasksRepository,
  ) {}

  async getSummary(query: DashboardQueryDto, tenantId: string) {
    const [agents, tasks, usageSummary] = await Promise.all([
      this.agentsRepository.findAll(tenantId),
      this.tasksRepository.findAll(tenantId),
      this.tasksRepository.aggregateUsageSummary(tenantId),
    ]);

    const search = query.search?.trim().toLowerCase();

    const filteredTasks = search
      ? tasks.filter((task: TaskDocument) => {
          const title = task.title?.toLowerCase?.() || '';
          const input = task.input?.toLowerCase?.() || '';
          const output = task.output?.toLowerCase?.() || '';
          const agentName =
            task.agentId && typeof task.agentId === 'object'
              ? (task.agentId as any).name?.toLowerCase?.() || ''
              : '';


          return (
            title.includes(search) ||
            input.includes(search) ||
            output.includes(search) ||
            agentName.includes(search)
          );
        })
      : tasks;

    const selectedTask =
      query.taskId
        ? filteredTasks.find((task: TaskDocument) => String(task._id) === query.taskId)
        : filteredTasks[0] || null;

    const selectedAgent =
      query.agentId
        ? agents.find((agent: AgentDocument) => String(agent._id) === query.agentId)
        : selectedTask && typeof selectedTask.agentId === 'object'
          ? selectedTask.agentId
          : agents[0] || null;

    const dashboardStats = {
      totalAgents: agents.length,
      completedTasks: usageSummary.completedTasks,
      totalTokens: usageSummary.totalTokens,
      estimatedCost: usageSummary.totalEstimatedCost,
    };

    const agentsList = agents.map((agent: AgentDocument) => {
      const agentTasks = tasks.filter((taskDetail: TaskDocument) => {
        if (!taskDetail.agentId) return false;
        
        const taskAgentId =
          typeof taskDetail.agentId === 'object'
            ? String(taskDetail.agentId._id)
            : String(taskDetail.agentId);

        return taskAgentId === String(agent._id);
      });


      const totalTokens = agentTasks.reduce(
        (sum: number, task: TaskDocument) => sum + (task.totalTokens || 0),
        0,
      );

      const totalCost = agentTasks.reduce(
        (sum: number, task: TaskDocument) => sum + (task.estimatedCost || 0),
        0,
      );

      const sortedTasks = [...agentTasks].sort((a: TaskDocument, b: TaskDocument) => {
          const bAny = b as any;
          const aAny = a as any;
          return new Date(bAny.updatedAt || bAny.createdAt).getTime() -
                 new Date(aAny.updatedAt || aAny.createdAt).getTime();
      });

      const lastTask = sortedTasks[0];

      return {
        id: agent._id,
        name: agent.name,
        role: agent.systemPrompt,
        model: agent.model,
        status: agent.status,
        temperature: agent.temperature,
        maxTokens: agent.maxTokens,
        memoryEnabled: agent.memoryEnabled,
        totalTokens,
        totalCost: Number(totalCost.toFixed(3)),
        lastRun: lastTask?.completedAt || lastTask?.completedAt || 'Never',
      };
    });

    const executionHistory = filteredTasks.slice(0, 10).map((taskDetail: TaskDocument) => {
      const tdAny = taskDetail as any;
      const agent =
        tdAny.agentId && typeof tdAny.agentId === 'object' ? tdAny.agentId : null;


      return {
        id: taskDetail._id,
        title: taskDetail.title,
        status: taskDetail.status,
        tokens: taskDetail.totalTokens || 0,
        cost: Number((taskDetail.estimatedCost || 0).toFixed(3)),
        createdAt: tdAny.createdAt,
        agentName: agent?.name || 'Unknown Agent',
      };

    });

    const taskDetail = selectedTask
      ? {
          id: selectedTask.agentId,
          title: selectedTask.title,
          status: selectedTask.status,
          input: selectedTask.input,
          output: selectedTask.output,
          promptTokens: selectedTask.promptTokens || 0,
          outputTokens: selectedTask.outputTokens || 0,
          totalTokens: selectedTask.totalTokens || 0,
          estimatedCost: Number(
            (selectedTask.estimatedCost || 0).toFixed(3),
          ),
          createdAt: selectedTask.startedAt,
          startedAt: selectedTask.startedAt,
          completedAt: selectedTask.completedAt,
          errorMessage: selectedTask.errorMessage || '',
        }
      : null;

    const agentDoc = selectedAgent as any;
    const agentDetail = agentDoc
      ? {
          id: agentDoc._id,
          name: agentDoc.name,
          role: agentDoc.systemPrompt,
          model: agentDoc.model,
          status: agentDoc.status,
          temperature: agentDoc.temperature,
          maxTokens: agentDoc.maxTokens,
          memoryEnabled: agentDoc.memoryEnabled,
          lastRun:
            agentsList.find((a: any) => String(a.id) === String(agentDoc._id))
              ?.lastRun || 'Never',
        }
      : null;

    return {
      stats: dashboardStats,
      agents: agentsList,
      executionHistory,
      taskDetail,
      selectedAgent: agentDetail,
    };
  }
}