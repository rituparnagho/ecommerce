import React, { useEffect, useState } from 'react';
import "./ProductList.css"
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../utils/productSlice';
import './ProductList.css'; 
import { addProductsToCart } from '../../utils/cartSlice';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import Slider from '@mui/material/Slider';
import Spinner from '../../components/Spinner';
import PriceFilterSidebar from './PriceFilterSidebar';

const ProductList = () => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.items);
  const status = useSelector((state) => state.product.status);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState({});
  const [sortOrder, setSortOrder] = useState('lowToHigh'); 
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12; 
  const [price, setPrice] = useState([0, 50000]);
  const [isSliderVisible, setIsSliderVisible] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  useEffect(() => {
    const fetchDataAndHandleError = async () => {
      try {
        // Dispatch the fetchData async thunk when the component mounts
        await dispatch(fetchData()).unwrap();
        initializeQuantity(productData);
      } catch (error) {
        // Handle the rejected state and access the error message
        const errorMessage = error.payload;
  
        // Assuming setError is a state setter function
        setError(errorMessage || 'An error occurred');
      }
    };
  
    fetchDataAndHandleError();
  }, [dispatch, productData]);


  if (status === 'loading') {
    return <p><Spinner/></p>; // You can add a loading spinner or any loading indicator
  }

  const initializeQuantity = (products) => {
    const initialQuantity = {};
    products.forEach((product) => {
      initialQuantity[product.id] = 0;
    });
    setQuantity(initialQuantity);
  };

  const handleQuantityChange = async (product, action) => {
    console.log("product", product);
    const updatedQuantity = { ...quantity };

    if (action === "plus") {
      updatedQuantity[product.id] = isNaN(updatedQuantity[product.id]) ? 1 : updatedQuantity[product.id] + 1;
    } else if (action === "minus" && updatedQuantity[product.id] > 0) {
      updatedQuantity[product.id] = isNaN(updatedQuantity[product.id]) ? 0 : updatedQuantity[product.id] - 1;
    }

    setQuantity(updatedQuantity);

    const payload = {
      cartId: "Vq3sZJ9TZVA4a6UmSsGhgY9xJrLQrE1P",
      cartItems: { 
        data: {
          // quantity: updatedQuantity[product.id],
          quantity:2,
          sku: product.sku,
        },
      },
      cartOption:{
        customizable_options:{
          id:12,
          value_string:""
        }
      }
    }
    try {
      await dispatch(addProductsToCart(payload)).unwrap();
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
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

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  const toggleSliderVisibility = () => {
    setIsSliderVisible(!isSliderVisible);
  };




  const toggleSidebarVisibility = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };




  return (
    <div >
    {error ? (
      <div className="container">
      <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"200px"}}>
        <p>Error: {error}</p>
      </div>
      </div>
    ) : (
    <div className="container">
      <h1 className='listing-head'>End Of Year Sale Up To 60%</h1>

      <div className="product-list-container-response">
        <div className="filter-button" onClick={toggleSidebarVisibility}>
          Filter
        </div>

        {/* Price Filter Sidebar */}
        {isSidebarVisible && (
          <PriceFilterSidebar
            price={price}
            priceHandler={priceHandler}
            isSliderVisible={isSliderVisible}
            toggleSliderVisibility={toggleSliderVisibility}
            closeSidebar={closeSidebar}
          />
        )}
</div>

      <div className="product-list-container">      
        <div className='price-filter'>
          <h4
            style={{
              fontSize: "15px",
              borderBottom: "2px solid #eee",
              paddingBottom: "10px",
              padding: "13px",
            }}

          >
            FILTERS
          </h4>

          <p
            style={{
              fontSize: "15px",
              borderBottom: "2px solid #eee",
              paddingBottom: "10px",
              padding: "13px",
              cursor: "pointer"
            }}
            onClick={toggleSliderVisibility}
          >
            PRICE {isSliderVisible ? <FaAngleUp style={{marginLeft:"166px"}}/> : <FaAngleDown style={{marginLeft:"166px"}}/>}
          </p>
          {isSliderVisible && (
            <>
              <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={50000}
              />
            </>
          )}
          <p
            style={{
              fontSize: "15px",
              borderBottom: "2px solid #eee",
              paddingBottom: "10px",
              padding: "13px",
            }}
          >
            CONSTRUCTION TYPE <FaAngleDown style={{marginLeft:"49px"}}/>
          </p>
          <h6 style={{
              fontSize: "10px",
              paddingBottom: "10px",
              padding: "13px",
            }}>My wishlist</h6>
            <p
            style={{
              fontSize: "11px",
              borderBottom: "2px solid #eee",
              paddingBottom: "10px",
              padding: "13px",
            }}
          >
            YOU HAVE NO ITEMS IN YOUR WISHLIST
          </p>
        </div>
        <div className='sort-product-container'>
          <div className="sort-options">
            <label htmlFor="sortSelect" style={{ marginTop: "11px", fontSize:"12px", textTransform:"uppercase" }}>Sort By</label>
            <select id="sortSelect" onChange={handleSortChange} value={sortOrder}>
              <option value="lowToHigh">Low to High</option>
              <option value="highToLow">High to Low</option>
            </select>
          </div>
          <div className="product-list">
            {currentProducts.map((product) => (
              <div key={product.id} className="product-card-list">
                <img src="https://prod.aaw.com/media/catalog/product/cache/b8e9ee3e3eebf01caeedeb184a52afee/e/2/e2806b8f3d60630f6ecbabe86c4fb805ea09978f7508b62105515b8a64a75b4e.jpeg" alt={product.name} className="product-image" />

                {/* Plus-Minus Tab */}
                <div className="plus-minus">
                  <div>
                    <button className="reduce-qty-1" onClick={() => handleQuantityChange(product, "minus")}>
                      <FaMinus />
                    </button>
                  </div>
                  <div className="input-cart">
                    0
                    {/* {quantity[product.id]} */}
                  </div>
                  <div>
                    <button className="add-qty-1" onClick={() => handleQuantityChange(product, "plus")}>
                      <FaPlus />
                    </button>
                  </div>
                </div>

                <div className="product-details-list">
                  <p className="product-name">{product.name}</p>
                  <p className="product-price">
                  KD {product.price.regularPrice.amount.value} {product.price.regularPrice.amount.currency}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

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
     )}
     </div>
  );
};

export default ProductList;
