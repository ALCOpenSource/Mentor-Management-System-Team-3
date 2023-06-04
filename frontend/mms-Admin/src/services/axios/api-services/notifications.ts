import { Notification } from "../../../services/redux/types/notification";
import axiosWithBearer from "../axios-services";

export const updateNotificationItemApiAsync = async (
  notificationDetails: {
    key: string;
    value: boolean;
    obj: Notification;
  },
  token: string
) => {
  const generalKeys = [
    "directMessagesInApp",
    "directMessagesEmail",
    "mentionsInApp",
    "mentionsEmail",
    "commentsInApp",
    "commentsEmail",
    "postsInApp",
    "postsEmail",
    "commentsOnMyPostsInApp",
    "commentsOnMyPostsEmail",
  ];

  if (generalKeys.includes(notificationDetails.key))
    return updateDiscussionNotification(notificationDetails, token);
  else return updateGeneralNotification(notificationDetails, token);
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
    inApp: boolean;
    email: boolean;
  };
  enablePostsNotifications: {
    inApp: boolean;
    email: boolean;
  };
  enableCommentsNotifications: {
    inApp: boolean;
    email: boolean;
  };
  enableMentionsNotifications: {
    inApp: boolean;
    email: boolean;
  };
  enableDirectMessageNotifications: {
    inApp: boolean;
    email: boolean;
  };
}

export const fetchNotificationsApiAsync = async (token: string) => {
  return axiosWithBearer(token ?? "")
    .get("/preferences/general")
    .then((data) => {
      const general = data.data.generalNotifications;
      const discussion = data.data.discussionNotifications;

      const notification: Notification = {
        allNotificationsEmail:
          discussion?.enableCommentsOnMyPostsNotification?.email ?? false,
        programsEmail: general?.enableProgramsNotifications?.email ?? false,
        tasksEmail: general?.enableTaskNotifcations?.email ?? false,
        approvalRequestsEmail:
          general?.enableApprovalRequestNotifications?.email ?? false,
        reportsEmail: general?.enableReportsNotifications?.email ?? false,
        commentsOnMyPostsEmail:
          discussion?.enableCommentsOnMyPostsNotification?.email ?? false,
        postsEmail: discussion?.enablePostsNotifications?.email ?? false,
        commentsEmail: discussion?.enableCommentsNotifications?.email ?? false,
        mentionsEmail: discussion?.enableMentionsNotifications?.email ?? false,
        directMessagesEmail:
          discussion?.enableDirectMessageNotifications?.email ?? false,
        allNotificationsInApp:
          discussion?.enableCommentsOnMyPostsNotification?.inApp ?? false,
        programsInApp: general?.enableProgramsNotifications?.inApp ?? false,
        tasksInApp: general?.enableTaskNotifcations?.inApp ?? false,
        approvalRequestsInApp:
          general?.enableApprovalRequestNotifications?.inApp ?? false,
        reportsInApp: general?.enableReportsNotifications?.inApp ?? false,
        commentsOnMyPostsInApp:
          discussion?.enableCommentsOnMyPostsNotification?.inApp ?? false,
        postsInApp: discussion?.enablePostsNotifications?.inApp ?? false,
        commentsInApp: discussion?.enableCommentsNotifications?.inApp ?? false,
        mentionsInApp: discussion?.enableMentionsNotifications?.inApp ?? false,
        directMessagesInApp:
          discussion?.enableDirectMessageNotifications?.inApp ?? false,
      };
      //console.log(notification);
      return notification;
    });
};

async function updateDiscussionNotification(
  notification: {
    key: string;
    value: boolean;
    obj: Notification;
  },
  token: string
) {
  const value = {
    enableDirectMessageNotifications: {
      email: notification.obj.directMessagesEmail,
      inApp: notification.obj.directMessagesInApp,
    },
    enableMentionsNotifications: {
      email: notification.obj.mentionsEmail,
      inApp: notification.obj.mentionsInApp,
    },
    enableCommentsNotifications: {
      email: notification.obj.commentsEmail,
      inApp: notification.obj.commentsInApp,
    },
    enablePostsNotifications: {
      email: notification.obj.postsEmail,
      inApp: notification.obj.postsInApp,
    },
    enableCommentsOnMyPostsNotification: {
      email: notification.obj.commentsOnMyPostsEmail,
      inApp: notification.obj.commentsOnMyPostsInApp,
    },
  };

  const updateDiscussion = await axiosWithBearer(token ?? "")
    .patch("/preferences/discussion", value)
    .then((data) => {
      return notification;
    })
    .catch((err) => {
      throw err?.response?.data?.message ?? err;
    });
  return updateDiscussion;
}

async function updateGeneralNotification(
  notification: {
    key: string;
    value: boolean;
    obj: Notification;
  },
  token: string
) {
  const value = {
    enableAllNotifications: {
      email: notification.obj.allNotificationsEmail,
      inApp: notification.obj.allNotificationsInApp,
    },
    enableReportsNotifications: {
      email: notification.obj.reportsEmail,
      inApp: notification.obj.reportsInApp,
    },
    enableProgramsNotifications: {
      email: notification.obj.programsEmail,
      inApp: notification.obj.programsInApp,
    },
    enableTaskNotifcations: {
      email: notification.obj.tasksEmail,
      inApp: notification.obj.tasksInApp,
    },
    enableApprovalRequestNotifications: {
      email: notification.obj.approvalRequestsEmail,
      inApp: notification.obj.approvalRequestsInApp,
    },
  };

  const updateGeneral = await axiosWithBearer(token ?? "")
    .patch("/preferences/general", value)
    .then((data) => {
      return notification;
    })
    .catch((err) => {
      throw err?.response?.data?.message ?? err;
    });
  return updateGeneral;
}
