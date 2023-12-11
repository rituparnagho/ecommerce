import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addProductsToCart = createAsyncThunk(
  'addProductsToCart',
  async (payload, { rejectWithValue }) => {
  console.log("payload", payload);
    const { cartId, cartItems,cartOption } = payload;
    // const { cartOption } = payloadOption;
    console.log("cartOption", cartOption);
      console.log("cartId", cartId);
      console.log("cartItems", cartItems);
      try {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
        mutation {
          addSimpleProductsToCart(input: {
            cart_id: "${cartId}",
            cart_items: [
              {
                customizable_options: {
                  id: 12,
                  value_string: "Treo"
                },
                data: {
                  quantity: ${cartItems.data.quantity},
                  sku: "${cartItems.data.sku}"
                }
              }
            ]
          }) {
            cart {
              email
              id
              is_virtual
              total_quantity
            }
          }
        }
        
        `,
      }),
    });

   
      const result = await response.json();
      console.log('result', result);
      return result.data.addSimpleProductsToCart.cart;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const fetchCartData = createAsyncThunk(
  'cart/fetchData',
  async (cartId, { rejectWithValue }) => {
    try {
      const response = await fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
          query($cartId: String!) {
            cart(cart_id: $cartId) {
              items{
                quantity
                product{
                  name
                  image{
                    url
                  }
                  price {
                            maximalPrice{
                              amount{
                                value
                              }
                            }
                            regularPrice {
                              amount {
                                value
                                currency
                              }
                            }
                          }
                }
              }
              applied_coupon {
                code
              }
              applied_coupons {
                code
              }
              available_payment_methods {
                code
                title
              }
              email
              id
              is_virtual
              total_quantity
            }
          }
        `,
        variables: { cartId },
        }),
      });

      const result = await response.json();
      // console.log(result.data.cart);
      return result.data.cart;
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
  reducers: {
    addItem: (state, action) => {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].itemCount++;
        state.items[existingItemIndex].isAddedToCart = true;
      } else {
        state.items.push({
          ...action.payload,
          itemCount: 1,
        });
      }
    },
    decrementItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem && existingItem.itemCount === 1) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      } else if (existingItem) {
        existingItem.itemCount--;
      }
    },
    incrementItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.itemCount++;
      }
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCartData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cartData = action.payload;
      })
      .addCase(fetchCartData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { addItem, removeItem, clearCart, incrementItem, decrementItem } =
  cartSlice.actions;
export default cartSlice.reducer;

