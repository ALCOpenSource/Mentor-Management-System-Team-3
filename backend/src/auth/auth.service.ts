import { Injectable, Logger, BadRequestException } from "@nestjs/common";
import * as admin from "firebase-admin";
import { OAuth2Client } from "google-auth-library";
import { ConfigService } from "@nestjs/config";

import { OperationStatus } from "./../filters/interface/response.interface";
import { GoogleUserDto, SignupDTO } from "./dto/signup.dto";
import { HttpResponseType } from "../types/http-response.type";
import { GoogleUser } from "./interface/google-user.interface";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * This function implements the sign-up feature for a Firebase-based authentication system.
   * @param signupDto An object that contains the user's email, password, and name.
   * @returns An object containing a status, message, and data.
   */
  async signup(signupDto: SignupDTO): Promise<HttpResponseType> {
    // Retrieve a list of all users from Firebase's Authentication service
    const result = await admin.auth().listUsers();

    // Delete all users from Firebase's Authentication service
    await admin.auth().deleteUsers(result.users.map((user) => user.uid));

    // Check if a user with the provided email already exists
    this.logger.log("Checking if a user with the email exist");
    const userExist = await this.usersService.getFirebaseUserByEmail(
      signupDto.email,
    );

    // If a user with the provided email already exists, throw an error
    if (userExist) {
      this.logger.error("User already exist");
      throw new BadRequestException("User already exist");
    }

    // Create a new firebase user
    const newFirebaseUser = await this.usersService.createFirebaseUser(
      signupDto,
    );
    // Convert the user record to JSON format and extract the user ID and email
    const user: admin.auth.UserRecord =
      newFirebaseUser.toJSON() as admin.auth.UserRecord;

    const { uid, email } = user;

    // split the user name
    const name = signupDto.name.split(" ");

    this.usersService.createUser({
      uid,
      email,
      ...(name[0] && { firstName: name[0] }),
      ...(name[1] && { lastName: name[1] }),
    });

    // Return a success response
    return {
      status: OperationStatus.SUCCESS,
      message: "Account created successfully",
      data: {},
    };
  }

  /**
   * This function implements the sign-up feature for a Firebase-based authentication system.
   * @param googleUserDto An object that contains the user's googleAccessToken.
   * @returns An object containing a status, message, and data.
   */

  async signUpWithGoogle(googleUserDto: GoogleUserDto) {
    // Step 1: Verify the Google access token
    const googleUser = await this.verifyGoogleAccessToken(
      googleUserDto.googleAccessToken,
    );

    // Step 2: Check if the user already exists in your database
    const userExists = await this.usersService.getFirebaseUserByEmail(
      googleUser.email,
    );

    // If user exists, throw a BadRequestException error
    if (userExists) {
      this.logger.error("User already exist");
      throw new BadRequestException("User already exist");
    }

    // Step 3: If the user does not exist, create a new user with their Google information

    // 3.1: Create a new Firebase user with the user's email
    const userRecord: admin.auth.UserRecord =
      await this.usersService.createGoogleFirebaseUser({
        email: googleUser.email,
      });
    const user = userRecord.toJSON() as admin.auth.UserRecord;
    const { uid } = user;

    // 3.2: Create a new user record in mongodb
    // split the user name
    const name = googleUser.name.split(" ");
    this.usersService.createUser({
      email: googleUser.email,
      uid,
      avatar: { url: googleUser.pictureUrl },
      ...(name[0] && { firstName: name[0] }),
      ...(name[1] && { lastName: name[1] }),
    });

    // Step 4: Return a success response
    return {
      status: OperationStatus.SUCCESS,
      message: "Account created successfully",
      data: {},
    };
  }

  async verifyGoogleAccessToken(accessToken: string): Promise<GoogleUser> {
    // Create a new instance of OAuth2Client
    const client = new OAuth2Client();

    // Verify the token using the client and client ID
    const ticket = await client.verifyIdToken({
      idToken: accessToken,
      audience: this.configService.get("GOOGLE_CLIENT_ID"), // replace with your own client ID
    });

    // Get the payload from the verified token
    const payload = ticket.getPayload();

    // Extract the user information from the payload
    return {
      email: payload.email,
      name: payload.name,
      pictureUrl: payload.picture,
    };
  }
}
