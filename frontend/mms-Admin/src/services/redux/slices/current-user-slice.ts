import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  LoggedInUser,
  NameDetails,
  SystemUser,
  UsernamePassword,
} from "../types/system-user";
import { RootState } from "../Store";
import "./../../../assets/images/flag-icons-main/flags/4x3/ac.svg";
import {
  loginCurrentUserApiAsync,
  updateCurrentUserApiAsync,
  updateCurrentUserProfilePictureApiAsync,
} from "../../axios/api-services/current-user";

interface CurrentUserState {
  currentUser: LoggedInUser;
}

const getEmptyLoggedInUser = (): LoggedInUser => {
  return { user: {}, userToken: undefined, loginTime: undefined };
};

const initialState: CurrentUserState = {
  currentUser: getEmptyLoggedInUser(),
};

export const updateCurrentUser = createAsyncThunk(
  "current-user/update-user",
  async (userDetails: SystemUser, thunkAPI) => {
    return await updateCurrentUserApiAsync(userDetails);
  }
);

export const updateCurrentUserProfilePicture = createAsyncThunk(
  "current-user/update-user-profile-image",
  async (image: any, thunkAPI) => {
    return await updateCurrentUserProfilePictureApiAsync(image);
  }
);

export const loginCurrentUser = createAsyncThunk(
  "current-user/login",
  async (userDetails: UsernamePassword, thunkAPI) => {
    return await loginCurrentUserApiAsync(userDetails);
  }
);

export const CurrentUserSlice = createSlice({
  name: "current-user",
  initialState,
  reducers: {
    updateLoggedInCurrentUser: (state, action: PayloadAction<SystemUser>) => {
      let user = state?.currentUser;
      user.user = action.payload;
      user.loginTime = new Date().getTime();
      return state;
    },
    updateLoggedInUserCountryFlag: (state, action: PayloadAction<any>) => {
      let user = state?.currentUser;
      user.user.countryFlagIcon = action.payload;
      return state;
    },
    updateLoggedInUserProfilePicture: (state, action: PayloadAction<any>) => {
      let user = state?.currentUser;
      user.user.userImage = action.payload;
      return state;
    },
    updateLoggedInUserToken: (state, action: PayloadAction<any>) => {
      let user = state?.currentUser;
      user.userToken = action.payload;
      return state;
    },
    logoutCurrentUser: (state) => {
      state.currentUser = getEmptyLoggedInUser();
      return state;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loginCurrentUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.currentUser.loginTime = new Date().getTime();
    });

    builder.addCase(updateCurrentUser.fulfilled, (state, action) => {
      state.currentUser.user = action.payload;
    });

    builder.addCase(
      updateCurrentUserProfilePicture.fulfilled,
      (state, action) => {
        state.currentUser.user.userImage = action.payload;
        console.log("update image recieved mmmm", action.payload);
      }
    );
  },
});

const selectSelf = (state: RootState) => state.currentUser;
export const selectCurrentUser = createSelector(
  [selectSelf],
  (user): SystemUser => user.currentUser.user
);
export const selectCurrentUserProfilePicture = createSelector(
  [selectSelf],
  (user): any => user.currentUser.user.userImage
);
export const selectCurrentUserFlag = createSelector(
  [selectSelf],
  (user): any => user.currentUser.user.countryFlagIcon
);
export const selectCurrentUserNameSelector = createSelector(
  [selectSelf],
  (user): NameDetails => {
    var person = user.currentUser.user;
    return {
      userId: person.userId,
      email: person.email,
      fullName: `{${person.firstNames} ${person.lastName}}`,
    };
  }
);

export default CurrentUserSlice.reducer;
export const { updateLoggedInCurrentUser } = CurrentUserSlice.actions;
