/* eslint-disable react-refresh/only-export-components */
import { useState, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cartItems || {});
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("User auth check failed:", error.message);
      setUser(null);
    }
  };

  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      if (data.success) {
        setIsSeller(true);
      } else {
        setIsSeller(false);
      }
    } catch (error) {
      console.error("Seller auth check failed:", error.message);
      setIsSeller(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      toast.error("Failed to load products: " + error.message);
    }
  };

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await Promise.all([
          fetchUser(),
          location.pathname.includes("/seller") ? fetchSeller() : null,
          fetchProducts(),
        ]);
      } catch (error) {
        console.error("Initialization error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    initializeApp();
  }, []);

  const addToCart = (itemId) => {
    const cartData = { ...cartItems };
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    setCartItems(cartData);
    toast.success("Added to cart");
  };

  const updateCartItem = (itemId, quantity) => {
    const cartData = { ...cartItems };
    if (quantity > 0) {
      cartData[itemId] = quantity;
    } else {
      delete cartData[itemId];
    }
    setCartItems(cartData);
    toast.success("Cart updated");
  };

  const removeFromCart = (itemId) => {
    const cartData = { ...cartItems };
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] <= 0) {
        delete cartData[itemId];
      }
      setCartItems(cartData);
      toast.success("Removed from cart");
    }
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId);
      if (product && cartItems[itemId] > 0) {
        totalAmount += product.offerPrice * cartItems[itemId];
      }
    }
    return parseFloat(totalAmount.toFixed(2));
  };

  useEffect(() => {
    const updateServerCart = async () => {
      if (user) {
        try {
          await axios.post("/api/cart/update", { cartItems });
        } catch (error) {
          toast.error("Failed to update cart: " + error.message);
        }
      }
    };
    updateServerCart();
  }, [cartItems, user]);

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    cartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    currency,
    searchQuery,
    setSearchQuery,
    getCartCount,
    getCartAmount,
    axios,
    fetchProducts,
    setCartItems,
    isLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
