import { Module } from "@nestjs/common";
import { ProgramsArchiveController } from "./programs-archive.controller";
import { ProgramsArchiveService } from "./programs-archive.service";
import { FirebaseModule } from "../firebase/firebase.module";
import {
  ProgramArchive,
  ProgramArchiveSchema,
} from "./programs-archive.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    FirebaseModule,
    MongooseModule.forFeature([
      { name: ProgramArchive.name, schema: ProgramArchiveSchema },
    ]),
  ],
  controllers: [ProgramsArchiveController],
  providers: [ProgramsArchiveService],
})
export class ProgramsArchiveModule {}
