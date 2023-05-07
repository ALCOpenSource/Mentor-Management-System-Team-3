import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  LoggedInUser,
  SystemUser,
  UsernamePassword,
} from "../types/system-user";
import getCountryFlag from "../../countries";
import { RootState } from "../Store";
import "./../../../assets/images/flag-icons-main/flags/4x3/ac.svg"

interface CurrentUserState {
  currentUser: LoggedInUser;
}

const getEmptyLoggedInUser = (): LoggedInUser => {
  return { user: {}, userToken: undefined, loginTime: undefined };
};
const initialState: CurrentUserState = {
  currentUser: getEmptyLoggedInUser(),
};

export const fetchCurrentUser = createAsyncThunk(
  "current-user/fetch",
  async (thunkAPI) => {
    const response = await fetch("http://localhost:8000/current-user", {
      method: "GET",
    });
    const data = response.json();
    return data;
  }
);

export const loginCurrentUser = createAsyncThunk(
  "current-user/login",
  async (userDetails: UsernamePassword, thunkAPI) => {
    // const response = await fetch("http://localhost:8000/current-user", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     name,
    //   }),
    //});
    //const data = await response.json();
    //return data;
    try {
      let loggedInUser: SystemUser = {
        firstNames: "Eliud",
        lastName: "Amukambwa",
        userRole: "Admin",
        about:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim  ut cursus purus efficitur et. Duis ac enim tellus. Phasellus pharetra metus, ut cursus purus efficitur et. Duis ac enim tellus. Phasellus eget tortor dapibus, laoreet mauris sed, dignissim lectus.  Duis ac enim tellus. Phasellus pharetra metus, ut cursus purus efficitur et. Duis ac enim tellus. Phasellus eget tortor dapibus, laoreet mauris sed, dignissim lectus. ",
        website: "www.pilgrims.com",
        country: "Us",
        city: "Nairobi",
        email: "eliudfromkenya@gmail.com",
        github: "@pecular.umeh",
        linkedin: "@pecular.umeh",
        instagram: "@pecular.umeh",
        twitter: "@pecular.umeh",
      };

      //const userP =  `./../../../assets/images/flag-icons-main/flags/4x3/ug.svg`;
      
      console.log("fg 1",  loggedInUser);
      const flag = getCountryFlag(loggedInUser.country ?? " ");
      const profilePic = getCountryFlag("uganda");// await readFile(getCountryFlag(loggedInUser.country ?? " "));
      const userToken = "my user token";

      loggedInUser = {
        ...loggedInUser,
        countryFlagIcon: flag,
        userImage: profilePic,
      };

      console.log("fg", loggedInUser);
      const user: LoggedInUser = {
        user: loggedInUser,
        userToken: userToken,
      };

      if (userDetails?.afterSuccessful) userDetails?.afterSuccessful();
      return user;
    } catch (err) {
      console.log(err);
      throw err;
    }
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
      user.userToken = "";
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

export default CurrentUserSlice.reducer;
export const { updateLoggedInCurrentUser } = CurrentUserSlice.actions;
