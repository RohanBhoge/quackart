import { useEffect, useState, useContext } from "react";
import ProductContext from "../context/Product/ProductContext";
import "./Product.css";
import { useNavigate } from "react-router-dom";

// Utility function to get product data

function Product() {
  const { productId, addCartValue, addToCart, dark, product } =
    useContext(ProductContext);
  const [productData, setProductData] = useState(null);
  const navigate = useNavigate();

  // Update Product Data.
  const fetchProductData = async (productId, product) => {
    console.log(product, productId);
    try {
      const response = product.filter((item) => item._id === productId);
      console.log(response);
      useEffect(() => {
        setProductData(response[0]);
      }, [response]);
      return response[0];
    } catch (error) {
      console.error("Failed to fetch product data:", error);
      return null;
    }
  };
  fetchProductData(productId, product);
  // console.log(productData);

  const handleAddToCart = () => {
    // const loggedUser = JSON.parse(localStorage.getItem("LogedUser"));
    // if (!loggedUser || Object.keys(loggedUser).length === 0) {
    //   navigate("/cart");
    // } else if (productData) {
    //   addCartValue();
    addToCart(productId, "S");
    // }
  };

  if (!productData) {
    return <p>Loading...</p>;
  }

  return (
    <div className={`product-p ${dark ? "primary-dark-active" : ""}`}>
      <img src={productData.image[0]} alt={productData.name} />
      <div className="product-information">
        <h1>{productData.name}</h1>
        <p>{productData.category}</p>
        <p>${productData.price}</p>
        <p>{productData.discription}</p>
        <div className="button">
          <button onClick={handleAddToCart}>Add To Cart</button>
          <button>Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default Product;
