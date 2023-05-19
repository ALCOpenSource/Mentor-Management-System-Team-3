export interface IGeneralNotifications {
  enableAllNotifications: boolean;
  enableProgramsNotifications: boolean;
  enableTaskNotifcations: boolean;
  enableApprovalRequestNotifications: boolean;
  enableReportsNotifications: boolean;
}

export interface IDiscussionNotifications {
  enableCommentsOnMyPostsNotification: boolean;
  enablePostsNotifications: boolean;
  enableCommentsNotifications: boolean;
  enableMentionsNotifications: boolean;
  enableDirectMessageNotifications: boolean;
}

// This is the privacy interface to set whether to show the various contact info.
export interface IPrivacyPreferences {
  enableAllSocialLinksVisibility: boolean;
  enableGithubLinkVisibility: boolean;
  enableInstagramLinkVisibility: boolean;
  enableLinkedinLinkVisibility: boolean;
  enableTwitterLinkVisibility: boolean;
}
