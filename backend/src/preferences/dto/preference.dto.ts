import { IsNotEmpty, IsBoolean } from "class-validator";
import { IDiscussionNotifications } from "../interfaces/preference.interface";
import { IPrivacyPreferences } from "../interfaces/preference.interface";
import { IGeneralNotifications } from "../interfaces/preference.interface";
export class GeneralNotificationsDto implements IGeneralNotifications {
  @IsNotEmpty()
  @IsBoolean()
  enableAllNotifications: boolean;

  @IsNotEmpty()
  @IsBoolean()
  enableProgramsNotifications: boolean;

  @IsNotEmpty()
  @IsBoolean()
  enableTaskNotifcations: boolean;

  @IsNotEmpty()
  @IsBoolean()
  enableApprovalRequestNotifications: boolean;

  @IsNotEmpty()
  @IsBoolean()
  enableReportsNotifications: boolean;
}

export class DiscussionNotificationsDto implements IDiscussionNotifications {
  @IsNotEmpty()
  @IsBoolean()
  enableCommentsOnMyPostsNotification: boolean;

  @IsNotEmpty()
  @IsBoolean()
  enablePostsNotifications: boolean;

  @IsNotEmpty()
  @IsBoolean()
  enableCommentsNotifications: boolean;

  @IsNotEmpty()
  @IsBoolean()
  enableMentionsNotifications: boolean;

  @IsNotEmpty()
  @IsBoolean()
  enableDirectMessageNotifications: boolean;
}

export class PrivacyPreferencesDto implements IPrivacyPreferences {
  @IsNotEmpty()
  @IsBoolean()
  enableAllSocialLinksVisibility: boolean;

  @IsNotEmpty()
  @IsBoolean()
  enableGithubLinkVisibility: boolean;

  @IsNotEmpty()
  @IsBoolean()
  enableInstagramLinkVisibility: boolean;

  @IsNotEmpty()
  @IsBoolean()
  enableLinkedinLinkVisibility: boolean;

  @IsNotEmpty()
  @IsBoolean()
  enableTwitterLinkVisibility: boolean;
}
