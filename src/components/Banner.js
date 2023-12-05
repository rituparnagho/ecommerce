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
    autoplay={{ delay: 2500, disableOnInteraction: false }}
    pagination={{ clickable: true }}
    scrollbar={{ draggable: true }}
    breakpoints={{
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 1,
        spaceBetween: 50,
      },
    }}
  >
      <div className='container'>
      <SwiperSlide>
      <div style={{ width: '100%' }}>
        <img src="https://prod.aaw.com/media/weltpixel/owlcarouselslider/images/d/e/dec4_homepage_desktop.jpg" className="swiper-image" alt="" style={{width: "100%"}}/>
        </div>
      </SwiperSlide>
      {/* <SwiperSlide>
        <img src="https://prod.aaw.com/media/weltpixel/owlcarouselslider/images/1/8/1800_x_600.jpg" className="swiper-image" alt="" style={{width: "100%"}}/>
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://prod.aaw.com/media/weltpixel/owlcarouselslider/images/d/e/desktop_gif_hp_nov_en.gif" className="swiper-image" alt="" style={{width: "100%"}} />
      </SwiperSlide>
      <SwiperSlide><img src="https://prod.aaw.com/media/weltpixel/owlcarouselslider/images/c/o/coffee-web-banner_1800x600-.gif" className="swiper-image" alt="" style={{width: "100%"}} />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://prod.aaw.com/media/weltpixel/owlcarouselslider/images/d/w/dw_ft_-_nov_-_desktop.jpg" className="swiper-image" alt="" style={{width: "100%"}}/>
      </SwiperSlide> */}
      </div>
    </Swiper>
  );
}

export default Banner