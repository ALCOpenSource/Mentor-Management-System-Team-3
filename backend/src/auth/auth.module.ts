import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { User, UserSchema } from "./../users/users.schema";
import { UsersService } from "./../users/users.service";
import { CloudinaryService } from "../cloudinary/cloudinary.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [AuthService, UsersService, CloudinaryService],
  controllers: [AuthController],
})
export class AuthModule {}
