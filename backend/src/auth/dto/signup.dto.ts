import {
  IsString,
  IsStrongPassword,
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsOptional,
} from "class-validator";

export class SignupDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        "Password must have at least one lowercase letter, one uppercase letter, one digit, one special character (@$!%*?&), and a minimum length of 8 characters",
    },
  )
  password: string;
}

export class GoogleUserDto {
  googleAccessToken: string;
}
