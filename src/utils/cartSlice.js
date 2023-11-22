import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const cartItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (cartItem) {
        cartItem.itemCount++;
        cartItem.isAddedToCart = true;
      } else {
        state.items.push({
          ...action.payload,
          itemCount: 1,
        });
      }
    },
    decrementItem: (state, action) => {
      const cartItem = state.items.find(
        (item) => item.id === action.payload.id
        );
        if (cartItem.itemCount == 1) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id
            );
          } else {
            cartItem.itemCount--;
          }
        },
        incrementItem: (state, action) => {
          const cartItem = state.items.find(
            (item) => item.id === action.payload.id
          );
          cartItem.itemCount++;
        },
    removeItem: (state, action) => {
      const itemId = action.payload;
      const updatedCart = state.items.filter((item) => item.id !== itemId);
      state.items = updatedCart;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearCart, incrementItem, decrementItem } =
  cartSlice.actions;
export default cartSlice.reducer;
