import { IsString, IsEmail, IsNotEmpty } from "class-validator";

export class SignupWithGoogleDTO {
  /**
   * User's email address
   * @example example@example.com
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  avatar: string;
}
