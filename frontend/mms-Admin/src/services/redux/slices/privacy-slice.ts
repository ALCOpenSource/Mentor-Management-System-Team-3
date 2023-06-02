import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState, useAppSelector } from "../Store";
import { Privacy } from "../types/privacy";
import {
  fetchPrivaciesApiAsync,
  updateAllPrivaciesApiAsync,
  updatePrivacyItemApiAsync,
} from "../../axios/api-services/privacy";
import { selectCurrentUserToken } from "./current-user-slice";

interface CurrentPrivacyState {
  privacy: Privacy;
}

function getEmptyPrivacy(): Privacy {
  return {
    userId: "",
    showLinkedin: true,
    showTwitter: true,
    showGitHub: true,
    showInstagram: true,
    showContactInfo: true,
  };
}

const initialState: CurrentPrivacyState = {
  privacy: getEmptyPrivacy(),
};

export const updatePrivacyItem = createAsyncThunk(
  "current-privacy/change-privacy-item",
  async (
    privacyDetails: { key: string; value: boolean; obj: Privacy },
    thunkAPI
  ) => {
    const state: any = thunkAPI.getState();
    return await updatePrivacyItemApiAsync(
      privacyDetails,
      state.currentUser.currentUser.userToken
    );
  }
);

export const updateAllPrivacies = createAsyncThunk(
  "current-privacy/update-all-privacies",
  async (privacyDetails: Privacy, thunkAPI) => {
    return await updateAllPrivaciesApiAsync(privacyDetails);
  }
);

export const fetchPrivacies = createAsyncThunk(
  "current-privacy/fetch-all-privacies",
  async (thunkAPI) => {
    return await fetchPrivaciesApiAsync(
      useAppSelector(selectCurrentUserToken)
    );
  }
);

export const PrivacySlice = createSlice({
  name: "current-privacy",
  initialState,
  reducers: {
    updateAllPrivaciesAction: (state, action: PayloadAction<Privacy>) => {
      state.privacy = action.payload;
    },
    updatePrivacyItemAction: (state, action: PayloadAction<any>) => {
      let obj: any = action.payload;
      obj = { ...obj, [action.payload.key]: action.payload.value };
      state.privacy = obj;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updatePrivacyItem.fulfilled, (state, action) => {
      let obj: any = action.payload;
      obj = { ...obj, [action.payload.key]: action.payload.value };
      state.privacy = obj;
      return state;
    });

    builder.addCase(updatePrivacyItem.rejected, (state, action) => {
      throw action.error;
    });

    builder.addCase(updateAllPrivacies.fulfilled, (state, action) => {
      state.privacy = action.payload;
    });

    builder.addCase(fetchPrivacies.fulfilled, (state, action) => {
      state.privacy = action.payload;
    });
  },
});

const selectSelf = (state: RootState) => state.privacy;

export const selectCurrentPrivacy = createSelector(
  [selectSelf],
  (privacy): Privacy => privacy.privacy
);

export const searchPrivacyByKey = createSelector(
  [selectSelf, (selectSelf, searchText: string) => searchText],
  (selectSelf, search: string) => {
    return Object.entries(selectSelf.privacy).filter((c) => c[1]);
  }
);

export default PrivacySlice.reducer;
export const { updateAllPrivaciesAction, updatePrivacyItemAction } =
  PrivacySlice.actions;
