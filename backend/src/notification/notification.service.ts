import { Injectable } from "@nestjs/common";
import {
  InAppNofications,
  InAppNotificationDocument,
} from "./notificaion.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { HttpResponseType } from "src/types/http-response.type";
import { OperationStatus } from "src/filters/interface/response.interface";
// mail service

export interface INotification {
  senderId: string;
  receiverId: string;
  type: string;
  read: string;
}
@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(InAppNofications.name)
    private inAppNotification: Model<InAppNotificationDocument>,
  ) {}
  //   async create notifications

  async sendNotification(
    data: INotification,
  ): Promise<InAppNotificationDocument | object> {
    const notifcation = await this.inAppNotification.create(data);
    return notifcation.populate;
  }
  //   getNotifcations
  async getNofications(
    userId: string,
  ): Promise<HttpResponseType<InAppNotificationDocument | object>> {
    console.log(userId);
    const notifcations = await this.inAppNotification.find({
      receiverId: userId,
    });
    return {
      status: OperationStatus.SUCCESS,
      message: "Notifications fetched successfully",
      data: notifcations,
    };
  }
  //   mark notifications as read
  async markNotificationsAsRead(
    id: string,
  ): Promise<HttpResponseType<InAppNotificationDocument>> {
    console.log(id);
    throw new Error("Not implemented yet");
  }
  //   update many
  async updateAllNotificationsAsRead(
    data: string[],
  ): Promise<HttpResponseType<InAppNotificationDocument | object>> {
    const updates = await this.inAppNotification.updateMany(
      { id: { $in: data } },
      { $set: { read: true } },
    );
    return {
      status: OperationStatus.SUCCESS,
      message: "updated all",
      data: updates,
    };
  }
}
