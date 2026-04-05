import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note, NoteDocument } from './schemas/note.schema';
import { CreateNoteDto, UpdateNoteDto } from './dto/note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name)
    private readonly noteModel: Model<NoteDocument>,
  ) {}

  async create(payload: CreateNoteDto, tenantId: string): Promise<Note> {
    const title = payload.title;
    const description = payload.description;

    if (!title || !description) {
      throw new BadRequestException('Title and description are required');
    }

    const note = new this.noteModel({
      title,
      description,
      tenantId,
    });
    return note.save();
  }

  async findAll(tenantId: string): Promise<Note[]> {
    return this.noteModel.find({ tenantId }).sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string, tenantId: string): Promise<Note> {
    const note = await this.noteModel.findOne({ _id: id, tenantId }).exec();
    if (!note) {
      throw new NotFoundException(`Note #${id} not found`);
    }
    return note;
  }

  async update(id: string, payload: UpdateNoteDto, tenantId: string): Promise<Note> {
    const updateData = {
      title: payload.title,
      description: payload.description,
    };
    const note = await this.noteModel
      .findOneAndUpdate({ _id: id, tenantId }, updateData, { new: true })
      .exec();
    if (!note) {
      throw new NotFoundException(`Note #${id} not found`);
    }
    return note;
  }

  async remove(id: string, tenantId: string): Promise<any> {
    const result = await this.noteModel.findOneAndDelete({ _id: id, tenantId }).exec();
    if (!result) {
      throw new NotFoundException(`Note #${id} not found`);
    }
    return { message: 'Note deleted successfully' };
  }
}
