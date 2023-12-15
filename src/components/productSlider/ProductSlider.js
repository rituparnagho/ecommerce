import React, { useEffect, useState } from "react";
import { Autoplay } from 'swiper/modules';
import SwiperCore from "swiper";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "./ProductSlider.css";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addProductsToCart } from "../../utils/cartSlice";
import { Link } from "react-router-dom";
import { FETCH_PRODUCTS_SLIDER_QUERY } from "../../queries/fetchProductSliderQuery";
// import { FETCH_PRODUCTS_SLIDER_QUERY } from "../../utils/queries/graphqlQueries";

SwiperCore.use([Autoplay]);

const ProductSlider = ({ image }) => {
  const dispatch = useDispatch();
  // const cartItems = useSelector((store) => store.cart.items);
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState({});
  const isLoggedin = localStorage.getItem("customerToken")

  useEffect(() => {
    const fetchData = async () => {
      const query = FETCH_PRODUCTS_SLIDER_QUERY;

      try {
        const response = await fetch('/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        });

        const data = await response.json();
        setProduct(data?.data?.products?.items);
        initializeQuantity(data?.data?.products?.items);
      } catch (error) {
        console.error('Error fetching data:', error);
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


  const handleQuantityChange = async (product, action) => {
    console.log("product", product);
    const updatedQuantity = { ...quantity };

    if (action === "plus") {
      updatedQuantity[product.id] = isNaN(updatedQuantity[product.id]) ? 1 : updatedQuantity[product.id] + 1;
    } else if (action === "minus" && updatedQuantity[product.id] > 0) {
      updatedQuantity[product.id] = isNaN(updatedQuantity[product.id]) ? 0 : updatedQuantity[product.id] - 1;
    }

    setQuantity(updatedQuantity);

    const payload = {
      cartId: isLoggedin? localStorage.getItem("cartId"): localStorage.getItem("customerCart"),
      cartItems: { 
        data: {
          quantity:1,
          sku: product?.variants[0]?.product?.sku
        },
      },
      cartOption:{
        customizable_options:{
          id:product?.configurable_options[0].id,
          value_string:product?.configurable_options[0].id
        }
      },
      parent_sku:product.sku
    }
    try {
      await dispatch(addProductsToCart(payload)).unwrap();
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
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
                {quantity[product.id]}
                {/* 0 */}
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
