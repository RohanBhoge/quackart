import React, { useState } from "react";
import "./Category.css";

function Category({ setCategory }) {
  const categories = [
    { id: 1, label: "Women's Clothing", value: "women's clothing" },
    { id: 2, label: "Men's Clothing", value: "men's clothing" },
    { id: 3, label: "Jewelry", value: "jewelery" },
    { id: 4, label: "Electronics", value: "electronics" },
  ];
  const [selectCategory, setSelectCategory] = useState(0);

  return (
    <div className="category">
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
