import { PickType, PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';

export class FilerTaskDto extends PartialType(
  PickType(CreateTaskDto, ['status'] as const),
) {
  @IsOptional()
  @IsNotEmpty()
  readonly search: string;
}
