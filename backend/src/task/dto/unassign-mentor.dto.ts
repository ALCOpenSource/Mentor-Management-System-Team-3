import { IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { Type } from "class-transformer";

export class UnAssignMentorDTO {
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  taskId: string;

  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  mentorId: string;
}
