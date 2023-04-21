import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Task } from "./task.schema";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { HttpResponseType } from "../types/http-response.type";
import { OperationStatus } from "../filters/interface/response.interface";

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
  ) {}

  async createTask(
    userId: string,
    createTaskDto: CreateTaskDTO,
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
}
