import { useContext, useEffect, useState } from "react";
import CartContext from "./CartContext";
import axios from "axios";
import { toast } from "react-toastify";
import AuthContext from "../Auth/AuthContext.jsx";
import ProductContext from "../Product/ProductContext.jsx";

const CartProvider = (props) => {
  const { backendUrl, token } = useContext(AuthContext);
  const { product } = useContext(ProductContext);
  const [cartData, setCartData] = useState([]);
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    updateCart();
    getUserCart();
    getCartCount();
    addTotalPrice();
  }, [token]);  

  const updateCart = async (action, cartId) => {
    let updatedCart = structuredClone(cartItems);

    if (updatedCart[cartId]) {
      switch (action) {
        case "increase":
          updatedCart[cartId].quantity += 1;
          break;

        case "decrease":
          if (updatedCart[cartId].quantity > 1) {
            updatedCart[cartId].quantity -= 1;
          } else {
            delete updatedCart[cartId];
          }
          break;

        case "remove":
          delete updatedCart[cartId];
          break;

        default:
          console.error("Invalid action provided!");
          return;
      }

      setCartItems(updatedCart);

      if (token) {
        try {
          if (action === "remove" || !updatedCart[cartId]) {
            await axios.post(
              `${backendUrl}/api/cart/update`,
              { token, itemId: cartId, quantity: 0 },
              { headers: { token } }
            );
          } else {
            const quantity = updatedCart[cartId].quantity;
            await axios.post(
              `${backendUrl}/api/cart/update`,
              { token, itemId: cartId, quantity },
              { headers: { token } }
            );
          }
        } catch (error) {
          console.error("Error updating cart on backend:", error);
        }
      }
    } else {
      console.error(`Item with cartId: ${cartId} not found in cart.`);
    }
  };

  const getUserCart = async () => {
    try {
      const responce = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );

      if (responce.data.success) {
        setCartItems(responce.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const addToCart = async (itemId) => {
    try {
      if (!token || token.length === 0) {
        toast.error("Please login to add items to the cart");
        return;
      }
      let cartdata = structuredClone(cartItems);
      if (cartdata[itemId]) {
        cartdata[itemId].quantity = (cartdata[itemId].quantity || 0) + 1;
      } else {
        cartdata[itemId] = { quantity: 1 };
      }

      setCartItems(cartdata);

      const quantity = cartdata[itemId].quantity;
      if (token) {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, quantity },
          { headers: { token } }
        );
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const getCartCount = () => {
    if (!token || token.length === 0) {
      return 0;
    }

    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalCount;
  };

  const addTotalPrice = () => {
    if (!cartItems || typeof cartItems !== "object") {
      console.error("Invalid cartItems:", cartItems);
      return 0;
    }

    const totalPrice = Object.keys(cartItems).reduce((total, productId) => {
      const cartItem = cartItems[productId];
      const matchedProduct = product.find((prod) => prod._id === productId);
      if (matchedProduct) {
        return total + cartItem.quantity * matchedProduct.price;
      }
      return total;
    }, 0);

    return totalPrice;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        cartData,
        setCartData,
        updateCart,
        getUserCart,
        addToCart,
        getCartCount,
        addTotalPrice,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
