import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
   name: "counter",
   initialState: {
      cart: [],
      providerID: "",
   },
   reducers: {
      addToCart: (state, item) => {
         console.log("REDUX", item.payload);
         state.cart.push(item.payload);
      },
      removeFomCart: (state) => {},
      defineProviderID: (state, providerId) => {
         if (state.providerID !== providerId.payload) {
            state.providerID = providerId.payload;
            state.cart = [];
         }
      },
   },
});
export const { addToCart, removeFomCart, defineProviderID } = cartSlice.actions;

export default cartSlice.reducer;
