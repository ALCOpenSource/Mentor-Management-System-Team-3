import { Injectable, NotFoundException } from "@nestjs/common";
import { Logger } from "@nestjs/common/services";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Preferences, PreferenceDocument } from "./preferences.schema";
import {
  GeneralNotificationsDto,
  DiscussionNotificationsDto,
  PrivacyPreferencesDto,
} from "./dto/preference.dto";
import { User, UserDocument } from "../users/users.schema";
import { HttpResponseType } from "../types/http-response.type";
import { OperationStatus } from "../filters/interface/response.interface";

@Injectable()
export class PreferencesService {
  private readonly logger = new Logger(PreferencesService.name);

  constructor(
    @InjectModel(Preferences.name)
    private readonly preferencesModel: Model<PreferenceDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}
  // creates a new preferences document for a user. This marks all the preferences as true.
  async createPreferences(userId: string): Promise<PreferenceDocument> {
    this.logger.log("Creating preferences for user");
    const preference = await this.preferencesModel.create({
      createdBy: userId,
    });
    return preference.save();
  }
  // checks if the user exists
  async getUserByUId(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      const errorMessage = "User not found";
      this.logger.error({
        status: OperationStatus.ERROR,
        message: errorMessage,
        data: {},
      });
      throw new NotFoundException(errorMessage);
    }
  }

  // updates the user's general preferences
  async updateGeneralNotifications(
    userId: string,
    generalNotificationsDto: GeneralNotificationsDto,
  ): Promise<HttpResponseType<PreferenceDocument | object>> {
    this.getUserByUId(userId);
    const data = await this.preferencesModel
      .findOneAndUpdate(
        { createdBy: userId },
        { generalNotifications: generalNotificationsDto },
        { new: true },
      )
      .exec();

    return {
      status: OperationStatus.SUCCESS,
      message: "General notifications updated successfully",
      data: data.generalNotifications,
    };
  }

  // patches the user's discussion preferences
  async updateDiscussionNotifications(
    userId: string,
    discussionNotificationsDto: DiscussionNotificationsDto,
  ): Promise<HttpResponseType<PreferenceDocument | object>> {
    this.getUserByUId(userId);
    const data = await this.preferencesModel
      .findOneAndUpdate(
        { createdBy: userId },
        { discussionNotifications: discussionNotificationsDto },
        { new: true },
      )
      .exec();
    return {
      status: OperationStatus.SUCCESS,
      message: "Discussion notifications updated successfully",
      data: data.discussionNotifications,
    };
  }
  // patches the user's privacy preferences
  async updatePrivacyPreferences(
    userId: string,
    privacyPreferencesDto: PrivacyPreferencesDto,
  ): Promise<HttpResponseType<PreferenceDocument | object>> {
    this.getUserByUId(userId);

    const privacy = await this.preferencesModel
      .findOneAndUpdate(
        { createdBy: userId },
        { privacyPreferences: privacyPreferencesDto },
        { new: true },
      )
      .exec();
    return {
      status: OperationStatus.SUCCESS,
      message: "Privacy preferences updated successfully",
      data: privacy.privacyPreferences,
    };
  }
  // Gets the user's preferences

  async getPreferencesByUid(
    userId: string,
  ): Promise<HttpResponseType<PreferenceDocument[]>> {
    this.getUserByUId(userId);
    const preferences = await this.preferencesModel
      .find({ createdBy: userId })
      .exec();
    return {
      status: OperationStatus.SUCCESS,
      message: "Preferences fetched successfully",
      data: preferences,
    };
  }
  // get privacy notificatiom
  async getPrivacyPreferencesByUid(
    userId: string,
  ): Promise<HttpResponseType<PrivacyPreferencesDto>> {
    this.getUserByUId(userId);
    const privacy = await this.preferencesModel
      .findOne({ createdBy: userId })
      .select("privacyPreferences")
      .exec();
    return {
      status: OperationStatus.SUCCESS,
      message: "Privacy preferences fetched successfully",
      data: privacy.privacyPreferences,
    };
  }

  async getGeneralNotificationsByUid(
    userId: string,
  ): Promise<HttpResponseType<GeneralNotificationsDto>> {
    this.getUserByUId(userId);
    const general = await this.preferencesModel
      .findOne({ createdBy: userId })
      .select("generalNotifications")
      .exec();
    return {
      status: OperationStatus.SUCCESS,
      message: "General notifications fetched successfully",
      data: general.generalNotifications,
    };
  }

  async getDiscussionNotificationsByUid(
    userId: string,
  ): Promise<HttpResponseType<DiscussionNotificationsDto>> {
    this.getUserByUId(userId);
    const discussion = await this.preferencesModel
      .findOne({ createdBy: userId })
      .select("discussionNotifications")
      .exec();
    return {
      status: OperationStatus.SUCCESS,
      message: "Discussion notifications fetched successfully",
      data: discussion.discussionNotifications,
    };
  }
}
