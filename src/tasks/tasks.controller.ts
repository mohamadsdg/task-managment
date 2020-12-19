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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task.model';
import { FilerTaskDto } from './dto/filter-task.dto';
import { TaskStatusPipe } from './pipes/task-status.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  findAll(
    @Query(ValidationPipe) filterTaskDto: FilerTaskDto,
    @GetUser() user: User,
  ) {
    return this.taskService.findAll(filterTaskDto, user);
  }

  @Get('/:id')
  findOne(@GetUser() user: User, @Param('id', ParseIntPipe) id: number) {
    return this.taskService.findOne(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createTask: CreateTaskDto, @GetUser() user: User) {
    return this.taskService.create(createTask, user);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.taskService.delete(id);
  }

  // @Patch('/:id/status')
  // update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body('status', TaskStatusPipe) status: TaskStatus,
  // ) {
  //   return this.taskService.update(id, status);
  // }
}
