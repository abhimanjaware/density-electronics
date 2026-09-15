import { Routes, Route } from 'react-router-dom';
import Sell from './pages/Sell';
import About from './pages/About';
import ScrollToTop from './components/ScrollToTop'; // <-- 1. Import it here
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderReady from './pages/OrderReady';
import Categories from './pages/Categories';
import Bulk from './pages/Bulk';

function App() {
  return (
    <>
      <ScrollToTop /> {/* <-- 2. Add it right here */}
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/bulk" element={<Bulk />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product/:slug" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order-ready" element={<OrderReady />} />
          <Route path="categories" element={<Categories />} />
          <Route path="/sell" element={<Sell />} />
        <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;