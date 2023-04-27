import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { PreferencesService } from "./preferences.service";
import { PreferencesController } from "./preferences.controller";
import { PreferencesSchema, Preferences } from "./preferences.schema";
import { CloudinaryModule } from "../cloudinary/cloudinary.module";
import { User, UserSchema } from "../users/users.schema";

@Module({
  imports: [
    CloudinaryModule,
    MongooseModule.forFeature([
      { name: Preferences.name, schema: PreferencesSchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [PreferencesController],
  providers: [PreferencesService],
})
export class PreferencesModule {}
