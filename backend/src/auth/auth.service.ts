import * as bcrypt from "bcrypt";
import {
  BadRequestException,
  NotFoundException,
  Injectable,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { OperationStatus } from "./../filters/interface/response.interface";
import { SignupDTO, SignupWithEmailAndPasswordDTO } from "./dto/signup.dto";
import { HttpResponseType } from "../types/http-response.type";
import { UsersService } from "../users/users.service";
import { UserDocument } from "../users/users.schema";
import { LoginDTO } from "./dto/login.dto";
import { ILoginResponse } from "./interface/login-response.interface";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  /**
   * This function implements the sign-up feature for a Firebase-based authentication system.
   * @param signupDto An object that contains the user's email, uid,name and optional avatar.
   * @returns An object containing a status, message, and data.
   */
  async signup(
    signupDto: SignupDTO,
  ): Promise<HttpResponseType<UserDocument | object>> {
    const { uid, email, name, avatar } = signupDto;

    const userExists = await this.usersService.getUserByEmail(email);

    if (userExists) {
      this.logger.log("User already exist");
      throw new BadRequestException("User already exist");
    }

    // split the user name
    const nameSplitted = name.split(" ");

    this.usersService.createUser({
      uid,
      email,
      ...(nameSplitted[0] && { firstName: nameSplitted[0] }),
      ...(nameSplitted[1] && { lastName: nameSplitted[1] }),
      ...(avatar && { avatar: { url: avatar } }),
    });

    // Return a success response
    return {
      status: OperationStatus.SUCCESS,
      message: "Account created successfully",
      data: {},
    };
  }
  async signUpWithEmailAndPassword(
    signUpWithEmailAndPassword: SignupWithEmailAndPasswordDTO,
  ): Promise<HttpResponseType<UserDocument>> {
    // Check if user with given email already exists
    const existingUser = await this.usersService.getUserByEmail(
      signUpWithEmailAndPassword.email,
    );
    if (existingUser) {
      this.logger.error({
        status: OperationStatus.ERROR,
        message: "Email already exist",
        data: {},
      });
      throw new BadRequestException("Email already exists");
    }

    // Create a new user document
    const newUser = await this.usersService.signUpWithEmailAndPassword({
      email: signUpWithEmailAndPassword.email,
      password: signUpWithEmailAndPassword.password,
    });

    return {
      status: OperationStatus.SUCCESS,
      message: "Created successfully",
      data: newUser,
    };
  }

  async login(loginDto: LoginDTO): Promise<HttpResponseType<ILoginResponse>> {
    this.logger.log(loginDto);
    const user = await this.usersService.getUserByEmail(loginDto.email);

    if (!user) {
      this.logger.error({
        status: OperationStatus.ERROR,
        message: "User not found",
        data: {},
      });
      throw new NotFoundException("User not found");
    }

    if (!(await bcrypt.compare(loginDto.password, user?.password))) {
      this.logger.error({
        status: OperationStatus.ERROR,
        message: "Invalid email or password",
        data: {},
      });
      throw new UnauthorizedException("Invalid email or password");
    }

    const { email, _id, role } = user;
    //create payload for jwt
    const payload = {
      username: email,
      sub: _id as unknown as string,
      role: role,
    };

    return {
      status: OperationStatus.SUCCESS,
      message: "",
      data: {
        access_token: this.jwtService.sign(payload),
        email,
        role,
        id: _id.toString(),
      },
    };
  }

  async validateGoogleUser(profile) {
    console.log(profile, "GOOGLE PROFILE");
    const { email, given_name, family_name } = profile._json;

    // Check if user with given email already exists
    const existingUser = await this.usersService.getUserByEmail(email);
    if (existingUser) {
      this.logger.error({
        status: OperationStatus.ERROR,
        message: "Email already exist",
        data: {},
      });
      throw new BadRequestException("Email already exists");
    }
    const user = await this.usersService.signUpwithGoogle({
      email,
      firstName: given_name,
      lastName: family_name,
      avatar: "",
    });

    return user;
  }

  async find(email: string) {
    return this.usersService.getUserByEmail(email);
  }
}
