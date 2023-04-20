import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Task, TaskDocument } from "./task.schema";
import { CreateTaskDto } from "./dto/create-task.dto";
import { HttpResponseType } from "../types/http-response.type";
import { OperationStatus } from "../filters/interface/response.interface";
import { TaskIdDto } from "./dto/task-id.dto";

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
  ) {}

  async createTask(
    userId: string,
    createTaskDto: CreateTaskDto,
  ): Promise<HttpResponseType<Task>> {
    const { title, details, mentorManagers, mentors } = createTaskDto;

    const task = await this.taskModel.create({
      title,
      details,
      mentorManagers,
      mentors,
      userId,
    });

    return {
      status: OperationStatus.SUCCESS,
      message: "Task created successfully",
      data: task,
    };
  }

  async deleteTaskById(
    taskIdDto: TaskIdDto,
  ): Promise<HttpResponseType<string>> {
    const result = await this.taskModel
      .deleteOne({ _id: taskIdDto.taskId })
      .exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(
        `Task with ID "${taskIdDto.taskId}" not found`,
      );
    }
    return {
      status: OperationStatus.SUCCESS,
      message: "Task deleted successfully",
      data: taskIdDto.taskId,
    };
  }
}
