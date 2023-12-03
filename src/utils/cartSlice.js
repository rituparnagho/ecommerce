import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const addProductsToCart = createAsyncThunk(
  'addProductsToCart',
  async ({ cartId, cartItems }, { rejectWithValue }) => {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers as needed
      },
      body: JSON.stringify({
        query: `
          mutation($input: AddSimpleProductsToCartInput!) {
            addSimpleProductsToCart(input: $input) {
              cart {
                email
                id
                is_virtual
                total_quantity
              }
            }
          }
        `,
        variables: {
          input: {
            cart_id: cartId,
            cart_items: cartItems.map(item => ({
              customizable_options: {
                id: `${item.customizable_options.id}`,
                value_string: `${item.customizable_options.value_string}`,
              },
              data: {
                quantity: item.data.quantity,
                sku: item.data.sku,
              },
            })),
          },
        },
      }),
    });

    try {
      const result = await response.json();
      console.log('result', result);
      return result.data.addSimpleProductsToCart.cart;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

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
