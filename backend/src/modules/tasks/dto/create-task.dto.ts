import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsMongoId()
  agentId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  input: string;
}