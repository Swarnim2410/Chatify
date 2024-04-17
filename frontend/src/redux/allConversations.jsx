import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  all_conversations: [],
};

export const allConversations = createSlice({
  name: "all_conv",
  initialState,
  reducers: {
    getAllConversations: (state, action) => {
    //   console.log(action.payload);
      //action.payload contains data coming from the server

      //ab hame initialState me data set karna hai jo state.{property} se hi set hota hai..
      state.all_conversations = action.payload;
    },
    removeAllConversations: (state, action) => {
      state.all_conversations = [];
    },
  },
});

export const { getAllConversations, removeAllConversations } =
  allConversations.actions;
export default allConversations.reducer;
