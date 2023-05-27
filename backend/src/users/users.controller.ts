import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Put,
  Query,
  Req,
  // UploadedFile,
  // UseInterceptors,
  UseGuards,
} from "@nestjs/common";
// import { FileInterceptor } from "@nestjs/platform-express";

import { UsersService } from "./users.service";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { HttpResponseType } from "../types/http-response.type";
import { UserDocument } from "./users.schema";
import { UserIdDTO } from "./dto/user-id.dto";
import { ROLE } from "../auth/enums/role.enum";
import { Role } from "../auth/custom-decorator/role.decorator";
import { RolesGuard } from "../auth/guards/role.guard";
import { GetMentorsDTO } from "./dto/getmentors.dto";
import { PaginatedUserDocuments } from "./interface/paginated-user-documents.interface";
import { UploadAvatarDTO } from "./dto/upload-avatar.dto";

@Controller("users")
export class UsersController {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly usersService: UsersService) {}

  @Get("user/:userId")
  @Role(ROLE.SUPERADMIN)
  @UseGuards(RolesGuard)
  async getUserById(
    @Param() userIdDto: UserIdDTO,
  ): Promise<HttpResponseType<UserDocument | object>> {
    return this.usersService.getUserById(userIdDto.userId);
  }

  @Get("me")
  async getMe(@Req() req): Promise<HttpResponseType<UserDocument | object>> {
    return this.usersService.getUserById(req.user.sub);
  }

  @Put("update")
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Body() updateUserDto: UpdateUserDTO,
    @Req() req,
  ): Promise<HttpResponseType<UserDocument | object>> {
    return this.usersService.updateUser(req.user.sub, updateUserDto);
  }

  @Get("avatar")
  async getAvatar(@Req() req): Promise<HttpResponseType<object>> {
    return this.usersService.getAvatar(req.user.sub);
  }

  @Patch("avatar")
  @HttpCode(HttpStatus.OK)
  // @UseInterceptors(FileInterceptor("avatar"))
  async uploadDriverLicense(
    // @UploadedFile() avatar: Express.Multer.File,
    @Body() uploadAvatarDto: UploadAvatarDTO,
    @Req() req,
  ): Promise<HttpResponseType<UserDocument | object>> {
    try {
      return this.usersService.uploadAvatar(req.user?.sub, uploadAvatarDto);
    } catch (error) {
      return error;
    }
  }

  @Get()
  async getUserByEmail(@Query("email") email: string) {
    return this.usersService.getUserByEmail(email);
  }

  @Patch("make/admin/:userId")
  @Role(ROLE.SUPERADMIN)
  @UseGuards(RolesGuard)
  @HttpCode(HttpStatus.OK)
  async makeAdmin(
    @Param() userIdDto: UserIdDTO,
  ): Promise<HttpResponseType<object>> {
    return this.usersService.makeAdmin(userIdDto);
  }

  @Get("/mentors")
  @Role(ROLE.SUPERADMIN, ROLE.ADMIN)
  @UseGuards(RolesGuard)
  @HttpCode(HttpStatus.OK)
  async getMentors(
    @Query() getMentorsDto: GetMentorsDTO,
  ): Promise<HttpResponseType<PaginatedUserDocuments>> {
    return this.usersService.getMentors(getMentorsDto);
  }

  @Get("/mentor/:userId")
  @Role(ROLE.SUPERADMIN, ROLE.ADMIN)
  @UseGuards(RolesGuard)
  @HttpCode(HttpStatus.OK)
  async getMentor(@Param() userIdDto: UserIdDTO) {
    return this.usersService.getMentor(userIdDto);
  }
}
