// components/SellerCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStore } from "react-icons/fa";

const SellerCard = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-emerald-100 to-white py-10 px-6 md:px-24 rounded-xl shadow-sm hover:shadow-md transition mt-10 mb-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-3">
            Want to Sell on FreshBasket?
          </h2>
          <p className="text-gray-600 max-w-xl text-sm md:text-base">
            Access your seller dashboard to manage inventory, view orders, and
            scale your grocery business with ease.
          </p>
        </div>

        <button
          onClick={() => navigate("/seller-login")}
          className="flex items-center gap-2 mt-6 md:mt-0 px-6 py-3 bg-primary text-white rounded-full text-sm font-medium hover:bg-emerald-600 transition"
        >
          <FaStore className="text-white" size={18} />
          Login as Seller
        </button>
      </div>
    </div>
  );
};

export default SellerCard;
