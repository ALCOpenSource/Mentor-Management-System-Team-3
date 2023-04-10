import { Module } from "@nestjs/common";
import { FirebaseService } from "./firebase.service";

@Module({
  providers: [FirebaseService],
  controllers: [],
  exports: [FirebaseService],
})
export class FirebaseModule {}
