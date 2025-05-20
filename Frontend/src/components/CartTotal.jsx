import { useContext } from "react";
import "./CartTotal.css";
import ProductContext from "../context/Product/ProductContext.jsx";
import CartContext from "../context/Cart/CartContext.jsx";

function CartTotal() {
  // const { addTotalPrice } = useContext(ProductContext);
  const { getCartCount, addTotalPrice } = useContext(CartContext);  

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
