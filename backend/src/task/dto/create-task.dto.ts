import { Type } from "class-transformer";
import { IsString, IsArray, IsNotEmpty, MaxLength } from "class-validator";

export class CreateTaskDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  title: string;

  @IsString()
  details: string;

  @IsArray()
  @Type(() => String)
  mentorManagers: string[];

  @IsArray()
  @Type(() => String)
  mentors: string[];
}
