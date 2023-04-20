import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  Delete,
  Param,
} from "@nestjs/common";

import { Task } from "./task.schema";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { TaskService } from "./task.service";
import { HttpResponseType } from "../types/http-response.type";
import { FirebaseAuthGuard } from "../firebase/guards/firebase.guard";
import { TaskIdDTO } from "./dto/task-id.dto";

@Controller("tasks")
@UseGuards(FirebaseAuthGuard)
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
}
