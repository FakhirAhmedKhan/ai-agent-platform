import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAgentDto } from './dto/create-agent.dto';
import { Agent, AgentDocument } from './schemas/agent.schema';

@Injectable()
export class AgentsRepository {
  constructor(
    @InjectModel(Agent.name)
    private readonly agentModel: Model<AgentDocument>,
  ) { }

  async create(createAgentDto: CreateAgentDto, tenantId: string): Promise<Agent> {
    const created = new this.agentModel({ ...createAgentDto, tenantId });
    return created.save();
  }

  async findAll(tenantId: string): Promise<Agent[]> {
    return this.agentModel.find({ tenantId }).sort({ createdAt: -1 }).limit(50).exec();
  }

  async findById(id: string, tenantId: string): Promise<Agent | null> {
    return this.agentModel.findOne({ _id: id, tenantId }).exec();
  }

  async deleteById(id: string, tenantId: string): Promise<Agent | null> {
    return this.agentModel.findOneAndDelete({ _id: id, tenantId }).exec();
  }
}