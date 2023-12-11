import React, { useEffect, useState } from "react";
import { Autoplay } from 'swiper/modules';
import SwiperCore from "swiper";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Splider.css";


// Install the Swiper modules
SwiperCore.use([Autoplay]);





const Splider = () => {
  const swiperParams = {
    spaceBetween: 5,
    // slidesPerView: 1,
    navigation: true,
    pagination: { clickable: true },
    autoplay: true,
    breakpoints: {
      360:{
        slidesPerView: 2,
      },
      760: {
        slidesPerView: 3,
      },
      767: {
        slidesPerView: 4,
      },
      992: {
        slidesPerView: 5,
      },
      1200: {
        slidesPerView: 5,
      },
      1600: {
        slidesPerView: 5,
      },
    },
  };

  return (
    <div className="swipe-custom">
      <Swiper {...swiperParams}>
      <SwiperSlide>
          {/* <div className="brand-logo"> */}
            <img
              src="https://static.aawweb.com/media/wysiwyg/kitchens/logos/stadlerform.jpg"
              alt=""
              style={{ width: "90%" }}
            />
          {/* </div> */}
        </SwiperSlide>
        <SwiperSlide>
          {/* <div className="brand-logo"> */}
            <img
              src="https://static.aawweb.com/media/wysiwyg/kitchens/logos/lacornue.jpg"
              alt=""
              style={{ width: "90%" }}
            />
          {/* </div> */}
        </SwiperSlide>
        <SwiperSlide>
          {/* <div className="brand-logo"> */}
            <img
              src="https://static.aawweb.com/media/wysiwyg/kitchens/logos/westmark.jpg"
              alt=""
              style={{ width: "90%" }}
            />
          {/* </div> */}
        </SwiperSlide>
        <SwiperSlide>
          {/* <div className="brand-logo"> */}
            <img
              src="https://static.aawweb.com/media/amasty/shopby/option_images/rosti_mepal.png"
              alt=""
              style={{ width: "90%" }}
            />
          {/* </div> */}
        </SwiperSlide>
        <SwiperSlide>
          {/* <div className="brand-logo"> */}
            <img
              src="https://static.aawweb.com/media/wysiwyg/kitchens/logos/coleman.jpg"
              alt=""
              style={{ width: "90%" }}
            />
          {/* </div> */}
        </SwiperSlide>
        <SwiperSlide>
          {/* <div className="brand-logo"> */}
            <img
              src="https://static.aawweb.com/media/wysiwyg/kitchens/logos/campingaz.jpg"
              alt=""
              style={{ width: "90%" }}
            />
          {/* </div> */}
        </SwiperSlide>
        <SwiperSlide>
          {/* <div className="brand-logo"> */}
            <img
              src="https://static.aawweb.com/media/wysiwyg/kitchens/logos/snowpeak.jpg"
              alt=""
              style={{ width: "90%" }}
            />
          {/* </div> */}
        </SwiperSlide>
        {/* Add more SwiperSlides as needed */}

      </Swiper>
    </div>
  );
};

export default Splider;