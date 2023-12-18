import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../utils/cartSlice";
import productReducer from "../utils/productSlice";
import categoryReducer from "../utils/categorySlice";
import customerReducer from "../utils/customerSlice";
import tokenReducer from "../utils/tokenSlice";
import customerCartReducer from "../utils/customerCartSlice";
import mergeCustomerCartReducer from "../utils/mergeCartSlice";
import updateCartReducer from "../utils/updateCartSlice";
import fetchCartReducer from "../utils/fetchCartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    fetchCart: fetchCartReducer,
    product: productReducer,
    category: categoryReducer,
    customer: customerReducer,
    token: tokenReducer,
    customerCart: customerCartReducer,
    mergeCustomerCart: mergeCustomerCartReducer,
    updateCart: updateCartReducer,
  },
});
