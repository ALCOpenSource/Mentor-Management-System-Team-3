import { MailService } from "src/mail/mail.service";
import * as bcrypt from "bcrypt";
import {
  BadRequestException,
  NotFoundException,
  Injectable,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as dayjs from "dayjs";
import { PreferencesService } from "src/preferences/preferences.service";

import { OperationStatus } from "./../filters/interface/response.interface";
import { SignupWithEmailAndPasswordDTO } from "./dto/signup.dto";
import { HttpResponseType } from "../types/http-response.type";
import { UsersService } from "../users/users.service";
import { UserDocument } from "../users/users.schema";
import { GoogleLoginDTO, LoginDTO } from "./dto/login.dto";
import { ILoginResponse } from "./interface/login-response.interface";
import { ResetPasswordDTO } from "./dto/reset-password.dto";
import { ForgotPasswordDTO } from "./dto/forgot-password.dto";
import { randomHexCode } from "src/utils/random-hex-code.utils";
import { encryption } from "src/utils/token-encryption.utils";
import { ChangePasswordDTO } from "./dto/change-password.dto";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
    private readonly preferenceService: PreferencesService,
  ) {}

  async changePassword(changePasswordDto: ChangePasswordDTO) {
    // Check if the new password matches the confirm new password
    if (
      changePasswordDto.newPassword !== changePasswordDto.confirmNewPassword
    ) {
      throw new BadRequestException(
        "New password and confirm new password do not match.",
      );
    }

    // Get the current time
    const currentTime = dayjs().toISOString();

    const user = await this.usersService.findByAny({
      token: encryption(changePasswordDto.token),
      tokenExpires: { $gt: currentTime },
    });

    if (!user) {
      this.logger.error({
        status: OperationStatus.ERROR,
        message: "Invalid token or token has expired",
        data: {},
      });
      throw new NotFoundException("Invalid token or token has expired");
    }

    // Update the user's password in the service
    await this.usersService.updatePassword({
      userId: user._id.toString(),
      password: changePasswordDto.newPassword,
    });

    // Return a success response
    return {
      status: OperationStatus.SUCCESS,
      message: "Password changed successfully",
      data: {},
    };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDTO) {
    const user = await this.usersService.getUserByEmail(
      forgotPasswordDto.email,
    );

    if (!user) {
      this.logger.error({
        status: OperationStatus.ERROR,
        message: "User not found",
        data: {},
      });
      throw new NotFoundException("User not found");
    }

    const randomToken = randomHexCode();
    const encryptedToken = encryption(randomToken);

    // Get the current time
    const currentTime = dayjs();

    // Set the timer for 2 hours from the current time
    const timer = currentTime.add(2, "hour");

    // Get the final time after 2 hours
    const finalTime = timer.format("YYYY-MM-DD HH:mm:ss");

    //Send token to the user and update the user record of the user to store the token
    await this.usersService.updateToken({
      email: forgotPasswordDto.email,
      token: encryptedToken,
      tokenExpires: timer.toISOString(),
    });

    return this.mailService.sendNotificationEmail(
      forgotPasswordDto.email,
      "Please click the link below to continue",
      `Forgot Password | Expires in ${finalTime} |  MMSA Team 3`,
      `${process.env.CLIENT_BASE_URL}/forgotpassword/${randomToken}`,
    );
  }

  async resetPassword(
    userId: string,
    resetPasswordDto: ResetPasswordDTO,
  ): Promise<HttpResponseType<object>> {
    // Check if the new password matches the confirm new password
    if (resetPasswordDto.newPassword !== resetPasswordDto.confirmNewPassword) {
      throw new BadRequestException(
        "New password and confirm new password do not match.",
      );
    }

    // Retrieve the user's data from the service
    const { data } = await this.usersService.getUserById(userId, true);

    // Compare the current password with the user's stored password
    if (
      !(await bcrypt.compare(resetPasswordDto.currentPassword, data?.password))
    ) {
      // Log an error and throw a BadRequestException if the current password doesn't match
      this.logger.error({
        status: OperationStatus.ERROR,
        message: "Current password does not match",
        data: {},
      });
      throw new BadRequestException("Current password does not match");
    }

    // Update the user's password in the service
    await this.usersService.updatePassword({
      userId,
      password: resetPasswordDto.newPassword,
    });

    // Return a success response
    return {
      status: OperationStatus.SUCCESS,
      message: "Password updated successfully",
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
    this.preferenceService.createPreferences(newUser.id);

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

  async googleLogin(
    googleLoginDto: GoogleLoginDTO,
  ): Promise<HttpResponseType<ILoginResponse>> {
    // Check if user with given email already exists
    const existingUser = await this.usersService.getUserByEmail(
      googleLoginDto.email,
    );

    if (existingUser) {
      const { email, _id, role } = existingUser;
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
    const user = await this.usersService.signUpwithGoogle({
      email: googleLoginDto.email,
      firstName: googleLoginDto?.displayName?.split(" ")[0],
      lastName: googleLoginDto?.displayName?.split(" ")[1],
      avatar: googleLoginDto.profilePicture,
    });

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
