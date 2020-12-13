import { PickType, PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export class FilerTaskDto extends PartialType(
  PickType(CreateTaskDto, ['status'] as const),
) {
  readonly search?: string;
}
