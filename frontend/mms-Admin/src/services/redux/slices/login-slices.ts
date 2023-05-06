import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  LoggedInUser,
  SystemUser,
  UsernamePassword,
} from "../types/system-user";

interface CurrentUserState {
  currentUser: LoggedInUser;
}

const initialState: CurrentUserState = {
  currentUser: {
    user: {},
    userToken: undefined,
    loginTime: undefined,
  },
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
    const oldUser: SystemUser = {
      firstNames: "Kabiru",
      lastName: "Ibrahim",
      userRole: "Admin",
      about:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim  ut cursus purus efficitur et. Duis ac enim tellus. Phasellus pharetra metus, ut cursus purus efficitur et. Duis ac enim tellus. Phasellus eget tortor dapibus, laoreet mauris sed, dignissim lectus.  Duis ac enim tellus. Phasellus pharetra metus, ut cursus purus efficitur et. Duis ac enim tellus. Phasellus eget tortor dapibus, laoreet mauris sed, dignissim lectus. ",
      website: "www.pecular.com",
      country: "Nigeria",
      city: "Lagos",
      email: "pecular@andela.com",
      github: "@pecular.umeh",
      linkedin: "@pecular.umeh",
      instagram: "@pecular.umeh",
      twitter: "@pecular.umeh",
    };
    //   const dispatch = useAppDispatch();
    //   dispatch(updateLoggedInCurrentUser(oldUser));
    const logedInUser: LoggedInUser = {
      user: oldUser,
      userToken: "djhsgf dfgsdfjgdf gdfgsdfngsdf gdfgsdf",
      //loginTime: new Date().getTime(),
    };
    if(userDetails?.afterSuccessful) userDetails?.afterSuccessful();
    return logedInUser;
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
      console.log(state);
      return state;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loginCurrentUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
  },
});

export default CurrentUserSlice.reducer;
export const { updateLoggedInCurrentUser } = CurrentUserSlice.actions;
