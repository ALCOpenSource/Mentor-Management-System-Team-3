import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { User } from "src/users/users.schema";

export type InAppNotificationDocument = HydratedDocument<InAppNofications>;
@Schema()
export class InAppNofications {
  @Prop({ type: Types.ObjectId, auto: true })
  id: string;
  @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  senderId: string;

  @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  receiverId: string;

  @Prop({ required: true })
  // could be DM, comment etc
  type: string;

  @Prop()
  read: string;

  @Prop({ default: Date.now() })
  createdAt: Date;
}

export const InAppNotificationSchema =
  SchemaFactory.createForClass(InAppNofications);
