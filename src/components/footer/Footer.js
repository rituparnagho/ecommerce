import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer-content" style={{backgroundColor:"#00527b"}}>
        <div className="panel-footer" style={{display:"flex"}}>
          <div className="footer-section1">
            <span className="footer-icon" ></span>
            <div className="footer-text">
              <span>Make Your Selection</span>
              <p>
                Call or email for professional advice and find the perfect
                appliance for your needs
              </p>
            </div>
          </div>
          <div className="footer-section2">
            <span className="footer-icon"></span>
            <div className="footer-text">
              <span>Place Your Order</span>
              <p>
                Order safely &amp; securely backed by powerful Yahoo encryption
                technology
              </p>
            </div>
          </div>
          <div className="footer-section3">
            <span className="footer-icon"></span>
            <div className="footer-text">
              <span>Receive Your New Appliances</span>
              <p>
                You will be called to arrange a convenient delivery time to
                receive your new appliances
              </p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Footer;
