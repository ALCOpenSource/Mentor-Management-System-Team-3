import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { ProgramsArchiveController } from "./programs-archive.controller";
import { ProgramsArchiveService } from "./programs-archive.service";
import { FirebaseModule } from "../firebase/firebase.module";
import {
  ProgramArchive,
  ProgramArchiveSchema,
} from "./programs-archive.schema";
import { UsersService } from "../users/users.service";
import { User, UserSchema } from "../users/users.schema";
import { CloudinaryService } from "../cloudinary/cloudinary.service";

@Module({
  imports: [
    FirebaseModule,
    MongooseModule.forFeature([
      { name: ProgramArchive.name, schema: ProgramArchiveSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [ProgramsArchiveController],
  providers: [ProgramsArchiveService, UsersService, CloudinaryService],
})
export class ProgramsArchiveModule {}
