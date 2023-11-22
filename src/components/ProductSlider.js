import React, { useEffect, useState } from "react";
import { Autoplay } from 'swiper/modules';
import SwiperCore from "swiper";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "./ProductSlider.css";
import axios from "axios";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addItem, decrementItem } from "../utils/cartSlice";
import { Link } from "react-router-dom";

// Install the Swiper modules
SwiperCore.use([Autoplay]);

const ProductSlider = ({ image }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState({});

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
          }`,
        },
      };

      try {
        const response = await axios.request(options);
        setProduct(response?.data?.data?.products?.items);
        initializeQuantity(response?.data?.data?.products?.items);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  const initializeQuantity = (products) => {
    const initialQuantity = {};
    products.forEach((product) => {
      initialQuantity[product.id] = 0;
    });
    setQuantity(initialQuantity);
  };

  const handleQuantityChange = (product, action) => {
    const updatedQuantity = { ...quantity };

    if (action === "plus") {
      updatedQuantity[product.id] += 1;
      dispatch(addItem(product));
    } else if (action === "minus" && updatedQuantity[product.id] > 0) {
      updatedQuantity[product.id] -= 1;
        dispatch(decrementItem(product));
    }

    setQuantity(updatedQuantity);
  };

  const swiperParams = {
    spaceBetween: 20,
    slidesPerView: 5,
    navigation: true,
    pagination: { clickable: true },
    autoplay: true,
    // breakpoints: {
    //   320: {
    //     slidesPerView: 2,
    //   },

    //   767: {
    //     slidesPerView: 3,
    //   },
    // }
  };

  return (
    <Swiper {...swiperParams}>
      {product.map((product, index) => (
        <SwiperSlide key={index}>
          <div className="product-card">
            <button className="sale-button">SALE</button>
            {/* <Link to={`/products/${product.sku}?param1=${image[index % image.length]}`}> */}
            <img src={image[index % image.length]} alt={`Product ${index + 1}`} />
            {/* </Link> */}

            {/* Plus-Minus Tab */}
            <div className="plus-minus">
              <div>
                <button className="reduce-qty-1" onClick={() => handleQuantityChange(product, "minus")}>
                  <FaMinus />
                </button>
              </div>
              <div className="input-cart">
                {quantity[product.id]}
              </div>
              <div>
                <button className="add-qty-1" onClick={() => handleQuantityChange(product, "plus")}>
                  <FaPlus />
                </button>
              </div>
            </div>

            <h3>{product.name}</h3>
            <p style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>
              KD {product?.price?.regularPrice?.amount?.value}.000
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductSlider;
