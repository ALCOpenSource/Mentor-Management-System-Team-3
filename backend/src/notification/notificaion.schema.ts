import { Schema, Prop } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type InAppNotificationDocument = HydratedDocument<InAppNofications>;
@Schema({
  timestamps: true,
  autoIndex: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class InAppNofications {}
