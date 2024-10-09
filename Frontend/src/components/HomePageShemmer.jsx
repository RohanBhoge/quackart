import React, { useContext } from "react";
import "./HomePageShemmer.css";
import ProductContext from "../context/Product/ProductContext";

const HomePageShemmer = () => {
  const context = useContext(ProductContext);
  return (
    <div
      className={`shemmer-card ${
        context.dark ? "primery-dark-active shemmer-dark-active " : ""
      }`}
    >
      <div className="img-container"></div>
      <p className="product-discription"></p>
      <div className="price-rate">
        <p className="rating"></p>
      </div>
      <div className="button"></div>
    </div>
  );
};

export default HomePageShemmer;
