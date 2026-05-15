import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    socket: null,
    onlineUsers: [],
  },
  reducers: {
    setauthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setisCheckingAuth: (state, action) => {
      state.isCheckingAuth = action.payload;
    },
    setisSigningUp: (state, action) => {
      state.isSigningUp = action.payload;
    },
    setisLoggingIn: (state, action) => {
      state.isLoggingIn = action.payload;
    },
    setsocket: (state, action) => {
      state.socket = action.payload;
    },

    setonlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const { setauthUser, setisCheckingAuth, setisSigningUp, setisLoggingIn, setsocket, setonlineUsers } = authSlice.actions;
export default authSlice.reducer;
