import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "counter",
  initialState: {
    cart: [],
    providerID: "",
  },
  reducers: {
    addToCart: (state) => {},
    removeFomCart: (state) => {},
    defineProviderID: (providerID) => {},
  },
});
export const { addToCart, removeFomCart, defineProviderID } = cartSlice.actions;

export default cartSlice.reducer;
