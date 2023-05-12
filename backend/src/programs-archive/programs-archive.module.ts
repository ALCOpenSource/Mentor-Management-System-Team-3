import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { ProgramsArchiveController } from "./programs-archive.controller";
import { ProgramsArchiveService } from "./programs-archive.service";
import {
  ProgramArchive,
  ProgramArchiveSchema,
} from "./programs-archive.schema";
import { UsersService } from "../users/users.service";
import { User, UserSchema } from "../users/users.schema";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { PreferencesService } from "../preferences/preferences.service";
import {
  Preferences,
  PreferencesSchema,
} from "../preferences/preferences.schema";
import { TaskService } from "../task/task.service";
import { Task, TaskSchema } from "../task/task.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProgramArchive.name, schema: ProgramArchiveSchema },
      { name: User.name, schema: UserSchema },
      { name: Preferences.name, schema: PreferencesSchema },
      { name: Task.name, schema: TaskSchema },
    ]),
  ],
  controllers: [ProgramsArchiveController],
  providers: [
    ProgramsArchiveService,
    UsersService,
    CloudinaryService,
    PreferencesService,
    TaskService,
  ],
})
export class ProgramsArchiveModule {}
