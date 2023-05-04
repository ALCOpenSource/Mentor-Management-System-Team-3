import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { MessagesService } from "./chat.service";
import { Message } from "./chat.schema";
import { FirebaseAuthGuard } from "src/firebase/guards/firebase.guard";

@UseGuards(FirebaseAuthGuard)
@Controller("chat")
export class ChatController {
  constructor(private readonly chatService: MessagesService) {}

  @Post("/history/")
  async getChatHistory(
    @Body("userId1") userId1: string,
    @Body("userId2") userId2: string,
  ): Promise<unknown> {
    return this.chatService.getChatHistory(userId1, userId2);
  }
}
