import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import userProgressReducer from "./userProgressSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    userProgress: userProgressReducer,
  },
});

export default store;
