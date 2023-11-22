import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import CartPage from './pages/cartPage/CartPage';
import ProductList from './pages/productListingPage/ProductList';
import ProductDetail from './pages/productDetailPage/ProductDetail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/cartPage" element={<CartPage/>}/>
        <Route path="/productList" element={<ProductList/>}/>
        <Route path="/products/:productSku" element={<ProductDetail/>} />
      </Routes>
     <Footer/>
    </div>
    </BrowserRouter>
  );
}

export default App;
