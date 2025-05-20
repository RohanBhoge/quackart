import { useContext } from "react";
import "./Card.css";
import { Link } from "react-router-dom";
import ProductContext from "../context/Product/ProductContext.jsx";
import ThemeContext from "../context/Theme/ThemeContext.jsx";
import CartContext from "../context/Cart/CartContext.jsx";

function Card({ item }) {
  const context = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { dark } = useContext(ThemeContext);
  const cartClick = (e) => {
    e.preventDefault();
    addToCart(item._id, "M");
  };

  return (
    <Link
      to={"/product"}
      className={`card ${dark ? "secondry-dark-active" : ""}`}
      onClick={() => context.setProductId(item._id)}
    >
      <div className="img-container">
        <img src={item.image[0]} alt="" />
      </div>
      <p className="product-discription">{item.discription}</p>
      <div className="price-rate">
        <p className="price">${item.price}</p>
      </div>
      <button onClick={(e) => cartClick(e)}>Add To Cart</button>
    </Link>
  );
}

export default Card;
