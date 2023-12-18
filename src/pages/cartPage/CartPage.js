// CartPage.js
import React, { useState } from "react";
import "./CartPage.css";
import { useSelector, useDispatch } from "react-redux";
// import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { FaPlus, FaMinus } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { decrementItem, incrementItem } from "../../utils/cartSlice";
import { updateCart } from "../../utils/updateCartSlice";
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';


const CartPage = () => {
  // const cartItems = useSelector((store) => store.cart.items);
  // const cartItems = useSelector((state) => state.cart.cartData.items);
  const cartItems = useSelector((state) => state.fetchCart?.fetchCartData?.items);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1)

  // Calculate subtotal
  // const subtotal = cartItems.reduce(
  //   (total, item) => total + item.itemCount * item.price.regularPrice.amount.value,
  //   0
  // );


  const handleDecrement =() => {
    if(count>1){
      setCount(count-1)
    }
  }
  const handleIncrement =() => {
    setCount(count-1)
  }
  const handleUpdate = (item) => {
    dispatch(updateCart(item));
  };

  return (
      <div className="container">
        <div className="cart-data-container">
    <div className="cart-page">
        <h2>Shopping Cart</h2>
        {cartItems?.length === 0 ? (
          <>
            <p style={{ paddingBottom: "20px", fontSize: "15px" }}>You have no items in your shopping cart.</p>
            <p style={{ fontSize: "15px" }}>Click<a href="/" style={{ display: 'inline', whiteSpace: 'nowrap' }}>here</a>to continue shopping.</p>
          </>
        ) : (
            <>
          <div style={{display:"flex" }}>
          <div>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>SubTotal</th>
                </tr>
              </thead>
              <tbody>
                {cartItems?.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div style={{display:"flex"}}>
                      <img src={item.product.image.url} alt={item.product.name}/>
                      <p className="cart-table-para">{item.product.name}</p>
                      </div>
                      </td>
                    <td>KD {(item?.product?.price?.regularPrice?.amount?.value).toFixed(3)}</td>
                    <td>
                      <div style={{display:"flex" , marginTop:"37px"}}>
                      <div>
                      <FaMinus
                        className="arrow-button"
                        onClick={() => handleDecrement()}
                      />
                      </div>
                      <div className="item-count">
                      {item.quantity}
                      </div>
                      <div>
                      <FaPlus
                        className="arrow-button"
                        onClick={() => handleIncrement()}
                      />
                      </div>
                      </div>
                      <div className="update-button" onClick={()=> handleUpdate(item)}>
                        <button>
                        <FaCartShopping className="cart-svg" size={17}/>update
                        </button>
                      </div>
                    </td>
                    <td>KD {(item?.product?.price?.regularPrice?.amount?.value * item.quantity).toFixed(3)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            {/* Subtotal */}
            {/* <div className="subtotal-container">
              <p className="subtotal-label">Subtotal:</p>
              <p className="subtotal-amount">KD {subtotal.toFixed(2)}</p>
            </div> */}
          </div>

          <div className="update-shopping-cart">
            Update Shopping Cart
          </div>

            <div style={{marginTop:"44px", fontSize:"14px", color:"rgb(77 70 70)"}}>
            <div style={{marginBottom:"20px",display:"flex", alignItems:"center"}}>Gift options <FaAngleDown/></div>
          <div className="line"></div>
          </div>

          <div>
            <h2>have a promo code?</h2>
            <div className="discount-section">
              <p style={{marginTop:"40px", marginBottom:"20px"}}>Apply Discount Code</p>
              <input placeholder="Enter Code Here..."/>
              <button>Apply</button>
            </div>

            <h1 style={{fontSize:"24px" , fontWeight:700}}>
            REDEEM GIFT CARD
            </h1>
          </div>
        
          
          </>
        )}


<div>
  
</div>
      </div>



      {/* checkout */}

      <div className="cart-summary">
      <h2 className="summary-title">Summary</h2>
      <div className="line"></div>
      <p className="summary-para">Estimate Shipping and Tax</p>
      <div className="line"></div>
      <div className="subtotal-container-cart-page">
            <p className="subtotal-label-cart-page">Subtotal</p>
            {/* <p className="subtotal-amount">KD {subtotal.toFixed(2)}</p> */}
            <p className="subtotal-amount-cart-page">KD 000</p>
          </div>
          <div className="subtotal-container-cart-page">
            <p className="subtotal-label-cart-page">Tax</p>
            <p className="subtotal-amount-cart-page">KD 000</p>
          </div>
          <div className="line"></div>

          <div className="subtotal-container-cart-page">
            <h3>Order Total</h3>
            <h3>KD 000</h3>
          </div>

          <div className="payment-cart">
          or 4 interest-free payments of KWD 83.500. No fees. Shariah-compliant. Learn more
          </div>
          <div className="cart-checkout">
            <button>
              Proceed to Checkout
            </button>
          </div>
    </div>

      </div>
    </div>

  );
};

export default CartPage;
