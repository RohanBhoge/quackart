import { useContext, useEffect } from "react";
import profile from "../assets/profile.svg";
import cart from "../assets/cart.svg";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import darkMode from "../assets/dark-mode.svg";
import lightMode from "../assets/light-mode.svg";
import darkCart from "../assets/dark-cart.svg";
import darkProfile from "../assets/dark-profile.svg";
import ThemeContext from "../context/Theme/ThemeContext.jsx";
import AuthContext from "../context/Auth/AuthContext.jsx";
import CartContext from "../context/Cart/CartContext.jsx";
import { toast } from "react-toastify";

function Navbar() {
  const { getCartCount } = useContext(CartContext);

  const { token, userDetail } = useContext(AuthContext);
  const { dark, setDark } = useContext(ThemeContext);

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
  useEffect(() => {}, [token]);

  useEffect(() => {
    setDark(isDark === "true");
  }, [dark]);

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
          <p>Hello,{userDetail.name ? userDetail.name : "Guest"}</p>
        </Link>

        {/* Link to cart */}
        <Link
          onClick={() => {
            if (token.length === 0 || !token) {
              toast.error("Please login to access the cart");
            }
          }}
          className={`cart-info ${dark ? "dark-active" : ""}`}
          to={token.length === 0 || !token ? "/login" : "/cart"}
        >
          <span>{getCartCount()}</span>
          <img src={dark ? darkCart : cart} alt="Cart" />
          <p>Cart</p>
        </Link>
      </div>
      <div className="segment"></div>
    </div>
  );
}

export default Navbar;
