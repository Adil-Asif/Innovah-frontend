import { createSlice } from "@reduxjs/toolkit";

export const registerUserSlice = createSlice({
  name: "registrationDetails",
  initialState: {
    useremail: "",
    userpassword: "",
  },
  reducers: {
    setRegistrationDetails: (state, action) => {
      state.useremail = action.payload.useremail;
      state.userpassword = action.payload.userpassword;
      console.log( state.useremail,"223");
    },
    resetRegistrationDetails: (state) => {
      state.useremail = "";
      state.userpassword = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRegistrationDetails, resetRegistrationDetails } =
  registerUserSlice.actions;

export default registerUserSlice.reducer;
