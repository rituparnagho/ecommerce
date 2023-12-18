import React, { useEffect, useState } from "react";
import "./Wrapper.css";
import { GrLocation } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiOutlineUser } from "react-icons/hi";
import { FiHeart } from "react-icons/fi";
import { BsHandbag } from "react-icons/bs";
import CartCard from "../cart/CartCard";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchDataCategory } from "../../utils/categorySlice";
import { FaTimes } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { fetchCustomer } from "../../utils/customerSlice";
import ProfileSidebar from "./ProfileSidebar";

const Wrapper = () => {
  const dispatch = useDispatch()
  const customerDetails = useSelector((store) => store.customer.customerData);
  const { items: data } = useSelector((state) => state.category);
  // const cartItems = useSelector((state) => state.cart.cartData.items);
  const cartItems = useSelector((state) => state.fetchCart?.fetchCartData?.items);
  const [isMiniCartOpen, setMiniCartOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileSidebarOpen, setProfileSidebarOpen] = useState(false);
  const customerToken = useSelector((state) => state.token.data);

  useEffect(() => {
    const fetchDataWrapper = async () => {
      try {
        await dispatch(fetchCustomer());
        dispatch(fetchDataCategory());
      } catch (error) {
        // Handle errors if needed
        console.error("Error fetching data:", error);
      }
    };
  
    fetchDataWrapper(); // Call the async function
  
  }, [dispatch, customerToken]);


  const closeSidebar = () => {
    setMobileMenuOpen(false);
  };


  const renderDropdown = (children) => {
    return (
      <ul className="dropdown-wrapper">
        {children.map((child, idx) => (
          <li key={idx}>
            <a href={`#${child.path}`}>{child.name}</a>
          </li>
        ))}
      </ul>
    );
  };

  const handleCartClick = () => {
    setMiniCartOpen(!isMiniCartOpen);
  };

  const handleProfileClick = () => {
    setProfileSidebarOpen(true);
  };

  const closeProfileSidebar = () => {
    setProfileSidebarOpen(false);
  };
  
  const handleLogout = () => {
    localStorage.removeItem("customerToken")
    localStorage.removeItem("customerCart")
    console.log('Logout clicked!');
  };


  return (
    <div className="container">
      <div className="top-header-mobile">
      <div className="mobile-top">
      <div
          className="hamburger-icon"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          <GiHamburgerMenu size={24}/>
        </div>
        {isMobileMenuOpen && (
          <div className="category-list-wrapper">
           <button style={{marginLeft:"84%", marginTop:"4%"}} className="close-button" onClick={closeSidebar}>
          <FaTimes />
        </button>
            {data.map((item, id) => {
              if (item?.children?.length !== 0) {
                return (
                  <li key={id}>
                    <a href={`#${item.path}`}>{item?.name}</a>
                    {renderDropdown(item.children)}
                  </li>
                );
              }
              return null;
            })}
          </div>
        )}
        <div>
        <img
            src="https://prod.aaw.com/media/logo/stores/13/logo-512.png"
            title=""
            alt=""
          />
        </div>
        <div>
        <div className="content-wrap-mobile">
            <div style={{ cursor: 'pointer' }}>
              <BsHandbag size={24} />
              {/* <span className="cart-count-mobile">
                {cartItems?.length} */}
              {/* {cartItems.length &&
                cartItems
                  .map((item) => item.itemCount)
                  .reduce((acc, curr) => acc + curr, 0)} */}
            {/* </span> */}
            </div>
            {/* {isMiniCartOpen && <CartCard />} */}
          </div>
        </div>
        </div>


        <div className="mobile-bottom">
        <div className="search">
          <input type="text" placeholder="What are you looking for?" />
          <button className="search-button"><IoSearch size={24}/></button>
        </div>
        </div>

      </div>


    <div className="main-wrap">
          <Link to="/">
          <img
            src="https://prod.aaw.com/media/logo/stores/13/logo-512.png"
            title=""
            alt=""
          />
          </Link>
      <div className="wrapper-contents">
        <div className="wrapper-contents-icons">
          <div className="content-wrap">
            <div >
              <GrLocation size={17} color="rgb(211, 205, 205)"/>
            </div>
            <div className="content">
              <p>Stores</p>
            </div>
          </div>
          {customerToken ? (
  <div className="content-wrap">
    <div className="icon">
      <HiOutlineUser size={18} />
    </div>
    <div className="content">
      <p style={{ marginBottom: "12px" }} onClick={handleProfileClick}>Profile</p>
    </div>
  </div>
) : (
  <div className="content-wrap">
    <div className="icon">
      <HiOutlineUser size={18} />
    </div>
    <Link style={{ paddingTop: "1px", fontWeight: 500 }} to="/customer/account/login">
      <div className="content">
        <p style={{ marginBottom: "10px" }}>Sign In</p>
      </div>
    </Link>
  </div>
)}
         {isProfileSidebarOpen && <ProfileSidebar onClose={closeProfileSidebar}
          firstname={customerDetails?.firstname}
          lastname={customerDetails?.lastname}
          onLogout={handleLogout} />}




          <div className="content-wrap">
            <div className="icon">
              <FiHeart size={18} color="rgb(132, 130, 130)"/>
            </div>
            <div className="content">
              <p>Wishlist</p>
            </div>
          </div>
          <div className="content-wrap">
            <div onClick={handleCartClick} style={{ cursor: 'pointer' }}>
              <BsHandbag size={18} />
              <span className="cart-count">
                {cartItems?.length}
              {/* {cartItems.length &&
                cartItems
                  .map((item) => item.itemCount)
                  .reduce((acc, curr) => acc + curr, 0)} */}
            </span>
            </div>
            {isMiniCartOpen && <CartCard />}
          </div>
        </div>
        <div className="search">
          <input type="text" placeholder="What are you looking for?" />
          <button className="search-button">Search</button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Wrapper;
