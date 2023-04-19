import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { MailService } from "./mail.service";
import { SupportDTO } from "./dto/support.dto";
import { HttpResponseType } from "../types/http-response.type";
import { FirebaseAuthGuard } from "../firebase/guards/firebase.guard";

@Controller("mail")
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post("support")
  @UseGuards(FirebaseAuthGuard)
  // Use the FileInterceptor to intercept and handle the file upload
  @UseInterceptors(FileInterceptor("attachment"))
  async sendSupportMail(
    // Use the UploadedFile decorator to get the uploaded file
    @UploadedFile() attachment: Express.Multer.File,
    // Use the Body decorator to get the request body
    @Body() supportDto: SupportDTO,
  ): Promise<HttpResponseType<object>> {
    try {
      // Call the sendSupportMail method of the mailService, passing in the support DTO and attachment
      return await this.mailService.sendSupportMail(supportDto, attachment);
    } catch (error) {
      return error;
    }
  }
}
