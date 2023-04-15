import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Logger,
} from "@nestjs/common";
import { ProgramsService } from "./programs.service";
import { CreateProgramDto } from "./create-program.dto";
import { HttpResponseType } from "../types/http-response.type";
import { MarkProgramAsCompletedDTO } from "./mark-program-as-completed.dto";
import { ProgramDocument } from "./programs.schema";

@Controller("programs")
export class ProgramsController {
  private readonly logger = new Logger(ProgramsController.name);
  constructor(private readonly programsService: ProgramsService) {}

  @Get()
  async findAll() {
    return this.programsService.findAll();
  }

  @Post()
  async createProgram(@Body() createProgramDto: CreateProgramDto) {
    return this.programsService.createProgram(createProgramDto);
  }

  @Put(":programId/completed")
  async markProgramAsCompleted(
    @Param() markProgramAsCompletedDTO: MarkProgramAsCompletedDTO,
  ): Promise<HttpResponseType<ProgramDocument | object>> {
    return this.programsService.markProgramAsCompleted(
      markProgramAsCompletedDTO,
    );
  }
}
