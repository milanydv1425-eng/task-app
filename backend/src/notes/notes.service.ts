import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Note, NoteDocument } from './note.schema';
import { Model } from 'mongoose';
import { CreateNoteDto } from './dto/create-note.dto';
import { TaskStatus } from './enums/note.enums';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name) private noteModel: Model<NoteDocument>,
  ) {}

  async create(data: CreateNoteDto, userId: string) {
    if (data.type === 'TASK' && !data.status) {
      data.status = TaskStatus.PENDING;
    }

    return this.noteModel.create({ ...data, userId });
  }

  async findAll(query: any, userId: string) {
    const filter: any = { userId };

    return {
      data: await this.noteModel.find(filter).sort({ createdAt: -1 }),
    };
  }

  async update(id: string, data: Partial<CreateNoteDto>, userId: string) {
    const updated = await this.noteModel.findOneAndUpdate(
      { _id: id, userId },
      data,
      { new: true },
    );

    if (!updated) throw new NotFoundException('Note not found');

    return updated;
  }

  async delete(id: string, userId: string) {
    const deleted = await this.noteModel.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!deleted) throw new NotFoundException('Note not found');

    return { message: 'Deleted successfully' };
  }
}