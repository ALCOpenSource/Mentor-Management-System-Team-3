import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsOptional,
  Matches,
} from "class-validator";

export class SignupDTO {
  @IsString()
  @IsNotEmpty()
  uid: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  avatar: string;
}

export class SignupWithEmailAndPasswordDTO {
  /**
   * User's email address
   * @example example@example.com
   */
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * User's password, must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.
   * @example MySecurePassword123!
   */
  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    },
  )
  password: string;
}
