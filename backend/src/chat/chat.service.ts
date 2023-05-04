import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Message, MessageDocument } from "./chat.schema";
import { Logger } from "@nestjs/common/services";

@Injectable()
export class MessagesService {
  private logger = new Logger(MessagesService.name);
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async createMessage(
    sender: string,
    recipient: string,
    message: string,
  ): Promise<Message> {
    const text = new this.messageModel({ sender, recipient, message });
    return text.save();
  }

  async markMessageAsRead(
    messageId: string,
    receiverId: string,
  ): Promise<Message> {
    const message = await this.messageModel.findOneAndUpdate(
      { _id: messageId, receiverId },
      { read: true },
      { new: true },
    );
    if (!message) {
      throw new Error(
        `Message with ID ${messageId} not found for user with ID ${receiverId}`,
      );
    }
    return message;
  }

  async getUnreadMessages(recipient: string): Promise<Message[]> {
    this.logger.log(`Getting unread messages for user ${recipient}`);
    this.logger.log(` messages: ${await this.messageModel.find().exec()}`);
    return this.messageModel.find({ recipient, readAt: null }).exec();
  }
  getAllMessages() {
    return this.messageModel.find().exec();
  }

  async getChatHistory(userId1: string, userId2: string): Promise<unknown> {
    const messages = await this.messageModel
      .find({
        $or: [
          { sender: userId1, recipient: userId2 },
          { sender: userId2, recipient: userId1 },
        ],
      })
      .exec();
    const unreadMessages = messages.filter(
      (message) => !message.read && message.recipient === userId1,
    );
    const unreadCount = unreadMessages.length;

    // Mark the unread messages as read
    if (unreadMessages.length > 0) {
      const unreadMessageIds = unreadMessages.map((message) => message._id);
      await this.messageModel
        .updateMany({ _id: { $in: unreadMessageIds } }, { read: true })
        .exec();
    }

    return { messages, unreadCount };
  }
}
