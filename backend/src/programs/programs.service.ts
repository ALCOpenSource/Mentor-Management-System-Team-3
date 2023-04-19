/**
 * Service responsible for handling program operations.
 * Marking programs as completed, getting all programs and creating new programs.
 */
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as dayjs from "dayjs";

import { Program, ProgramDocument } from "./programs.schema";
import { HttpResponseType } from "../types/http-response.type";
import { CreateProgramDto } from "./create-program.dto";
import { OperationStatus } from "../filters/interface/response.interface";
import { ProgramsArchiveService } from "../programs-archive/programs-archive.service";
import { MarkProgramAsCompletedDTO } from "./mark-program-as-completed.dto";

@Injectable()
export class ProgramsService {
  private readonly logger = new Logger(ProgramsService.name);

  /**
   * Constructor for initializing ProgramsService with required dependencies.
   * @param programModel Injected mongoose model for Program document.
   * @param programArchiveService Injected ProgramsArchiveService for creating archive of completed programs.
   */
  constructor(
    @InjectModel(Program.name)
    private readonly programModel: Model<ProgramDocument>,
    private readonly programArchiveService: ProgramsArchiveService,
  ) {}

  /**
   * Mark the program as completed for a given programId.
   * @param programId Id of the program to mark as completed.
   * @returns HttpResponseType containing success/failure status and message along with program data.
   * @throws NotFoundException if the program with the given programId is not found.
   * @throws BadRequestException if the program end date is not yet passed.
   */
  async markProgramAsCompleted(
    markProgramAsCompletedDTO: MarkProgramAsCompletedDTO,
  ): Promise<HttpResponseType<ProgramDocument | object>> {
    try {
      const program = await this.programModel
        .findById(markProgramAsCompletedDTO.programId)
        .exec();

      if (!program) {
        this.logger.error({
          status: OperationStatus.ERROR,
          message: "Program not found",
          data: {},
        });
        throw new NotFoundException("Program not found");
      }
      const now = dayjs(); // get current date
      const endDate = dayjs(program.endDate);

      if (endDate.isAfter(now)) {
        this.logger.error({
          status: OperationStatus.ERROR,
          message: "Program has not yet ended",
          data: {},
        });
        throw new BadRequestException("Program has not yet ended");
      }

      program.isCompleted = true;
      await program.save();

      await this.programArchiveService.createArchive({
        programId: program._id.toString(),
        userId: program.userId,
        completionDate: program.endDate,
      });

      return {
        status: OperationStatus.SUCCESS,
        message: `Program ${program.title} has completed successfully`,
        data: program,
      };
    } catch (error) {
      return {
        status: OperationStatus.ERROR,
        message: error.message,
        data: {},
      };
    }
  }

  /**
   * Get all programs that are not completed.
   * @returns HttpResponseType containing all programs that are not completed.
   */
  async findAll(): Promise<HttpResponseType<ProgramDocument[]>> {
    const programs = await this.programModel
      .find({ isCompleted: false })
      .sort({ createdAt: -1 })
      .exec();

    return {
      status: OperationStatus.SUCCESS,
      message: "",
      data: programs,
    };
  }

  /**
   * Create a new program.
   * @param createProgramDto DTO containing program details to create new program.
   * @returns HttpResponseType containing success/failure status and message along with created program data.
   * @throws BadRequestException if start date is in the past or end date is before the start date.
   */

  async createProgram(
    createProgramDto: CreateProgramDto,
  ): Promise<HttpResponseType<ProgramDocument | object>> {
    // Parse dates using dayjs
    const start = dayjs(createProgramDto.startDate);
    const end = dayjs(createProgramDto.endDate);
    const currentDate = dayjs();

    // Check that the start date is not in the past
    if (start.isBefore(currentDate)) {
      // Log an error and throw a BadRequestException if the start date is invalid
      this.logger.error({
        status: OperationStatus.ERROR,
        message: `start date cannot be in the past ${createProgramDto.startDate}`,
        data: {},
      });
      throw new BadRequestException(
        `start date cannot be in the past ${createProgramDto.startDate}`,
      );
    }

    // Check that the end date is after the start date
    if (end.isBefore(start)) {
      // Log an error and throw a BadRequestException if the end date is invalid
      this.logger.error({
        status: OperationStatus.ERROR,
        message: `end date cannot be the before start  ${createProgramDto.endDate}`,
        data: {},
      });
      throw new BadRequestException(
        `end date cannot be before start  ${createProgramDto.endDate}`,
      );
    }

    // Create a new program object with the given data and user ID
    const program = new this.programModel({
      ...createProgramDto,
      userId: "rou8idu77Qh0p0kJN2v7hRrBULA2",
    });

    try {
      // Save the program to the database
      await program.save();

      // Return a success response object with the created program
      return {
        status: OperationStatus.SUCCESS,
        message: "Program created successfully",
        data: program,
      };
    } catch (error) {
      // Return an error response object if there was an error saving the program
      return {
        status: OperationStatus.ERROR,
        message: error.message,
        data: {},
      };
    }
  }
}
