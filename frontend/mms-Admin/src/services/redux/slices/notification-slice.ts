import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState, useAppSelector } from "../Store";
import { Notification } from "../types/notification";
import {
  fetchNotificationsApiAsync,
  updateAllNotificationsApiAsync,
  updateNotificationItemApiAsync,
} from "../../axios/api-services/notifications";
import { NameDetails } from "../types/system-user";
import { selectCurrentUserNameSelector } from "./current-user-slice";

interface CurrentUserState {
  notification: Notification;
}

function getEmptyNotification(): Notification {
  return {
    userId: "",
    allNotificationsEmail: true,
    programsEmail: true,
    tasksEmail: false,
    approvalRequestsEmail: true,
    reportsEmail: false,
    commentsOnMyPostsEmail: true,
    postsEmail: true,
    commentsEmail: false,
    mentionsEmail: true,
    directMessagesEmail: false,
    allNotificationsInApp: true,
    programsInApp: false,
    tasksInApp: true,
    approvalRequestsInApp: true,
    reportsInApp: true,
    commentsOnMyPostsInApp: false,
    postsInApp: true,
    commentsInApp: false,
    mentionsInApp: true,
    directMessagesInApp: true,
  };
}

const initialState: CurrentUserState = {
  notification: getEmptyNotification(),
};

export const updateNotificationItem = createAsyncThunk(
  "current-notification/change-notification-item",
  async (notificationDetails: { key: string; value: boolean }, thunkAPI) => {
    return await updateNotificationItemApiAsync(notificationDetails);
  }
);

export const updateAllNotifications = createAsyncThunk(
  "current-notification/update-all-notifications",
  async (notificationDetails: Notification, thunkAPI) => {
    return await updateAllNotificationsApiAsync(notificationDetails);
  }
);

export const fetchNotifications = createAsyncThunk(
  "current-notification/fetch-all-notifications",
  async (thunkAPI) => {
    return await fetchNotificationsApiAsync(
      useAppSelector(selectCurrentUserNameSelector),
      getEmptyNotification()
    );
  }
);

export const NotificationSlice = createSlice({
  name: "current-notification",
  initialState,
  reducers: {
    updateAllNotificationsAction: (
      state,
      action: PayloadAction<Notification>
    ) => {
      state.notification = action.payload;
    },
    updateNotificationItemAction: (state, action: PayloadAction<any>) => {
      let obj: any = action.payload;
      obj = { ...obj, [action.payload.key]: action.payload.value };
      state.notification = obj;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateNotificationItem.fulfilled, (state, action) => {
      let obj: any = action.payload;
      obj = { ...obj, [action.payload.key]: action.payload.value };
      state.notification = obj;
      return state;
    });

    builder.addCase(updateAllNotifications.fulfilled, (state, action) => {
      state.notification = action.payload;
    });

    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.notification = action.payload;
    });
  },
});

const selectSelf = (state: RootState) => state.notification;

export const selectCurrentNotification = createSelector(
  [selectSelf],
  (notification): Notification => notification.notification
);

export const searchNotificationByKey = createSelector(
  [selectSelf, (selectSelf, searchText: string) => searchText],
  (selectSelf, search: string) => {
    return Object.entries(selectSelf.notification).filter((c) => c[1]);
  }
);

export default NotificationSlice.reducer;
export const { updateAllNotificationsAction, updateNotificationItemAction } =
  NotificationSlice.actions;
