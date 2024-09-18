import React from "react";
import "./Category.css";

function Category({ setCategory }) {
  const categories = [
    { label: "Women's Clothing", value: "women's clothing" },
    { label: "Men's Clothing", value: "men's clothing" },
    { label: "Jewelry", value: "jewelery" },
    { label: "Electronics", value: "electronics" },
  ];

  return (
    <div className="category">
      {categories.map((category) => (
        <p key={category.value} onClick={() => setCategory(category.value)}>
          {category.label}
        </p>
      ))}
      <div className="segment"></div>
    </div>
  );
}

export default Category;
