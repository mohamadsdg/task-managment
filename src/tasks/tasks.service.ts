import { Injectable, NotFoundException } from '@nestjs/common';
import * as uuid from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilerTaskDto } from './dto/filter-task.dto';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public findAll(): Task[] {
    return this.tasks;
  }

  public findByFilter(filterTaskDto: FilerTaskDto): Task[] {
    const { search, status } = filterTaskDto;

    let tasks = this.findAll();

    status && (tasks = tasks.filter(task => task.status === status));

    search &&
      (tasks = tasks.filter(
        task =>
          task.title.includes(search) || task.description.includes(search),
      ));

    return tasks;
  }

  public findOne(id: string): Task {
    const found = this.tasks.find(task => task.id === id);
    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return found;
  }

  public create(createTask: CreateTaskDto): Task {
    const { description, title } = createTask;
    const task = { id: uuid.v4(), title, description, status: TaskStatus.OPEN };
    this.tasks.push(task);
    return task;
  }

  public delete(id: string): void {
    const found = this.findOne(id);
    this.tasks = this.tasks.filter(task => task.id !== found.id);
  }

  public update(id: string, status: TaskStatus): Task {
    const task = this.findOne(id);
    task.status = status;
    return task;
  }
}
