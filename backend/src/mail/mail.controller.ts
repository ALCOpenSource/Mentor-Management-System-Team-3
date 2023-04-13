import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { MailService } from "./mail.service";
import { SupportDTO } from "./dto/support.dto";
import { HttpResponseType } from "../types/http-response.type";

@Controller("mail")
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post("support")
  @UseInterceptors(FileInterceptor("attachment"))
  async sendSupportMail(
    @UploadedFile() attachment: Express.Multer.File,
    @Body() supportDto: SupportDTO,
  ): Promise<HttpResponseType> {
    try {
      return await this.mailService.sendSupportMail(supportDto, attachment);
    } catch (error) {
      return error;
    }
  }
}
