import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// Replace 'yourApiUrl' with the actual GraphQL API endpoint
const apiUrl = '/graphql';

export const fetchCartData = createAsyncThunk(
    'cart/fetchCartData',
    async (cartId,{ rejectWithValue }) => {
      console.log("cartId",cartId);
      try {
        const token = localStorage.getItem('customerToken');
        const response = await fetch('/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            query: `
            {
              cart(cart_id: "${cartId}") {
                items{
                  uid
                  quantity
                  product{
                    name
                    image{
                      url
                    }
                    price {
                              maximalPrice{
                                amount{
                                  value
                                }
                              }
                              regularPrice {
                                amount {
                                  value
                                  currency
                                }
                              }
                            }
                  }
                }
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
                email
                id
                is_virtual
                total_quantity
              }
            }          
          `,
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
  
  
//Store Status
export const statusData = Object.freeze({
  LOADING: "loading",
  ERROR: "error",
  IDLE: "idle",
}); // Read Only....

const initialState = {
  fetchCartData: {},
  status:'',
  error: '',
}

// Create a slice
const fetchCartSlice = createSlice({
  name: 'cartData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartData.pending, (state) => {
        state.status = statusData?.LOADING;
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
        console.log("action", action.payload);
        state.status = statusData?.IDLE;
        state.fetchCartData = action.payload;
      })
      .addCase(fetchCartData.rejected, (state) => {
        state.status = statusData?.ERROR;
      });
  },
});

export default fetchCartSlice.reducer;