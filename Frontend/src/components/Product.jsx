import { useEffect, useState, useContext } from "react";
import ProductContext from "../context/Product/ProductContext";
import "./Product.css";
import { useNavigate } from "react-router-dom";

// Utility function to get product data
const fetchProductData = async (productId) => {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/${productId}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch product data:", error);
    return null;
  }
};

function Product() {
  const { productId, addCartValue, addToCart, dark } =
    useContext(ProductContext);
  const [productData, setProductData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (productId) {
      fetchProductData(productId).then((data) => setProductData(data));
    }
  }, [productId]);

  const handleAddToCart = () => {
    const loggedUser = JSON.parse(localStorage.getItem("LogedUser"));
    if (!loggedUser || Object.keys(loggedUser).length === 0) {
      navigate("/cart");
    } else if (productData) {
      addCartValue();
      addToCart({
        id: productId,
        price: productData.price,
        name: productData.title,
      });
    }
  };

  if (!productData) {
    return <p>Loading...</p>;
  }

  return (
    <div className={`product-p ${dark ? "primary-dark-active" : ""}`}>
      <img src={productData.image} alt={productData.title} />
      <div className="product-information">
        <h1>{productData.title}</h1>
        <p>{productData.category}</p>
        <p>${productData.price}</p>
        <p>{productData.description}</p>
        <div className="button">
          <button onClick={handleAddToCart}>Add To Cart</button>
          <button>Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default Product;
