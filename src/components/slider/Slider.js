import React, { useRef } from 'react';
import "./Slider.css"
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import SwiperCore from "swiper";
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


SwiperCore.use([Navigation]);

const Slider = () => {
  const sliderRef = useRef();
  const slides = [
    'Worldwide Shipping',
    '14 day Exchange/Refund policy',
    'Free Delivery on All Orders.',
    'Delivery within 48 Hours',
  ];

  return (
    <div className="header-global-promo">
      <div className='container' style={{display:"flex", justifyContent:"center"}}>
      <div style={{width:"30%"}}>
      <Swiper
       modules={[Navigation, Autoplay]}
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
      <div  className="swiper-button-next-2" onClick={() => sliderRef.current?.slideNext()}>
          <IoIosArrowForward />
      </div>
      <div className="swiper-button-prev-2" onClick={() => sliderRef.current?.slidePrev()}>
          <IoIosArrowBack />
      </div>
    </div>
   </div>
  );
};

export default Slider;
