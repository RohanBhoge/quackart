import { useContext } from "react";
import "./HomePageShemmer.css";
import ThemeContext from "../context/Theme/ThemeContext.jsx";

const HomePageShemmer = () => {
  const { dark } = useContext(ThemeContext);
  return (
    <div
      className={`shemmer-card ${
        dark ? "primery-dark-active shemmer-dark-active " : ""
      }`}
    >
      <div className="img-container"></div>
      <p className="product-discription"></p>
      <div className="price-rate">
        <p className="rating"></p>
      </div>
      <div className="button"></div>
    </div>
  );
};

export default HomePageShemmer;
