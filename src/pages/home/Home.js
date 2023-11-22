import React, { useEffect, useState } from "react";
import "./Home.css";
import Banner from "../../components/Banner";
import ProductSlider from "../../components/ProductSlider";
import { FaLongArrowAltRight } from "react-icons/fa";
import AdvantureSlider from "../../components/AdvantureSlider";
import Splider from "../../components/Splider";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";




const staticImages = [
  "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/0/f/0f9f30be941c83e113175bfc2a8403a8999068ef98635e2932c18a1f0251b80a.jpeg",
  "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/3/3/3328921.png",
  "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/b/7/b7e21c7ee7345813763a3118974f592a7818a672d7255cce93b2b6dbec6b7664.jpeg",
  "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/e/2/e2806b8f3d60630f6ecbabe86c4fb805ea09978f7508b62105515b8a64a75b4e.jpeg",
  "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/e/5/e5e608e6fc6bb7be8c55b9803746b71aac8133971fac7a85804c9fb72a010d8f.jpeg",
];

const staticImages1 = [
  "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/a/6/a61c98b4c3f899fc9ac7382d5ffac54d9bab12d6d30c95b242e0921f288b74ca.jpeg",
  "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/a/a/aawkitchens_oct-22_2nd_3351067-a.jpg",
  "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/4/b/4b9a1141579d74fbd4303cbf522ea42d765d6309015857008e8440695a8a3100.jpeg",
  "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/3/f/3fe4d8d9d48e8ed46ac91c1b5834a8fa99e72ab5869788f51cabf965575b2c0d.jpeg",
  "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/d/5/d5b967c47a486195f7dc49a9ca2cb1e6e4e4a50de349eb40642cfe1c8a94dfd0.jpeg",
];
const staticImages2 = [
  "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/4/0/4027be4feeee449057c45a50158ac42b6ac85d44bea239e556734d0e27c2327b.jpeg",
  "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/a/a/aawkitchens_feb-23_9th_3459634-a.jpg",
  "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/3/3/3385475-a.jpg",
  "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/5/1/5187cd22d4431d18b66307cb0751adc191144d5f4ac5c69a7361f314a6353524.jpeg",
  "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/8/f/8ffe1b45f7a429d14f61a332f8c0473aa26d93192314813fd281563b8d5c2bc2.jpeg"
];

const staticImages3 = [
  "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/c/8/c8327b7e1c167ef6f372f8016bf27d417a6306f5f4505f8145fa71b1a17a853c.jpeg",
  "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/f/d/fd780f4c4a04061373e8aa3a0c4b4a2f64a615192544fb14395f518f74fc38f1.jpeg",
  "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/f/0/f096b0882b0ba15ef510d69c557696314f60a0a246054aff7291d9cbfe8fdf98.jpeg",
  "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/7/7/77dfae71b2ea7162d16698aa304871a77b7752f8c26020be6ed207e0cf736293.jpeg",
  "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/7/1/7157c7d237b4dbee916352c9e2edd678dfbf22d76e1e475acc5bd92aee48be4b.jpeg"
]

const staticImages4 = [
  "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/e/d/ede5c9a3db7fbac46f9c1f4d4871d9f9aa15fea93e5c7c47f5161f6700fc6a2e.jpeg",
  "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/3/8/383ca7643a48f5e7d79e4bdc308e09e3af76e59c1cbc7a79cf3b5878e3573217.jpeg",
  "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/b/b/bbdf8c33075be69ed309010e688fda6ead6fe05c52b2832729491094cb7a8a91.jpeg",
  "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/7/5/7512b75d2a926e4fd3b20c47956d60a8eeecdbdea42bb4952cea409400484e3d.jpeg",
  "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/b/9/b96e6592283538cf67d36ef98bfd1830524be1cd1bf2a324a4218427dc8dd87f.jpeg"
]

const Home = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating an asynchronous operation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container">
          <Banner />
          <div className="banner-down">
            <div className="inner1">Up To 60% Off Sale</div>
            <div className="inr1_view" style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
              <Link to="/productList">
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#03a9f4",
                  textTransform: "uppercase",
                }}
              >
                  VIEW ALL
              </div>
                </Link>
              {/* <div>
                <FaLongArrowAltRight />
              </div> */}
            </div>
            <div className="inner1-title"></div>
          </div>
          <ProductSlider image={staticImages} />
          <div className="banner-down">
            <div className="inner1">Camping Essentials</div>
            <div className="inr1_view" style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
              <Link to="/productList">
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#03a9f4",
                  textTransform: "uppercase",
                }}
              >
                  VIEW ALL
              </div>
                </Link>
              {/* <div>
                <FaLongArrowAltRight />
              </div> */}
            </div>
            <div className="inner1-title"></div>
          </div>
          <ProductSlider image={staticImages1} />
          <div className="advanture-slider">
            <AdvantureSlider />
          </div>
          <div className="brand">
            <h2 className="shop-brand">Shop By Brands</h2>
          </div>
          <Splider />
          <div className="brand">
            <h2 className="shop-brand">Shop By Category</h2>
          </div>
          <img src="https://prod.aaw.com/media/weltpixel/owlcarouselslider/images/k/l/kleancanteen_desktop.png" alt="category" style={{ width: "100%" }} />
          <div className="category">
            <div>
              <img src="https://prod.aaw.com/media/weltpixel/owlcarouselslider/images/b/o/bosch_km2.jpg" alt="" style={{ width: "100%" }} />
              <h3>KITCHEN MACHINES</h3>
            </div>
            <div>
              <img src="https://prod.aaw.com/media/weltpixel/owlcarouselslider/images/6/_/6_1.jpg" alt="" style={{ width: "100%" }} />
              <h3>BAKEWARE</h3>
            </div>
            <div>
              <img src="https://prod.aaw.com/media/weltpixel/owlcarouselslider/images/4/_/4_3.jpg" alt="" style={{ width: "100%" }} />
              <h3>KNIVES, PEELERS & MORE</h3>
            </div>
            <div>
              <img src="https://prod.aaw.com/media/weltpixel/owlcarouselslider/images/5/_/5_3.jpg" alt="" style={{ width: "100%" }} />
              <h3>COFFEE MAKERS & ACCESSORIES</h3>
            </div>
          </div>
          <div className="banner-down">
            <div className="inner1">Shop Garden Lights & Furniture</div>
            <div className="inr1_view" style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
              <Link to="/productList">
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#03a9f4",
                  textTransform: "uppercase",
                }}
              >
                  VIEW ALL
              </div>
                </Link>
              {/* <div>
                <FaLongArrowAltRight />
              </div> */}
            </div>
            <div className="inner1-title"></div>
          </div>
          <ProductSlider image={staticImages2} />
          <div className="banner-down">
            <div className="inner1">Shop Hoods</div>
            <div className="inr1_view" style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
            <Link to="/productList">
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#03a9f4",
                  textTransform: "uppercase",
                }}
              >
                
                  VIEW ALL
              </div>
                </Link>
              {/* <div>
                <FaLongArrowAltRight />
              </div> */}
            </div>
            <div className="inner1-title"></div>
          </div>
          <ProductSlider image={staticImages3} />
          <div style={{ width: '98%' }}>
            <img src="https://prod.aaw.com/media/weltpixel/owlcarouselslider/images/d/i/dishwasher_desktop.png" alt="" style={{ width: "100%" }} />
          </div>

          <div className="banner-down">
            <div className="inner1">Shop Accessories</div>
            <div className="inr1_view" style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
            <Link to="/productList">
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#03a9f4",
                  textTransform: "uppercase",
                }}
              >
                VIEW ALL
              </div>
               </Link>
              {/* <div>
                <FaLongArrowAltRight />
              </div> */}
            </div>
            <div className="inner1-title"></div>
          </div>
          <ProductSlider image={staticImages4} />
        </div>
      )}
    </div>
  );
};

export default Home;
