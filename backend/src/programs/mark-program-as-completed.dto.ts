import { IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { Type } from "class-transformer";

export class MarkProgramAsCompletedDTO {
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  programId: string;
}
