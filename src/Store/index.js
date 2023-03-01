import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/auth-slice";

const store = configureStore({
  reducer: {
    AUTH: authSlice.reducer,
  },
});

export { store };
