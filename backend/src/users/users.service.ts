// This class is responsible for interacting with the user-related data.
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { User, UserDocument } from "./users.schema";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { startsWithHttp } from "../utils/starts-with-http";
import { OperationStatus } from "../filters/interface/response.interface";
import { HttpResponseType } from "../types/http-response.type";

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  // This method creates a user in the MongoDB Atlas database.
  async createUser(createUserDto: CreateUserDTO) {
    this.logger.log("Creating a new user");

    this.userModel.create(createUserDto);
  }

  // This methods finds a user using the email address
  async getUserByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  // This methods finds a user using the uid
  async getUserByUid(uid: string): Promise<HttpResponseType> {
    const user: UserDocument = await this.userModel.findOne({ uid });

    if (!user) {
      this.logger.error("User not found");
      throw new NotFoundException("User not found");
    }

    return {
      status: OperationStatus.SUCCESS,
      message: "",
      data: user,
    };
  }

  // This methods updates a user profile
  async updateUser(
    uid: string,
    updateUserDto: UpdateUserDTO,
  ): Promise<HttpResponseType> {
    if (!updateUserDto) {
      this.logger.error("No changes made");
      throw new BadRequestException("No changes made");
    }
    const user: UserDocument | null = await this.userModel.findOne({
      uid,
    });

    if (!user) {
      this.logger.error("User not found");
      throw new NotFoundException("User not found");
    }

    await user.updateOne({
      $set: {
        ...(updateUserDto.bio && {
          bio: updateUserDto.bio,
        }),

        ...(updateUserDto.country && {
          country: updateUserDto.country,
        }),
        ...(updateUserDto.city && {
          city: updateUserDto.city,
        }),
        ...(updateUserDto.firstName && {
          firstName: updateUserDto.firstName,
        }),
        ...(updateUserDto.lastName && {
          lastName: updateUserDto.lastName,
        }),
        ...(updateUserDto.website && {
          website: startsWithHttp(updateUserDto.website),
        }),

        ...(updateUserDto.github && {
          "socials.github": startsWithHttp(updateUserDto.github),
        }),
        ...(updateUserDto.twitter && {
          "socials.twitter": startsWithHttp(updateUserDto.twitter),
        }),
        ...(updateUserDto.instagram && {
          "socials.instagram": startsWithHttp(updateUserDto.instagram),
        }),
        ...(updateUserDto.linkedin && {
          "socials.linkedin": startsWithHttp(updateUserDto.linkedin),
        }),
      },
    });

    return {
      status: OperationStatus.SUCCESS,
      message: "Account updated successfully",
      data: {},
    };
  }
}
