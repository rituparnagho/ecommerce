// CartPage.js
import React from "react";
import "./CartPage.css";
import { useSelector, useDispatch } from "react-redux";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { FaPlus, FaMinus } from "react-icons/fa";
import { decrementItem, incrementItem } from "../../utils/cartSlice";


const CartPage = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.itemCount * item.price.regularPrice.amount.value,
    0
  );

  return (
      <div className="container">
    <div className="cart-page">
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
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
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td className="quantity-container">
                      <FaMinus
                        className="arrow-button"
                        onClick={() => dispatch(decrementItem(item))}
                      />
                      <div className="item-count">
                      {item.itemCount}
                      </div>
                      <FaPlus
                        className="arrow-button"
                        onClick={() => dispatch(incrementItem(item))}
                      />
                    </td>
                    <td>KD {(item.itemCount * item.price.regularPrice.amount.value).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            {/* Subtotal */}
            <div className="subtotal-container">
              <p className="subtotal-label">Subtotal:</p>
              <p className="subtotal-amount">KD {subtotal.toFixed(2)}</p>
            </div>
          </div>
        
          
          </>
        )}
      </div>
    </div>

  );
};

export default CartPage;
