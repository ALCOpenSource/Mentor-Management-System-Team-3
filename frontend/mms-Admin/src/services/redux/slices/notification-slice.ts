import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState, useAppSelector } from "../Store";
import {
  fetchNotificationsApiAsync,
  updateAllNotificationsApiAsync,
  updateNotificationItemApiAsync,
} from "../../axios/api-services/notifications";
import { selectCurrentUserToken } from "./current-user-slice";
import { Notification } from "../../../services/redux/types/notification";

interface CurrentNotificationState {
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

const initialState: CurrentNotificationState = {
  notification: getEmptyNotification(),
};

export const updateNotificationItem = createAsyncThunk(
  "current-notification/change-notification-item",
  async (
    notificationDetails: { key: string; value: boolean; obj: Notification },
    thunkAPI
  ) => {
    const state: any = thunkAPI.getState();
    return await updateNotificationItemApiAsync(
      notificationDetails,
      state.currentUser.currentUser.userToken
    );
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
      useAppSelector(selectCurrentUserToken)
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

    builder.addCase(updateNotificationItem.rejected, (state, action) => {
      throw action.error;
    });

    builder.addCase(updateAllNotifications.rejected, (state, action) => {
      throw action.error;
    });

    builder.addCase(fetchNotifications.rejected, (state, action) => {
      throw action.error;
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
