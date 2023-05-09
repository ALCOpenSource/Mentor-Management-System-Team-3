import { Controller, Post, Body, UseGuards, Req, Get } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { JwtAuthGuard } from "src/auth/guards/jwt.auth.guard";
import { ChatDocument, MessageDocument } from "./chat.schema";
import { HttpResponseType } from "src/types/http-response.type";

@UseGuards(JwtAuthGuard)
@Controller("chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post("/createchat")
  async createChat(
    @Body("userId1") userId1: string,
    @Body("userId2") userId2: string,
  ): Promise<HttpResponseType<ChatDocument | object>> {
    return this.chatService.createChat(userId1, userId2);
  }

  @Get("getchats")
  async getChats(@Req() req): Promise<HttpResponseType<object>> {
    return this.chatService.getUserChatsInfo(req.user.sub);
  }
  @Post("getchatmessages")
  async getChatMessages(
    @Req() req,
    @Body("chatId") chatId: string,
  ): Promise<HttpResponseType<MessageDocument | object>> {
    return this.chatService.getChatMessages(chatId);
  }
}
