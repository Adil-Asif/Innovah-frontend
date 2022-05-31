import { configureStore } from "@reduxjs/toolkit";
import initialiseUserDetailsSlice from "../Slice/initialiseUserDetailsSlice";
import registerUserSlice from "../Slice/registerUserSlice";

const store = configureStore({
  reducer: {
    userDetails: initialiseUserDetailsSlice,
    registrationDetails: registerUserSlice,
  },
});

export default store;
