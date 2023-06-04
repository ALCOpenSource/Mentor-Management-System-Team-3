import { IsNotEmpty } from "class-validator";

export class NotificationsIdDto {
  @IsNotEmpty()
  id: string;
}
