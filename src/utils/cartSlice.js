import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addProductsToCart = createAsyncThunk(
  'addProductsToCart',
  async (payload, { rejectWithValue }) => {
  console.log("payload", payload);
    const { cartId, cartItems,cartOption,parent_sku } = payload;
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
                    id:${cartOption.customizable_options.id}
                    value_string:"${cartOption.customizable_options.value_string}"
                  }
                  parent_sku: "${parent_sku}"
                  data: {
                    quantity: ${cartItems.data.quantity},
                    sku: "${cartItems.data.sku}"
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


export const fetchCartData = createAsyncThunk(
  'cart/fetchData',
  async (cartId, { rejectWithValue }) => {
    console.log("cartId",cartId);
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

