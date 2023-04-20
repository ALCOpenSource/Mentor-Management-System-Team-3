import { Type } from "class-transformer";
import { IsString, IsArray, IsNotEmpty } from "class-validator";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
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
