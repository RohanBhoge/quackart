import React, { useContext } from "react";
import "./Card.css";
import { Link, useNavigate } from "react-router-dom";
import ProductContext from "../context/Product/ProductContext";

function Card({ item }) {
  const context = useContext(ProductContext);

  const navigate = useNavigate();
  const cartClick = (event) => {
    event.preventDefault();
    const loggedUser = JSON.parse(localStorage.getItem("LogedUser"));
    if (!loggedUser || Object.keys(loggedUser).length === 0) {
      navigate("/cart");
    } else {
      localStorage.setItem(
        "cartValue",
        parseInt(
          localStorage.getItem("cartValue")
            ? localStorage.getItem("cartValue")
            : "0"
        ) + 1
      );
      context.setCartValue(localStorage.getItem("cartValue"));
      context.setCartId(item.id);
      context.addToCart(item);
    }
  };

  return (
    <Link
      to={"/product"}
      className="card"
      onClick={() => context.setProductId(item.id)}
    >
      <div className="img-container">
        <img src={item.image} alt="" />
      </div>
      <p className="product-discription">{item.title}</p>
      <div className="price-rate">
        <p className="rating">
          <span>{item.rating.rate} &#8902;</span> rating.
        </p>
        <p className="price">${item.price}</p>
      </div>
      <button onClick={(e) => cartClick(e)}>Add To Cart</button>
    </Link>
  );
}

export default Card;
