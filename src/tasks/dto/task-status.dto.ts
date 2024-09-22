import { IsEnum } from 'class-validator';
import { TaskStatus } from '../tasks-status.enum';

export class taskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
