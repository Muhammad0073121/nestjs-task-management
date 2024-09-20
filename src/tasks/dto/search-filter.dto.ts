import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../tasks.model';

export class searchFilterDto {
  @IsEnum(TaskStatus)
  @IsOptional()
  search?: string;

  @IsNotEmpty()
  @IsString()
  status?: string;
}
