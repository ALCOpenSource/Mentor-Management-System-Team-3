import {
  Body,
  Controller,
  Get,
  Logger,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";

import { AuthService } from "src/auth/auth.service";
import { UsersService } from "./users.service";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { HttpResponseType } from "../types/http-response.type";
import { FirebaseAuthGuard } from "../firebase/guards/firebase.guard";

@Controller("users")
export class UsersController {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly usersService: UsersService) {}

  @Get("user")
  async getUserByUid(@Req() req): Promise<HttpResponseType> {
    return this.usersService.getUserByUid(req.user.sub);
  }

  @Put("/update")
  @UseGuards(FirebaseAuthGuard)
  async updateUser(
    @Body() updateUserDto: UpdateUserDTO,
    @Req() req,
  ): Promise<HttpResponseType> {
    return this.usersService.updateUser(req.user.sub, updateUserDto);
  }
}
