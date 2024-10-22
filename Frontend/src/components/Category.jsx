import React, { useContext, useState } from "react";
import "./Category.css";
import ProductContext from "../context/Product/ProductContext";

function Category({ setCategory }) {
  const { dark } = useContext(ProductContext);
  const categories = [
    { id: 1, label: "Women's Clothing", value: "women's clothing" },
    { id: 2, label: "Men's Clothing", value: "men's clothing" },
    { id: 3, label: "Jewellery", value: "jewellery" },
    { id: 4, label: "Electronics", value: "electronics" },
  ];
  const [selectCategory, setSelectCategory] = useState(0);

  return (
    <div className={`category ${dark ? "category-dark-active" : ""}`}>
      {categories.map((category) => (
        <p
          key={category.value}
          onClick={() => {
            setCategory(category.value);
            setSelectCategory(category.id);
          }}
          className={category.id == selectCategory ? "select-category" : ""}
        >
          {category.label}
        </p>
      ))}
      <div className="segment"></div>
    </div>
  );
}

export default Category;
