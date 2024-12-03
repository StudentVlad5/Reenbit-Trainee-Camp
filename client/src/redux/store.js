import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { authReducer } from "./auth/slice";
import storage from "redux-persist/lib/storage";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "permission"],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
  },
});
