import React, { useState } from "react";
import "./Home.css";
import Category from "../components/Category";
import Filter from "../components/Filter";
import CardList from "../components/CardList";
export default function Home() {
  const [category, setCategory] = useState("");
  const [sortItem, setSortItem] = useState("");

  return (
    <>
      <Category setCategory={setCategory} />
      <div className="product">
        <Filter setSortItem={setSortItem} />
        <CardList category={category} sortItem={sortItem} />
      </div>
    </>
  );
}
