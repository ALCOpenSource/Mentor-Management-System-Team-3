import { Type } from "class-transformer";
import {
  IsString,
  IsArray,
  IsNotEmpty,
  MaxLength,
  ArrayMaxSize,
} from "class-validator";

export class CreateTaskDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  title: string;

  @IsString()
  details: string;

  @IsArray()
  @Type(() => String)
  @ArrayMaxSize(10)
  mentorManagers: string[];

  @IsArray()
  @Type(() => String)
  @ArrayMaxSize(10)
  mentors: string[];
}
