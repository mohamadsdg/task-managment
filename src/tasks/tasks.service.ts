import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like} from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilerTaskDto } from './dto/filter-task.dto';
import { Task } from './entities/task.entity';
import { TaskRepository } from './repository/task.repository';
import { TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private readonly taskRepository:TaskRepository
  ){}

  public findAll( filterTaskDto: FilerTaskDto) :Promise<Task[]>{
   return this.taskRepository.getTasks(filterTaskDto)
  }

  public async findOne(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return found;
  }

  public create(createTask: CreateTaskDto):Promise<Task> {
    return this.taskRepository.createTask(createTask)

    // const task =  this.taskRepository.create({description,title})
    // return await this.taskRepository.save(task)
  }

  public delete(id: number):Promise<Task> {
   return this.taskRepository.deleteByFind(id)
  // return this.taskRepository.deleteByDelete(id)
  }

  public async update(id:number,status:TaskStatus): Promise<Task>{
    const task = await this.findOne(id);
     task.status = status
     await task.save();
     return task;
  }
}
