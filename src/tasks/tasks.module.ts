import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [
    TasksService,
    // { provide: APP_PIPE, useClass: ValidationPipe }
  ],
})
export class TasksModule {}
