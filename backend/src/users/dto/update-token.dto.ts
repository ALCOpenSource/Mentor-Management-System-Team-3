import { Type, Transform } from "class-transformer";
import { IsString, IsEmail, IsNotEmpty } from "class-validator";
import dayjs from "dayjs";

export class UpdateTokenDTO {
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  token: string;

  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => dayjs(value).toDate())
  tokenExpires: string;
}
