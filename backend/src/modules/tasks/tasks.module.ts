import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AgentsModule } from '../agents/agents.module';
import { AiModule } from '../../providers/ai/ai.module';
import { SettingsModule } from '../settings/settings.module';
import { Task, TaskSchema } from './schemas/task.schema';
import { TasksRunnerService } from './tasks-runner/tasks-runner.service';
import { TasksController } from './tasks.controller';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    AgentsModule,
    AiModule,
    SettingsModule,
  ],

  controllers: [TasksController],
  providers: [TasksService, TasksRepository, TasksRunnerService],
  exports: [TasksService, TasksRepository],
})
export class TasksModule {}

