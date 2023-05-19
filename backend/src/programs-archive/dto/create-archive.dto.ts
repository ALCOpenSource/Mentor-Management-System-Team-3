import { IsNotEmpty, IsDateString } from "class-validator";
import { Transform } from "class-transformer";

export class CreateProgramArchiveDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  programId: string;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value).toDateString())
  @IsDateString()
  completionDate: Date;
}
