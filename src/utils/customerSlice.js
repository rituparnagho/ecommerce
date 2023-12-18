import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// Replace 'yourApiUrl' with the actual GraphQL API endpoint
const apiUrl = '/graphql';

// Create an asynchronous thunk to fetch customer data
export const fetchCustomer = createAsyncThunk('customer/fetchCustomer', async () => {
  try {
    const token = localStorage.getItem("customerToken")
    console.log("token", token);
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
    // console.log("data", data);
    // console.log("customer", data.data.customer); 
    return data.data.customer;
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
  customerData: {},
  status:'',
  error: '',
}

// Create a slice
const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomer.pending, (state) => {
        state.status = statusData?.LOADING;
      })
      .addCase(fetchCustomer.fulfilled, (state, action) => {
        console.log("action", action.payload);
        state.status = statusData?.IDLE;
        state.customerData = action.payload;
      })
      .addCase(fetchCustomer.rejected, (state) => {
        state.status = statusData?.ERROR;
      });
  },
});

export default customerSlice.reducer;