import { Module } from "@nestjs/common";
import { MessagesService } from "./chat.service";
import { ChatGateway } from "./chat.gateway";
import { MongooseModule } from "@nestjs/mongoose";
import { Message, MessageSchema } from "./chat.schema";
import { FirebaseModule } from "src/firebase/firebase.module";
import { ChatController } from "./chat.controller";

@Module({
  imports: [
    FirebaseModule,
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  providers: [ChatGateway, MessagesService],
  controllers: [ChatController],
})
export class ChatModule {}
