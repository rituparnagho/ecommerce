import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CartCard.css";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { decrementItem, fetchCartData, incrementItem } from "../../utils/cartSlice";
import { Link } from "react-router-dom";

const CartCard = () => {
  const [isCartVisible, setCartVisibility] = useState(true);
  const dispatch = useDispatch();
  const cartId = localStorage.getItem("cartId")

  useEffect(() => {
    dispatch(fetchCartData(cartId));
  }, [cartId, dispatch]);

  const cartData = useSelector((state) => state.cart.cartData.items);
  // const cartStatus = useSelector((state) => state.cart.status);
  // const cartError = useSelector((state) => state.cart.error);

  const handleCloseClick = () => {
    setCartVisibility(false);
  };

  // Calculate subtotal
  // const subtotal = cartData.reduce(
  //   (total, item) =>
  //     total + item.product.price.regularPrice.amount.value * item.quantity,
  //   0
  // );

  return (
    <>
      {isCartVisible && (
        <div className="mini-cart">
          <div className="cart-head">
            <p className="cart-header">My Cart</p>
            <button className="cart-button" onClick={handleCloseClick}>
              Close
            </button>
          </div>
          <div className="cart-items">
            {cartData?.length === 0 ? (
              <p>YOU HAVE NO ITEMS IN YOUR SHOPPING CART</p>
            ) : (
              <ul>
                {cartData?.map((item) => (
                  <li key={item.id}>
                    <div className="cart-product">
                      <img src={item.product.image.url} alt={item.product.name} />
                      <p className="cart-product-para">{item.product.name}</p>
                      <button>Delete</button>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <p className="quantity-container">
                        Quantity:
                        <IoIosArrowBack
                          className="arrow-button"
                          onClick={() => dispatch(decrementItem(item))}
                        />
                        {item.quantity}
                        <IoIosArrowForward
                          className="arrow-button"
                          onClick={() => dispatch(incrementItem(item))}
                        />
                      </p>
                      <p>KD {(item?.product?.price?.regularPrice?.amount?.value * item.quantity).toFixed(3)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Display the subtotal */}
          <div className="bottom-cart-container">
          <div className="subtotal-container">
            <p className="subtotal-label">Subtotal:</p>
            {/* <p className="subtotal-amount">KD {subtotal.toFixed(2)}</p> */}
          </div>
          <div className="cart-foot">
            <Link to="/cartPage">
              <p className="cart-footer">Check Out</p>
            </Link>
          </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartCard;
