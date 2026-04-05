import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAgentDto } from './dto/create-agent.dto';
import { AgentsRepository } from './agents.repository';
import { toAgentResponse } from './agents.mapper';

@Injectable()
export class AgentsService {
  constructor(private readonly agentsRepository: AgentsRepository) { }

  async create(createAgentDto: CreateAgentDto, tenantId: string) {
    const agent = await this.agentsRepository.create(createAgentDto, tenantId);
    return toAgentResponse(agent);
  }

  async findAll(tenantId: string) {
    const agents = await this.agentsRepository.findAll(tenantId);
    return agents.map(toAgentResponse);
  }

  async findOne(id: string, tenantId: string) {
    const agent = await this.agentsRepository.findById(id, tenantId);

    if (!agent) {
      throw new NotFoundException('Agent not found');
    }

    return toAgentResponse(agent);
  }

  async remove(id: string, tenantId: string) {
    const deleted = await this.agentsRepository.deleteById(id, tenantId);

    if (!deleted) {
      throw new NotFoundException('Agent not found');
    }

    return { message: 'Agent deleted successfully' };
  }
}