import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";
// import { IImage } from "./interface/image.interface";
import { ISocials } from "./interface/socials.interface";
import { Preferences } from "src/preferences/preferences.schema";
import { IUser } from "./interface/user.interface";
import { ROLE } from "../auth/enums/role.enum";

export type UserDocument = HydratedDocument<User> & IUser;

@Schema({
  timestamps: true,
  autoIndex: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class User {
  @Prop({ lowercase: true })
  firstName: string;

  @Prop({ lowercase: true })
  lastName: string;

  @Prop({ lowercase: true })
  email: string;

  @Prop()
  avatar: string;

  @Prop()
  token: string;

  @Prop()
  tokenExpires: Date;

  @Prop()
  bio: string;

  @Prop({ lowercase: true })
  country: string;

  @Prop({ lowercase: true })
  city: string;

  @Prop({ lowercase: true })
  website: string;

  @Prop()
  password: string;

  @Prop(
    raw({
      github: { type: String, lowercase: true },
      linkedin: { type: String, lowercase: true },
      twitter: { type: String, lowercase: true },
      instagram: { type: String, lowercase: true },
    }),
  )
  socials: ISocials;

  @Prop({ type: MongooseSchema.Types.ObjectId, sparse: true })
  createdBy: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, sparse: true })
  updatedBy: MongooseSchema.Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: "Preferences",
    autopopulate: true,
  })
  preferences: MongooseSchema.Types.ObjectId | Preferences;

  @Prop({ default: ROLE.USER })
  role: ROLE;
}

export const UserSchema = SchemaFactory.createForClass(User);
