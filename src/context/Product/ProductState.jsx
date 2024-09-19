import { useState } from "react";
import ProductContext from "./ProductContext";

const ProductState = (props) => {
  // Initial states using localStorage data
  const [filteredItems, setFilteredItems] = useState(0);

  const [productId, setProductId] = useState(localStorage.getItem("SID"));
  const [cartValue, setCartValue] = useState(
    localStorage.getItem("cartValue") || 0
  );
  const [cartId, setCartId] = useState(localStorage.getItem("SID"));
  const [userAccount, setUserAccount] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);
  const [data, setData] = useState([]);
  const [userName, setUserName] = useState("Profile");

  const [logedUser, setLogedUser] = useState(
    localStorage.getItem("LogedUser")
      ? JSON.parse(localStorage.getItem("LogedUser"))
      : {}
  );

  // Function to add items to cart
  const addToCart = (item) => {
    const loggedUser = JSON.parse(localStorage.getItem("LogedUser"));

    if (!loggedUser || Object.keys(loggedUser).length === 0) {
      window.location.href = "/#/login";
    } else {
      setLogedUser((prevUser) => {
        const isItemPresent = prevUser.cartproducts?.find(
          (cartItem) => cartItem.id === item.id
        );
        let updatedCartProducts;

        if (isItemPresent) {
          updatedCartProducts = prevUser.cartproducts.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          );
        } else {
          updatedCartProducts = [
            ...(prevUser.cartproducts || []),
            { ...item, quantity: 1 },
          ];
        }

        // Update user account in localStorage
        const users = JSON.parse(localStorage.getItem("account")) || [];
        const userIndex = users.findIndex(
          (user) =>
            loggedUser.email === user.email &&
            loggedUser.password === user.password
        );
        if (userIndex !== -1) {
          users[userIndex].cartproducts = updatedCartProducts;
          localStorage.setItem("account", JSON.stringify(users));
        }

        // Update the local logedUser and persist it
        const updatedUser = { ...prevUser, cartproducts: updatedCartProducts };
        localStorage.setItem("LogedUser", JSON.stringify(updatedUser));

        return updatedUser;
      });
    }
  };

  // Function to remove item from cart
  const removeFromCart = (id) => {
    setLogedUser((prevUser) => {
      const updatedCartProducts = prevUser.cartproducts.filter(
        (cartItem) => cartItem.id !== id
      );

      const updatedUser = { ...prevUser, cartproducts: updatedCartProducts };

      // Update localStorage account and LogedUser
      const users = JSON.parse(localStorage.getItem("account")) || [];
      const userIndex = users.findIndex(
        (user) =>
          logedUser.email === user.email && logedUser.password === user.password
      );
      if (userIndex !== -1) {
        users[userIndex].cartproducts = updatedCartProducts;
        localStorage.setItem("account", JSON.stringify(users));
      }
      localStorage.setItem("LogedUser", JSON.stringify(updatedUser));

      return updatedUser;
    });
  };

  // Function to update the quantity of cart items
  const updateCartItemQuantity = (id, quantity) => {
    setLogedUser((prevUser) => {
      const updatedCartProducts = prevUser.cartproducts.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );

      const updatedUser = { ...prevUser, cartproducts: updatedCartProducts };

      const users = JSON.parse(localStorage.getItem("account")) || [];
      const userIndex = users.findIndex(
        (user) =>
          logedUser.email === user.email && logedUser.password === user.password
      );
      if (userIndex !== -1) {
        users[userIndex].cartproducts = updatedCartProducts;
        localStorage.setItem("account", JSON.stringify(users));
      }
      localStorage.setItem("LogedUser", JSON.stringify(updatedUser));

      return updatedUser;
    });
  };

  // Function to handle cart value increments
  const addCartValue = (event) => {
    const newCartValue = parseInt(localStorage.getItem("cartValue") || "0") + 1;
    localStorage.setItem("cartValue", newCartValue);
    setCartValue(newCartValue);
  };

  // Function to handle cart value decrements and remove item if cart value is 0
  const minusCartValue = (event, id) => {
    event.preventDefault();
    const currentCartValue = parseInt(localStorage.getItem("cartValue") || "0");

    if (currentCartValue > 0) {
      const newCartValue = currentCartValue - 1;
      localStorage.setItem("cartValue", newCartValue);
      setCartValue(newCartValue);
    } else {
      removeFromCart(id);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        cartValue,
        setCartValue,
        productId,
        setProductId,
        cartId,
        setCartId,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        totalPrice,
        setTotalPrice,
        data,
        setData,
        addCartValue,
        minusCartValue,
        userName,
        setUserName,
        logedUser,
        setLogedUser,
        userAccount,
        setUserAccount,
        filteredItems,
        setFilteredItems,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
