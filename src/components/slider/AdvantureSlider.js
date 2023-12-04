import React from "react";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../components/productSlider/ProductSlider.css";


const AdvantureSlider = () => {

  const swiperParams = {
    spaceBetween: 20,
    slidesPerView: 3,
    // navigation: true,
  };

  return (
    <Swiper {...swiperParams}>
         <SwiperSlide>
            <div className="advanture">
         <img  src="https://prod.aaw.com/media/wysiwyg/Home_Page_Nested_Washers.jpg" alt="" style={{width: "100%",borderRadius:"9px"}}/>
         <p>SHOP WASHERS & DRYERS</p>
         </div>
       </SwiperSlide>
         <SwiperSlide>
         <div className="advanture">
         <img src="https://prod.aaw.com/media/wysiwyg/Bosch_Blender.png" alt="" style={{width: "100%"}}/>
         <p>SHOP BLENDERS</p>
         </div>
       </SwiperSlide>
         <SwiperSlide>
         <div className="advanture">
         <img src="https://prod.aaw.com/media/wysiwyg/Home_Page_Nested_Ref.jpg" alt="" style={{width: "100%"}}/>
         <p>SHOP REFRIGERATORS</p>
         </div>
       </SwiperSlide>
       <SwiperSlide>
       <div className="advanture">
         <img src="https://prod.aaw.com/media/wysiwyg/Home_Page_Nested_Washers.jpg" alt="" style={{width: "100%"}}/>
         <p>SHOP WASHERS & DRYERS</p>
         </div>
       </SwiperSlide>
         <SwiperSlide>
         <div className="advanture">
         <img src="https://prod.aaw.com/media/wysiwyg/Bosch_Blender.png" alt="" style={{width: "100%"}}/>
         <p>SHOP BLENDERS</p>
         </div>
       </SwiperSlide>
         <SwiperSlide>
         <div className="advanture">
         <img src="https://prod.aaw.com/media/wysiwyg/Home_Page_Nested_Ref.jpg" alt="" style={{width: "100%"}}/>
         <p>SHOP REFRIGERATORS</p>
         </div>
       </SwiperSlide>
    </Swiper>
  );
};

export default AdvantureSlider;
