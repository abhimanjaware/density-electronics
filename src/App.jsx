import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderReady from './pages/OrderReady';
import Categories from './pages/Categories';
import Bulk from './pages/Bulk';
import Sell from './pages/Sell';
import About from './pages/About';
import Payment from './pages/Payment';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      {/* Listens to route changes and instantly scrolls to top */}
      <ScrollToTop /> 
      
      {/* Global B2B Toast Notifications */}
      <Toaster 
        position="bottom-center"
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#fff',
            fontWeight: '900',
            fontSize: '13px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            borderRadius: '8px',
            border: '1px solid #334155',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
          },
          success: {
            iconTheme: { primary: '#10b981', secondary: '#fff' },
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#fff' },
          },
        }} 
      />
      
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="bulk" element={<Bulk />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product/:slug" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order-ready" element={<OrderReady />} />
          <Route path="categories" element={<Categories />} />
          <Route path="sell" element={<Sell />} />
          <Route path="about" element={<About />} />
          <Route path="payment" element={<Payment />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;