import React from "react";
import "./Footer.css";
import { FaAngleRight } from "react-icons/fa6";
import image1 from "../../images/first.png";
import image2 from "../../images/second.png";
import image3 from "../../images/third.png";
import social from "../../images/social.png"
const Footer = () => {
  return (
    <>
      {/* <div style={{maxWidth:"100%", margin:"0 auto"}}> */}
      <div className="footer-container">
        <div className="footer-content" style={{ backgroundColor: "#00527b", marginTop: "40px" }}>

          <div className="panel-footer">
            <div className="footer-section1">
              <div className="footer-icon">
                <img src={image1} width={70} />
              </div>
              <div className="footer-text">
                <span>Make Your Selection</span>
                <p>
                  Call or email for professional advice and find the perfect
                  appliance for your needs
                </p>
              </div>
            </div>
            <div
              className="footer-section2"
            >
              <div className="footer-icon">
                <img src={image2} width={60} />
              </div>
              <div className="footer-text">
                <span>Place Your Order</span>
                <p>
                  Order safely &amp; securely backed by powerful Yahoo encryption
                  technology
                </p>
              </div>
            </div>
            <div className="footer-section3">
              <div className="footer-icon">
                <img src={image3} width={50} />
              </div>
              <div className="footer-text">
                <span>Receive Your New Appliances</span>
                <p>
                  You will be called to arrange a convenient delivery time to
                  receive your new appliances
                </p>
              </div>
            </div>
          </div>
          <div className="footer-row">
            <div className="footer-middle-section1">
              <div className="footer-brand">
                <img
                  src="https://prod.aaw.com/media/wysiwyg/aawkitchens_files/AAW_footer_logo.png"
                  title=""
                  alt=""
                />
              </div>
              <div className="social">
                <img src={social}
                  title=""
                  alt="" />
              </div>
            </div>
            <div className="footer-middle-section2">
              <div className="nav-footer">
                <ul className="nav-footer-menu1-container" style={{ width: "216px" }}>
                  <li><FaAngleRight style={{ padding: "2px" }} /> Products</li>
                  <li><FaAngleRight style={{ padding: "2px" }} /> About Us</li>
                  <li><FaAngleRight style={{ padding: "2px" }} /> Events</li>
                  <li><FaAngleRight style={{ padding: "2px" }} /> Projects Awarded</li>
                </ul>
                <ul className="nav-footer-menu2-container" style={{ width: "169px" }}>
                  <li><FaAngleRight style={{ padding: "2px" }} /> Register</li>
                  <li><FaAngleRight style={{ padding: "2px" }} /> Login</li>
                  <li><FaAngleRight style={{ padding: "2px" }} /> My Account</li>
                  <li><FaAngleRight style={{ padding: "2px" }} /> My Wishlist</li>
                </ul>
                <ul className="nav-footer-menu3-container" style={{ width: "287px" }}>
                  <li><FaAngleRight style={{ padding: "2px" }} /> Terms & Condition</li>
                  <li><FaAngleRight style={{ padding: "2px" }} /> Data Privacy</li>
                  <li><FaAngleRight style={{ padding: "2px" }} /> Contact Us</li>
                  <li><FaAngleRight style={{ padding: "2px" }} /> Gift Card</li>
                  <li><FaAngleRight style={{ padding: "2px" }} /> Exchange/Return option within 14 days</li>
                </ul>
              </div>
              <div className="widget">
                <img src="https://static.aawweb.com/media/wysiwyg/kitchens/GIVE-85-X-41.png" alt="" />
              </div>
            </div>
            <div className="footer-middle-section3">
              {/* <div className="footer-middle-section3-container"> */}
              <div><label>Sign Up for Our Newsletter</label></div>
              <div className="ftr_form">
              <div className="form">
                <input type="text" placeholder="Enter your email address" />
              </div>
              <button className="signup-button">SIGNUP</button>
              </div>
              {/* </div> */}
            </div>
          </div>
          <div className="footer-payment-icons">
            <img src="https://prod.aaw.com/media/wysiwyg/common/icon_tamara.png" alt="" />
            <img src="https://prod.aaw.com/media/wysiwyg/common/icon_tabby.png" alt="" />
            <img src="https://prod.aaw.com/media/wysiwyg/common/icon_knet.png" alt="" />
            <img src="https://prod.aaw.com/media/wysiwyg/common/icon_visa.png" alt="" />
            <img src="https://prod.aaw.com/media/wysiwyg/common/icon_mastercard.png" alt="" />
            <img src="https://prod.aaw.com/media/wysiwyg/common/icon_amex.png" alt="" />
            <img src="https://prod.aaw.com/media/wysiwyg/common/icon_applepay.png" alt="" />
          </div>
          <div className="bottom-footer">
            © Copyright 2022 Ali Abdulwahab Al Mutawa.
          </div>
        </div>
      </div>
    </>

  );
};

export default Footer;