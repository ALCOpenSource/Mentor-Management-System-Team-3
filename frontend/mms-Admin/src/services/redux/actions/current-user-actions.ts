import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { Store } from "../Store";
import { LoggedInUser, SystemUser } from "../types/system-user";

export const SET_PROFILE_PICTURE = "SET_PROFILE_PICTURE";
export const LOGOUT_USER = "LOGOUT_USER";
export const UPDATE_USER = "UPDATE_USER";
export const CHANGE_USER_PASSWORD = "CHANGE_USER_PASSWORD";
export const RECOVER_USER_PASSWORD = "RECOVER_USER_PASSWORD";
export const LOGIN_USER = "LOGIN_USER";
export const REGISTER_USER = "REGISTER_USER";
export const LOGIN_USER_WITH_GOOGLE = "LOGIN_USER_WITH_GOOGLE";

export type ActionTypes =
  | { type: typeof LOGIN_USER; payload: LoggedInUser }
  | { type: typeof SET_PROFILE_PICTURE; payload: any }
  | { type: typeof LOGOUT_USER; payload: string }
  | { type: typeof UPDATE_USER; payload: SystemUser }
  | { type: typeof CHANGE_USER_PASSWORD }
  | { type: typeof RECOVER_USER_PASSWORD }
  | { type: typeof REGISTER_USER; payload: SystemUser }
  | { type: typeof LOGIN_USER_WITH_GOOGLE; payload: LoggedInUser };

//export const addLoggedInUser = (): ActionTypes => ({ type: SET_PROFILE_PICTURE });

export const setLogoutUserAction = (userId: string): ActionTypes => ({
  type: LOGOUT_USER,
  payload: userId,
});

export const setLoggedInUserAction = (
  loginDetails: LoggedInUser
): ActionTypes => ({
  type: LOGIN_USER,
  payload: loginDetails,
});

export const setProfilePictureAction = (image: any): ActionTypes => ({
  type: SET_PROFILE_PICTURE,
  payload: image,
});

export const setUpdatedUserAction = (
  loginDetails: SystemUser
): ActionTypes => ({
  type: UPDATE_USER,
  payload: loginDetails,
});

export const newUserWasregisteredAction = (
  loginDetails: SystemUser
): ActionTypes => ({
  type: REGISTER_USER,
  payload: loginDetails,
});

export const resetPasswordAction = (): ActionTypes => ({
  type: CHANGE_USER_PASSWORD,
});

export const recoverPasswordAction = (): ActionTypes => ({
  type: RECOVER_USER_PASSWORD,
});

export const signInWithGoogleAction = (
  loginDetails: LoggedInUser
): ActionTypes => ({
  type: LOGIN_USER_WITH_GOOGLE,
  payload: loginDetails,
});

export const logInUser =
  (url: string): ThunkAction<void, Store, unknown, Action<string>> =>
  async (dispatch) => {
    const resp = await fetch(url);
    const user: LoggedInUser = await resp.json();
    dispatch(setLoggedInUserAction(user));
  };

export const logInUserWithGoogle =
  (url: string): ThunkAction<void, Store, unknown, Action<string>> =>
  async (dispatch) => {
    const resp = await fetch(url);
    const user: LoggedInUser = await resp.json();
    dispatch(signInWithGoogleAction(user));
  };

export const logOutUser =
  (url: string): ThunkAction<void, Store, unknown, Action<string>> =>
  async (dispatch) => {
    const resp = await fetch(url);
    const user: SystemUser = await resp.json();
    dispatch(setLogoutUserAction(user?.userId ?? ""));
  };

export const updateUser =
  (url: string): ThunkAction<void, Store, unknown, Action<string>> =>
  async (dispatch) => {
    const resp = await fetch(url);
    const user: SystemUser = await resp.json();
    dispatch(setUpdatedUserAction(user));
  };

export const registerUser =
  (url: string): ThunkAction<void, Store, unknown, Action<string>> =>
  async (dispatch) => {
    const resp = await fetch(url);
    const user: SystemUser = await resp.json();
    dispatch(newUserWasregisteredAction(user));
  };

export const resetUserPassword =
  (url: string): ThunkAction<void, Store, unknown, Action<string>> =>
  async (dispatch) => {
    const resp = await fetch(url);
    await resp.json();
    dispatch(resetPasswordAction());
  };

export const recoverUserPassword =
  (url: string): ThunkAction<void, Store, unknown, Action<string>> =>
  async (dispatch) => {
    const resp = await fetch(url);
    await resp.json();
    dispatch(recoverPasswordAction());
  };
