import { useContext } from "react";
import CartProduct from "../components/CartProduct.jsx";
import CartTotal from "../components/CartTotal.jsx";
import "./CartPage.css";
import ThemeContext from "../context/Theme/ThemeContext.jsx";
import CartContext from "../context/Cart/CartContext.jsx";

function CartPage() {
  const { cartItems } = useContext(CartContext);
  const { dark } = useContext(ThemeContext);

  return (
    <div
      className={`cart-page ${dark ? "primary-dark-active dark-active" : ""}`}
    >
      {Object.keys(cartItems).length > 0 ? (
        Object.entries(cartItems).flatMap(([itemId, sizes]) =>
          Object.entries(sizes).map(([size, quantity]) => {
            if (quantity > 0) {
              return (
                <CartProduct
                  key={`${itemId}-${size}`}
                  cartItem={{
                    _id: itemId,
                    size: size,
                    quantity: quantity,
                  }}
                />
              );
            }
            return null; // Skip if quantity is 0
          })
        )
      ) : (
        <p>Your cart is empty</p>
      )}
      {Object.keys(cartItems).length > 0 && <CartTotal />}
    </div>
  );
}

export default CartPage;