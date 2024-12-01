import { useContext } from "react";
import "./CartTotal.css";
import ProductContext from "../context/Product/ProductContext";

function CartTotal() {
  const { getCartCount, addTotalPrice } = useContext(ProductContext);
  return (
    <div className="cart-total">
      <p>PRICE DETAILS</p>
      <p>
        Total Qty: <span>{getCartCount()}</span>
      </p>
      <p>
        Total Amount: <span>${addTotalPrice()}</span>
      </p>
    </div>
  );
}

export default CartTotal;
