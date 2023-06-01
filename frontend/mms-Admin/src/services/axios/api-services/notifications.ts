import { Notification } from "../../../services/redux/types/notification";
import axiosWithBearer from "../axios-services";

export const updateNotificationItemApiAsync = async (notificationDetails: {
  key: string;
  value: boolean;
  obj: Notification;
}) => {
const generalKeys = [];




  const value = {
    enableAllSocialLinksVisibility: privacyDetails.obj.showContactInfo ?? false,
    enableGithubLinkVisibility: privacyDetails.obj.showGitHub ?? false,
    enableInstagramLinkVisibility: privacyDetails.obj.showInstagram ?? false,
    enableLinkedinLinkVisibility: privacyDetails.obj.showLinkedin ?? false,
    enableTwitterLinkVisibility: privacyDetails.obj.showTwitter ?? false,
  };

  const updatePrivacy = await axiosWithBearer(token ?? "")
    .patch("/preferences/privacy", value)
    .then((data) => {      
      return privacyDetails;
    })
    .catch((err) => {
      throw err?.response?.data?.message ?? err;
    });
  return updatePrivacy;

  return notificationDetails;
};

export const updateAllNotificationsApiAsync = async (
  notificationDetails: Notification
) => {
  //update api call
  console.log("update notificationDetails mmmm", notificationDetails);
  //todo

  return notificationDetails;
};

export interface DiscussionNotification {
  enableCommentsOnMyPostsNotification: {
    inApp: boolean,
    email: boolean
  },
  enablePostsNotifications: {
    inApp: boolean,
    email: boolean
  },
  enableCommentsNotifications: {
    inApp: boolean,
    email: boolean
  },
  enableMentionsNotifications: {
    inApp: boolean,
    email: boolean
  },
  enableDirectMessageNotifications: {
    inApp: boolean,
    email: boolean
  },
}

export const fetchNotificationsApiAsync = async (
  token: string
) => {
  // const discussion = axiosWithBearer(token ?? "")
  //   .get("/preferences/discussion")
  //   .then((data) => {
  //     const obj: any = data.data;
  //     console.log(data);
  //     return data.data;

  //     // const ans: DiscussionNotification = {
  //     //   enableCommentsOnMyPostsNotification: obj.enableCommentsOnMyPostsNotification,
  //     //   enablePostsNotifications: obj.enablePostsNotifications,
  //     //   enableCommentsNotifications: obj.enableCommentsNotifications,
  //     //   enableMentionsNotifications: obj.enableMentionsNotifications,
  //     //   enableDirectMessageNotifications: obj.enableDirectMessageNotifications
  //     // };
  //   });

  return axiosWithBearer(token ?? "")
    .get("/preferences/general")
    .then((data) => {
      const obj: any = data.data;
      console.log(data);
      const { generalNotifications, discussionNotifications } = data.data;

      const notification: Notification = {
        allNotificationsEmail:
          data?.data?.discussionNotifications
            ?.enableCommentsOnMyPostsNotification?.email ?? false,
        programsEmail:
          data?.data?.generalnotifications?.enableProgramsNotifications
            ?.email ?? false,
        tasksEmail:
          data?.data?.generalnotifications?.enableTaskNotifcations?.email ??
          false,
        approvalRequestsEmail:
          data?.data?.generalnotifications?.enableApprovalRequestNotifications
            ?.email ?? false,
        reportsEmail:
          data?.data?.generalnotifications?.enableReportsNotifications?.email ??
          false,
        commentsOnMyPostsEmail:
          data?.data?.discussionNotifications
            ?.enableCommentsOnMyPostsNotification?.email ?? false,
        postsEmail:
          data?.data?.discussionNotifications?.enablePostsNotifications
            ?.email ?? false,
        commentsEmail:
          data?.data?.discussionNotifications?.enableCommentsNotifications
            ?.email ?? false,
        mentionsEmail:
          data?.data?.discussionNotifications?.enableMentionsNotifications
            ?.email ?? false,
        directMessagesEmail:
          data?.data?.discussionNotifications?.enableDirectMessageNotifications
            ?.email ?? false,
        allNotificationsInApp:
          data?.data?.discussionNotifications
            ?.enableCommentsOnMyPostsNotification?.inApp ?? false,
        programsInApp:
          data?.data?.generalnotifications?.enableProgramsNotifications
            ?.inApp ?? false,
        tasksInApp:
          data?.data?.generalnotifications?.enableTaskNotifcations?.inApp ??
          false,
        approvalRequestsInApp:
          data?.data?.generalnotifications?.enableApprovalRequestNotifications
            ?.inApp ?? false,
        reportsInApp:
          data?.data?.generalnotifications?.enableReportsNotifications?.inApp ??
          false,
        commentsOnMyPostsInApp:
          data?.data?.discussionNotifications
            ?.enableCommentsOnMyPostsNotification?.inApp ?? false,
        postsInApp:
          data?.data?.discussionNotifications?.enablePostsNotifications
            ?.inApp ?? false,
        commentsInApp:
          data?.data?.discussionNotifications?.enableCommentsNotifications
            ?.inApp ?? false,
        mentionsInApp:
          data?.data?.discussionNotifications?.enableMentionsNotifications
            ?.inApp ?? false,
        directMessagesInApp:
          data?.data?.discussionNotifications?.enableDirectMessageNotifications
            ?.inApp ?? false,
      };
      console.log(notification);
      return notification;
    });
}
