import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";

import { MongooseConfigService } from "./db/mongodb";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { CloudinaryModule } from "./cloudinary/cloudinary.module";
import { PreferencesModule } from "./preferences/preferences.module";
import { MailService } from "./mail/mail.service";
import { MailModule } from "./mail/mail.module";
import { ProgramsModule } from "./programs/programs.module";
import { ProgramsArchiveModule } from "./programs-archive/programs-archive.module";
import { TaskModule } from "./task/task.module";
import { GoogleStrategy } from "./auth/google.strategy";
import { AuthService } from "./auth/auth.service";
import { UsersService } from "./users/users.service";
import { User, UserSchema } from "./users/users.schema";
import { PreferencesService } from "./preferences/preferences.service";
import {
  Preferences,
  PreferencesSchema,
} from "./preferences/preferences.schema";
import { JwtAuthGuard } from "./auth/guards/jwt.auth.guard";
import { ChatModule } from "./chat/chat.module";
import { TaskService } from "./task/task.service";
import { Task, TaskSchema } from "./task/task.schema";
import { WebsocketModule } from "./websocket/websocket.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: configService.get<string>("JWT_EXPIRES_IN") },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
      inject: [MongooseConfigService],
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Preferences.name, schema: PreferencesSchema },
      { name: Task.name, schema: TaskSchema },
    ]),
    PassportModule,
    UsersModule,
    AuthModule,
    CloudinaryModule,
    PreferencesModule,
    MailModule,
    ProgramsModule,
    ProgramsArchiveModule,
    TaskModule,
    ChatModule,
    WebsocketModule,
  ],
  controllers: [],
  providers: [
    MailService,
    AuthService,
    UsersService,
    PreferencesService,
    TaskService,
    GoogleStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
