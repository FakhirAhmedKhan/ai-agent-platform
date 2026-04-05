import { Injectable } from '@nestjs/common';
import { AgentsRepository } from '../agents/agents.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    private readonly tasksRepository: TasksRepository,
    private readonly agentsRepository: AgentsRepository,
  ) { }

  async create(createTaskDto: CreateTaskDto, tenantId: string) {
    await this.agentsRepository.findById(createTaskDto.agentId, tenantId);
    return this.tasksRepository.create(createTaskDto, tenantId);
  }

  findAll(tenantId: string) {
    return this.tasksRepository.findAll(tenantId);
  }

  findOne(id: string, tenantId: string) {
    return this.tasksRepository.findById(id, tenantId);
  }

  updateById(id: string, updateData: any, tenantId: string) {
    return this.tasksRepository.updateById(id, updateData, tenantId);
  }
}