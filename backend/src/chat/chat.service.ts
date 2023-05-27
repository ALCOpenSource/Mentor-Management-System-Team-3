import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Chat, ChatDocument } from "./chat.schema";
import { Message, MessageDocument, MessageSchema } from "./chat.schema";
import { UsersService } from "src/users/users.service";
import { v4 as uuidv4 } from "uuid";
import { HttpResponseType } from "src/types/http-response.type";
import { OperationStatus } from "src/filters/interface/response.interface";
import { WebsocketResponseType } from "src/types/ws-response.type";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { CreateMessageDto } from "./dto/messsage.dto";

@Injectable()
export class ChatService {
  constructor(
    private readonly usersService: UsersService,
    private readonly cloudinary: CloudinaryService,
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async createChat(
    user1Id: string,
    user2Id: string,
  ): Promise<HttpResponseType<ChatDocument>> {
    const existingChat = await this.chatModel.findOne({
      $or: [
        { user1Id: user1Id, user2Id: user2Id },
        { user1Id: user2Id, user2Id: user1Id },
      ],
    });

    if (existingChat) {
      // A chat already exists, return it
      return {
        status: OperationStatus.SUCCESS,
        message: "Chat already exists",
        data: existingChat,
      };
    }
    const chatId = this.generateChatId();
    const chat = await this.chatModel.create({ chatId, user1Id, user2Id });
    await this.createMessageCollection(chatId);

    return {
      status: OperationStatus.SUCCESS,
      message: "Chat created successfully",
      data: chat,
    };
  }

  async createMessageCollection(chatId: string): Promise<void> {
    const messageCollectionName = `messages_${chatId}`;
    await this.messageModel.db.model<MessageDocument>(
      messageCollectionName,
      MessageSchema,
    );
    await this.messageModel.init();
  }

  private generateChatId(): string {
    return uuidv4();
  }
  // function to get messages from a chat and get the last 50 messages
  async getChatMessages(
    chatId: string,
  ): Promise<HttpResponseType<MessageDocument | object>> {
    // Get the message model for this chat
    const messageCollectionName = `messages_${chatId}`;
    const messageModel = this.messageModel.db.model<MessageDocument>(
      messageCollectionName,
      MessageSchema,
    );

    // Query the database for the last 200 messages in this chat
    const messages = await messageModel
      .find({})
      .sort({ created_at: "desc" })
      .limit(200)
      .exec();

    return {
      status: OperationStatus.SUCCESS,
      message: "Messages retrieved successfully",
      data: messages,
    };
  }

  // function to get chats for a user
  async getUserChats(userId: string): Promise<Chat[]> {
    // Query the database for up to 20 chats where the given user is a participant
    const chats = await this.chatModel
      .find({
        $or: [{ user1Id: userId }, { user2Id: userId }],
      })
      .limit(20)
      .exec();

    return chats;
  }

  // function that uses the getUserChats method and returns the User Information, chatId, and last message

  // Other chat-related methods...
  async getLastMessage(
    chatId: string,
  ): Promise<{ message: Message; unreadCount: number }> {
    const messageCollectionName = `messages_${chatId}`;
    const messageModel = this.messageModel.db.model<MessageDocument>(
      messageCollectionName,
      MessageSchema,
    );

    const messages = await messageModel
      .find({ isRead: false })
      .sort({ createdAt: -1 })
      .limit(20)
      .exec();

    const lastMessage = messages.length > 0 ? messages[0] : null;
    const unreadCount = messages.reduce((count, message) => {
      return message.receiverId === lastMessage?.receiverId && !message.isRead
        ? count + 1
        : count;
    }, 0);

    return { message: lastMessage, unreadCount };
  }

  // user chat info
  async getUserChatsInfo(userId: string): Promise<HttpResponseType<object>> {
    // Retrieve up to 20 chats where the user is a participant
    const chats = await this.getUserChats(userId);

    const chatPromises = chats.map(async (chat) => {
      const otherUserId = chat.user1Id === userId ? chat.user2Id : chat.user1Id;
      const otherUser = await this.usersService.getUserById(otherUserId);
      const { message: lastMessage, unreadCount } = await this.getLastMessage(
        chat.chatId,
      );
      return { chatId: chat.chatId, user: otherUser, lastMessage, unreadCount };
    });

    // Wait for all the chat promises to resolve
    const chatData = await Promise.all(chatPromises);

    return {
      status: OperationStatus.SUCCESS,
      message: "User chats retrieved successfully",
      data: chatData,
    };
  }

  // function to create a message
  async sendMessage(
    createMessage: CreateMessageDto,
  ): Promise<WebsocketResponseType<MessageDocument | object>> {
    Logger.log("sendMessage");
    const messageCollectionName = `messages_${createMessage.chatId}`;
    Logger.log(messageCollectionName);
    const messageModel = this.messageModel.db.model<MessageDocument>(
      messageCollectionName,
      MessageSchema,
    );
    const message = await messageModel.create(createMessage);
    return message.toObject({ getters: true });
  }

  // function to mark messages as read
  async markMessageRead(messageId: string, chatId: string): Promise<Message> {
    const messageCollectionName = `messages_${chatId}`;
    const messageModel = this.messageModel.db.model<MessageDocument>(
      messageCollectionName,
      MessageSchema,
    );
    const message = await messageModel.findByIdAndUpdate(
      messageId,
      { $set: { isRead: true, readAt: new Date() } },
      { new: true },
    );
    return message.toObject({ getters: true });
  }
  // mark message as delivered
  async markMessageAsDelivered(
    chatId: string,
    messageId: string,
  ): Promise<Message> {
    const messageCollectionName = `messages_${chatId}`;
    const messageModel = this.messageModel.db.model<MessageDocument>(
      messageCollectionName,
      MessageSchema,
    );
    const message = await messageModel.findById(messageId);
    if (!message) {
      throw new NotFoundException(`Message with ID ${messageId} not found`);
    }
    message.isDelivered = true;
    message.deliveredAt = new Date();
    return message.save();
  }
  // handle attachment uploads with cloudinary service and return the url
  async uploadAttachment(
    createChat: CreateMessageDto,
  ): Promise<WebsocketResponseType<MessageDocument | object>> {
    const messageCollectionName = `messages_${createChat.chatId}`;
    const messageModel = this.messageModel.db.model<MessageDocument>(
      messageCollectionName,
      MessageSchema,
    );
    let attachment;
    if (typeof createChat.text !== "string") {
      attachment = await this.cloudinary.uploadImage(createChat.text);
    }

    const message = await messageModel.create({
      chatId: createChat.chatId,
      senderId: createChat.senderId,
      receiverId: createChat.receiverId,
      Text: attachment,
      isMedia: true,
    });
    return message.toObject({ getters: true });
  }

  // broadcast message to several recipients(named)
}
