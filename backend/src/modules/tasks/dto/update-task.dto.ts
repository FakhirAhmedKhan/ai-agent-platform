import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsString, IsOptional, IsNumber, IsDate } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {

    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    input?: string;

    @IsString()
    @IsOptional()
    output?: string;

    @IsString()
    @IsOptional()
    status?: string;

    @IsNumber()
    @IsOptional()
    promptTokens?: number;

    @IsNumber()
    @IsOptional()
    outputTokens?: number;

    @IsNumber()
    @IsOptional()
    totalTokens?: number;

    @IsNumber()
    @IsOptional()
    estimatedCost?: number;

    @IsDate()
    @IsOptional()
    createdAt?: Date;

    @IsDate()
    @IsOptional()
    startedAt?: Date;

    @IsDate()
    @IsOptional()
    completedAt?: Date;

    @IsString()
    @IsOptional()
    errorMessage?: string;

    @IsString()
    @IsOptional()
    agentId?: string;
}
