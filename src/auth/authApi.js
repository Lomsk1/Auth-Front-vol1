import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance, { axiosUnAuthorized } from "../helper/axiosInstance";
import Cookies from "js-cookie";

export const authLogin = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosUnAuthorized.post("auth/jwt/create/", {
        email: payload.email,
        password: payload.password,
      });
      localStorage.setItem("authTokens", JSON.stringify(data));
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const loadUser = createAsyncThunk(
  "auth/user",
  async (payload, { rejectWithValue }) => {
    if (localStorage.getItem("authTokens")) {
      try {
        const { data } = await axiosInstance.get("auth/users/me/");
        return data;
      } catch (err) {
        throw rejectWithValue(err.message);
      }
    } else {
      console.log("user login failed");
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (payload, { rejectWithValue }) => {
    if (localStorage.getItem("authTokens")) {
      try {
        const authTokens = localStorage.getItem("authTokens")
          ? JSON.parse(localStorage.getItem("authTokens"))
          : null;

        // const body = JSON.stringify({
        //   token: authTokens.access,
        // });

        const { data } = await axiosUnAuthorized.post("auth/jwt/verify/", {
          token: authTokens.access,
        });

        return data;
      } catch (err) {
        throw rejectWithValue(err.message);
      }
    } else {
      throw rejectWithValue("Not Activate");
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (payload, { rejectWithValue }) => {
    try {
      // const { data } = await axiosUnAuthorized.post("auth/logout");
      localStorage.removeItem("authTokens");
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (payload, { rejectWithValue }) => {
    try {
      const cookie = Cookies.get("csrftoken");

      const { data } = await axiosUnAuthorized.post("users/reset_password/", {
        email: payload.email,
      });
      console.log(cookie);
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const resetPasswordConfirm = createAsyncThunk(
  "auth/resetPasswordConfirm",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosUnAuthorized.post(
        "users/reset_password_confirm/",
        {
          uid: payload.uid,
          token: payload.token,
          new_password: payload.password,
          re_new_password: payload.re_password,
        }
      );
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signup",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosUnAuthorized.post("auth/users/", {
        first_name: payload.first_name,
        last_name: payload.last_name,
        email: payload.email,
        password: payload.password,
        re_password: payload.password,
      });
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);
export const signUpVerification = createAsyncThunk(
  "auth/signupVerification",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosUnAuthorized.post("auth/users/activation/", {
        uid: payload.uid,
        token: payload.token,
      });
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);

export const googleAuthenticate = createAsyncThunk(
  "auth/googleAuthenticate",
  async (payload, { rejectWithValue }) => {
    if (localStorage.getItem("authTokens")) {
      try {
        const formBody = Object.keys(details)
          .map(
            key =>
              encodeURIComponent(key) + "=" + encodeURIComponent(details(key))
          )
          .join("&");

        const { data } = await axiosUnAuthorized.post(
          `auth/o/google-oauth2/?${formBody}`,
          {
            state: payload.state,
            code: payload.code,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        localStorage.setItem("authTokens", JSON.stringify(data));
        return data;
      } catch (err) {
        throw rejectWithValue(err.message);
      }
    } else {
      throw rejectWithValue("Not Activate");
    }
  }
);
