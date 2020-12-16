import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  imports:[ TypeOrmModule.forFeature([Task])],
  providers: [
    TasksService,
    // { provide: APP_PIPE, useClass: ValidationPipe }
  ],
})
export class TasksModule {}
