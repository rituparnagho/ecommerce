import React from "react";
import "./Wrapper.css";
import { GrLocation } from "react-icons/gr";
import { HiOutlineUser } from "react-icons/hi";
import { FiHeart } from "react-icons/fi";
import { BsHandbag } from "react-icons/bs";

const Wrapper = () => {
  return (
    <div className="container">
    <div className="main-wrap">
    
          <img
            src="https://prod.aaw.com/media/logo/stores/13/logo-512.png"
            title=""
            alt=""
          />
      <div className="wrapper-contents">
        <div  style={{ display: "flex" , marginBottom: "30px", justifyContent: 'flex-end'}}>
          <div className="content-wrap">
            <div >
              <GrLocation size={17} color="rgb(211, 205, 205)"/>
            </div>
            <div className="content">
              <p>Stores</p>
            </div>
          </div>
          <div className="content-wrap">
            <div className="icon">
              <HiOutlineUser size={18} />
            </div>
            <div className="content">
              <p>Sign In</p>
            </div>
          </div>
          <div className="content-wrap">
            <div className="icon">
              <FiHeart size={18} color="rgb(132, 130, 130)"/>
            </div>
            <div className="content">
              <p>Wishlist</p>
            </div>
          </div>
          <div className="content-wrap">
            <div>
              <BsHandbag size={18} />
            </div>
          </div>
        </div>
        <div className="search">
          <input type="text" placeholder="What are you looking for?" style={{ width: "460px" }} />
          <button className="search-button">Search</button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Wrapper;
