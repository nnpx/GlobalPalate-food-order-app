import { createSlice } from "@reduxjs/toolkit";

const initialState = { progress: "" };

const userProgressSlice = createSlice({
  name: "userProgress",
  initialState,
  reducers: {
    showCart(state) {
      state.progress = "cart";
    },
    hideCart(state) {
      state.progress = "";
    },
    showCheckout(state) {
      state.progress = "checkout";
    },
    hideCheckout(state) {
      state.progress = "";
    },
  },
});

export const { showCart, hideCart, showCheckout, hideCheckout } =
  userProgressSlice.actions;
export default userProgressSlice.reducer;
