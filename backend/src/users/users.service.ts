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
import { PreferencesService } from "../preferences/preferences.service";
import { SignupWithEmailAndPasswordDTO } from "../auth/dto/signup.dto";
import { hashPassword } from "../utils/hash-password.utils";
import { SignupWithGoogleDTO } from "./dto/signup-with-google.dto";
import { UserIdDTO } from "./dto/user-id.dto";
import { ROLE } from "../auth/enums/role.enum";
import { GetMentorsDTO } from "./dto/getmentors.dto";
import { PaginatedUserDocuments } from "./interface/paginated-user-documents.interface";
import { TaskService } from "../task/task.service";
import { UserTaskResponse } from "./interface/user-task-response.interface";

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly cloudinary: CloudinaryService,
    private readonly preferenceService: PreferencesService,
    private readonly taskService: TaskService,
  ) {}

  // This method uploads user profile picture (avatar)
  async uploadAvatar(id: string, avatar: Express.Multer.File) {
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

    const user: UserDocument = await this.userModel.findById(id);
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
    // while creating new user, we need to instantiate also a class for their preferences
    this.logger.log("Creating user preferences");
    this.preferenceService.createPreferences(createUserDto.id);
  }

  async signUpwithGoogle(signupWithGoogleDTO: SignupWithGoogleDTO) {
    this.logger.log("Creating a new user");
    return this.userModel.create(signupWithGoogleDTO);
  }

  // This method creates a user with an email and password
  async signUpWithEmailAndPassword(
    signUpWithEmailAndPassword: SignupWithEmailAndPasswordDTO,
  ): Promise<UserDocument> {
    return this.userModel.create({
      email: signUpWithEmailAndPassword.email,
      password: hashPassword(signUpWithEmailAndPassword.password),
    });
  }

  // This methods finds a user using the email address
  async getUserByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  // This methods finds a user using the id
  async getUserById(id: string): Promise<HttpResponseType<UserDocument>> {
    const user: UserDocument = await this.userModel.findById(id);

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
    id: string,
    updateUserDto: UpdateUserDTO,
  ): Promise<HttpResponseType<UserDocument | object>> {
    if (!updateUserDto) {
      this.logger.error("No changes made");
      throw new BadRequestException("No changes made");
    }
    const user: UserDocument | null = await this.userModel.findById(id);

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

  /**
   * This function updates a user's role to admin
   * @param userIdDto - DTO containing the user's ID
   * @returns an HTTP response type with a success message and an empty object data property upon successful update
   * @throws a NotFoundException if the user is not found
   */
  async makeAdmin(userIdDto: UserIdDTO): Promise<HttpResponseType<object>> {
    const user = await this.userModel.findById(userIdDto.userId);

    if (!user) {
      const errorMessage = "User not found";
      this.logger.error({
        status: OperationStatus.ERROR,
        message: errorMessage,
        data: {},
      });
      throw new NotFoundException(errorMessage);
    }

    await user.updateOne({ role: ROLE.ADMIN });
    return {
      status: OperationStatus.SUCCESS,
      message: "User role updated successfully",
      data: {},
    };
  }

  async getMentors(
    getMentorsDto: GetMentorsDTO,
  ): Promise<HttpResponseType<PaginatedUserDocuments>> {
    const { page, perPage } = getMentorsDto;

    // Calculate how many documents to skip
    const skip = (page - 1) * perPage;

    // Use the MongoDB aggregation pipeline to fetch mentors with pagination
    const [result] = await this.userModel
      .aggregate([
        { $match: { role: "mentor" } },
        {
          $facet: {
            data: [
              { $skip: skip },
              { $limit: perPage },
              {
                $project: {
                  password: 0,
                  __v: 0,
                  updatedAt: 0,
                },
              },
            ],
            total: [{ $count: "count" }],
          },
        },
      ])
      .exec();

    // Return the paginated mentors as an HTTP response
    return {
      status: OperationStatus.SUCCESS,
      message: "",
      data: {
        docs: result.data,
        count: result.total[0]?.count || 0,
      },
    };
  }

  async getMentor(
    userIdDto: UserIdDTO,
  ): Promise<HttpResponseType<UserTaskResponse>> {
    // Extract the userId from the DTO
    const { userId } = userIdDto;

    // Find the user with the given userId and exclude the password and __v fields
    const user = await this.userModel.findById(userId).select("-password -__v");

    // If no user is found, throw a NotFoundException
    if (!user) {
      throw new NotFoundException(`User with ID '${userId}' not found`);
    }

    // Get the tasks associated with the mentor
    const tasks = await this.taskService.getTasksByMentorId(userIdDto);

    // Return the HTTP response with the user and tasks data
    return {
      status: OperationStatus.SUCCESS, // Set the status to SUCCESS
      message: "", // Set an empty message
      data: {
        user, // Set the user data
        tasks, // Set the tasks data
      },
    };
  }
}
