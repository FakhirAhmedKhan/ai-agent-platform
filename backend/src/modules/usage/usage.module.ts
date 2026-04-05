import { Module } from '@nestjs/common';
import { TasksModule } from '../tasks/tasks.module';
import { UsageController } from './usage.controller';
import { UsageService } from './usage.service';

@Module({
  imports: [TasksModule],
  controllers: [UsageController],
  providers: [UsageService],
})
export class UsageModule {}