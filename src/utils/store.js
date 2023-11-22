import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../utils/cartSlice";
import productReducer from "../utils/productSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
  },
});
