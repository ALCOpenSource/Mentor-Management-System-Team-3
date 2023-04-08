import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
import { Iimage } from "./interface/image.interface";

export enum ROLE {
  ADMIN = "admin",
}

export interface IUser {
  id?: string;
  uid: string;
  firstName?: string;
  lastName?: string;
  country?: string;
  city?: string;
  website?: string;
  email?: string;
  bio?: string;
  avatar?: Iimage;
  role: ROLE;
  createdBy?: string;
  updatedBy?: string;
}

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
  autoIndex: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class User {
  @Prop({ lower: true })
  firstName: string;

  @Prop({ lower: true })
  lastName: string;

  @Prop({ lower: true })
  email: string;

  @Prop()
  uid: string;

  @Prop(
    raw({
      url: String,
      publicId: { type: String },
    }),
  )
  avatar: Iimage;

  @Prop()
  bio: string;

  @Prop()
  country: string;

  @Prop()
  city: string;

  @Prop()
  website: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, sparse: true })
  createdBy: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, sparse: true })
  updatedBy: MongooseSchema.Types.ObjectId;

  @Prop({ default: ROLE.ADMIN })
  role: ROLE;
}

export const UserSchema = SchemaFactory.createForClass(User);
