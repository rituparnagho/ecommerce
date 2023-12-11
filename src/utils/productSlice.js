import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { FETCH_PRODUCTS_QUERY } from './queries/fetchProductQuery';
// import { FETCH_PRODUCTS_QUERY } from './queries/graphqlQueries';



// Create an async thunk for fetching data
export const fetchData = createAsyncThunk('product/fetchData', async () => {
  try {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: FETCH_PRODUCTS_QUERY, 
      }),
    });

    const data = await response.json();

    return data?.data?.products?.items || [];
  } catch (error) {
    return Promise.rejectWithValue(error.message);
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
      state.items.push(...action.payload);
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
