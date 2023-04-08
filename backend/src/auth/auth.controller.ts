import { Controller, Post, Body } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { GoogleUserDto, SignupDTO } from "./dto/signup.dto";
import { HttpResponseType } from "../types/http-response.type";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  async singUp(@Body() signupDto: SignupDTO): Promise<HttpResponseType> {
    return this.authService.signup(signupDto);
  }

  @Post("signup/google")
  async signupWithGoogle(
    @Body() googleDto: GoogleUserDto,
  ): Promise<HttpResponseType> {
    return this.authService.signUpWithGoogle(googleDto);
  }
}
