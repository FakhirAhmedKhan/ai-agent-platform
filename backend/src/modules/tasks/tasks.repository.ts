import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { TaskStatus } from '../../common/enums/task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskDocument } from './schemas/task.schema';

@Injectable()
export class TasksRepository {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
  ) {}

  async create(createTaskDto: CreateTaskDto, tenantId: string): Promise<Task> {
    const created = new this.taskModel({
      ...createTaskDto,
      status: TaskStatus.PENDING,
      tenantId,
    });
    return created.save();
  }

  async findAll(tenantId: string): Promise<Task[]> {
    return this.taskModel
      .find({ tenantId })
      .populate('agentId')
      .sort({ createdAt: -1 })
      .limit(100)
      .exec();
  }

  async findById(id: string, tenantId: string): Promise<Task> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid task id');
    }

    const task = await this.taskModel.findOne({ _id: id, tenantId }).populate('agentId').exec();
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async findRawById(id: string, tenantId: string): Promise<TaskDocument> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid task id');
    }

    const task = await this.taskModel.findOne({ _id: id, tenantId }).exec();
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async updateById(id: string, update: Partial<Task>, tenantId: string): Promise<Task> {
    const task = await this.taskModel
      .findOneAndUpdate({ _id: id, tenantId }, update, { returnDocument: 'after' })
      .populate('agentId')
      .exec();

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async aggregateUsageSummary(tenantId: string) {
    const result = await this.taskModel.aggregate([
      { $match: { tenantId } },
      {
        $group: {
          _id: null,
          totalTasks: { $sum: 1 },
          completedTasks: {
            $sum: {
              $cond: [{ $eq: ['$status', 'completed'] }, 1, 0],
            },
          },
          failedTasks: {
            $sum: {
              $cond: [{ $eq: ['$status', 'failed'] }, 1, 0],
            },
          },
          runningTasks: {
            $sum: {
              $cond: [{ $eq: ['$status', 'running'] }, 1, 0],
            },
          },
          pendingTasks: {
            $sum: {
              $cond: [{ $eq: ['$status', 'pending'] }, 1, 0],
            },
          },
          promptTokens: { $sum: '$promptTokens' },
          outputTokens: { $sum: '$outputTokens' },
          totalTokens: { $sum: '$totalTokens' },
          totalEstimatedCost: { $sum: '$estimatedCost' },
        },
      },
    ]);

    return (
      result[0] || {
        totalTasks: 0,
        completedTasks: 0,
        failedTasks: 0,
        runningTasks: 0,
        pendingTasks: 0,
        promptTokens: 0,
        outputTokens: 0,
        totalTokens: 0,
        totalEstimatedCost: 0,
      }
    );
  }
}