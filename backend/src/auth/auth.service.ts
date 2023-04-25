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
import { SignupWithEmailAndPasswordDTO } from "./dto/signup.dto";
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
