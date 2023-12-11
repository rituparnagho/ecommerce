import React, { useState, useEffect } from "react";
import "./Category.css";

import { fetchDataCategory } from "../../utils/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { BsHandbag } from "react-icons/bs";

const Category = () => {
  const dispatch = useDispatch();
  const { items: data, status } = useSelector((state) => state.category);

  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    const stickyThreshold = 100;
    setIsSticky(offset > stickyThreshold);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchDataCategory());
  }, [dispatch]);

  const renderDropdown = (children) => {
    return (
      <ul className="dropdown">
        {children.map((child, idx) => (
          <li key={idx}>
            <a href={`#${child.path}`}>{child.name}</a>
          </li>
        ))}
      </ul>
    );
  };
  const renderCategoryList = () => (
    <ul className="category-list">
      {data.map((item, id) => {
        if (item?.children?.length !== 0) {
          return (
            <li key={id}>
              <a href="#!">{item?.name}</a>
              {renderDropdown(item.children)}
            </li>
          );
        }
        return null;
      })}
    </ul>
  );

  const renderStickyHeader = () => (
    <div style={{ display: "flex" }}>
      <div className="sticky-img">
        <img
          src="https://prod.aaw.com/media/logo/stores/13/logo-512.png"
          alt="Logo"
        />
      </div>
      <div
        style={{
          width: "100%",
          position: "relative",
          right: "111px",
          backgroundColor: "#fff",
        }}
      >
        {renderCategoryList()}
      </div>
      <div style={{ position: "relative", right: "154px", top: "8px" }}>
        <BsHandbag size={18} />
      </div>
    </div>
  );

  return (
    <div className="container">
      <div
        className={`main ${
          isSticky ? "sticky-header" : ""
        }`}
      >
        {/* <div
          className="hamburger-icon"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          <GiHamburgerMenu />
        </div> */}
        {isSticky ? (
          renderStickyHeader()
        ) : (
          <div className={`category-list-container`}>
             {data?.length !== 0  && (
          <ul className='category-list'>
            {data.map((item, id) => {
              if (item?.children?.length !== 0) {
                return (
                  <li key={id}>
                    <a href="#!">{item?.name}</a>
                    {renderDropdown(item.children)}
                  </li>
                );
              }
              return null;
            })}
          </ul>
        )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
