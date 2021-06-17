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

         let index = state.cart.findIndex((cartItem) => cartItem.id === item.payload.id);
         index === -1
            ? state.cart.push(item.payload)
            : (state.cart[index].quantity = +state.cart[index].quantity + 1);
      },
      removeFomCart: (state, item) => {
         let index = state.cart.findIndex((cartItem) => cartItem.id === item.payload.id);
         if (index > -1) {
            state.cart.splice(index, 1);
         }
      },
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
