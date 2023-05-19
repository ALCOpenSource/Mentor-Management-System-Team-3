import { IsNumber, Min } from "class-validator";
import { Type } from "class-transformer";

export class FindByUserIdDTO {
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page: number;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  perPage: number;
}
