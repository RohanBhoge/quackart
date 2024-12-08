import { useContext, useState } from "react";
import "./Home.css";
import Category from "../components/Category.jsx";
import Filter from "../components/Filter.jsx";
import CardList from "../components/CardList.jsx";
import ProductContext from "../context/Product/ProductContext.jsx";
export default function Home() {
  const [category, setCategory] = useState("");
  const [sortItem, setSortItem] = useState("");
  const { dark } = useContext(ProductContext);

  return (
    <>
      <Category setCategory={setCategory} />
      <div className={`product ${dark ? "dark-active" : ""}`}>
        <Filter setSortItem={setSortItem} />
        <CardList category={category} sortItem={sortItem} />
      </div>
    </>
  );
}
