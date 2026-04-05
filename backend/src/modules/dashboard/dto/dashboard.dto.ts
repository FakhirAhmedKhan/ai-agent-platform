// src/modules/dashboard/dto/dashboard-query.dto.ts
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class DashboardQueryDto {
  @IsOptional()
  @IsMongoId()
  taskId?: string;

  @IsOptional()
  @IsMongoId()
  agentId?: string;

  @IsOptional()
  @IsString()
  search?: string;
}