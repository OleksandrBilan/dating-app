import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "userSlice",
  initialState: {
    user: {},
  },
  reducers: {
    setUserAction: (currectSlice, action) => {
      currectSlice.user = action.payload.newUser;
    },
  },
});

export const { setUserAction } = authSlice.actions;
