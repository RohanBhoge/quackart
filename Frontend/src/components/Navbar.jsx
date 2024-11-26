import React, { useContext, useEffect } from "react";
import profile from "../assets/profile.svg";
import cart from "../assets/cart.svg";
import "./Navbar.css";
import ProductContext from "../context/Product/ProductContext";
import { Link, useNavigate } from "react-router-dom";
import darkMode from "../assets/dark-mode.svg";
import lightMode from "../assets/light-mode.svg";
import darkCart from "../assets/dark-cart.svg";
import darkProfile from "../assets/dark-profile.svg";

function Navbar() {
  const { logedUser = {}, dark, setDark, token } = useContext(ProductContext); // Destructure with a default empty object
  const navigate = useNavigate();

  const isDark = localStorage.getItem("DarkMode");

  const darkModeOn = () => {
    if (isDark === "true") {
      localStorage.setItem("DarkMode", "false");
      setDark(false);
    } else {
      localStorage.setItem("DarkMode", "true");
      setDark(true);
    }
  };

  useEffect(() => {
    setDark(isDark === "true");
  }, [dark]);

  const totalCart = logedUser.cartproducts
    ? logedUser.cartproducts.reduce((total, item) => total + item.quantity, 0)
    : 0;

  return (
    <div className={`navbar ${dark ? "dark-active" : ""}`}>
      <p onClick={() => navigate("/")} className="logo">
        QuickCart
      </p>
      <div className="right">
        <img
          className="dark-mode"
          onClick={darkModeOn}
          src={dark ? lightMode : darkMode}
          alt=""
        />
        {/* Link to login/logout based on logged-in status */}
        <Link
          to={token.length !== 0 ? "/logout" : "/login"}
          className={`profile-info ${dark ? "dark-active" : ""}`}
        >
          <img src={dark ? darkProfile : profile} alt="Profile" />
          <p>Hello,{logedUser.name ? logedUser.name : "Guest"}</p>
        </Link>

        {/* Link to cart */}
        <Link className={`cart-info ${dark ? "dark-active" : ""}`} to="/cart">
          <span>{totalCart}</span>
          <img src={dark ? darkCart : cart} alt="Cart" />
          <p>Cart</p>
        </Link>
      </div>
      <div className="segment"></div>
    </div>
  );
}

export default Navbar;
