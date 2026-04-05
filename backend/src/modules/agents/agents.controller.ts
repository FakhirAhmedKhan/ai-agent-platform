import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AgentsService } from './agents.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { ParseObjectIdPipe } from '../../common/pipes/parse-object-id.pipe';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('agents')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Post()
  create(@Body() createAgentDto: CreateAgentDto, @CurrentUser() user: any) {
    return this.agentsService.create(createAgentDto, user.tenantId);
  }

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.agentsService.findAll(user.tenantId);
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string, @CurrentUser() user: any) {
    return this.agentsService.findOne(id, user.tenantId);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: string, @CurrentUser() user: any) {
    return this.agentsService.remove(id, user.tenantId);
  }
}