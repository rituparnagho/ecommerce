import React, { useState, useEffect } from 'react';
import './Category.css';
import axios from 'axios';
import { GiHamburgerMenu } from "react-icons/gi";

const Category = () => {
  const [data, setData] = useState([]);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const fetchData = async () => {
    const options = {
      method: 'POST',
      url: '/graphql',
      headers: {
        'content-type': 'application/json',
      },
      data: {
        query: `{
          categoryList(filters: {ids:{eq: "467"}}) {
            uid,
            name,
            id,
            level,
            children_count
            children {
              id
              level
              name
              path
              url_path
              url_key
              image
              description
              children {
                id
                level
                name
                path
                url_path
                url_key
                image
                description
              }
            }
          }
        }`,
      },
    };

    try {
      const response = await axios.request(options);
      setData(response?.data?.data?.categoryList[0]?.children);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      // Fetch data when the window is resized
      fetchData();
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
        {/* Hamburger Menu Icon for Mobile */}
        <div className="hamburger-icon" onClick={toggleMobileMenu}>
          <GiHamburgerMenu />
        </div>
        {data?.length !== 0 && !isMobileMenuOpen && (
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
    </div>
  );
};

export default Category;
