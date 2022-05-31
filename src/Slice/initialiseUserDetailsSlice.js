import { createSlice } from "@reduxjs/toolkit";

export const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: {
    userid: "",
    username: "",
    userrole: "",
    industry: "",
    picture: "",
    isLogin: false,
    phoneNumber:"",
    resumeDesc:"",
    innovahPoints: 0,
  },
  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = action.payload.isLogin;
    }, 
    setUserDetails: (state, action) => {
      state.userid = action.payload.userid;
      state.username = action.payload.username;
      state.userrole = action.payload.userrole;
      state.industry = action.payload.industry;
      state.picture = action.payload.picture;
      state.phoneNumber = action.payload.phoneNumber;
      state.resumeDesc = action.payload.resumeDesc;
      state.innovahPoints = action.payload.innovahPoints;
    },
    updateRewards: (state,action) => {
      state.innovahPoints = action.payload.innovahPoints;
    },
    resetUserDetails: (state) => {
      state.userid = "";
      state.username = "";
      state.userrole = "";
      state.industry = "";
      state.picture = "";
      state.resumeDesc = "";
      state.phoneNumber = "";
      state.isLogin= false;
      state.innovahPoints = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsLogin, setUserDetails,updateRewards ,resetUserDetails } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
