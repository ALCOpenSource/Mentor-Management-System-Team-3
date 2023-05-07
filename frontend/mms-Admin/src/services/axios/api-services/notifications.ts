import { Notification } from "../../../services/redux/types/notification";
import { NameDetails } from "../../redux/types/system-user";

export const updateNotificationItemApiAsync = async (notificationDetails: {
  key: string;
  value: boolean;
}) => {
  //update api call
  console.log("changed password", notificationDetails);
  //todo

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

export const fetchNotificationsApiAsync = async (
  userDetails: NameDetails,
  notificationDetails: Notification
) => {
  //update api call
  //console.log("update notificationDetails mmmm", notificationDetails);
  //todo

  return notificationDetails;
};
