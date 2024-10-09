import { useContext } from "react";
import CartProduct from "../components/CartProduct";
import CartTotal from "../components/CartTotal";
import "./CartPage.css";
import ProductContext from "../context/Product/ProductContext";

function CartPage() {
  const context = useContext(ProductContext);
  const { logedUser,dark } = context;
  const cartItems = logedUser?.cartproducts || [];

  return (
    <div className={`cart-page ${dark ? "primary-dark-active dark-active" : ""}`}>
      {cartItems.length > 0 ? (
        cartItems.map((cartItem) => (
          <CartProduct key={cartItem.id} product={cartItem} />
        ))
      ) : (
        <p>Your cart is empty</p>
      )}
      {cartItems.length > 0 && <CartTotal />}
    </div>
  );
}

export default CartPage;
