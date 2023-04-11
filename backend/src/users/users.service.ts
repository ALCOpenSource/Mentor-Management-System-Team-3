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
import { CloudinaryService } from "../cloudinary/cloudinary.service";

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly cloudinary: CloudinaryService,
  ) {}

  // This method uploads user profile picture (avatar)
  async uploadAvatar(uid: string, avatar: Express.Multer.File) {
    if (!avatar) {
      this.logger.error({
        status: OperationStatus.ERROR,
        message: "file is empty",
        data: {},
      });
      throw new BadRequestException({
        status: OperationStatus.ERROR,
        message: "file is empty",
        data: {},
      });
    }

    const user: UserDocument = await this.userModel.findOne({ uid });
    if (!user) {
      const errorMessage = "User not found";
      this.logger.error({
        status: OperationStatus.ERROR,
        message: errorMessage,
        data: {},
      });
      throw new NotFoundException(errorMessage);
    }

    if (user?.avatar?.publicId) {
      await this.cloudinary.deleteImage(user?.avatar?.publicId);
    }

    const { secure_url, public_id } = await this.cloudinary
      .uploadImage(avatar)
      .catch(() => {
        const errorMessage = "file is empty";
        this.logger.error({
          status: OperationStatus.ERROR,
          message: errorMessage,
          data: {},
        });
        throw new BadRequestException("file is empty");
      });

    user.avatar = { url: secure_url, publicId: public_id };
    await user.updateOne(user).exec();

    return {
      status: OperationStatus.SUCCESS,
      message: "Updated successfully",
      data: {},
    };
  }

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
      const errorMessage = "User not found";
      this.logger.error({
        status: OperationStatus.ERROR,
        message: errorMessage,
        data: {},
      });
      throw new NotFoundException(errorMessage);
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
      const errorMessage = "User not found";
      this.logger.error({
        status: OperationStatus.ERROR,
        message: errorMessage,
        data: {},
      });
      throw new NotFoundException(errorMessage);
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
