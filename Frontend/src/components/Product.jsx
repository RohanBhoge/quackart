import { useEffect, useState, useContext } from "react";
import ProductContext from "../context/Product/ProductContext.jsx";
import "./Product.css";

// Utility function to get product data

function Product() {
  const { productId, addToCart, dark, product } = useContext(ProductContext);
  const [productData, setProductData] = useState(null);

  // Update Product Data.
  const fetchProductData = async (productId, product) => {
    try {
      const response = product.filter((item) => item._id === productId);
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
          <button onClick={() => addToCart(productId, "S")}>Add To Cart</button>
          <button>Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default Product;
