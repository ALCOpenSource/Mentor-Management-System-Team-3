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
    const generalNotifications = new GeneralNotificationsDto();
    generalNotifications.enableAllNotifications = {
      inApp: false,
      email: false,
    };
    generalNotifications.enableProgramsNotifications = {
      inApp: false,
      email: false,
    };
    generalNotifications.enableTaskNotifcations = {
      inApp: false,
      email: false,
    };
    generalNotifications.enableApprovalRequestNotifications = {
      inApp: false,
      email: false,
    };
    generalNotifications.enableReportsNotifications = {
      inApp: false,
      email: false,
    };

    const discussionNotifications = new DiscussionNotificationsDto();
    discussionNotifications.enableCommentsOnMyPostsNotification = {
      inApp: false,
      email: false,
    };
    discussionNotifications.enablePostsNotifications = {
      inApp: false,
      email: false,
    };
    discussionNotifications.enableCommentsNotifications = {
      inApp: false,
      email: false,
    };
    discussionNotifications.enableMentionsNotifications = {
      inApp: false,
      email: false,
    };
    discussionNotifications.enableDirectMessageNotifications = {
      inApp: false,
      email: false,
    };

    const privacyPreferences = new PrivacyPreferencesDto();
    privacyPreferences.enableAllSocialLinksVisibility = true;
    privacyPreferences.enableGithubLinkVisibility = true;
    privacyPreferences.enableInstagramLinkVisibility = true;
    privacyPreferences.enableLinkedinLinkVisibility = true;
    privacyPreferences.enableTwitterLinkVisibility = true;

    const preference = new this.preferencesModel({
      createdBy: userId,
      generalNotifications,
      discussionNotifications,
      privacyPreferences,
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
    await this.preferencesModel
      .findOneAndUpdate(
        { createdBy: userId },
        { generalNotifications: generalNotificationsDto },
        { new: true },
      )
      .exec();

    return {
      status: OperationStatus.SUCCESS,
      message: "General notifications updated successfully",
      data: {},
    };
  }

  // patches the user's discussion preferences
  async updateDiscussionNotifications(
    userId: string,
    discussionNotificationsDto: DiscussionNotificationsDto,
  ): Promise<HttpResponseType<PreferenceDocument | object>> {
    this.getUserByUId(userId);
    await this.preferencesModel
      .findOneAndUpdate(
        { createdBy: userId },
        { discussionNotifications: discussionNotificationsDto },
        { new: true },
      )
      .exec();
    return {
      status: OperationStatus.SUCCESS,
      message: "Discussion notifications updated successfully",
      data: {},
    };
  }
  // patches the user's privacy preferences
  async updatePrivacyPreferences(
    userId: string,
    privacyPreferencesDto: PrivacyPreferencesDto,
  ): Promise<HttpResponseType<PreferenceDocument>> {
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
      data: privacy,
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
}
