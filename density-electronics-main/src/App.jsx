import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import MainLayout from "./layouts/MainLayout";
import { Toaster } from "react-hot-toast";

// ============================================================
// MAIN WEBSITE PAGES
// ============================================================

const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderReady = lazy(() => import("./pages/OrderReady"));
const Categories = lazy(() => import("./pages/Categories"));
const Bulk = lazy(() => import("./pages/Bulk"));
const Sell = lazy(() => import("./pages/Sell"));
const About = lazy(() => import("./pages/About"));
const Payment = lazy(() => import("./pages/Payment"));

// ============================================================
// CUSTOMER AUTH
// ============================================================

const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));

// ============================================================
// ADMIN DASHBOARD
// ============================================================

const AdminDashboard = lazy(() => import("./AdminDashboard"));

function App() {
  return (
    <>
      {/* ======================================================
          SCROLL TO TOP
      ====================================================== */}

      <ScrollToTop />

      {/* ======================================================
          GLOBAL TOAST NOTIFICATIONS
      ====================================================== */}

      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#1e293b",
            color: "#fff",
            fontWeight: "900",
            fontSize: "13px",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            borderRadius: "8px",
            border: "1px solid #334155",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
          },

          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },

          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />

      {/* ======================================================
          LAZY LOADING
      ====================================================== */}

      <Suspense
        fallback={
          <div
            className="min-h-screen bg-slate-50 flex items-center justify-center"
            aria-label="Loading page"
          >
            <div className="text-center">

              <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-3"></div>

              <p className="text-xs font-black text-slate-600 uppercase tracking-widest">
                Loading...
              </p>

            </div>
          </div>
        }
      >

        <Routes>

          {/* ==================================================
              CUSTOMER AUTH ROUTES
          ================================================== */}

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          {/* ==================================================
              MAIN WEBSITE ROUTES
          ================================================== */}

          <Route
            path="/"
            element={<MainLayout />}
          >

            {/* HOME */}

            <Route
              index
              element={<Home />}
            />

            {/* BULK */}

            <Route
              path="bulk"
              element={<Bulk />}
            />

            {/* SHOP */}

            <Route
              path="shop"
              element={<Shop />}
            />

            {/* PRODUCT DETAILS */}

            <Route
              path="product/:slug"
              element={<ProductDetails />}
            />

            {/* CART */}

            <Route
              path="cart"
              element={<Cart />}
            />

            {/* CHECKOUT
                Login required inside Checkout.jsx */}

            <Route
              path="checkout"
              element={<Checkout />}
            />

            {/* ORDER READY */}

            <Route
              path="order-ready"
              element={<OrderReady />}
            />

            {/* CATEGORIES */}

            <Route
              path="categories"
              element={<Categories />}
            />

            {/* SELL */}

            <Route
              path="sell"
              element={<Sell />}
            />

            {/* ABOUT */}

            <Route
              path="about"
              element={<About />}
            />

            {/* PAYMENT */}

            <Route
              path="payment"
              element={<Payment />}
            />

          </Route>

          {/* ==================================================
              ADMIN DASHBOARD
          ================================================== */}

          <Route
            path="/admin-dashboard"
            element={<AdminDashboard />}
          />

        </Routes>

      </Suspense>
    </>
  );
}

export default App;