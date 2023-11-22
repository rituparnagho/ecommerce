import React, { useEffect, useState } from 'react';
import "./ProductList.css"
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../utils/productSlice';

import './ProductList.css'; // Import your CSS file
import { addItem, decrementItem } from '../../utils/cartSlice';
import { FaMinus, FaPlus } from 'react-icons/fa';

const ProductList = () => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.items);
  const [quantity, setQuantity] = useState({});
  const [sortOrder, setSortOrder] = useState('lowToHigh'); // Default sorting order
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12; // Adjust as needed

  // console.log("productData",productData.id);


  useEffect(() => {
    // Dispatch the fetchData async thunk when the component mounts
    dispatch(fetchData());
    initializeQuantity(productData);
  }, [dispatch]);

  const initializeQuantity = (products) => {
    const initialQuantity = {};
    products.forEach((product) => {
      initialQuantity[product.id] = 0;
    });
    setQuantity(initialQuantity);
  };

const handleQuantityChange = (product, action) => {
  const updatedQuantity = { ...quantity };

  if (action === "plus") {
    updatedQuantity[product.id] = isNaN(updatedQuantity[product.id]) ? 1 : updatedQuantity[product.id] + 1;
    dispatch(addItem(product));
  } else if (action === "minus" && updatedQuantity[product.id] > 0) {
    updatedQuantity[product.id] = isNaN(updatedQuantity[product.id]) ? 0 : updatedQuantity[product.id] - 1;
    dispatch(decrementItem(product));
  }

  setQuantity(updatedQuantity);
};

 
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };
  const sortedProductData = [...productData].sort((a, b) => {
    const priceA = parseFloat(a.price.regularPrice.amount.value);
    const priceB = parseFloat(b.price.regularPrice.amount.value);

    if (isNaN(priceA) || isNaN(priceB)) {
      console.error('Invalid price format:', a.price.regularPrice.amount.value, b.price.regularPrice.amount.value);
    }

    if (sortOrder === 'lowToHigh') {
      return priceA - priceB;
    } else {
      return priceB - priceA;
    }
  });

  const totalPages = Math.ceil(sortedProductData.length / productsPerPage);

  // Calculate the range of pages to display
  const pageRange = 4;
  const startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
  const endPage = Math.min(totalPages, startPage + pageRange - 1);


   // Calculate the indexes for the current page
   const indexOfLastProduct = currentPage * productsPerPage;
   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
   const currentProducts = sortedProductData.slice(indexOfFirstProduct, indexOfLastProduct);

  //  console.log("quantity", quantity);
 

   


  return (
    <div className="product-list-container">
      <div className="sort-options">
        <label htmlFor="sortSelect" style={{marginTop:"9px"}}>Sort By:</label>
        <select id="sortSelect" onChange={handleSortChange} value={sortOrder}>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>
      </div>
      <div className="product-list">
        {currentProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image.url} alt={product.name} className="product-image" />

  {/* Plus-Minus Tab */}
  <div className="plus-minus">
              <div>
                <button className="reduce-qty-1" onClick={() => handleQuantityChange(product, "minus")}>
                  <FaMinus />
                </button>
              </div>
              <div className="input-cart">
                {quantity[product.id]}
              </div>
              <div>
                <button className="add-qty-1" onClick={() => handleQuantityChange(product, "plus")}>
                  <FaPlus />
                </button>
              </div>
            </div>

            <div className="product-details">
              <p className="product-name">{product.name}</p>
              <p className="product-price">
                Price: {product.price.regularPrice.amount.value} {product.price.regularPrice.amount.currency}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <button
            key={startPage + index}
            onClick={() => handlePageChange(startPage + index)}
            className={currentPage === startPage + index ? 'active' : ''}
          >
            {startPage + index}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
