import React, { useEffect, useState } from "react";
import { Autoplay } from 'swiper/modules';
import SwiperCore from "swiper";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "./ProductSlider.css";


// Install the Swiper modules
SwiperCore.use([Autoplay]);





const Splider = () => {

  const swiperParams = {
    spaceBetween: 20,
    slidesPerView: 5,
    navigation: true,
    pagination: { clickable: true },
    autoplay: true,
    breakpoints: {
      320: {
        slidesPerView: 2,
      },

      767: {
        slidesPerView: 3,
      },

      1280: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    }
  };

  return (
    <Swiper {...swiperParams}>

      <SwiperSlide>
        <div className="brand-logo">
          <img src="https://static.aawweb.com/media/wysiwyg/kitchens/logos/iris.jpg" alt="" style={{ width: "100%" }} />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="brand-logo">
          <img src="https://static.aawweb.com/media/wysiwyg/kitchens/logos/magma.jpg" alt="" style={{ width: "100%" }} />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="brand-logo">
          <img src="https://static.aawweb.com/media/wysiwyg/kitchens/logos/bosch.jpg" alt="" style={{ width: "100%" }} />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="brand-logo">
          <img src="https://static.aawweb.com/media/amasty/shopby/option_images/sub_zero.png" alt="" style={{ width: "100%" }} />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="brand-logo">
          <img src="https://static.aawweb.com/media/wysiwyg/kitchens/logos/faema.jpg" alt="" style={{ width: "100%" }} />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="brand-logo">
          <img src="https://static.aawweb.com/media/wysiwyg/kitchens/logos/amt.jpg" alt="" style={{ width: "100%" }} />
        </div>
      </SwiperSlide>

    </Swiper>
  );
};

export default Splider;
