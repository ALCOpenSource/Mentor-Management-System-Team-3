import { IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { Type } from "class-transformer";

export class TaskIdDTO {
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  taskId: string;
}
