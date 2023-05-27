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
import { persistor, RootState } from "../Store";
import "./../../../assets/images/flag-icons-main/flags/4x3/ac.svg";
import {
  fetchPreferencesApiAsync,
  loginCurrentUserApiAsync,
  loginCurrentUserWIthGoogleApiAsync,
  logoutCurrentUserApiAsync,
  updateCurrentUserApiAsync,
  updateCurrentUserProfilePictureApiAsync,
} from "../../axios/api-services/current-user";
import { Privacy } from "../types/privacy";
import { Notification } from "../../redux/types/notification";

interface CurrentUserState {
  currentUser: LoggedInUser;
  privacy?: Privacy;
  notification?: Notification;
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
    const state: any = thunkAPI.getState();
    return await updateCurrentUserApiAsync(
      userDetails,
      state.currentUser.currentUser.userToken
    );
  }
);

export const updateCurrentUserProfilePicture = createAsyncThunk(
  "current-user/update-user-profile-image",
  async (image: any, thunkAPI) => {
    const state:any = thunkAPI.getState();  
    return await updateCurrentUserProfilePictureApiAsync(image, state.currentUser.currentUser.userToken);
  }
);

export const fetchCurrentUserPreferences = createAsyncThunk(
  "current-user/update-user-preferences",
  async (image: any, thunkAPI) => {
    const state:any = thunkAPI.getState();  
    return await fetchPreferencesApiAsync(state.currentUser.currentUser.userToken);
  }
);

export const loginCurrentUser = createAsyncThunk(
  "current-user/login",
  async (userDetails: UsernamePassword, thunkAPI) => {
    return await loginCurrentUserApiAsync(userDetails, thunkAPI.dispatch);
  }
);

export const loginCurrentUserWithGoogle = createAsyncThunk(
  "current-user/google-login",
  async (userDetails: {
    email: string;
    displayName: string;
    profilePicture: string
  }, thunkAPI) => {
    return await loginCurrentUserWIthGoogleApiAsync(userDetails, thunkAPI.dispatch);
  }
);

export const logoutCurrentUser = createAsyncThunk(
  "current-user/logout",
  async (thunkAPI) => {
    await logoutCurrentUserApiAsync();
    return persistor.purge();
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
    // logoutCurrentUser: (state) => {
    //   state.currentUser = getEmptyLoggedInUser();
    //   return state;
    // },
  },

  extraReducers: (builder) => {
    builder.addCase(loginCurrentUserWithGoogle.fulfilled, (state, action) => {
      state.currentUser.user = action.payload.user;
      state.currentUser.userToken = action.payload.userToken;
      state.currentUser.loginTime = new Date().getTime();
    });

    builder.addCase(loginCurrentUserWithGoogle.rejected, (state, action) => {
      throw action.error;
    });

    builder.addCase(loginCurrentUser.fulfilled, (state, action) => {
      state.currentUser.user = action.payload.user;
      state.currentUser.userToken = action.payload.userToken;
      state.currentUser.loginTime = new Date().getTime();
    });

    builder.addCase(loginCurrentUser.rejected, (state, action) => {
      throw action.error;
    });

    builder.addCase(logoutCurrentUser.fulfilled, (state, action) => {    
      state.currentUser = getEmptyLoggedInUser();
      state.currentUser.loginTime = undefined;
      state.currentUser.userToken = undefined;
    });

    builder.addCase(updateCurrentUser.fulfilled, (state, action) => {
      state.currentUser.user = action.payload;
    });

    builder.addCase(updateCurrentUser.rejected, (state, action) => {
        throw action.error;
    });

    builder.addCase(
      updateCurrentUserProfilePicture.fulfilled,
      (state, action) => {
        state.currentUser.user.userImage = action.payload;
      }
    );
    builder.addCase(updateCurrentUserProfilePicture.rejected, (state, action) => {
      throw action.error;
    });
    
    builder.addCase(
      fetchCurrentUserPreferences.fulfilled,
      (state, action) => {
        console.log(action.payload)
        state.privacy = action.payload.privacy;
        state.notification = action.payload.notification;
      }
    );
    builder.addCase(fetchCurrentUserPreferences.rejected, (state, action) => {
      throw action.error;
    });
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
export const selectCurrentUserToken = createSelector(
  [selectSelf],
  (user): any => user.currentUser.userToken
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
export const { updateLoggedInCurrentUser, updateLoggedInUserToken } = CurrentUserSlice.actions;
