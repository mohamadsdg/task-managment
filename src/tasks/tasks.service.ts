import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public findAll(): Task[] {
    return this.tasks;
  }

  public findOne(id: string): Task {
    return this.tasks.find(task => task.id === id);
  }

  public create(createTask: CreateTaskDto): Task {
    const { description, title } = createTask;
    const task = { id: uuid.v4(), title, description, status: TaskStatus.OPEN };
    this.tasks.push(task);
    return task;
  }

  public delete(id: string): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  public update(id: string, status: TaskStatus): Task {
    const task = this.findOne(id);
    task.status = status;
    return task;
  }
}
