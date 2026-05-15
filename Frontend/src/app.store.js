import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./state/auth.slice";
import messageReducer from "./features/message/state/message.slice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
  },
});



  


