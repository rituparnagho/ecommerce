// CartPage.js
import React from "react";
import "./CartPage.css";
import { useSelector, useDispatch } from "react-redux";
// import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { FaPlus, FaMinus } from "react-icons/fa";
import { decrementItem, incrementItem } from "../../utils/cartSlice";


const CartPage = () => {
  // const cartItems = useSelector((store) => store.cart.items);
  const cartItems = useSelector((state) => state.cart.cartData.items);
  const dispatch = useDispatch();

  // Calculate subtotal
  // const subtotal = cartItems.reduce(
  //   (total, item) => total + item.itemCount * item.price.regularPrice.amount.value,
  //   0
  // );

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
                    <td>KD {(item?.product?.price?.regularPrice?.amount?.value * item.quantity).toFixed(3)}</td>
                    <td>
                      <div style={{display:"flex"}}>
                      <div>
                      <FaMinus
                        className="arrow-button"
                        onClick={() => dispatch(decrementItem(item))}
                      />
                      </div>
                      <div className="item-count">
                      {item.quantity}
                      </div>
                      <div>
                      <FaPlus
                        className="arrow-button"
                        onClick={() => dispatch(incrementItem(item))}
                      />
                      </div>
                      </div>
                    </td>
                  <td>KD 99.000</td>
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
        
          
          </>
        )}


<div className="line"></div>
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
