import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import SellerLogin from "./components/seller/SellerLogin";
import SellerLayout from "./pages/seller/SellerLayout";
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AddAddress from "./pages/AddAddress";
import MyOrders from "./pages/MyOrders";
import AddProduct from "./pages/seller/AddProduct";
import ProductList from "./pages/seller/ProductList";
import Orders from "./pages/seller/Orders";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";
import Loading from "./components/Loading";
import Contact from "./pages/Contact.jsx";
import SellerProtectedRoute from "./components/SellerProtectedRoute";
const App = () => {
  const location = useLocation();
  const isSellerPath = location.pathname.includes("/seller");
  const { showUserLogin, isLoading, } = useAppContext();

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <Loading fullScreen />
      </div>
    );
  }

  return (
    <div className="text-default min-h-screen text-gray-700 bg-white">
      {!isSellerPath && <Navbar />}
      {showUserLogin && <Login />}
      <Toaster position="top-center" />

      <div
        className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/seller-login" element={<SellerLogin />} />

          <Route path="/contact" element={<Contact />} />
          <Route
            path="/seller"
            element={
              <SellerProtectedRoute>
                <SellerLayout />
              </SellerProtectedRoute>
            }
          >
            <Route index element={<AddProduct />} />
            <Route path="product-list" element={<ProductList />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Routes>
      </div>

      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;
