// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"; // or any other slice

const store = configureStore({
  reducer: {
    auth: authReducer,
    // other reducers
  },
});

export default store;
