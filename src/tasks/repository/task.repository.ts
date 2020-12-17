import { NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "../dto/create-task.dto";
import { FilerTaskDto } from "../dto/filter-task.dto";
import { Task } from "../entities/task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  public async getTasks(filterTaskDto: FilerTaskDto):Promise<Task[]>{
    const {search,status} = filterTaskDto
    const query = this.createQueryBuilder('task')

    if(status){
      query.andWhere('task.status = :status',{status})
    }
    if(search){
      query.andWhere(
        'task.title LIKE :search OR task.description LIKE :search',
        { search: `%${search}%` },
      );
    }
    const task = await query.getMany();
    return task 
  }
  public async createTask(createTask: CreateTaskDto): Promise<Task> {
    const { description, title } = createTask;
    const task = new Task();
    task.title = title;
    task.description = description;
    await task.save();
    return task;
  }
  public async deleteByFind(id: number): Promise<Task> {
    const found = await this.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return this.remove(found);
  }
  public async deleteByDelete(id: number): Promise<void> {
    const task = await this.delete(id);
    if (task.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}