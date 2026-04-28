import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  UseGuards,
  Req,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateNoteDto } from './dto/create-note.dto';

@Controller('notes')
@UseGuards(JwtAuthGuard)
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Post()
  create(@Body() body: CreateNoteDto, @Req() req: any) {
    return this.notesService.create(body, req.user.userId);
  }

  @Get()
  findAll(@Query() query: any, @Req() req: any) {
    return this.notesService.findAll(query, req.user.userId);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: Partial<CreateNoteDto>,
    @Req() req: any,
  ) {
    return this.notesService.update(id, body, req.user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.notesService.delete(id, req.user.userId);
  }
}