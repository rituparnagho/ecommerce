import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { FaMinus, FaPlus } from "react-icons/fa";
import { addItem, decrementItem, incrementItem } from "../../utils/cartSlice";
import { useDispatch, useSelector } from "react-redux";

import { FETCH_SINGLE_PRODUCT_QUERY } from "../../utils/queries/graphqlQueries";
import ProductSlider from "../../components/productSlider/ProductSlider";


const productImage =[
  "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/0/f/0f9f30be941c83e113175bfc2a8403a8999068ef98635e2932c18a1f0251b80a.jpeg",
  "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/3/3/3328921.png",
  "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/b/7/b7e21c7ee7345813763a3118974f592a7818a672d7255cce93b2b6dbec6b7664.jpeg",
  "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/e/2/e2806b8f3d60630f6ecbabe86c4fb805ea09978f7508b62105515b8a64a75b4e.jpeg",
  "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/e/5/e5e608e6fc6bb7be8c55b9803746b71aac8133971fac7a85804c9fb72a010d8f.jpeg",
];

const ProductDetail = () => {
  const { productSku } = useParams();
  const [product, setProduct] = useState([]);
  const location = useLocation();
  const imageUrl = new URLSearchParams(location.search).get("param1");

  // Retrieve the cart items from the Redux store
  const cartItems = useSelector((store) => store.cart.items);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const productQuery = FETCH_SINGLE_PRODUCT_QUERY(productSku);
        const response = await fetch('/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: productQuery,
          }),
        });
  
        const data = await response.json();
        setProduct(data?.data?.products?.items);
      } catch (error) {
        console.error('Error fetching product data:', error);
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
          style={{ display: "flex", gap: "40px", fontFamily: '"Lato", Helvetica, Arial, sans-serif' }}
        >
          <div>
            <img src={imageUrl} alt={product.name} />
          </div>

          <div className="product-info">
            <div style={{justifyContent:"start", borderBottom:"1px solid black"}}> 
            <p style={{padding: "10px"}}>sku:{product.sku}</p>
            <h3 style={{padding: "22px"}}>{product.name} | 4 Dishwasher 60cm Silver Inox</h3>
            <p style={{ color: "black",fontSize: "20px", fontWeight: "bold" }}>
              KD {product.price.regularPrice.amount.value}{" "}
              {product.price.regularPrice.amount.currency}
            </p>
            </div>
            {/* The feature content will be rendered here without ul and li tags */}

            <div style={{margin:"10px"}}>
            <div className="payment-content-1" >
              <span>or 4 interest-free payments of <strong>KWD 46.250</strong>. No fees. Shariah-compliant. Learn more</span>
            </div>
            <div className="payment-content-2" >
              <span>Split in up to 4 interest-free payments of <strong>KWD 46.250</strong>, or pay in full! Learn more </span>
            </div>
            </div>


            <div style={{ display: "flex", gap: "15px", marginTop: "35px", borderTop: "1px solid black" }}>
              <div className="item-count-detail">
                {" "}
                <FaMinus
                  className="arrow-button-detail-minus"
                  // onClick={() => dispatch(decrementItem(product))}
                />
                <div>
                {cartItems[product.id]?.quantity || 0}
                </div>
                <FaPlus
                  className="arrow-button-detail-plus"
                  // onClick={() => dispatch(incrementItem(product))}
                />
              </div>
              <div>
                <button
                  className="add-to-cart-button"
                  // onClick={() => dispatch(addItem(product))}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>



        </div>
      ))}

      <div style={{ display: "flex", height: "220px" }}>
        <img src={imageUrl} />
        <img src={imageUrl} />
        <img src={imageUrl} />
        <img src={imageUrl} />
      </div>

      <table className="product-table"> 
        <thead>
          <tr>
            <th>Description</th>
          
          </tr>
        </thead>
        <tbody>
          {product.map((product) => (
            <tr key={product.id}>
              <td>{new DOMParser().parseFromString(product.short_description.html, 'text/html').body.textContent}</td>
            </tr>
          ))}
        </tbody>
      </table>

    <div>
      <h1>More from Triple</h1>
      <ProductSlider image ={productImage}/>
    </div>





    </div>
  );
};

export default ProductDetail;
