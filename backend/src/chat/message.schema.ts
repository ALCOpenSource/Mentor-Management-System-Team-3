import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop({ required: true })
  sender: string;

  @Prop({ required: true })
  recipient: string;

  @Prop({ required: true })
  message: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: false })
  isDelivered: boolean;

  @Prop({ default: null })
  readAt: Date;

  @Prop({ default: false })
  read: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  _id: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
