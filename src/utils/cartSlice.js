import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addProductsToCart = createAsyncThunk(
  'addProductsToCart',
  async (payload, { rejectWithValue }) => {
  
    const { cartId, cartItems } = payload;
      console.log("cartId", cartId);
      console.log("cartItems", cartItems);
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
              billing_address {
                city
                company
                customer_notes
                firstname
                lastname
                postcode
                street
                telephone
              }
              email
              gift_message {
                from
                message
                to
              }
              id
              is_virtual
              items {
                id
                quantity
                uid
              }
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

