import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
// const token = localStorage.getItem("customerToken")


const apiUrl = '/graphql';

// Create a key for storing the token in localStorage
const localStorageKey = 'customerCart';

// Load the token from localStorage if it exists
const loadTokenFromLocalStorage = () => {
  return localStorage.getItem(localStorageKey) || null;
};

export const fetchCustomerCart = createAsyncThunk('customerCart/fetchCustomerCart', async () => {
  try {
    const token = localStorage.getItem('customerToken');
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `
          {
            customerCart {
              id
            }
          }
        `,
      }),
    });

    const { data, errors } = await response.json();

    if (errors) {
      throw new Error(errors[0].message);
    }

    const customerCart = data.customerCart.id;

    console.log('Customer Cart:', customerCart);
    return customerCart;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  data: loadTokenFromLocalStorage(),
  loading: false,
  error: null,
};

// Create a slice
const customerCartSlice = createSlice({
  name: 'customerCart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCustomerCart.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCustomerCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default customerCartSlice.reducer;
