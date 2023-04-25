import { IsString, IsOptional, IsEmail } from "class-validator";

export class LoginDTO {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;
}
