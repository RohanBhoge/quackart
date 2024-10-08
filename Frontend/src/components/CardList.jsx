import React, { useContext, useEffect, useState } from "react";
import "./CardList.css";
import Card from "./Card";
import ProductContext from "../context/Product/ProductContext";

function CardList({ category, sortItem }) {
  const { setFilteredItems } = useContext(ProductContext);
  const [data, setData] = useState([]);

  // Fetching product data from API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((fetchedData) => setData(fetchedData));
  }, [category]);

  // Filtering and sorting logic
  const filteredData = data
    .filter((item) => !category || item.category === category)
    .sort((a, b) => {
      switch (sortItem) {
        case "Price (Low to High)":
          return a.price - b.price;
        case "Price (High to Low)":
          return b.price - a.price;
        case "Ratings":
          return b.rating.rate - a.rating.rate;
        default:
          return a.id - b.id;
      }
    });

  // Updating filtered items count in context safely using useEffect
  useEffect(() => {
    setFilteredItems(filteredData.length);
  }, [filteredData, setFilteredItems]);

  return (
    <div className="card-container">
      {filteredData.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
}

export default CardList;
