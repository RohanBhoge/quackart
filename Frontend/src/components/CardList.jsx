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

  // Filtering and sorting logic
  const filteredData = data
    .filter((item) => !category || item.category === category)
    .filter(
      (item) =>
        sortCategory.length == 0 ||
        sortCategory.some((sortItem) =>
          sortItem.toLowerCase().includes(item.name.toLowerCase())
        )
    )
    .sort((a, b) => {
      switch (sortItem) {
        case "Price (Low to High)":
          return a.price - b.price;
        case "Price (High to Low)":
          return b.price - a.price;
        // case "Ratings":
        //   return b.rating.rate - a.rating.rate;
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
      {loding
        ? key.map((item) => <HomePageShemmer key={item} />)
        : filteredData.map((item) => <Card key={item._id} item={item} />)}
    </div>
  );
}

export default CardList;