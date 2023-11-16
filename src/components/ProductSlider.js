import React, { useEffect, useState } from "react";
import {Autoplay } from 'swiper/modules';
import SwiperCore from "swiper";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "./ProductSlider.css";
import axios from "axios";
import { FaPlus, FaMinus } from "react-icons/fa";

// Install the Swiper modules
SwiperCore.use([Autoplay]);

const staticImages = [
  "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/0/f/0f9f30be941c83e113175bfc2a8403a8999068ef98635e2932c18a1f0251b80a.jpeg",
  "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/3/3/3328921.png",
  "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/b/7/b7e21c7ee7345813763a3118974f592a7818a672d7255cce93b2b6dbec6b7664.jpeg",
  "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/e/2/e2806b8f3d60630f6ecbabe86c4fb805ea09978f7508b62105515b8a64a75b4e.jpeg",
  "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/e/5/e5e608e6fc6bb7be8c55b9803746b71aac8133971fac7a85804c9fb72a010d8f.jpeg",
];

const ProductSlider = () => {
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(0);

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
        // console.log("data", response);
        setProduct(response?.data?.data?.products?.items);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = (product) => {
    console.log("Added to cart:", product);
  };

  const handleQuantityChange = (product, action) => {
    if (action === "plus") {
      setQuantity(quantity + 1);
    } else if (action === "minus" && quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  const swiperParams = {
    spaceBetween: 20,
    slidesPerView: 5,
    navigation: true,
    pagination: { clickable: true },
    autoplay:true
  };

  return (
    <Swiper {...swiperParams}>
      {product.map((product, index) => (
        <SwiperSlide key={index}>
          <div className="product-card">
            <button className="sale-button">SALE</button>
          <img src={staticImages[index % staticImages.length]} alt={`Product ${index + 1}`} />
            <h3
              style={{
                textAlign: "center",
                fontSize: "15px",
                color: "rgb(159, 151, 151)",
              }}
            >
              {product.name}
            </h3>
            <p
              style={{ textAlign: "center", color: "red", fontWeight: "bold" }}
            >
              KD {product?.price?.regularPrice?.amount?.value}.000
            </p>

            {/* Plus Icon (Add-to-Cart Button) */}
            {/* <div className="add-to-cart">
              <span onClick={() => handleAddToCart(product)}><FaPlus/></span>
            </div> */}

            {/* Plus-Minus Tab */}
            <div className="plus-minus-tab">
              <span onClick={() => handleQuantityChange(product, "minus")}>
                <FaMinus />
              </span>
              {/* <span>{quantity}</span> */}
              <span>quantity</span>
              <span onClick={() => handleQuantityChange(product, "plus")}>
                <FaPlus />
              </span>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductSlider;
