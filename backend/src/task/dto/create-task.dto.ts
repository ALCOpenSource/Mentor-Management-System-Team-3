import { Type } from "class-transformer";
import { IsString, IsArray, IsNotEmpty, MaxLength } from "class-validator";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  title: string;

  @IsString()
  @IsNotEmpty()
  details: string;

  @IsArray()
  @Type(() => String)
  mentorManagers: string[];

  @IsArray()
  @Type(() => String)
  mentors: string[];
}
