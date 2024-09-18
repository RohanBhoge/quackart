import { useEffect, useState, useContext } from "react";
import ProductContext from "../context/Product/ProductContext";
import "./Product.css";

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
  const { productId, addCartValue, addToCart } = useContext(ProductContext);
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    if (productId) {
      fetchProductData(productId).then((data) => setProductData(data));
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (productData) {
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
    <div className="product-p">
      <img src={productData.image} alt={productData.title} />
      <div className="product-info">
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
