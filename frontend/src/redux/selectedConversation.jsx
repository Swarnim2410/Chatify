import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  username: "",
  fullName: "",
  profilePic: "",
  _id: "",
};

export const selectedConversation = createSlice({
  name: "select",
  initialState,
  reducers: {
    selectedRedux: (state, action) => {
      // console.log(action.payload);
      //action.payload contains data coming from the server

      //ab hame initialState me data set karna hai jo state.{property} se hi set hota hai..
      //   console.log(action.payload);
      state.username = action.payload?.username;
      state.fullName = action.payload?.fullName;
      state.profilePic = action.payload?.profilePic;
      state._id = action.payload?._id;
    },
    unselectedRedux: (state, action) => {
      state.username = "";
      state.fullName = "";
      state.profilePic = "";
      state._id = "";
    },
  },
});

export const { selectedRedux, unselectedRedux } = selectedConversation.actions;
export default selectedConversation.reducer;
