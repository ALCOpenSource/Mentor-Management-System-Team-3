import { BadRequestException, Injectable, Logger } from "@nestjs/common";

import { OperationStatus } from "./../filters/interface/response.interface";
import { SignupDTO } from "./dto/signup.dto";
import { HttpResponseType } from "../types/http-response.type";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly usersService: UsersService) {}

  /**
   * This function implements the sign-up feature for a Firebase-based authentication system.
   * @param signupDto An object that contains the user's email, uid,name and optional avatar.
   * @returns An object containing a status, message, and data.
   */
  async signup(signupDto: SignupDTO): Promise<HttpResponseType> {
    const { uid, email, name, avatar } = signupDto;

    const userExists = await this.usersService.getUserByEmail(email);

    if (userExists) {
      this.logger.log("User already exist");
      throw new BadRequestException("User already exist");
    }

    // split the user name
    const nameSplitted = name.split(" ");

    this.usersService.createUser({
      uid,
      email,
      ...(nameSplitted[0] && { firstName: nameSplitted[0] }),
      ...(nameSplitted[1] && { lastName: nameSplitted[1] }),
      ...(avatar && { avatar: { url: avatar } }),
    });

    // Return a success response
    return {
      status: OperationStatus.SUCCESS,
      message: "Account created successfully",
      data: {},
    };
  }
}
