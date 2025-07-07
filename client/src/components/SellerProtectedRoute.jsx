// components/SellerProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const SellerProtectedRoute = ({ children }) => {
  const { isSeller, isLoading } = useAppContext();

  if (isLoading) return null; // wait until auth check completes

  return isSeller ? children : <Navigate to="/seller-login" />;
};

export default SellerProtectedRoute;
