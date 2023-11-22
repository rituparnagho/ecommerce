

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create an async thunk for fetching data
export const fetchData = createAsyncThunk('product/fetchData',  async () => {
    try {
      const response = await axios.post(
        '/graphql',
        {
          query: `
          {
            products(search: "", pageSize: 100) {
              items {
                id
                name
                sku
                price {
                  regularPrice {
                    amount {
                      value
                      currency
                    }
                  }
                }
                image {
                  url
                }
              }
            }
          }
          `,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return response?.data?.data?.products?.items; // Assuming the data is nested under the "data" property
    } catch (error) {
      throw new Error(error.message);
    }
  });

// Create a slice of the Redux store
const productSlice = createSlice({
  name: 'product',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle the pending state
    builder.addCase(fetchData.pending, (state) => {
      state.status = 'loading';
    });

    // Handle the fulfilled state
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.status = 'succeeded';
      // state.productlist = action.payload;
      state.items.push(
        ...action.payload,
      );
    });

    // Handle the rejected state
    builder.addCase(fetchData.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

// Export the reducer for use in the store configuration
export default productSlice.reducer;
