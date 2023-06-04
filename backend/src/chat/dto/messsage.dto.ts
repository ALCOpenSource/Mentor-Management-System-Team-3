import { IsArray, IsNotEmpty, IsString } from "class-validator";
export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  chatId: string;

  @IsNotEmpty()
  @IsString()
  senderId: string;

  @IsNotEmpty()
  @IsString()
  receiverId: string;

  @IsString()
  text: string | Express.Multer.File;
}

export class MarkMessageAsDeliveredDto {
  @IsNotEmpty()
  @IsString()
  chatId: string;

  @IsNotEmpty()
  @IsString()
  messageId: string;
}

export class GetChatMessagesDto {
  @IsNotEmpty()
  @IsString()
  chatId: string;
}

export class TypingDto {
  @IsNotEmpty()
  @IsString()
  chatId: string;

  @IsNotEmpty()
  @IsString()
  senderId: string;

  @IsNotEmpty()
  @IsString()
  receiverId: string;
}

export class BroadCastMessage {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsArray()
  recipients: Array<string>;
}
