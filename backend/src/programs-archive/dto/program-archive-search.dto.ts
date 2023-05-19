import { IsString, IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class ProgramsArchiveSearchDto {
  @IsNumber()
  @Type(() => Number)
  page = 1;

  @IsNumber()
  @Type(() => Number)
  perPage = 10;

  @IsString()
  @Type(() => String)
  search = "";
}
