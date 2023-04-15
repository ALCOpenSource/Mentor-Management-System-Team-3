import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";

import { UsersController } from "./users.controller";
import { User, UserSchema } from "./users.schema";
import { FirebaseModule } from "../firebase/firebase.module";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { PreferencesModule } from "src/preferences/preferences.module";
import {
  Preferences,
  PreferencesSchema,
} from "src/preferences/preferences.schema";
import { PreferencesService } from "src/preferences/preferences.service";

@Module({
  imports: [
    FirebaseModule,
    PreferencesModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Preferences.name, schema: PreferencesSchema },
    ]),
  ],
  providers: [UsersService, CloudinaryService, PreferencesService],
  controllers: [UsersController],
})
export class UsersModule {}
