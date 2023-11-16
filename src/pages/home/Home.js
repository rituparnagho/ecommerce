import React from "react";
import "./Home.css";
import Banner from "../../components/Banner";
import ProductSlider from "../../components/ProductSlider";
import { FaLongArrowAltRight } from "react-icons/fa";

const Home = () => {
  return (
    <div className="container">
      <Banner />
      <div className="banner-down">
        <div className="inner1">Up To 60% Off Sale</div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap:"8px" }}>
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
          <div>
            <FaLongArrowAltRight />
          </div>
        </div>
        <div className="inner1-title"></div>
      </div>
      <ProductSlider />
    </div>
  );
};

export default Home;
