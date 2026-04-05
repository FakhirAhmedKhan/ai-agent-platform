import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { AgentStatus } from '../../../common/enums/agent-status.enum';

export class CreateAgentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  systemPrompt: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsNumber()
  @Min(0)
  @Max(2)
  temperature: number;

  @IsInt()
  @Min(1)
  maxTokens: number;

  @IsBoolean()
  memoryEnabled: boolean;

  @IsEnum(AgentStatus)
  status: AgentStatus;
}