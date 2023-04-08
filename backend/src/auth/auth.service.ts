import { Injectable, Logger, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as admin from "firebase-admin";

import { OperationStatus } from "./../filters/interface/response.interface";
import { User, UserDocument } from "./../users/users.schema";
import { SignupDTO } from "./dto/signup.dto";
import { HttpResponseType } from "../types/http-response.type";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
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
    const userExist = await this.checkUserExists(signupDto.email);

    // If a user with the provided email already exists, throw an error
    if (userExist) {
      this.logger.error("User already exist");
      throw new BadRequestException("User already exist");
    }

    // Call the Firebase Auth API to create the user account
    const userRecord: admin.auth.UserRecord = await admin.auth().createUser({
      email: signupDto.email,
      password: signupDto.password,
    });

    // Convert the user record to JSON format and extract the user ID and email
    const user: admin.auth.UserRecord =
      userRecord.toJSON() as admin.auth.UserRecord;
    const { uid, email } = user;

    // Delete any existing users from the local database and create a new user with the provided information
    await this.userModel.deleteMany({});
    this.userModel.create({
      uid,
      email,
      firstName: signupDto.name,
    });

    // Return a success response
    return {
      status: OperationStatus.SUCCESS,
      message: "Account created successfully",
      data: {},
    };
  }

  async checkUserExists(email: string) {
    // Call Firebase Authentication's getUserByEmail() method with the email parameter
    return (
      admin
        .auth()
        .getUserByEmail(email)
        // If a user record is found, return the JSON representation of the user record
        .then((userRecord) => userRecord.toJSON())
        // If no user record is found, return null
        .catch(() => null)
    );
  }
}
