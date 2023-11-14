import React, { useState, useEffect } from 'react';
import "./Category.css";
import { RxHamburgerMenu } from "react-icons/rx";

const Category = () => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Adjust the threshold as needed
      const scrollThreshold = 2;

      if (scrollY > scrollThreshold) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`container ${isFixed ? 'fixed' : ''}`}>
      <div className='main'>
        {/* <span className='hamburger'><RxHamburgerMenu/></span> */}
        <div className='category-group' style={{ marginLeft: "30px" }}>Products</div>
        <div className='category-group'>Brands</div>
        <div className='cat-bos'><img src='https://static.aawweb.com/media/theme/kitchens/images/bosch_logo_1.png' alt='' /></div>
        <div className='cat-nol'><img src='https://static.aawweb.com/media/wysiwyg/kitchens/nolte.svg' alt='' /></div>
        <div className='cat-del'>Deals</div>
        <div className='category-group'>Gift Card</div>
        <div className='category-group'>After Sales Service Request</div>
      </div>
    </div>
  );
}

export default Category;
