import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  trigger: true,
};

export const triggerSlice = createSlice({
  name: "trigger",
  initialState,
  reducers: {
    triggerRedux: (state, action) => {
      // console.log(action.payload);
      //action.payload contains data coming from the server

      //ab hame initialState me data set karna hai jo state.{property} se hi set hota hai..
      // console.log(action.payload);
      state.trigger = action.payload;
    },
    untriggerRedux: (state, action) => {
      state.trigger = "";
    },
  },
});

export const { triggerRedux, untriggerRedux } = triggerSlice.actions;
export default triggerSlice.reducer;
