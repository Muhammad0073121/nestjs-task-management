import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './tasks-status.enum';
import { createTaskDto } from './dto/create-task.dto';
import { searchFilterDto } from './dto/search-filter.dto';

@Entity()
export class Tasks extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  static async createTask(createTaskDto: createTaskDto): Promise<Tasks> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.save(task);
    return task;
  }

  static async getTasks(searchFilterDto: searchFilterDto): Promise<Tasks[]> {
    const query = this.createQueryBuilder('task');
    const { search, status } = searchFilterDto;

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }
}
