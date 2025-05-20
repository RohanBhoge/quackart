import { useContext } from "react";
import Login from "./Login";
import "./CartLoginForm.css";
import ThemeContext from "../context/Theme/ThemeContext.jsx";

const CartLoginForm = () => {
  const { dark } = useContext(ThemeContext);
  return (
    <div className={`cart-login ${dark ? "primary-dark-active" : ""}`}>
      <h1>Please Login First</h1>
      <Login />
    </div>
  );
};

export default CartLoginForm;
