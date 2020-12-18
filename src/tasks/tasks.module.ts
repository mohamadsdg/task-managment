import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TaskRepository } from './repository/task.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  imports: [AuthModule, TypeOrmModule.forFeature([TaskRepository])],
  providers: [
    TasksService,
    // { provide: APP_PIPE, useClass: ValidationPipe }
  ],
})
export class TasksModule {}
