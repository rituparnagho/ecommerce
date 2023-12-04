import React, { useEffect, useState } from 'react';
import "./ProductList.css"
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../utils/productSlice';
import './ProductList.css'; 
import { addItem, decrementItem } from '../../utils/cartSlice';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import Slider from '@mui/material/Slider';
import Spinner from '../../components/Spinner';

const ProductList = () => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.items);
  const status = useSelector((state) => state.product.status);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState({});
  const [sortOrder, setSortOrder] = useState('lowToHigh'); // Default sorting order
  const [price, setPrice] = useState([0, 50000]);
  const [isSliderVisible, setIsSliderVisible] = useState(false);

  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const fetchDataAndHandleError = async () => {
      try {
        await dispatch(fetchData()).unwrap();
        initializeQuantity(productData);
      } catch (error) {
        const errorMessage = error.payload;

        setError(errorMessage || 'An error occurred');
      }
    };

    fetchDataAndHandleError();
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = async() => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;

      if (isAtBottom && hasMore && !loadingMore) {
        setLoadingMore(true);
        try {
          await dispatch(fetchData()).unwrap();
        } finally {
          setLoadingMore(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dispatch, hasMore, loadingMore]);

  if (status === 'loading') {
    return <p><Spinner /></p>; // You can add a loading spinner or any loading indicator
  }

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

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  const toggleSliderVisibility = () => {
    setIsSliderVisible(!isSliderVisible);
  };


  return (
    <div className="container">
    {error ? (
      <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"200px"}}>
        <p>Error: {error}</p>
      </div>
    ) : (
    <div className="container">
      <h1 className='listing-head'>End Of Year Sale Up To 60%</h1>
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
            PRICE {isSliderVisible ? <FaAngleUp style={{marginLeft:"55px"}}/> : <FaAngleDown style={{marginLeft:"55px"}}/>}
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
            <label htmlFor="sortSelect" style={{ marginTop: "9px" }}>Sort By:</label>
            <select id="sortSelect" onChange={handleSortChange} value={sortOrder}>
              <option value="lowToHigh">Low to High</option>
              <option value="highToLow">High to Low</option>
            </select>
          </div>
          <div className="product-list">
            {sortedProductData.map((product, index) => (
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
                {index === sortedProductData.length - 1 && loadingMore && (
      // Loading indicator when fetching more data
      <p><Spinner/></p>
    )}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
     )}
     </div>
  );
};

export default ProductList;
