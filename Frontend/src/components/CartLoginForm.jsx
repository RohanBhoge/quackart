import React, { useContext } from "react";
import Login from "./Login";
import "./CartLoginForm.css";

const CartLoginForm = () => {
  return (
    <div className="cart-login">
      <h1>Please Login First</h1>
      <Login />
    </div>
  );
};

export default CartLoginForm;
