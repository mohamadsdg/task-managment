import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilerTaskDto } from './dto/filter-task.dto';
import { Task } from './entities/task.entity';
import { TaskRepository } from './repository/task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private readonly taskRepository:TaskRepository
  ){}

  public findAll() {
    return this.taskRepository.find();
  }

  // public findByFilter(filterTaskDto: FilerTaskDto): Task[] {
  //   const { search, status } = filterTaskDto;

  //   let tasks = this.findAll();

  //   status && (tasks = tasks.filter(task => task.status === status));

  //   search &&
  //     (tasks = tasks.filter(
  //       task =>
  //         task.title.includes(search) || task.description.includes(search),
  //     ));

  //   return tasks;
  // }

  public async findOne(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return found;
  }

  public create(createTask: CreateTaskDto) {
    console.log(createTask)
    return this.taskRepository.createTask(createTask)

    // const task =  this.taskRepository.create({description,title})
    // return await this.taskRepository.save(task)
  }

  // public delete(id: string): void {
  //   const found = this.findOne(id);
  //   this.tasks = this.tasks.filter(task => task.id !== found.id);
  // }

  // public update(id: string, status: TaskStatus): Task {
  //   const task = this.findOne(id);
  //   task.status = status;
  //   return task;
  // }
}
