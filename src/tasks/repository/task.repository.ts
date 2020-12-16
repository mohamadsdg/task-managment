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
}