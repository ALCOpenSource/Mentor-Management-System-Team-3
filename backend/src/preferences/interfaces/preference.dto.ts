export class GeneralNotificationsDto {
  enableAllNotifications: boolean;
  enableProgramsNotifications: boolean;
  enableTaskNotifcations: boolean;
  enableApprovalRequestNotifications: boolean;
  enableReportsNotifications: boolean;
}

export class DiscussionNotificationsDto {
  enableCommentsOnMyPostsNotification: boolean;
  enablePostsNotifications: boolean;
  enableCommentsNotifications: boolean;
  enableMentionsNotifications: boolean;
  enableDirectMessageNotifications: boolean;
}

export class PrivacyPreferencesDto {
  enableAllSocialLinksVisibility: boolean;
  enableGithubLinkVisibility: boolean;
  enableInstagramLinkVisibility: boolean;
  enableLinkedinLinkVisibility: boolean;
  enableTwitterLinkVisibility: boolean;
}
