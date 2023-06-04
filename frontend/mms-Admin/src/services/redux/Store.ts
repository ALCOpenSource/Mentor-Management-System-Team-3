import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { CurrentUserSlice } from "./slices/current-user-slice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk, { ThunkDispatch } from "redux-thunk";
import { NotificationSlice } from "./slices/notification-slice";
import { PrivacySlice } from "./slices/privacy-slice";
import { DashboardSlice } from "./slices/dashboard-slices";

const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  currentUser: CurrentUserSlice.reducer,
  privacy: PrivacySlice.reducer,
  notification: NotificationSlice.reducer,
  dashboard: DashboardSlice.reducer,
});

type AppState = ReturnType<typeof reducer>;
type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
//export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<TypedDispatch<AppState>>();
//export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
