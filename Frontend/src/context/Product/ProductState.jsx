import { useEffect, useState } from "react";
import ProductContext from "./ProductContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductState = (props) => {
  // Initial states using localStorage data
  const [filteredItems, setFilteredItems] = useState(0);

  const [productId, setProductId] = useState();

  const [sortCategory, setSortCategory] = useState([]);

  const [token, setToken] = useState("");

  const [cartData, setCartData] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [useDetail, setUserDetail] = useState({});

  // Dark Mode.

  const [dark, setDark] = useState(
    localStorage.getItem("DarkMode") === "true" ? true : false
  );

  // Backend Url
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [product, setProduct] = useState([]);

  const getProductData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/addlist");

      if (response.data.success) {
        setProduct(response.data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.data.message);
    }
  };

  useEffect(() => {
    getProductData();
    getUserCart();
    getUserDetails();
    getCartCount();
  }, [token]);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, []);

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

  const getUserDetails = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/user/user-details", {
        headers: {
          token,
        },
      });

      if (response.data.success) {
        setUserDetail(response.data.user);
      } else {
        console.log("Error:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
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

  return (
    <ProductContext.Provider
      value={{
        cartItems,
        productId,
        setProductId,
        addToCart,
        filteredItems,
        setFilteredItems,
        dark,
        setDark,
        product,
        setSortCategory,
        sortCategory,
        token,
        setToken,
        backendUrl,
        getCartCount,
        setCartData,
        cartData,
        updateCart,
        addTotalPrice,
        setUserDetail,
        useDetail,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
