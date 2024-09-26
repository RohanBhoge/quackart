import React, { useContext, useState } from "react";
import profile from "../assets/profile.svg";
import cart from "../assets/cart.svg";
import "./Navbar.css";
import ProductContext from "../context/Product/ProductContext";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const { logedUser = {} } = useContext(ProductContext); // Destructure with a default empty object
  const navigate = useNavigate();
  const [activeSpan, setActiveSpan] = useState(true);
  // Calculate total items in the cart
  const totalCart = logedUser.cartproducts
    ? logedUser.cartproducts.reduce((total, item) => total + item.quantity, 0)
    : 0;

  return (
    <div className="navbar">
      <p
        onClick={() => {
          navigate("/");
          setActiveSpan(false);
        }}
        className="logo"
      >
        QuickCart{" "}
        <span className={activeSpan ? "" : "span-click"}>
          {" "}
          Click here to continue
        </span>
      </p>
      <div className="right">
        {/* Link to login/logout based on logged-in status */}
        <Link
          to={Object.keys(logedUser).length !== 0 ? "/logout" : "/login"}
          className="profile-info"
        >
          <img src={profile} alt="Profile" />
          <p>Hello,{logedUser.name ? logedUser.name : "Guest"}</p>
        </Link>

        {/* Link to cart */}
        <Link className="cart-info" to="/cart">
          <span>{totalCart}</span>
          <img src={cart} alt="Cart" />
          <p>Cart</p>
        </Link>
      </div>
      <div className="segment"></div>
    </div>
  );
}

export default Navbar;
