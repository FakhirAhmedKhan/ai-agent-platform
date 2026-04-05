import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksRunnerService } from './tasks-runner/tasks-runner.service';
import { ParseObjectIdPipe } from '../../common/pipes/parse-object-id.pipe';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly tasksRunnerService: TasksRunnerService,
  ) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @CurrentUser() user: any) {
    return this.tasksService.create(createTaskDto, user.tenantId);
  }

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.tasksService.findAll(user.tenantId);
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string, @CurrentUser() user: any) {
    return this.tasksService.findOne(id, user.tenantId);
  }

  @Post(':id/run')
  runTask(@Param('id', ParseObjectIdPipe) id: string, @CurrentUser() user: any) {
    return this.tasksRunnerService.runTask(id, user.tenantId);
  }

  @Post(':id/stop')
  stopTask(@Param('id', ParseObjectIdPipe) id: string, @CurrentUser() user: any) {
    return this.tasksService.updateById(id, {
      status: 'failed' as any,
      errorMessage: 'Task was manually stopped by the user.',
    }, user.tenantId);
  }
}