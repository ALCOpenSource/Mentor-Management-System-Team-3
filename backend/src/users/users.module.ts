import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";

import { UsersController } from "./users.controller";
import { User, UserSchema } from "./users.schema";
import { FirebaseModule } from "../firebase/firebase.module";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { PreferencesModule } from "../preferences/preferences.module";
import {
  Preferences,
  PreferencesSchema,
} from "../preferences/preferences.schema";
import { PreferencesService } from "../preferences/preferences.service";

@Module({
  imports: [
    FirebaseModule,
    PreferencesModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Preferences.name, schema: PreferencesSchema },
    ]),
  ],
  providers: [UsersService, CloudinaryService, PreferencesService],
  controllers: [UsersController],
})
export class UsersModule {}
