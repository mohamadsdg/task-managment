import { NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';
import { FilerTaskDto } from '../dto/filter-task.dto';
import { Task } from '../entities/task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  public async getTasks(
    filterTaskDto: FilerTaskDto,
    user: User,
  ): Promise<Task[]> {
    const { search, status } = filterTaskDto;
    const query = this.createQueryBuilder('task');

    query.where('task.userId = :user', { user: user.id });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        'task.title LIKE :search OR task.description LIKE :search',
        { search: `%${search}%` },
      );
    }
    const task = await query.getMany();
    return task;
  }
  public async createTask(
    createTask: CreateTaskDto,
    user: User,
  ): Promise<Task> {
    const { description, title } = createTask;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.user = user;
    await task.save();

    delete task.user;
    return task;
  }
  public async deleteByFind(id: number, user: User): Promise<Task> {
    const found = await this.findOne({
      where: { id, userId: user.id },
    });
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
