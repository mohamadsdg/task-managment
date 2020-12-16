import { NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "../dto/create-task.dto";
import { Task } from "../entities/task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{
    public async createTask (createTask: CreateTaskDto): Promise<Task>{
        const { description, title } = createTask;
        const task = new Task();
        task.title = title;
        task.description = description;
        await task.save();
        return task
    }
    public async deleteByFind(id :number):Promise<Task>{
        const found = await this.findOne(id);
        if (!found) {
          throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return this.remove(found)
    }
    public async deleteByDelete(id:number):Promise<void>{
        const task = await this.delete(id)
        if(task.affected === 0 ){
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
    }
}