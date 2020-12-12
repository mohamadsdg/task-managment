import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks = [];

  public getAllTask() {
    return this.tasks;
  }
}
