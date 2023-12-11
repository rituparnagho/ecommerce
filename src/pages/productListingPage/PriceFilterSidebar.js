// PriceFilterSidebar.js

import React from 'react';
import Slider from '@mui/material/Slider';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';

const PriceFilterSidebar = ({
  price,
  priceHandler,
  isSliderVisible,
  toggleSliderVisibility,
  closeSidebar
}) => {
  return (
    <div className="price-filter-sidebar">
         <div className="sidebar-header">
        <h4>FILTERS</h4>
        <button className="close-button" onClick={closeSidebar}>
          <FaTimes />
        </button>
      </div>
      <p onClick={toggleSliderVisibility}>
        PRICE {isSliderVisible ? <FaAngleUp /> : <FaAngleDown />}
      </p>
   
      {isSliderVisible && (
        <>
          <Slider
            value={price}
            onChange={priceHandler}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            min={0}
            max={50000}
          />
        </>
      )}
       <p>
            CONSTRUCTION TYPE <FaAngleDown/>
          </p>
          <h6>My wishlist</h6>
            <p
          >
            YOU HAVE NO ITEMS IN YOUR WISHLIST
          </p>
      {/* ... other filter options ... */}
    </div>
  );
};

export default PriceFilterSidebar;
