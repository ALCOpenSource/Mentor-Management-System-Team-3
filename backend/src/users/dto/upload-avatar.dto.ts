import { IsNotEmpty, IsString } from "class-validator";
import { Type } from "class-transformer";

export class UploadAvatarDTO {
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  avatar: string;
}
