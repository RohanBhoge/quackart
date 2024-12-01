import { useContext } from "react";
import CartProduct from "../components/CartProduct";
import CartTotal from "../components/CartTotal";
import "./CartPage.css";
import ProductContext from "../context/Product/ProductContext";

function CartPage() {
  const context = useContext(ProductContext);
  const { dark, cartItems } = context;

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
