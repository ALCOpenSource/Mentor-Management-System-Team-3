import { IsString, IsOptional, IsEmail, IsNotEmpty } from "class-validator";

export class LoginDTO {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;
}

export class GoogleLoginDTO {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  profilePicture: string;

  @IsString()
  @IsNotEmpty()
  displayName: string;
}
