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


export const FETCH_CATEGORY_QUERY = `
  {
    categoryList(filters: {ids:{eq: "467"}}) {
      uid,
      name,
      id,
      level,
      children_count
      children {
        id
        level
        name
        path
        url_path
        url_key
        image
        description
        children {
          id
          level
          name
          path
          url_path
          url_key
          image
          description
        }
      }
    }
  }
`;


export const FETCH_PRODUCTS_SLIDER_QUERY = `
  {
    products(search: "", pageSize: 10) {
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