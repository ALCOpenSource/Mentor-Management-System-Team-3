import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type MessageDocument = HydratedDocument<Message>;
@Schema()
export class Message {
  @Prop({ required: true })
  chatId: string;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  senderId: string;

  @Prop({ required: true })
  receiverId: string;

  @Prop()
  readAt: Date;

  @Prop({ default: false })
  isRead: boolean;

  @Prop({ default: false })
  isDelivered: boolean;

  @Prop()
  deliveredAt: Date;

  @Prop({ default: false })
  isMedia: boolean;

  @Prop({ required: true, default: Date.now })
  createdAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
MessageSchema.index({ chatId: 1 });

export type ChatDocument = HydratedDocument<Chat>;
@Schema()
export class Chat {
  @Prop({ required: true, unique: true })
  chatId: string;

  @Prop({ required: true })
  user1Id: string;

  @Prop({ required: true })
  user2Id: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
