import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

import { MongooseConfigService } from "./db/mongodb";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { FirebaseModule } from "./firebase/firebase.module";
import { CloudinaryModule } from "./cloudinary/cloudinary.module";
import { PreferencesModule } from "./preferences/preferences.module";
import { MailService } from "./mail/mail.service";
import { MailModule } from "./mail/mail.module";
import { ProgramsModule } from "./programs/programs.module";
import { ProgramsArchiveModule } from "./programs-archive/programs-archive.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
      inject: [MongooseConfigService],
    }),
    UsersModule,
    AuthModule,
    FirebaseModule,
    CloudinaryModule,
    PreferencesModule,
    MailModule,
    ProgramsModule,
    ProgramsArchiveModule,
  ],
  controllers: [],
  providers: [MailService],
})
export class AppModule {}
