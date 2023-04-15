import { IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { Type } from "class-transformer";

export class FindByProgramIdDto {
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  programId: string;
}
