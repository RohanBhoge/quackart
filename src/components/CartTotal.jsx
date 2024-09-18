import { useContext } from "react";
import "./CartTotal.css";
import ProductContext from "../context/Product/ProductContext";

function CartTotal() {
  const { logedUser } = useContext(ProductContext);
  const cartItems = logedUser.cartproducts || [];

  // Calculate total price of all items in the cart
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Calculate total number of items in the cart
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="cart-total">
      <p>Price Details</p>
      <p>
        Total Items: <span>{totalItems}</span>
      </p>
      <p>
        Total: <span>${totalPrice.toFixed(2)}</span>
      </p>
    </div>
  );
}

export default CartTotal;
