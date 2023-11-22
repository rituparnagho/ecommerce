import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CartCard.css";
 import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { decrementItem, incrementItem } from "../../utils/cartSlice";
import { Link } from "react-router-dom";

const CartCard = () => {
  const [isCartVisible, setCartVisibility] = useState(true);
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleCloseClick = () => {
    setCartVisibility(false);
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.itemCount * item.price.regularPrice.amount.value,
    0
  );

  return (
    <>
      {isCartVisible && (
        // <div className="container"> 
        <div className="mini-cart">
          <div className="cart-head">
            <p className="cart-header">My Cart</p>
            <button className="cart-button" onClick={handleCloseClick}>
              Close
            </button>
          </div>
          <div className="cart-items">
            {cartItems.length === 0 ? (
              <p>YOU HAVE NO ITEMS IN YOUR SHOPPING CART</p>
            ) : (
              <ul>
                {cartItems.map((item) => (
                  <li key={item.id}>
                    <p>{item.name}</p>
                    <p className="quantity-container">
                      Quantity:
                      <IoIosArrowBack
                        className="arrow-button"
                        onClick={() => dispatch(decrementItem(item))}
                      />
                      {item.itemCount}
                      <IoIosArrowForward
                        className="arrow-button"
                        onClick={() => dispatch(incrementItem(item))}
                      />
                    </p>
                    <p>Price: KD {(item.itemCount * item.price.regularPrice.amount.value).toFixed(2)}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Subtotal outside the cart-items loop */}
          <div className="subtotal-container">
            <p className="subtotal-label">Subtotal:</p>
            <p className="subtotal-amount">KD {subtotal.toFixed(2)}</p>
          </div>
          <div className="cart-foot">
            <Link to="/cartPage">
              <p className="cart-footer">Check Out</p>
            </Link>
          </div>
        </div>
        // </div>
      )}
    </>
  );
};

export default CartCard;
