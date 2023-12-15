import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const apiUrl = '/graphql';

// Create a key for storing the token in localStorage
const localStorageKey = 'customerToken';

// Load the token from localStorage if it exists
const loadTokenFromLocalStorage = () => {
  return localStorage.getItem(localStorageKey) || null;
};

// Create an asynchronous thunk to fetch customer data
export const fetchToken = createAsyncThunk('token/fetchToken', async (formData) => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
        mutation {
          generateCustomerToken(
            email: "${formData.email}"
            password: "${formData.password}"
          ) {
            token
          }
        }
        `,
      }),
    });

    const { data, errors } = await response.json();

    if (errors) {
      throw new Error(errors[0].message);
    }

    const token = data.generateCustomerToken.token;
    // localStorage.setItem('customerToken', token);

    console.log('Token:', token);
    return token;
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
const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchToken.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default tokenSlice.reducer;
