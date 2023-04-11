import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FirebaseService } from "../firebase.service";

@Injectable()
export class FirebaseAuthGuard extends AuthGuard("jwt") {
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
    const decodedToken = await this.firebaseService.auth.verifyIdToken(token);

    // Set the decoded token as the user on the request object
    request.user = decodedToken;

    return true;
  }
}
