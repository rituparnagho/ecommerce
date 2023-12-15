import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const token = localStorage.getItem("customerToken")

// Replace 'yourApiUrl' with the actual GraphQL API endpoint
const apiUrl = '/graphql';

// Create an asynchronous thunk to fetch customer data
export const fetchCustomer = createAsyncThunk('customer/fetchCustomer', async () => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `
          {
            customer {
              firstname
              lastname
              suffix
              email
              addresses {
                firstname
                lastname
                street
                city
                region {
                  region_code
                  region
                }
                postcode
                country_code
                telephone
              }
            }
          }
        `,
      }),
    });

    const data = await response.json();
    console.log("data", data.data.customer);
    // localStorage.setItem('customer', JSON.stringify(data.data.customer));
    return data.data.customer;
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
const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default customerSlice.reducer;