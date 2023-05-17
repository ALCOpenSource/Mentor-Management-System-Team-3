import { IsNotEmpty, IsString } from "class-validator";
export class CreateChatDto {
  @IsNotEmpty()
  @IsString()
  userId1: string;

  @IsNotEmpty()
  @IsString()
  userId2: string;
}
