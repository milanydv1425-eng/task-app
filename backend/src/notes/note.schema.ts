import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { NoteType, TaskStatus } from './enums/note.enums';

export type NoteDocument = Note & Document;

@Schema({ timestamps: true })
export class Note {
  @Prop({ required: true })
  title!: string;

  @Prop()
  description?: string;

  @Prop({ enum: NoteType, required: true })
  type!: NoteType;

  @Prop({ enum: TaskStatus, default: TaskStatus.PENDING })
  status!: TaskStatus;

  @Prop({ type: [String], default: [] })
  tags!: string[];

  @Prop()
  dueDate?: Date;

  @Prop({ required: true, index: true })
  userId!: string;
}

export const NoteSchema = SchemaFactory.createForClass(Note);