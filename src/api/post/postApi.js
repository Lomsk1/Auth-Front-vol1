import axiosInstance, { axiosUnAuthorized } from "../../helper/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk(
  "post/getPosts",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("post/all/");
      return data;
    } catch (err) {
      throw rejectWithValue(err.message);
    }
  }
);
