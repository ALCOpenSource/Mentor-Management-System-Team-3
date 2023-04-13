import {
  Body,
  Controller,
  Get,
  Logger,
  Patch,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";

import { AuthService } from "src/auth/auth.service";
import { UsersService } from "./users.service";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { HttpResponseType } from "../types/http-response.type";
import { FirebaseAuthGuard } from "../firebase/guards/firebase.guard";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("users")
export class UsersController {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly usersService: UsersService) {}

  @Get("user")
  async getUserByUid(@Req() req): Promise<HttpResponseType> {
    return this.usersService.getUserByUid(req.user.sub);
  }

  @Put("update")
  @UseGuards(FirebaseAuthGuard)
  async updateUser(
    @Body() updateUserDto: UpdateUserDTO,
    @Req() req,
  ): Promise<HttpResponseType> {
    return this.usersService.updateUser(req.user.sub, updateUserDto);
  }

  @Patch("avatar")
  @UseInterceptors(FileInterceptor("avatar"))
  @UseGuards(FirebaseAuthGuard)
  async uploadDriverLicense(
    @UploadedFile() avatar: Express.Multer.File,
    @Req() req,
  ): Promise<HttpResponseType> {
    try {
      return this.usersService.uploadAvatar(req.user?.sub, avatar);
    } catch (error) {
      return error;
    }
  }
}
