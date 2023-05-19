import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";

import { UsersController } from "./users.controller";
import { User, UserSchema } from "./users.schema";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { PreferencesModule } from "../preferences/preferences.module";
import {
  Preferences,
  PreferencesSchema,
} from "../preferences/preferences.schema";
import { PreferencesService } from "../preferences/preferences.service";
import { Task, TaskSchema } from "../task/task.schema";
import { TaskService } from "../task/task.service";

@Module({
  imports: [
    PreferencesModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Preferences.name, schema: PreferencesSchema },
      { name: Task.name, schema: TaskSchema },
    ]),
  ],
  providers: [UsersService, CloudinaryService, PreferencesService, TaskService],
  controllers: [UsersController],
})
export class UsersModule {}
