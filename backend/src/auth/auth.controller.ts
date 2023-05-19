// Import necessary modules and decorators from NestJS
import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";

// Import the AuthService class from the auth.service.ts file
import { AuthService } from "./auth.service";

// Import the SignupWithEmailAndPasswordDTO interface from the signup.dto.ts file
import { SignupWithEmailAndPasswordDTO } from "./dto/signup.dto";

// Import the HttpResponseType type from the http-response.type.ts file
import { HttpResponseType } from "../types/http-response.type";

// Import the UserDocument type from the users.schema.ts file
import { UserDocument } from "../users/users.schema";

// Import the LoginDTO interface from the login.dto.ts file
import { LoginDTO } from "./dto/login.dto";

// Import the Public decorator from the public.decorator.ts file
import { Public } from "./custom-decorator/public.decorator";
import { ILoginResponse } from "./interface/login-response.interface";

// Define the controller and its base route
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
  @Post("google/signup")
  @HttpCode(HttpStatus.OK)
  async googleSignup(@Body() profile): Promise<object> {
    // Log the profile to the console
    console.log(profile, "GOOGLE PROFILE");
    // Return a success message with the profile data
    return {
      status: "success",
      message: "Google Sign",
      data: profile,
    };
    // Or alternatively, call the AuthService's login method with the profile
    // return this.authService.login(profile);
  }
}
