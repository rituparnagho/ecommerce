import React, { useEffect, useState } from "react";
import "./Home.css";
import ProductSlider from "../../components/productSlider/ProductSlider";
import Splider from "../../components/slider/Splider";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import useOnline from "../../hooks/UseOnline";
import UserOffline from "../../components/error/UserOffline";
import AdvantureSlider from "../../components/slider/AdvantureSlider";
import { FaLongArrowAltRight } from "react-icons/fa";
import Banner from "../../components/banner/Banner";
import MaintenancePage from "../MaintenancePage";

import {
  staticImages,
  staticImages1,
  staticImages2,
  staticImages3,
  staticImages4,
} from "../../utils/imageData";
// import { fetchCustomerCart } from "../../utils/customerCartSlice";
import { useDispatch } from "react-redux";


const createEmptyCartMutation = `
mutation {
  createEmptyCart(input: {
    
  })
}
`;

const Home = () => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isOnline = useOnline();
  // const inLoggedin = localStorage.getItem("customerToken")

  useEffect(() => {
    if (!isOnline) {
      // If offline, return early and show the UserOffline component
      setLoading(false);
      return;
    }
    // if(inLoggedin) {
    //   dispatch(fetchCustomerCart())
    // }

     fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: createEmptyCartMutation,
      }),
    })
      .then(response => response.json())
      .then(data => {

        console.log('Mutation Result:', data.data.createEmptyCart);

        // Store the relevant data in localStorage
        if (data.data.createEmptyCart) {
          const cartId = data.data.createEmptyCart;
          const existingCart = localStorage.getItem("cartId")
          if(!existingCart){
           localStorage.setItem('cartId', cartId);
          }
        }
      })
      .catch(error => {
        // Handle errors
        console.error('Mutation Error:', error);
        setLoading(false);
        setError(error);
      });

    // Simulating an asynchronous operation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [isOnline]);


  if (error) {
    return <MaintenancePage />;
  }



  if (!isOnline) {
    return <UserOffline />;
  }

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
                className="view-all"
              >
                  VIEW ALL
              </div>
                </Link>
                <div className="viewall-arrow" >
                <FaLongArrowAltRight />
              </div>
            </div>
            <div className="inner1-title"></div>
          </div>
          <ProductSlider image={staticImages} />
          <div className="banner-down">
            <div className="inner1">Camping Essentials</div>
            <div className="inr1_view" style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
              <Link to="/productList">
              <div
              className="view-all"
              >
                  VIEW ALL
              </div>
                </Link>
                <div className="viewall-arrow" >
                <FaLongArrowAltRight />
              </div>
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
          <div className="banner-down" >
            <h2 className="shop-brand" style={{marginTop:"16px",marginBottom:"6px" }}>Shop By Category</h2>
            <div className="inner1-title"></div>
          </div>
          <div>
          <img src="https://prod.aaw.com/media/weltpixel/owlcarouselslider/images/k/l/kleancanteen_desktop.png" alt="category" className="categoryup-img" />
          </div>
          <div className="category">
            <div className="category-img">
              <img src="https://prod.aaw.com/media/weltpixel/owlcarouselslider/images/b/o/bosch_km2.jpg" alt=""/>
              <h3>KITCHEN MACHINES</h3>
            </div>
            <div className="category-img">
              <img src="https://prod.aaw.com/media/weltpixel/owlcarouselslider/images/6/_/6_1.jpg" alt=""  />
              <h3>BAKEWARE</h3>
            </div>
            <div className="category-img">
              <img src="https://prod.aaw.com/media/weltpixel/owlcarouselslider/images/4/_/4_3.jpg" alt=""  />
              <h3>KNIVES, PEELERS & MORE</h3>
            </div>
            <div className="category-img">
              <img src="https://prod.aaw.com/media/weltpixel/owlcarouselslider/images/5/_/5_3.jpg" alt=""  />
              <h3>COFFEE MAKERS & ACCESSORIES</h3>
            </div>
          </div>
          <div className="banner-down">
            <div className="inner1">Shop Furniture</div>
            <div className="inr1_view" style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
              <Link to="/productList">
              <div
                 className="view-all"
              >
                  VIEW ALL
              </div>
                </Link>
                <div className="viewall-arrow" >
                <FaLongArrowAltRight />
              </div>
            </div>
            <div className="inner1-title"></div>
          </div>
          <ProductSlider image={staticImages2} />
          <div className="banner-down">
            <div className="inner1">Shop Hoods</div>
            <div className="inr1_view" style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
            <Link to="/productList">
              <div
                className="view-all"
              >
                
                  VIEW ALL
              </div>
                </Link>
                <div className="viewall-arrow" >
                <FaLongArrowAltRight />
              </div>
            </div>
            <div className="inner1-title"></div>
          </div>
          <ProductSlider image={staticImages3} />
          <div style={{marginTop:"25px"}}>
            <img src="https://prod.aaw.com/media/weltpixel/owlcarouselslider/images/d/i/dishwasher_desktop.png" alt="" style={{ width: "100%" }} />
          </div>

          <div className="banner-down">
            <div className="inner1">Shop Accessories</div>
            <div className="inr1_view" style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
            <Link to="/productList">
              <div
                className="view-all"
              >
                VIEW ALL
              </div>
               </Link>
             <div className="viewall-arrow" >
                <FaLongArrowAltRight />
              </div>
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