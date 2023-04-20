import { IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateTaskDTO {
  @IsOptional()
  @IsString()
  @MaxLength(32)
  title?: string;

  @IsOptional()
  @IsString()
  details?: string;

  @IsOptional()
  mentorManagers?: string[];

  @IsOptional()
  mentors?: string[];
}
