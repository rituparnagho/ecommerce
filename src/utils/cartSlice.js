import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addProductsToCart = createAsyncThunk(
  'cart/addProductsToCart',  // Corrected action type
  async (payload, { rejectWithValue }) => {
    console.log("payload", payload);
    const { cartId, cartItems, cartOption, parent_sku } = payload;
    try {
      const token = localStorage.getItem('customerToken');
      const response = await fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: `
            mutation {
              addConfigurableProductsToCart(
                input: {
                  cart_id: "${cartId}",
                  cart_items: [
                    {
                      customizable_options:{
                        id:${cartOption?.customizable_options?.id}
                        value_string:"${cartOption?.customizable_options?.value_string}"
                      }
                      parent_sku: "${parent_sku}"
                      data: {
                        quantity: ${cartItems?.data?.quantity},
                        sku: "${cartItems?.data?.sku}"
                      }
                    }
                  ]
                }
              ) {
                cart {
                  items {
                    uid
                    quantity
                    product {
                      name
                      sku
                    }
                    ... on ConfigurableCartItem {
                      configurable_options {
                        option_label
                      }
                    }
                  }
                }
              }
            } 
          `,
        }),
      });

      const result = await response.json();
      console.log('result', result.data.addConfigurableProductsToCart.cart);
      return result.data.addConfigurableProductsToCart.cart;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    cartData: [],
    status: 'idle',
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addProductsToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProductsToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cartData = action.payload;
      })
      .addCase(addProductsToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// export const { addItem, removeItem, clearCart, incrementItem, decrementItem } =
//   cartSlice.actions;
export default cartSlice.reducer;
