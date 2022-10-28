import { createSlice } from "@reduxjs/toolkit";
import { getPosts } from "./postApi";

const postSlice = createSlice({
  name: "post",
  initialState: {
    isLoading: true,
    post: {},
  },
  extraReducers: builder => {
    builder.addCase(getPosts.pending, (state, action) => {
      state.isLoading = true;
      state.post = null;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.post = action.payload;
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.isLoading = true;
      state.post = null;
    });
  },
});

export default postSlice.reducer;
export const selectPost = state => state.post;
