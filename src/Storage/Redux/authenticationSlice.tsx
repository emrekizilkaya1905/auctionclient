import { createSlice } from "@reduxjs/toolkit";
import userModel from "../../interfaces/userModel";

export const initialState: userModel = {
  id: "",
  fullname: "",
  email: "",
  role: "",
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState: initialState,
  reducers: {
    setLoggedInUser: (state, action) => {
      state.email = action.payload.fullname;
      state.fullname = action.payload.fullname;
      state.id = action.payload.id;
      state.role = action.payload.role;
    },
  },
});
export const authenticationReducer = authenticationSlice.reducer;
export const { setLoggedInUser } = authenticationSlice.actions;
