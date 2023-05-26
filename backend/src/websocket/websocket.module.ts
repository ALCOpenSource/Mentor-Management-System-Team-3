import { Module } from "@nestjs/common";
import { WsGateway } from "./websocket.gateway";
import { ChatModule } from "src/chat/chat.module";
import { ChatService } from "src/chat/chat.service";
import { JwtService } from "@nestjs/jwt";
import { UsersModule } from "src/users/users.module";
import { UsersService } from "src/users/users.service";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/users/users.schema";
import { Chat, ChatSchema, Message, MessageSchema } from "src/chat/chat.schema";
import { PreferencesService } from "src/preferences/preferences.service";
import { TaskService } from "src/task/task.service";
import {
  Preferences,
  PreferencesSchema,
} from "src/preferences/preferences.schema";
import { Task, TaskSchema } from "src/task/task.schema";

@Module({
  imports: [
    ChatModule,
    UsersModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Chat.name,
        schema: ChatSchema,
      },
      {
        name: Message.name,
        schema: MessageSchema,
      },
      {
        name: Preferences.name,
        schema: PreferencesSchema,
      },
      {
        name: Task.name,
        schema: TaskSchema,
      },
    ]),
  ],
  providers: [
    WsGateway,
    ChatService,
    JwtService,
    UsersService,
    CloudinaryService,
    PreferencesService,
    TaskService,
  ],
})
export class WebsocketModule {}
