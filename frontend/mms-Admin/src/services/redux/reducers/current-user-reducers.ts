import { createStore, applyMiddleware } from "redux";
import { Store } from "../Store";
import thunk from "redux-thunk";
import {
  ActionTypes,
  LOGIN_USER,
  UPDATE_USER,
  LOGOUT_USER,
  SET_PROFILE_PICTURE,
} from "../actions/current-user-actions";
import { LoggedInUser, SystemUser } from "../types/system-user";

// Standard interface and functions
function getBlankLoggedInUser(): LoggedInUser {
  return { user: {}, loginTime: undefined, userToken: undefined };
}
const updateLoggedInUser = (
  currentUserState?: LoggedInUser,
  updatedUser?: SystemUser
): LoggedInUser => {
  return {
    ...currentUserState,
    user: updatedUser ?? getBlankLoggedInUser().user,
  };
};

const updateLoggedInUserPhoto = (
  currentUserState?: LoggedInUser,
  image?: any
): LoggedInUser => {
  let user = currentUserState?.user;
  user = {
    ...user,
    userImage: image,
  };
  return {
    ...currentUserState,
    user: user,
  };
};

// Redux implementation
function currentUserReducer(
  state: Store = {
    currentUser: getBlankLoggedInUser(),
  },
  action: ActionTypes
) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        currentUser: getBlankLoggedInUser(),
      };
    case UPDATE_USER:
      return {
        ...state,
        currentUser: updateLoggedInUser(state.currentUser, action.payload),
      };
    case "LOGIN_USER_WITH_GOOGLE":
      return {
        ...state,
        currentUser: action.payload,
      };
    case SET_PROFILE_PICTURE:
      return {
        ...state,
        currentUser: updateLoggedInUserPhoto(state.currentUser, action.payload),
      };
    default:
      return state;
  }
}

const store = createStore(currentUserReducer, applyMiddleware(thunk));
export default store;
