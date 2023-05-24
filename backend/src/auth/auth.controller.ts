// Import necessary modules and decorators from NestJS
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Req,
  Patch,
} from "@nestjs/common";

// Import the AuthService class from the auth.service.ts file
import { AuthService } from "./auth.service";

// Import the SignupWithEmailAndPasswordDTO interface from the signup.dto.ts file
import { SignupWithEmailAndPasswordDTO } from "./dto/signup.dto";

// Import the HttpResponseType type from the http-response.type.ts file
import { HttpResponseType } from "../types/http-response.type";

// Import the UserDocument type from the users.schema.ts file
import { UserDocument } from "../users/users.schema";

// Import the LoginDTO interface from the login.dto.ts file
import { GoogleLoginDTO, LoginDTO } from "./dto/login.dto";

// Import the Public decorator from the public.decorator.ts file
import { Public } from "./custom-decorator/public.decorator";
import { ILoginResponse } from "./interface/login-response.interface";
import { ResetPasswordDTO } from "./dto/reset-password.dto";
import { ForgotPasswordDTO } from "./dto/forgot-password.dto";
import { ChangePasswordDTO } from "./dto/change-password.dto";

// Define the controller and its base route
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Patch("reset-password")
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDTO,
    @Req() req,
  ): Promise<HttpResponseType<object>> {
    return this.authService.resetPassword(req?.user?.sub, resetPasswordDto);
  }

  // Define a public route for changing  password
  @Public()
  @Patch("change-password")
  async chaagePassword(@Body() changePasswordDto: ChangePasswordDTO) {
    return this.authService.changePassword(changePasswordDto);
  }

  // Define a public route for forgot password
  @Public()
  @Patch("forgot-password")
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDTO) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  // Define a public route for signing up with email and password
  @Public()
  @Post("signup")
  async signUp(
    @Body() signUpWithEmailAndPasswordDto: SignupWithEmailAndPasswordDTO,
  ): Promise<HttpResponseType<UserDocument | object>> {
    // Call the AuthService's signUpWithEmailAndPassword method with the DTO
    return this.authService.signUpWithEmailAndPassword(
      signUpWithEmailAndPasswordDto,
    );
  }

  // Define a public route for logging in with email and password
  @Public()
  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDTO,
  ): Promise<HttpResponseType<ILoginResponse>> {
    // Call the AuthService's login method with the DTO
    return this.authService.login(loginDto);
  }

  // Define a route for signing up with Google
  @Public()
  @Post("google/login")
  @HttpCode(HttpStatus.OK)
  async googleSignup(@Body() googleLoginDto: GoogleLoginDTO): Promise<object> {
    return this.authService.googleLogin(googleLoginDto);
  }
}
