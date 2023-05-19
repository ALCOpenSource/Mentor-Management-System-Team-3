import { MailerService } from "@nestjs-modules/mailer";
import { Injectable, Logger } from "@nestjs/common";

import { SupportDTO } from "./dto/support.dto";
import { OperationStatus } from "../filters/interface/response.interface";
import { HttpResponseType } from "../types/http-response.type";

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private mailerService: MailerService) {}

  // Function to send support email with attachment
  async sendSupportMail(
    supportDto: SupportDTO, // SupportDTO object containing user details
    attachment: Express.Multer.File, // Multer file object containing attachment
  ): Promise<HttpResponseType<object>> {
    // Returns HttpResponseType object
    const attachments = [];
    if (attachment) {
      // Check if attachment exists
      const attach = {
        // Create attachment object
        filename: attachment.originalname,
        content: attachment.buffer,
      };
      attachments.push(attach); // Add attachment to attachments array
    }
    this.logger.log("Sending email..."); // Log email sending
    await this.mailerService.sendMail({
      to: process.env.MAIL_SUPPORT, // Support email recipient
      from: `<${process.env.MAIL_USER}>`, // Override default email sender
      subject: "Support Request: " + supportDto.title, // Email subject line
      template: "./support", // Email template path
      context: {
        name: supportDto.name,
        email: supportDto.email,
        message: supportDto.body,
      }, // Email template context with user details
      attachments: attachments, // Email attachments array
    });

    this.logger.log("Email sent"); // Log email sent

    // Return success response object
    return {
      status: OperationStatus.SUCCESS,
      message: "Email sent successfully",
      data: {},
    };
  }

  // function to send notification email they have a new message
  async sendNotificationEmail(
    email: string, // Email address to send to
    message: string, // Message to send
  ): Promise<HttpResponseType<object>> {
    // Returns HttpResponseType object
    this.logger.log("Sending email..."); // Log email sending
    await this.mailerService.sendMail({
      to: email, // Support email recipient
      from: `<${process.env.MAIL_USER}>`, // Override default email sender
      subject: "You have a new message", // Email subject line
      template: "./notification", // Email template path
      context: {
        message: message,
      }, // Email template context with user details
    });

    this.logger.log("Email sent"); // Log email sent

    // Return success response object
    return {
      status: OperationStatus.SUCCESS,
      message: "Email sent successfully",
      data: {},
    };
  }
}
