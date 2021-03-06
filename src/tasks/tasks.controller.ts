import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
      ? this.taskService.findByFilter(filterTaskDto)
      : this.taskService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createTask: CreateTaskDto) {
    return this.taskService.create(createTask);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.taskService.delete(id);
  }

  @Patch('/:id/status')
  update(
    @Param('id') id: string,
    @Body('status', TaskStatusPipe) status: TaskStatus,
  ) {
    return this.taskService.update(id, status);
  }
}
