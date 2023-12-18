import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// Replace 'yourApiUrl' with the actual GraphQL API endpoint
const apiUrl = '/graphql';

// Create an asynchronous thunk to fetch customer data
export const updateCart = createAsyncThunk('cart/updateCart', async (item, { getState }) => {
    console.log(item);
    try {
      const token = localStorage.getItem("customerToken");
      const customerCartId = localStorage.getItem("customerCart");
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: `
            mutation {
              updateCartItems(
                input: {
                  cart_id: "${customerCartId}",
                  cart_items: [
                    {
                      cart_item_uid: "${item.uid}"
                      quantity: ${item.quantity}
                    }
                  ]
                }
              ){
                cart {
                  items {
                    uid
                    product {
                      name
                    }
                    quantity
                  }
                  prices {
                    grand_total{
                      value
                      currency
                    }
                  }
                }
              }
            }
          `,
        }),
      });
  
      const data = await response.json();
      console.log("Response Data:", data);
      return data.data.updateCartItems.cart.items;
    } catch (error) {
      throw error;
    }
  });

//Store Status
export const statusData = Object.freeze({
  LOADING: "loading",
  ERROR: "error",
  IDLE: "idle",
}); // Read Only....

const initialState = {
  updateCartData: {},
  status:'',
  error: '',
}

// Create a slice
const updateCartSlice = createSlice({
  name: 'updateCart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateCart.pending, (state) => {
        state.status = statusData?.LOADING;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        console.log("action", action.payload);
        state.status = statusData?.IDLE;
        state.updateCartData = action.payload;
      })
      .addCase(updateCart.rejected, (state) => {
        state.status = statusData?.ERROR;
      });
  },
});

export default updateCartSlice.reducer;