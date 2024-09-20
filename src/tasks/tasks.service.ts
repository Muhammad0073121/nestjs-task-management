import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { createTaskDto } from './dto/create-task.dto';
import { searchFilterDto } from './dto/search-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string) {
    const found = this.tasks.find((task) => task.id === id);

    if (!found) throw new NotFoundException();

    return found;
  }

  deleteTask(id: string) {
    let found: boolean = false;
    this.tasks = this.tasks.filter((task) => {
      if (task.id === id) {
        found = true;
        return false;
      } else {
        return true;
      }
    });
    if (!found) throw new NotFoundException();
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  getTasksWithFilters(searchFilterDto: searchFilterDto) {
    const { search, status } = searchFilterDto;
    let tasks = this.getAllTasks();
    if (search) {
      tasks = tasks.filter((task) => {
        return (
          task.title.toLowerCase().includes(search) ||
          task.description.toLowerCase().includes(search)
        );
      });
    }
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    return tasks;
  }

  createTask(createTaskDto: createTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
}
