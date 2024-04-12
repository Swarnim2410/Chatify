import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  username: "",
  fullName: "",
  profilePic: "",
  _id: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
        // console.log(action.payload);
      //action.payload contains data coming from the server
      
      //ab hame initialState me data set karna hai jo state.{property} se hi set hota hai..
      state._id = action.payload?._id;
      state.username = action.payload?.username;
      state.profilePic = action.payload?.profilePic;
      state.fullName = action.payload?.fullName;
    },
    logoutRedux: (state, action) => {
      state._id = "";
      state.username = "";
      state.profilePic = "";
      state.fullName = "";
    },
  },
});

export const { loginRedux, logoutRedux } = userSlice.actions;
export default userSlice.reducer;
