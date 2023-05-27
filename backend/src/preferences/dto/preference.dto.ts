import { IsNotEmpty, IsBoolean } from "class-validator";
import { IDiscussionNotifications } from "../interfaces/preference.interface";
import { IPrivacyPreferences } from "../interfaces/preference.interface";
import { IGeneralNotifications } from "../interfaces/preference.interface";
import { NotifcationType } from "../interfaces/preference.interface";
export class GeneralNotificationsDto implements IGeneralNotifications {
  @IsNotEmpty()
  enableAllNotifications: NotifcationType;

  @IsNotEmpty()
  enableProgramsNotifications: NotifcationType;

  @IsNotEmpty()
  enableTaskNotifcations: NotifcationType;

  @IsNotEmpty()
  enableApprovalRequestNotifications: NotifcationType;

  @IsNotEmpty()
  enableReportsNotifications: NotifcationType;
}

export class DiscussionNotificationsDto implements IDiscussionNotifications {
  @IsNotEmpty()
  enableCommentsOnMyPostsNotification: NotifcationType;

  @IsNotEmpty()
  enablePostsNotifications: NotifcationType;

  @IsNotEmpty()
  enableCommentsNotifications: NotifcationType;

  @IsNotEmpty()
  enableMentionsNotifications: NotifcationType;

  @IsNotEmpty()
  enableDirectMessageNotifications: NotifcationType;
}

export class PrivacyPreferencesDto implements IPrivacyPreferences {
  @IsNotEmpty()
  @IsBoolean()
  enableShowContactInfo: boolean;

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
