export interface NotifcationType {
  inApp: boolean;
  email: boolean;
}
export interface IGeneralNotifications {
  enableAllNotifications: NotifcationType;
  enableProgramsNotifications: NotifcationType;
  enableTaskNotifcations: NotifcationType;
  enableApprovalRequestNotifications: NotifcationType;
  enableReportsNotifications: NotifcationType;
}

export interface IDiscussionNotifications {
  enableCommentsOnMyPostsNotification: NotifcationType;
  enablePostsNotifications: NotifcationType;
  enableCommentsNotifications: NotifcationType;
  enableMentionsNotifications: NotifcationType;
  enableDirectMessageNotifications: NotifcationType;
}

// This is the privacy interface to set whether to show the various contact info.
export interface IPrivacyPreferences {
  enableShowContactInfo: boolean;
  enableGithubLinkVisibility: boolean;
  enableInstagramLinkVisibility: boolean;
  enableLinkedinLinkVisibility: boolean;
  enableTwitterLinkVisibility: boolean;
}
