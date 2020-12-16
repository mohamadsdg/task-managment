import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task.model';
import { FilerTaskDto } from './dto/filter-task.dto';
import { TaskStatusPipe } from './pipes/task-status.pipe';
@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  findAll(@Query(ValidationPipe) filterTaskDto: FilerTaskDto) {
    return Object.keys(filterTaskDto).length
      ? null
      : this.taskService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.taskService.findOne(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createTask: CreateTaskDto) {
    return this.taskService.create(createTask);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.taskService.delete(id);
  }

  @Patch('/:id/status')
  update(
    @Param('id',ParseIntPipe) id: number,
    @Body('status', TaskStatusPipe) status: TaskStatus,
  ) {
    return this.taskService.update(id, status);
  }
}
