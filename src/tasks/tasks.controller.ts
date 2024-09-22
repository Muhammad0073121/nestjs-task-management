import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { createTaskDto } from './dto/create-task.dto';
import { taskStatusDto } from './dto/task-status.dto';
import { searchFilterDto } from './dto/search-filter.dto';
import { Tasks } from './tasks.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Body() searchFilterDto: searchFilterDto): Promise<Tasks[]> {
    return this.taskService.getTasks(searchFilterDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Tasks> {
    return this.taskService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: taskStatusDto,
  ): Promise<Tasks> {
    const { status } = updateStatusDto;
    return this.taskService.updateTaskStatus(id, status);
  }

  @Post()
  createTask(@Body() createTaskDto: createTaskDto): Promise<Tasks> {
    return this.taskService.createTask(createTaskDto);
  }
}
