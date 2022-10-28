import { createSlice } from "@reduxjs/toolkit";
import { authLogin, loadUser, checkAuth, googleAuthenticate } from "./authApi";

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    userInfo: {},
    userToken: null,
  },
  extraReducers: builder => {
    builder.addCase(authLogin.pending, (state, action) => {
      state.isAuthenticated = false;
      state.userToken = null;
    });
    builder.addCase(authLogin.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.userToken = action.payload;
    });
    builder.addCase(authLogin.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.userToken = null;
    });

    builder.addCase(loadUser.pending, (state, action) => {
      state.isAuthenticated = false;
      state.userInfo = null;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.userInfo = action.payload;
    });
    builder.addCase(loadUser.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.userInfo = null;
    });

    builder.addCase(checkAuth.pending, (state, action) => {
      state.isAuthenticated = false;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.isAuthenticated = true;
    });
    builder.addCase(checkAuth.rejected, (state, action) => {
      state.isAuthenticated = false;
    });

    builder.addCase(googleAuthenticate.pending, (state, action) => {
      state.isAuthenticated = false;
    });
    builder.addCase(googleAuthenticate.fulfilled, (state, action) => {
      state.isAuthenticated = true;
    });
    builder.addCase(googleAuthenticate.rejected, (state, action) => {
      state.isAuthenticated = false;
    });
  },
});

export default authSlice.reducer;
export const selectAuth = state => state.auth;
