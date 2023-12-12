import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import CartPage from './pages/cartPage/CartPage';
import ProductList from './pages/productListingPage/ProductList';
import ProductDetail from './pages/productDetailPage/ProductDetail';
import Error from './components/error/Error';
import CustomerLogin from './pages/customerProfilePage/CustomerLogin';
import CreateCustomer from './pages/customerProfilePage/CreateCustomer';
// import CartComponent from './pages/CartComponent';



function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        {/* <Route path="/cart" element={<CartComponent/>}/> */}
        <Route path="/cartPage" element={<CartPage/>}/>
        <Route path="/productList" element={<ProductList/>}/>
        <Route path="/products/:productSku" element={<ProductDetail/>} />
        <Route path="*" element={<Error />} />
        <Route path="/customer/account/login" element={<CustomerLogin/>}/>
        <Route path="/customer/account/create" element={<CreateCustomer/>}/>
      </Routes>
     <Footer/>
    </div>
    </BrowserRouter>
  );
}

export default App;
