import { useContext, useState } from "react";
import "./Category.css";
import ProductContext from "../context/Product/ProductContext.jsx";
import ThemeContext from "../context/Theme/ThemeContext.jsx";

function Category({ setCategory }) {

  const { dark } = useContext(ThemeContext);
  const [selectCategory, setSelectCategory] = useState(0);

  
  const categories = [
    { id: 0, label: "All", value: "All" },
    { id: 1, label: "Women", value: "Women" },
    { id: 2, label: "Men", value: "Men" },
    { id: 3, label: "kids", value: "Kids" },
  ];

  const onClickEvent = (category) => {
    category.value === "All" ? setCategory("") : setCategory(category.value);
    setSelectCategory(category.id);
  };

  return (
    <div className={`category ${dark ? "category-dark-active" : ""}`}>
      {categories.map((category) => (
        <p
          key={category.value}
          onClick={() => onClickEvent(category)}
          className={`${category.id == selectCategory ? "select-category" : ""} mb-2`}
        >
          {category.label}
        </p>
      ))}
      <div className="segment mt-2"></div>
    </div>
  );
}

export default Category;