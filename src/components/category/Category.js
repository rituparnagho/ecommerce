import React, { useState, useEffect } from 'react';
import "./Category.css";
import axios from 'axios';

const Category = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'POST',
        url: '/graphql',
        headers: {
          'content-type': 'application/json'
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
          }`
        }
      };

      try {
        const response = await axios.request(options);
        setData(response?.data?.data?.categoryList[0]?.children)
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);
  // console.log("data", data);

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



  return (
    <div className="container">
      <div className='main'>
         {/* <div className='category-group' style={{ marginLeft: "30px" }}>Products
         
          <div className='dropdown-content'> */}
          {data?.length !== 0 && (
  <ul>
    {data.map((item, id) => {
      if (item?.children?.length !== 0) {
        console.log(item);
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
          {/* </div>
        </div>
        <div className='category-group'>Brands</div>
        <div className='cat-bos'><img src='https://static.aawweb.com/media/theme/kitchens/images/bosch_logo_1.png' alt='' /></div>
        <div className='cat-nol'><img src='https://static.aawweb.com/media/wysiwyg/kitchens/nolte.svg' alt='' /></div>
        <div className='cat-del'>Deals</div>
        <div className='category-group'>Gift Card</div> */}
        {/* <div className='category-group'>After Sales Service Request</div> */}
      </div>
    </div>
  );
}

export default Category;
