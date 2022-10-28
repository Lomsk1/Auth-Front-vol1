import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import postStore from "../api/post/postStore";
import authStore from "../auth/authStore";

const rootReducer = combineReducers({
    ...authStore,
    ...postStore,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, logger],
});