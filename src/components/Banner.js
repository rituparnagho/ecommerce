import React from 'react'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Banner = () => {
  return (
    <Swiper
    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
    spaceBetween={50}
    slidesPerView={1}
    autoplay={true}
    navigation
    pagination={{ clickable: true }}
    scrollbar={{ draggable: true }}
    //   onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <img src="https://prod.aaw.com/media/weltpixel/owlcarouselslider/images/1/8/1800_x_600.jpg" alt="" style={{width: "100%"}}/>
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://prod.aaw.com/media/weltpixel/owlcarouselslider/images/d/e/desktop_gif_hp_nov_en.gif" alt="" style={{width: "100%"}} />
      </SwiperSlide>
      <SwiperSlide><img src="https://prod.aaw.com/media/weltpixel/owlcarouselslider/images/c/o/coffee-web-banner_1800x600-.gif" alt="" style={{width: "100%"}} />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://prod.aaw.com/media/weltpixel/owlcarouselslider/images/d/w/dw_ft_-_nov_-_desktop.jpg" alt="" style={{width: "100%"}}/>
      </SwiperSlide>
      
    </Swiper>
  );
}

export default Banner