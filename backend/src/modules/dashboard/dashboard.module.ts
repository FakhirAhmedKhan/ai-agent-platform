// src/modules/dashboard/dashboard.module.ts
import { Module } from '@nestjs/common';
import { AgentsModule } from '../agents/agents.module';
import { TasksModule } from '../tasks/tasks.module';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
    imports: [AgentsModule, TasksModule],
    controllers: [DashboardController],
    providers: [DashboardService],
})
export class DashboardModule { }