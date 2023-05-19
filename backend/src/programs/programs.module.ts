import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { ProgramsService } from "./programs.service";
import { ProgramsController } from "./programs.controller";
import { Program, ProgramSchema } from "./programs.schema";
import { ProgramsArchiveService } from "../programs-archive/programs-archive.service";
import {
  ProgramArchive,
  ProgramArchiveSchema,
} from "../programs-archive/programs-archive.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Program.name, schema: ProgramSchema },
      { name: ProgramArchive.name, schema: ProgramArchiveSchema },
    ]),
  ],
  providers: [ProgramsService, ProgramsArchiveService],
  controllers: [ProgramsController],
})
export class ProgramsModule {}
