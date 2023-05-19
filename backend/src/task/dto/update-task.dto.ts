import { Type } from "class-transformer";
import {
  ArrayMaxSize,
  IsArray,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

export class UpdateTaskDTO {
  @IsOptional()
  @IsString()
  @MaxLength(32)
  title?: string;

  @IsOptional()
  @IsString()
  details?: string;

  @IsArray()
  @Type(() => String)
  @IsOptional()
  @ArrayMaxSize(10)
  mentorManagers?: string[];

  @IsArray()
  @Type(() => String)
  @IsOptional()
  @ArrayMaxSize(10)
  mentors?: string[];
}
