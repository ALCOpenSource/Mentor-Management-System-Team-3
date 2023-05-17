/**
 * This service handles CRUD operations for the Task entity
 */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Task, TaskDocument } from "./task.schema";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { HttpResponseType } from "../types/http-response.type";
import { OperationStatus } from "../filters/interface/response.interface";
import { TaskIdDTO } from "./dto/task-id.dto";
import { UpdateTaskDTO } from "./dto/update-task.dto";
import { UnAssignMentorDTO } from "./dto/unassign-mentor.dto";
import { UserIdDTO } from "../users/dto/user-id.dto";

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
  ) {}

  /**
   * Creates a new Task
   *
   * @param userId - The ID of the user creating the task
   * @param createTaskDto - The DTO containing the task details
   * @returns The newly created task
   */
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

  /**
   * Deletes a Task by ID
   *
   * @param taskIdDto - The DTO containing the ID of the task to be deleted
   * @returns A success message if the task was successfully deleted
   * @throws NotFoundException if the task is not found
   */
  async deleteTaskById(
    taskIdDto: TaskIdDTO,
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

  /**
   * Updates a Task by ID
   *
   * @param taskId - The ID of the task to be updated
   * @param updateTaskDto - The DTO containing the updated task details
   * @returns The updated task
   * @throws BadRequestException if the number of mentor managers or mentors exceeds 10
   * @throws NotFoundException if the task is not found
   */
  async updateTask(
    taskId: string,
    updateTaskDto: UpdateTaskDTO,
  ): Promise<HttpResponseType<Task | object>> {
    const { mentorManagers, mentors } = updateTaskDto;

    const task = await this.taskModel.findById(taskId);

    if (!task) {
      return {
        status: OperationStatus.ERROR,
        message: `Task with id ${taskId} not found`,
        data: {},
      };
    }

    // Check if the length of the arrays exceeds 10
    if (
      task?.mentorManagers &&
      task?.mentorManagers.length + mentorManagers.length > 10
    ) {
      throw new BadRequestException(
        "The number of mentor managers cannot exceed 10",
      );
    }

    if (task?.mentors && task?.mentors?.length + mentors?.length > 10) {
      throw new BadRequestException("The number of mentors cannot exceed 10");
    }

    const updatedTask = await this.taskModel.updateOne(
      { $set: updateTaskDto },
      { new: true },
    );

    return {
      status: OperationStatus.SUCCESS,
      message: "Task updated successfully",
      data: updatedTask,
    };
  }

  async UnAssignMentor(
    unAssignmentorDto: UnAssignMentorDTO,
  ): Promise<HttpResponseType<TaskDocument>> {
    const { taskId, mentorId } = unAssignmentorDto;

    // Remove the mentor from the mentors array of the task
    const task = await this.taskModel
      .findOneAndUpdate(
        { _id: taskId },
        { $pull: { mentors: mentorId } },
        { new: true },
      )
      .exec();

    // If the task cannot be found, throw a NotFoundException
    if (!task) {
      throw new NotFoundException(`Task with ID '${taskId}' not found`);
    }

    // Return a success response with the updated task document
    return {
      status: OperationStatus.SUCCESS,
      message: "Mentor removed successfully",
      data: task,
    };
  }

  async getTasksByMentorId(userIdDto: UserIdDTO): Promise<TaskDocument[]> {
    // Find tasks that have the mentor's user ID in their mentors array
    return this.taskModel.find({ mentors: { $in: [userIdDto.userId] } });
  }
}
