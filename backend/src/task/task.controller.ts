import {
  Controller,
  Post,
  Body,
  Req,
  Delete,
  Param,
  Put,
} from "@nestjs/common";

import { Task } from "./task.schema";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { TaskService } from "./task.service";
import { HttpResponseType } from "../types/http-response.type";
import { TaskIdDTO } from "./dto/task-id.dto";
import { UpdateTaskDTO } from "./dto/update-task.dto";

@Controller("tasks")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post("create")
  async createTask(
    @Body() createTaskDto: CreateTaskDTO,
    @Req() req,
  ): Promise<HttpResponseType<Task>> {
    return this.taskService.createTask(req?.user?.sub, createTaskDto);
  }

  @Delete(":taskId")
  async deleteTask(
    @Param() taskIdDto: TaskIdDTO,
  ): Promise<HttpResponseType<string>> {
    return this.taskService.deleteTaskById(taskIdDto);
  }

  @Put(":id/update")
  async updateTask(
    @Param() taskIdDto: TaskIdDTO,
    @Body() updateTaskDto: UpdateTaskDTO,
  ): Promise<HttpResponseType<Task | object>> {
    return this.taskService.updateTask(taskIdDto.taskId, updateTaskDto);
  }
}
