import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice.jsx";
import selectedConversation from "./selectedConversation.jsx";
export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    select : selectedConversation,
  },
});
