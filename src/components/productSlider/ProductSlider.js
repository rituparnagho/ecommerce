import React, { useEffect, useState } from "react";
import { Autoplay } from 'swiper/modules';
import SwiperCore from "swiper";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "./ProductSlider.css";
import axios from "axios";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addItem, addProductsToCart, decrementItem } from "../../utils/cartSlice";
import { Link } from "react-router-dom";
import { FETCH_PRODUCTS_SLIDER_QUERY } from "../../utils/queries/fetchProductSliderQuery";
// import { FETCH_PRODUCTS_SLIDER_QUERY } from "../../utils/queries/graphqlQueries";

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
          query: FETCH_PRODUCTS_SLIDER_QUERY, 
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

  // const handleQuantityChange = (product, action) => {
  //   const updatedQuantity = { ...quantity };

  //   if (action === "plus") {
  //     updatedQuantity[product.id] += 1;
  //     dispatch(addItem(product));
  //   } else if (action === "minus" && updatedQuantity[product.id] > 0) {
  //     updatedQuantity[product.id] -= 1;
  //       dispatch(decrementItem(product));
  //   }

  //   setQuantity(updatedQuantity);
  // };




  const handleQuantityChange = async (product, action) => {
    console.log("product", product);
    const updatedQuantity = { ...quantity };
  
    if (action === "plus") {
      updatedQuantity[product.id] += 1;
  
      // Dispatch the addProductsToCart thunk
      try {
        await dispatch(
          addProductsToCart({
            cartId: 'Vq3sZJ9TZVA4a6UmSsGhgY9xJrLQrE1P', 
            cartItems: [
              {
                "customizable_options": 
                  {
                    "id": "12",
                    "value_string": ""
                  },
                "data": {
                  "quantity": 2,
                  "sku": "CPETPEJ068TRSP0001"
                }
              }
            ]
            ,
          })
        );
      } catch (error) {
        console.error('Error adding product to cart:', error);
      }
    } else if (action === "minus" && updatedQuantity[product.id] > 0) {
      updatedQuantity[product.id] -= 1;
      dispatch(decrementItem(product));
    }
  
    setQuantity(updatedQuantity);
  };
  




  const swiperParams = {
    spaceBetween: 50,
    slidesPerView: 5,
    navigation: true,
    pagination: { clickable: true },
    autoplay: true,
    // navigation,
    breakpoints: {
      300: {
        slidesPerView: 1,
        spaceBetween: 10,       
      },
      375: {
        slidesPerView: 2,
        spaceBetween: 10,       
      },
      430: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 50,
      },
      980: {
        
        slidesPerView: 4,
      },
      1150: {
        
        slidesPerView: 5,
      },
    }
  };

  return (
    // <div style={{boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"}}>
    <div className="product-container-slider">
    <Swiper {...swiperParams}>
      {product.map((product, index) => (
        <SwiperSlide key={index}>
          <div className="product-card">
            <button className="sale-button">SAVE 36%</button>
            <Link to={`/products/${product.sku}?param1=${image[index % image.length]}`}>
            <img src={image[index % image.length]} alt={`Product ${index + 1}`} />
            </Link>

            {/* Plus-Minus Tab */}
            <div className="plus-minus">
              <div>
                <button className="reduce-qty-1" onClick={() => handleQuantityChange(product, "minus")}>
                  <FaMinus />
                </button>
              </div>
              <div className="input-cart">
                {/* {quantity[product.id]} */}
                0
              </div>
              <div>
                <button className="add-qty-1" onClick={() => handleQuantityChange(product, "plus")}>
                  <FaPlus />
                </button>
              </div>
            </div>
            <h3>{product.name}</h3>
            <h4 style={{textAlign:"center",   color:" #131212", fontSize: "15px" , fontWeight:600}}>Bosch</h4>
            <p style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>
              KD {product?.price?.regularPrice?.amount?.value}.000
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
    </div>
  );
};

export default ProductSlider;
