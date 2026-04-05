import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AgentStatus } from '../../../common/enums/agent-status.enum';

export type AgentDocument = HydratedDocument<Agent>;

@Schema({ timestamps: true })
export class Agent {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true })
  systemPrompt: string;

  @Prop({ required: true, trim: true })
  model: string;

  @Prop({ required: true, min: 0, max: 2, default: 0.7 })
  temperature: number;

  @Prop({ required: true, min: 1, default: 1024 })
  maxTokens: number;

  @Prop({ default: false })
  memoryEnabled: boolean;

  @Prop({ enum: AgentStatus, default: AgentStatus.ACTIVE })
  status: AgentStatus;

  @Prop({ required: true, index: true })
  tenantId: string;
}

export const AgentSchema = SchemaFactory.createForClass(Agent);