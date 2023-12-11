export const FETCH_PRODUCTS_SLIDER_QUERY = `
  {
    products(search: "", filter: {
      price:{
        from:"400"
        to:"600"
      }
    }, pageSize: 10) {
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
`;