import { IsEnum } from 'class-validator';
import { TaskStatus } from '../tasks.model';

export class taskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
