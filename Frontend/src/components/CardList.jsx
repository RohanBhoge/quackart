import { useContext, useEffect, useState } from "react";
import "./CardList.css";
import Card from "./Card";
import ProductContext from "../context/Product/ProductContext";
import HomePageShemmer from "./HomePageShemmer";

function CardList({ category, sortItem }) {
  const { setFilteredItems, product, sortCategory } =
    useContext(ProductContext);
  const [data, setData] = useState([]);
  const [loding, setLoding] = useState(true);
  const key = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  // Fetching product data from API
  useEffect(() => {
    setTimeout(() => {
      setData(product);
      setLoding(false);
    }, 2000);
  }, [product]);

  const filteredData = data
    .filter((item) => {
      if (category) {
        return item.category === category;
      }
      return true;
    })
    .filter((item) => {
      if (sortCategory.length > 0) {
        return sortCategory.some(
          (sortItem) =>
            sortItem.toLowerCase() === item.subcategory.toLowerCase()
        );
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortItem) {
        case "Price (Low to High)":
          return a.price - b.price;
        case "Price (High to Low)":
          return b.price - a.price;
        default:
          return a.id - b.id;
      }
    });

  useEffect(() => {
    setFilteredItems(filteredData.length);
  }, [filteredData, setFilteredItems]);

  return (
    <div className="card-container">
      {loding
        ? key.map((item) => <HomePageShemmer key={item} />)
        : filteredData.map((item) => <Card key={item._id} item={item} />)}
    </div>
  );
}

export default CardList;
