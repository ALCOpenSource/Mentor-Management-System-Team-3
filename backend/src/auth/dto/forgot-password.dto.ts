import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";

export class ForgotPasswordDTO {
  @Type(() => String)
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
