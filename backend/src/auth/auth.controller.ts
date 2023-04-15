import { Controller, Post, Body } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { SignupDTO } from "./dto/signup.dto";
import { HttpResponseType } from "../types/http-response.type";
import { UserDocument } from "../users/users.schema";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  async signUp(
    @Body() signupDto: SignupDTO,
  ): Promise<HttpResponseType<UserDocument | object>> {
    return this.authService.signup(signupDto);
  }
}
