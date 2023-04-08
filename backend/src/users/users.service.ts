// This class is responsible for interacting with the user-related data and Firebase Authentication API.
import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as admin from "firebase-admin";

import { User, UserDocument } from "./users.schema";
import { SignupDTO } from "./../auth/dto/signup.dto";
import { CreateUserDTO } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  // This method checks if a user exists in the Firebase Authentication using their email.
  async getFirebaseUserByEmail(email: string) {
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

  // This method creates a user in the MongoDB Atlas database.
  async createUser(createUserDto: CreateUserDTO) {
    await this.userModel.deleteMany({});
    this.userModel.create(createUserDto);
  }

  // This method creates a user in the Firebase Authentication using their email and password.
  async createFirebaseUser(signupDto: SignupDTO) {
    // Call the Firebase Auth API to create the user account
    return admin.auth().createUser({
      email: signupDto.email,
      password: signupDto.password,
    });
  }

  // This method creates a user in the Firebase Authentication using their email only.
  async createGoogleFirebaseUser(
    signupDto: Omit<SignupDTO, "password" | "name">,
  ) {
    // Call the Firebase Auth API to create the user account
    return admin.auth().createUser({
      email: signupDto.email,
    });
  }
}
