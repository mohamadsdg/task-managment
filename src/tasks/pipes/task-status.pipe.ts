import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { TaskStatus } from '../task.model';

@Injectable()
export class TaskStatusPipe implements PipeTransform {
  readonly allowedStatus = [
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN,
  ];

  transform(value: string, metadata: ArgumentMetadata) {
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is an invalid status`);
    }
    return value;
  }

  private isStatusValid(status: string): boolean {
    const val = this.allowedStatus.find(x => x === status);
    return !!val;
  }
}
