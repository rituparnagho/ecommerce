import React, { useRef } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation,Autoplay } from "swiper";
import "swiper/css/navigation";
import "swiper/css/bundle";

SwiperCore.use([Navigation]);

const Home = () => {
  const sliderRef = useRef();
  const slides = [
   "https://prod.aaw.com/media/weltpixel/owlcarouselslider/images/d/e/desktop_gif_hp_nov_en.gif",
   "https://prod.aaw.com/media/weltpixel/owlcarouselslider/images/1/8/1800_x_600.jpg",
   "https://prod.aaw.com/media/weltpixel/owlcarouselslider/images/d/w/dw_ft_-_nov_-_desktop.jpg"
  ];

  return (
    <div className='container'>
    <div style={{paddingLeft:"60px" }}>
      <Swiper
       modules={[Navigation, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
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
            <div><img src={ele} alt="" height="470" width="100%"/></div>
          </SwiperSlide>
        ))}
      </Swiper>
    
      <div className="swiper-button-next-2" onClick={() => sliderRef.current?.slideNext()}>
          <IoIosArrowForward />
      </div>
      <div className="swiper-button-prev-2" onClick={() => sliderRef.current?.slidePrev()}>
          <IoIosArrowBack />
      </div>
    </div>
    </div>
  );
};

export default Home;
