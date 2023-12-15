import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../utils/cartSlice";
import productReducer from "../utils/productSlice";
import categoryReducer from "../utils/categorySlice";
import customerReducer from "../utils/customerSlice";
import tokenReducer from "../utils/tokenSlice";
import customerCartReducer from "../utils/customerCartSlice";
import mergeCustomerCartReducer from "../utils/mergeCartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    category: categoryReducer,
    customer: customerReducer,
    token: tokenReducer,
    customerCart: customerCartReducer,
    mergeCustomerCart: mergeCustomerCartReducer,
  },
});
