import {
  Body,
  Controller,
  Get,
  Logger,
  Patch,
  Put,
  Query,
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
import { UserDocument } from "./users.schema";

@Controller("users")
export class UsersController {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly usersService: UsersService) {}

  @Get("user")
  @UseGuards(FirebaseAuthGuard)
  async getUserByUid(
    @Req() req,
  ): Promise<HttpResponseType<UserDocument | object>> {
    return this.usersService.getUserByUid(req.user.sub);
  }

  @Put("update")
  @UseGuards(FirebaseAuthGuard)
  async updateUser(
    @Body() updateUserDto: UpdateUserDTO,
    @Req() req,
  ): Promise<HttpResponseType<UserDocument | object>> {
    return this.usersService.updateUser(req.user.sub, updateUserDto);
  }

  @Patch("avatar")
  @UseInterceptors(FileInterceptor("avatar"))
  @UseGuards(FirebaseAuthGuard)
  async uploadDriverLicense(
    @UploadedFile() avatar: Express.Multer.File,
    @Req() req,
  ): Promise<HttpResponseType<UserDocument | object>> {
    try {
      return this.usersService.uploadAvatar(req.user?.sub, avatar);
    } catch (error) {
      return error;
    }
  }

  @Get()
  async getUserByEmail(@Query("email") email: string) {
    return this.usersService.getUserByEmail(email);
  }
}
