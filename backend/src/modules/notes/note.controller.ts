import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto, UpdateNoteDto } from './dto/note.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() payload: CreateNoteDto, @CurrentUser() user: any) {
    return this.notesService.create(payload, user.tenantId);
  }

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.notesService.findAll(user.tenantId);
  }

  @Get('detail/:id')
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.notesService.findOne(id, user.tenantId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateNoteDto, @CurrentUser() user: any) {
    return this.notesService.update(id, payload, user.tenantId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.notesService.remove(id, user.tenantId);
  }
}
