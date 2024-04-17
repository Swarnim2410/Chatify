import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice.jsx";
import selectedConversation from "./selectedConversation.jsx";
import allConversations from "./allConversations.jsx";
import trigger from "./trigger.jsx";
export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    select : selectedConversation,
    trigger : trigger,
    all_conv : allConversations
  },
});
