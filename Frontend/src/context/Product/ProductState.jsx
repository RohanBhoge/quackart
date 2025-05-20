import { useContext, useEffect, useState } from "react";
import ProductContext from "./ProductContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../Auth/AuthContext.jsx";

const ProductState = (props) => {
  const { token, backendUrl } = useContext(AuthContext);

  const [filteredItems, setFilteredItems] = useState(0);
  const [productId, setProductId] = useState();
  const [sortCategory, setSortCategory] = useState([]);
  const [product, setProduct] = useState([]);
  
  useEffect(() => {
    getProductData();
  }, [token]);

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

  return (
    <ProductContext.Provider
      value={{
        productId,
        setProductId,
        filteredItems,
        setFilteredItems,
        product,
        setSortCategory,
        sortCategory,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
