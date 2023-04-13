import { MailerService } from "@nestjs-modules/mailer";
import { Injectable, Logger } from "@nestjs/common";

import { SupportDTO } from "./dto/support.dto";
import { OperationStatus } from "../filters/interface/response.interface";
import { HttpResponseType } from "../types/http-response.type";

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private mailerService: MailerService) {}

  async sendSupportMail(
    supportDto: SupportDTO,
    attachment: Express.Multer.File,
  ): Promise<HttpResponseType> {
    const attachments = [];
    if (attachment) {
      const attach = {
        filename: attachment.originalname,
        content: attachment.buffer,
      };
      attachments.push(attach);
    }
    this.logger.log("Sending email...");
    await this.mailerService.sendMail({
      to: process.env.MAIL_SUPPORT,
      from: `<${process.env.MAIL_USER}>`, // override default from
      subject: "Support Request: " + supportDto.title,
      template: "./support",
      context: {
        name: supportDto.name,
        email: supportDto.email,
        message: supportDto.body,
      },
      attachments: attachments,
    });

    this.logger.log("Email sent");

    return {
      status: OperationStatus.SUCCESS,
      message: "Email sent successfully",
      data: {},
    };
  }
}
