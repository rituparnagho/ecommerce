import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { FaMinus, FaPlus } from "react-icons/fa";
import { addItem, decrementItem, incrementItem } from "../../utils/cartSlice";
import { useDispatch } from "react-redux";
// import "./ProductDetail.css"

const ProductDetail = () => {
  const { productSku } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);
  const location = useLocation();
  const imageUrl = new URLSearchParams(location.search).get("param1");

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "POST",
        url: "/graphql",
        headers: {
          "content-type": "application/json",
        },
        data: {
          query: `{
            products(search: "${productSku}", pageSize: 10) {
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
          }`,
        },
      };

      try {
        const response = await axios.request(options);
        setProduct(response?.data?.data?.products?.items);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [productSku]);

  return (
    <div className="container">
      {product.map((product) => (
        <div
          key={product.id}
          className="product-details"
          style={{ display: "flex", gap: "40px" }}
        >
          <div>
            <img src={imageUrl} alt={product.name} />
          </div>

          <div className="product-info">
            <p>sku:{product.sku}</p>
            <h3>{product.name}</h3>
            <p className="product-price">
              Price: {product.price.regularPrice.amount.value}{" "}
              {product.price.regularPrice.amount.currency}
            </p>
            <div style={{ display: "flex" }}>
              {/* <div
              className="arrow-button"
              onClick={() => dispatch(decrementItem(product))}
            >
              <FaMinus /> */}
              {/* </div> */}
              <div className="item-count-detail">
                {" "}
                <FaMinus
                  className="arrow-button-detail"
                  onClick={() => dispatch(decrementItem(product))}
                />
                {product.itemCount}{" "}
                <FaPlus
                  className="arrow-button-detail"
                  onClick={() => dispatch(incrementItem(product))}
                />
              </div>
              {/* <div
              className="arrow-button"
              onClick={() => dispatch(incrementItem(product))}
            >
              <FaPlus />
            </div> */}
              <div>
                <button
                  className="add-to-cart-button"
                  onClick={() => dispatch(addItem(product))}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductDetail;
