import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../tasks-status.enum';

export class searchFilterDto {
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  search?: string;
}
