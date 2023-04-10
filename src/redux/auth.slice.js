import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const authSlice = createSlice({
  name: "authorise",
  initialState,
  reducers: {
    authorise: (state, action) => (state = action.payload),
  },
});

// Action creators are generated for each case reducer function
export const { authorise } = authSlice.actions;

export default authSlice.reducer;
