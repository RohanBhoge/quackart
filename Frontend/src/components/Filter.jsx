import React, { useContext, useState } from "react";
import "./Filter.css";
import up from "../assets/up-arrow.svg";
import down from "../assets/down-arrow.svg";
import ProductContext from "../context/Product/ProductContext";

function Filter({ setSortItem }) {
  const { filteredItems } = useContext(ProductContext);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortOption, setSortOption] = useState("Relevance");
  // const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  // const [searchQuery, setSearchQuery] = useState("");

  const toggleSort = () => {
    setIsSortOpen((prev) => !prev);
  };

  // const toggleCategory = () => {
  //   setIsCategoryOpen((prev) => !prev);
  // };

  const handleSortOptionClick = (option) => {
    setSortOption(option);
    setSortItem(option);
  };

  // const categories = [
  //   "Analog Watches",
  //   "Women T-shirts",
  //   "Women Tops And Tunics",
  //   "Tops And Tunics",
  //   "T-shirts",
  // ];

  return (
    <div className="filter">
      <h1>Products For You</h1>

      {/* Sort Menu */}
      <div className="filter-menu">
        {/* Filter Menu */}
        <div className="filter-clear">
          <div className="filter-c">
            <p>Filter</p>
            {/* <p>Clear All</p> */}
          </div>
          <span>{filteredItems} products</span>
        </div>
        <div className="sort-bar" onClick={toggleSort}>
          <p className="sort-by">
            <span className="text-muted">Sort by: </span>
            {sortOption}
          </p>
          <img src={isSortOpen ? up : down} alt="Toggle Sort" />
        </div>

        {isSortOpen && (
          <div className="sort-option">
            {[
              "Relevance",
              "Price (High to Low)",
              "Price (Low to High)",
              "Ratings",
            ].map((option) => (
              <p key={option} onClick={() => handleSortOptionClick(option)}>
                {option}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Category Filter */}
      <div className="segment-c"></div>
      {/* <div className="category-c">
        <div className="select-c" onClick={toggleCategory}>
          <h3>Category</h3>
          <img src={isCategoryOpen ? up : down} alt="Toggle Category" />
        </div>

        {isCategoryOpen && (
          <>
            <input
              type="text"
              placeholder="Search Category"
              onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
            />
            <ul>
              {categories
                .filter((category) =>
                  category.toLowerCase().includes(searchQuery)
                )
                .map((category, index) => (
                  <li key={index}>
                    <input type="checkbox" />
                    <p>{category}</p>
                  </li>
                ))}
            </ul>
          </>
        )}
      </div> */}
    </div>
  );
}

export default Filter;
