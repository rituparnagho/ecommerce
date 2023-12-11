import React, { useRef } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import "./Slider.css";
import { Autoplay } from 'swiper/modules';
import SwiperCore from "swiper";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
SwiperCore.use([Autoplay]);

const Slider = () => {
  const sliderRef = useRef();
  const slides = [
    'Worldwide Shipping',
    '14 day Exchange/Refund policy',
    'Free Delivery on All Orders.',
    'Delivery within 48 Hours',
  ];

  return (
    <div className="sider-container">
    <div className="header-global-promo">
      <div style={{ width: "56%" }}>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          // onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => (sliderRef.current = swiper)}
          loop={true}
          autoplay={true}
          navigation={{
            nextEl: '.swiper-button-next-2',
            prevEl: '.swiper-button-prev-2',
          }}
        >
          {slides.map((ele, i) => (
            <SwiperSlide key={i}>
              <div className="aftr-bx">{ele}</div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="swiper-button-prev-2" onClick={() => sliderRef.current?.slidePrev()}>
        <IoIosArrowBack />
      </div>
      <div className="swiper-button-next-2" onClick={() => sliderRef.current?.slideNext()}>
        <IoIosArrowForward />
      </div>
    </div>
</div>
  );
};

export default Slider;