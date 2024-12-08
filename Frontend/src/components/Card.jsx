import { useContext } from "react";
import "./Card.css";
import { Link } from "react-router-dom";
import ProductContext from "../context/Product/ProductContext";

function Card({ item }) {
  const context = useContext(ProductContext);
  const cartClick = (e) => {
    e.preventDefault();
    context.addToCart(item._id, "M");
  };

  return (
    <Link
      to={"/product"}
      className={`card ${context.dark ? "secondry-dark-active" : ""}`}
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
