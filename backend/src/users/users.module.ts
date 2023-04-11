import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";

import { UsersController } from "./users.controller";
import { User, UserSchema } from "./users.schema";
import { FirebaseModule } from "../firebase/firebase.module";
import { CloudinaryService } from "../cloudinary/cloudinary.service";

@Module({
  imports: [
    FirebaseModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService, CloudinaryService],
  controllers: [UsersController],
})
export class UsersModule {}
