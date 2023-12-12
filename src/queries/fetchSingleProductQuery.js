export const FETCH_SINGLE_PRODUCT_QUERY = (sku) => `
  {
    products(search: "${sku}", pageSize: 10) {
      items {
        id
        name
        sku
        feature
        short_description{
          html
        }
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