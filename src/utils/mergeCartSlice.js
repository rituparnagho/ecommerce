import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const apiUrl = '/graphql';

export const mergeCustomerCart = createAsyncThunk('mergeCustomerCart/mergeCustomerCart', async () => {
    try {
      const sourceCartId = localStorage.getItem("cartId");
      const token = localStorage.getItem("customerToken");
      const destinationCartId = localStorage.getItem("customerCart");
      console.log("sourceCartId", sourceCartId);
      console.log("destinationCartId", destinationCartId);
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: `
          mutation {
            mergeCarts(
              source_cart_id: "${sourceCartId}",
              destination_cart_id: "${destinationCartId}"
            ) {
              items {
                id
                product {
                  name
                  sku
                }
                quantity
              }
            }
          }
          `,
        }),
      });
  
      const { data, errors } = await response.json();
      console.log('GraphQL Response:', data);
  
      if (errors) {
        throw new Error(errors[0].message);
      }
  
      const customerCart = data.mergeCarts.items; // Update this based on the actual response structure
      console.log('Customer Cart:', customerCart);
      return customerCart;
    } catch (error) {
      throw error;
    }
  });
  

const initialState = {
  data: null,
  loading: false,
  error: null,
};

// Create a slice
const mergeCustomerCartSlice = createSlice({
  name: 'mergecustomerCart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(mergeCustomerCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(mergeCustomerCart.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(mergeCustomerCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default mergeCustomerCartSlice.reducer;
