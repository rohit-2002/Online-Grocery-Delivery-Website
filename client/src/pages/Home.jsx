import React from "react";
import MainBanner from "./../components/MainBanner";
import Categories from "./../components/Categories";
import BestSeller from "./../components/BestSeller";
import BottomBanner from "../components/BottomBanner";
import NewsLetter from "../assets/NewsLetter";
import SellerCard from "../components/SellerCard";
const Home = () => {
  return (
    <div className="mt-10">
      <MainBanner />
      <Categories />
      <BestSeller />
        <SellerCard />
      <BottomBanner />
      <NewsLetter />
    </div>
  );
};

export default Home;
