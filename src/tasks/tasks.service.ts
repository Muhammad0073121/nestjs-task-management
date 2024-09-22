import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks-status.enum';
import { createTaskDto } from './dto/create-task.dto';
import { searchFilterDto } from './dto/search-filter.dto';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}
  getTasks(searchFilterDto: searchFilterDto): Promise<Task[]> {
    return Task.getTasks(searchFilterDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOneBy({ id });
    if (!found) throw new NotFoundException();
    return found;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    this.taskRepository.save(task);
    return task;
  }

  async createTask(createTaskDto: createTaskDto): Promise<Task> {
    return Task.createTask(createTaskDto);
  }
}
