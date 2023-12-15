export const FETCH_PRODUCTS_QUERY = `
{
  products(search: "", pageSize: 100) {
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