import { IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { Type } from "class-transformer";

export class TaskIdDto {
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  taskId: string;
}
