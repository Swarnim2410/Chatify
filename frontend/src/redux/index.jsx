import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice.jsx";
export const store = configureStore({
  reducer: {
    user: userSliceReducer,
  },
});
