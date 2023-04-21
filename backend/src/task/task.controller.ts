import { Controller, Post, Body, Req, UseGuards } from "@nestjs/common";

import { Task } from "./task.schema";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { TaskService } from "./task.service";
import { HttpResponseType } from "../types/http-response.type";
import { FirebaseAuthGuard } from "../firebase/guards/firebase.guard";

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
}
