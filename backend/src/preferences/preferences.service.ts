import { Injectable, NotFoundException } from "@nestjs/common";
import { Preferences, PreferenceDocument } from "./preferences.schema";
import {
  GeneralNotificationsDto,
  DiscussionNotificationsDto,
  PrivacyPreferencesDto,
} from "./interfaces/preference.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/users/users.schema";

@Injectable()
export class PreferencesService {
  constructor(
    @InjectModel(Preferences.name)
    private readonly preferencesModel: Model<PreferenceDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async createPreferences(userId: string): Promise<PreferenceDocument> {
    const generalNotifications = new GeneralNotificationsDto();
    generalNotifications.enableAllNotifications = true;
    generalNotifications.enableProgramsNotifications = true;
    generalNotifications.enableTaskNotifcations = true;
    generalNotifications.enableApprovalRequestNotifications = true;
    generalNotifications.enableReportsNotifications = true;

    const discussionNotifications = new DiscussionNotificationsDto();
    discussionNotifications.enableCommentsOnMyPostsNotification = true;
    discussionNotifications.enablePostsNotifications = true;
    discussionNotifications.enableCommentsNotifications = true;
    discussionNotifications.enableMentionsNotifications = true;
    discussionNotifications.enableDirectMessageNotifications = true;

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

  async updateGeneralNotifications(
    userId: string,
    generalNotificationsDto: GeneralNotificationsDto,
  ): Promise<PreferenceDocument> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    const preferences = await this.preferencesModel
      .findOneAndUpdate(
        { createdBy: userId },
        { generalNotifications: generalNotificationsDto },
        { new: true },
      )
      .exec();
    return preferences;
  }

  async updateDiscussionNotifications(
    userId: string,
    discussionNotificationsDto: DiscussionNotificationsDto,
  ): Promise<PreferenceDocument> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    const preferences = await this.preferencesModel
      .findOneAndUpdate(
        { createdBy: userId },
        { discussionNotifications: discussionNotificationsDto },
        { new: true },
      )
      .exec();
    return preferences;
  }

  async updatePrivacyPreferences(
    userId: string,
    privacyPreferencesDto: PrivacyPreferencesDto,
  ): Promise<PreferenceDocument> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    const preferences = await this.preferencesModel
      .findOneAndUpdate(
        { createdBy: userId },
        { privacyPreferences: privacyPreferencesDto },
        { new: true },
      )
      .exec();
    return preferences;
  }
}
