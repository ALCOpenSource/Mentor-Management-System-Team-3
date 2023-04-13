import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ServiceAccount } from "firebase-admin";
import * as admin from "firebase-admin";

@Injectable()
export class FirebaseService {
  private readonly app: admin.app.App;
  private readonly adminConfig: ServiceAccount;

  constructor(private readonly configService: ConfigService) {
    // Set the config options
    this.adminConfig = {
      projectId: this.configService.get<string>("FIREBASE_PROJECT_ID"),
      privateKey: this.configService
        .get<string>("FIREBASE_PRIVATE_KEY")
        .replace(/\\n/g, "\n"),
      clientEmail: this.configService.get<string>("FIREBASE_CLIENT_EMAIL"),
    };

    // Initialize the firebase admin app
    this.app = admin.initializeApp({
      credential: admin.credential.cert(this.adminConfig),
    });
  }

  // returns a instance of the firebase auth
  get auth() {
    return this.app.auth();
  }

  // returns a instance of the firebase real time database
  get database() {
    return this.app.database();
  }
}
