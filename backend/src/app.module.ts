import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

import { MongooseConfigService } from "./db/mongodb";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { FirebaseModule } from "./firebase/firebase.module";
import { CloudinaryModule } from "./cloudinary/cloudinary.module";

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
