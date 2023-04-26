import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { FirebaseModule } from "../firebase/firebase.module";
import { Task, TaskSchema } from "./task.schema";
import { TaskService } from "./task.service";
import { TaskController } from "./task.controller";

@Module({
  imports: [
    FirebaseModule,
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
