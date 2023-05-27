import { Controller, Get, Req, Body, Post } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { HttpResponseType } from "src/types/http-response.type";
import { InAppNotificationDocument } from "./notificaion.schema";

@Controller("notification")
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}
  @Get("all")
  async getAllNotifications(
    @Req() req,
  ): Promise<HttpResponseType<InAppNotificationDocument | object>> {
    return this.notificationService.getNofications(req.user.sub);
  }
  @Post("mark-all-read")
  async markAllAsRead(
    @Body() data: string[],
  ): Promise<HttpResponseType<InAppNotificationDocument | object>> {
    return this.notificationService.updateAllNotificationsAsRead(data);
  }
}
