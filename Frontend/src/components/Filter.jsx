import { useContext, useState } from "react";
import "./Filter.css";
import up from "../assets/up-arrow.svg";
import down from "../assets/down-arrow.svg";
import ProductContext from "../context/Product/ProductContext.jsx";

function Filter({ setSortItem }) {
  const { filteredItems, dark, sortCategory, setSortCategory } =
    useContext(ProductContext);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortOption, setSortOption] = useState("Relevance");
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const valueIsCheked = (isCheked, category) => {
    if (isCheked) setSortCategory((prev) => [...prev, category]);
    else setSortCategory((prev) => prev.filter((item) => item !== category));
  };

  const toggleSort = () => {
    setIsSortOpen((prev) => !prev);
  };

  const toggleCategory = () => {
    setIsCategoryOpen((prev) => !prev);
  };

  const handleSortOptionClick = (option) => {
    setSortOption(option);
    setSortItem(option);
  };

  const clearAll = () => {
    handleSortOptionClick("Relevance");
    setSortItem("Relevance");
    setSortCategory([]);
  };

  const categories = ["Topwear", "Bottom", "Winterwear"];

  return (
    <div className={`filter ${dark ? "dark-active" : ""}`}>
      <h1>Products For You</h1>

      {/* Sort Menu */}
      <div className="filter-menu">
        <div className="filter-clear">
          <div className="filter-c">
            <p>Filter</p>
            <p onClick={clearAll} className="cursor-pointer">
              Clear All
            </p>
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
      <div className="category-c">
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
              className="text-black"
            />
            <ul>
              {categories
                .filter((category) =>
                  category.toLowerCase().includes(searchQuery)
                )
                .map((category, index) => (
                  <li key={index}>
                    <input
                      type="checkbox"
                      checked={sortCategory.includes(category)} // Bind checkbox state to `sortCategory`
                      onChange={(e) =>
                        valueIsCheked(e.target.checked, category)
                      }
                    />
                    <p>{category}</p>
                  </li>
                ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default Filter;
