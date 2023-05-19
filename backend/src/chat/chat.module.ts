import { Module } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ChatGateway } from "./chat.gateway";
import { MongooseModule } from "@nestjs/mongoose";
import { Message, MessageSchema } from "./message.schema";
import { ChatController } from "./chat.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { User, UserSchema } from "src/users/users.schema";
import { Chat, ChatSchema } from "./chat.schema";
import { UsersService } from "src/users/users.service";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { PreferencesService } from "src/preferences/preferences.service";
import {
  PreferencesSchema,
  Preferences,
} from "../preferences/preferences.schema";
import { Task, TaskSchema } from "../task/task.schema";
import { TaskService } from "../task/task.service";

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: configService.get<string>("JWT_EXPIRES_IN") },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: User.name, schema: UserSchema },
      { name: Chat.name, schema: ChatSchema },
      { name: Preferences.name, schema: PreferencesSchema },
      { name: Task.name, schema: TaskSchema },
    ]),
  ],
  providers: [
    ChatGateway,
    ChatService,
    UsersService,
    CloudinaryService,
    PreferencesService,
    TaskService,
  ],
  controllers: [ChatController],
})
export class ChatModule {}
