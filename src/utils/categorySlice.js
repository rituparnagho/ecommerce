import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { FETCH_CATEGORY_QUERY } from '../queries/fetchCatagoryQuery';
// import { FETCH_CATEGORY_QUERY } from './queries/graphqlQueries';

// Create an async thunk for fetching data
export const fetchDataCategory = createAsyncThunk('category/fetchData', async () => {
  try {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: FETCH_CATEGORY_QUERY, // Use the imported query
      }),
    });

    const data = await response.json();
    return data?.data?.categoryList[0]?.children || [];
  } catch (error) {
    console.error('error', error);
    throw error;
  }
});

// Create a slice of the Redux store
const categorySlice = createSlice({
  name: 'category',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle the pending state
    builder.addCase(fetchDataCategory.pending, (state) => {
      state.status = 'loading';
    });

    // Handle the fulfilled state
    builder.addCase(fetchDataCategory.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.items = action.payload; // Replace items with the payload directly
    });

    // Handle the rejected state
    builder.addCase(fetchDataCategory.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

// Export the reducer for use in the store configuration
export default categorySlice.reducer;
