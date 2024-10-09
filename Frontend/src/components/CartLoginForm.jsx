import React, { useContext } from "react";
import Login from "./Login";
import "./CartLoginForm.css";
import ProductContext from "../context/Product/ProductContext";

const CartLoginForm = () => {
  const { dark } = useContext(ProductContext);
  return (
    <div className={`cart-login ${dark ? "primary-dark-active" : ""}`}>
      <h1>Please Login First</h1>
      <Login />
    </div>
  );
};

export default CartLoginForm;
