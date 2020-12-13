import { TaskStatus } from '../task.model';

export class CreateTaskDto {
  readonly title: string;
  readonly description: string;
  readonly status: TaskStatus;
}
