import { ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FirebaseService } from "../firebase.service";

@Injectable()
export class FirebaseAuthGuard extends AuthGuard("jwt") {
  private readonly logger = new Logger(FirebaseAuthGuard.name);
  constructor(private readonly firebaseService: FirebaseService) {
    super();
  }

  // This method is used to verify the Firebase ID token that is contained in the authorization header.
  // It sets the decoded token as the user on the request object and returns true if the verification is successful,
  // and false if the authorization header is missing or if the token is invalid.
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authToken = request.headers.authorization;

    if (!authToken || !authToken.startsWith("Bearer ")) {
      return false;
    }

    const token = authToken.slice(7, authToken.length);

    // Verify the token using the Firebase Admin SDK
    try {
      const decodedToken = await this.firebaseService.auth.verifyIdToken(token);

      // Check if the token has expired
      const now = new Date().getTime() / 1000; // convert to Unix time
      if (decodedToken.exp < now) {
        return false;
      }

      // Set the decoded token as the user on the request object
      request.user = decodedToken;

      return true;
    } catch (error) {
      this.logger.error({ ...error });
      return error;
    }
  }
}
