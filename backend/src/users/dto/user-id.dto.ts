import { IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { Type } from "class-transformer";

export class UserIdDTO {
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  userId: string;
}
