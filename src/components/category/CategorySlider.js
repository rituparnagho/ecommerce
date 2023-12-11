import React, { useState, useEffect } from 'react';
import './Category.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { fetchDataCategory } from '../../utils/categorySlice';
import { useDispatch, useSelector } from 'react-redux';

const Category = () => {
  const dispatch = useDispatch();
  const { items: data, status } = useSelector((state) => state.category);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    const stickyThreshold = 100;
    setIsSticky(offset > stickyThreshold);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="container">
      <div className={`main ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
        <div className="hamburger-icon" onClick={toggleMobileMenu}>
          <GiHamburgerMenu />
        </div>
        {status === 'succeeded' && data.length !== 0 && (
          <div className={`category-list-container ${isSticky ? 'sticky' : ''}`}>
            {isMobileMenuOpen && (
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
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
