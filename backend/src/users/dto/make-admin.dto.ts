import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class MakeAdminDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  makeAdmin: string;
}
