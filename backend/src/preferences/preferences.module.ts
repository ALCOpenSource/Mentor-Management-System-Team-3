import { Module } from "@nestjs/common";
import { PreferencesService } from "./preferences.service";
import { PreferencesController } from "./preferences.controller";
import { FirebaseModule } from "src/firebase/firebase.module";
import { MongooseModule } from "@nestjs/mongoose";
import { PreferencesSchema, Preferences } from "./preferences.schema";
import { CloudinaryModule } from "src/cloudinary/cloudinary.module";
import { User, UserSchema } from "src/users/users.schema";

@Module({
  imports: [
    FirebaseModule,
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
