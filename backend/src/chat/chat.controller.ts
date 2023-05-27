import { Controller, Post, Body, UseGuards, Req, Get } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { JwtAuthGuard } from "src/auth/guards/jwt.auth.guard";
import { ChatDocument, MessageDocument } from "./chat.schema";
import { HttpResponseType } from "src/types/http-response.type";
import { CreateChatDto } from "./dto/create-chat.dto";
import { GetChatMessagesDto } from "./dto/messsage.dto";

@UseGuards(JwtAuthGuard)
@Controller("chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post("/createchat")
  async createChat(
    @Body() chat: CreateChatDto,
  ): Promise<HttpResponseType<ChatDocument | object>> {
    return this.chatService.createChat(chat.userId1, chat.userId2);
  }

  @Get("getchats")
  async getChats(@Req() req): Promise<HttpResponseType<object>> {
    return this.chatService.getUserChatsInfo(req.user.sub);
  }
  @Post("getchatmessages")
  async getChatMessages(
    @Req() req,
    @Body() getMessages: GetChatMessagesDto,
  ): Promise<HttpResponseType<MessageDocument | object>> {
    return this.chatService.getChatMessages(getMessages.chatId);
  }
}
