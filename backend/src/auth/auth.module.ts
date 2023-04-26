import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PreferencesModule } from "../preferences/preferences.module";
import { PreferencesService } from "../preferences/preferences.service";
import { CloudinaryModule } from "../cloudinary/cloudinary.module";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { User, UserSchema } from "../users/users.schema";
import { UsersService } from "../users/users.service";
import {
  Preferences,
  PreferencesSchema,
} from "../preferences/preferences.schema";

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: configService.get<string>("JWT_EXPIRES_IN") },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Preferences.name, schema: PreferencesSchema },
    ]),
    CloudinaryModule,
    PreferencesModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, CloudinaryService, PreferencesService],
})
export class AuthModule {}
