import { useEffect, useState } from "react";
import ProductContext from "./ProductContext";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductState = (props) => {
  // Initial states using localStorage data
  const [productData, setProductData] = useState(null);

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

  const [logedUser, setLogedUser] = useState(false);

  const [sortCategory, setSortCategory] = useState([]);

  const [token, setToken] = useState("");

  const [cartData, setCartData] = useState([]);
  const [cartItems, setCartItems] = useState({});

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
  }, []);

  const updateCart = async (action, cartId) => {
    const size = "m";
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
      }
    } else {
      console.error(`Item with cartId: ${cartId} not found in cart.`);
    }
    setCartItems(updatedCart);
    const quantity = updatedCart[cartId].quantity;
    console.log(token);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { cartId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addTotalPrice = () => {
    if (!cartItems || typeof cartItems !== "object") {
      console.error("Invalid cartItems:", cartItems);
      return 0;
    }

    const totalPrice = Object.keys(cartItems).reduce((total, productId) => {
      const cartItem = cartItems[productId]; // Get the quantity object
      const matchedProduct = product.find((prod) => prod._id === productId); // Match the product
      if (matchedProduct) {
        return total + cartItem.quantity * matchedProduct.price; // Multiply quantity by price
      }
      return total; // Skip if no matching product is found
    }, 0);

    return totalPrice;
  };

  const getUserCart = async () => {
    console.log("hello");

    try {
      const responce = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );

      console.log(responce.data);

      if (responce.data.success) {
        setCartItems(responce.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, []);

  const addToCart = async (itemId) => {
    // Create a deep copy of cartItems to avoid mutating state directly
    let cartdata = structuredClone(cartItems);
    if (cartdata[itemId]) {
      if (cartdata[itemId].quantity) {
        cartdata[itemId].quantity += 1;
      } else {
        cartdata[itemId].quantity = 1;
      }
    } else {
      cartdata[itemId] = { quantity: 1 };
    }
    setCartItems(cartdata);

    const size = "m";

    if (token) {
      try {
        const responce = await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
        console.log(responce);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
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
        cartValue,
        setCartValue,
        productId,
        setProductId,
        cartId,
        setCartId,
        addToCart,
        totalPrice,
        setTotalPrice,
        data,
        setData,
        userName,
        setUserName,
        logedUser,
        setLogedUser,
        userAccount,
        setUserAccount,
        filteredItems,
        setFilteredItems,
        dark,
        setDark,
        product,
        productData,
        setProductData,
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
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
