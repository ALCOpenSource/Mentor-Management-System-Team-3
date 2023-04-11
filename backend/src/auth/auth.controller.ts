import { Controller, Post, Body, UseGuards } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { SignupDTO } from "./dto/signup.dto";
import { HttpResponseType } from "../types/http-response.type";
import { FirebaseAuthGuard } from "../firebase/guards/firebase.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(FirebaseAuthGuard)
  @Post("signup")
  async signUp(@Body() signupDto: SignupDTO): Promise<HttpResponseType> {
    return this.authService.signup(signupDto);
  }
}
