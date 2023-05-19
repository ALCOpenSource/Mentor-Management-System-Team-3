import {
  Controller,
  Post,
  Body,
  Req,
  Delete,
  Param,
  Put,
  UseGuards,
  HttpStatus,
  HttpCode,
  Patch,
} from "@nestjs/common";

import { Task, TaskDocument } from "./task.schema";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { TaskService } from "./task.service";
import { HttpResponseType } from "../types/http-response.type";
import { TaskIdDTO } from "./dto/task-id.dto";
import { UpdateTaskDTO } from "./dto/update-task.dto";
import { Role } from "../auth/custom-decorator/role.decorator";
import { ROLE } from "../auth/enums/role.enum";
import { RolesGuard } from "../auth/guards/role.guard";
import { UnAssignMentorDTO } from "./dto/unassign-mentor.dto";

@Controller("tasks")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post("create")
  @Role(ROLE.SUPERADMIN, ROLE.ADMIN)
  @UseGuards(RolesGuard)
  async createTask(
    @Body() createTaskDto: CreateTaskDTO,
    @Req() req,
  ): Promise<HttpResponseType<Task>> {
    return this.taskService.createTask(req?.user?.sub, createTaskDto);
  }

  @Delete(":taskId")
  @Role(ROLE.SUPERADMIN, ROLE.ADMIN)
  @UseGuards(RolesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTask(
    @Param() taskIdDto: TaskIdDTO,
  ): Promise<HttpResponseType<string>> {
    return this.taskService.deleteTaskById(taskIdDto);
  }

  @Put(":id/update")
  @Role(ROLE.SUPERADMIN, ROLE.ADMIN)
  @UseGuards(RolesGuard)
  @HttpCode(HttpStatus.OK)
  async updateTask(
    @Param() taskIdDto: TaskIdDTO,
    @Body() updateTaskDto: UpdateTaskDTO,
  ): Promise<HttpResponseType<Task | object>> {
    return this.taskService.updateTask(taskIdDto.taskId, updateTaskDto);
  }

  @Patch("/unassign/:taskId/:mentorId")
  @Role(ROLE.SUPERADMIN, ROLE.ADMIN)
  @UseGuards(RolesGuard)
  @HttpCode(HttpStatus.OK)
  async UnAssignMentor(
    @Param() unAssignmentorDto: UnAssignMentorDTO,
  ): Promise<HttpResponseType<TaskDocument>> {
    return this.taskService.UnAssignMentor(unAssignmentorDto);
  }
}
