import React from 'react';

const CartComponent = () => {
  const endpoint = '/graphql'; // Replace with your GraphQL endpoint

  const addToCartMutation = `
  mutation {
    addConfigurableProductsToCart(
      input: {
        cart_id: "Vq3sZJ9TZVA4a6UmSsGhgY9xJrLQrE1P"
        cart_items: [
          {
            customizable_options:{
              id:12
              value_string:""
            }
            parent_sku: "D2CCONFIG100004107"
            data: {
              quantity: 2
              sku: "CPETPEJ068TRSP0001"
            }
          }
        ]
      }
    ) {
      cart {
        items {
          uid
          quantity
          product {
            name
            sku
          }
          ... on ConfigurableCartItem {
            configurable_options {
              option_label
            }
          }
        }
      }
    }
  }
  `;
  const handleAddToCart = () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Include your authorization token if required
      },
      body: JSON.stringify({
        query: addToCartMutation,
      }),
    };

    fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <button onClick={handleAddToCart}>Add to Cart</button>
      {/* Add other components or content related to your cart page */}
    </div>
  );
};

export default CartComponent;
