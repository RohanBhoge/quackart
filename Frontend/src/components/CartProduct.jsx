import "./CartProduct.css";
import upArrow from "../assets/up-arrow.svg";
import downArrow from "../assets/arrow-down-01.svg";
import { useContext, useEffect, useState } from "react";
import ProductContext from "../context/Product/ProductContext.jsx";
import ThemeContext from "../context/Theme/ThemeContext.jsx";
import CartContext from "../context/Cart/CartContext.jsx";

function CartProduct({ cartItem }) {
  const { product } = useContext(ProductContext);
  const { updateCart } = useContext(CartContext);
  const { dark } = useContext(ThemeContext);

  const [productData, setProductData] = useState(null);
  useEffect(() => {
    const matchedProduct = product.find((item) => item._id === cartItem._id);
    if (matchedProduct) {
      setProductData(matchedProduct);
    }
    
  }, [product, cartItem]);
  if (!productData) {
    return null; // Don't render anything until product data is ready
  }

  return (
    <div className={`cart-product ${dark ? "dark-active" : ""}`}>
      <img
        className="product-img"
        src={productData.image[0]}
        alt={productData.description}
      />
      <div className="product-info">
        <p>{productData.description}</p>
        <div className="price-button">
          <p>${(productData.price * cartItem.quantity).toFixed(2)}</p>
          <div className="buttons">
            <button onClick={() => updateCart("decrease", productData._id)}>
              -
            </button>
            <button onClick={() => updateCart("increase", productData._id)}>
              +
            </button>
          </div>
        </div>
        <div className="qty-delete">
          <div className="qty">
            <p>Qty: {cartItem.quantity}</p>
            <div className="inc-dic">
              <img
                src={upArrow}
                alt="Increase Quantity"
                onClick={() => updateCart("increase", productData._id)}
              />
              <img
                src={downArrow}
                alt="Decrease Quantity"
                onClick={() => updateCart("decrease", productData._id)}
              />
            </div>
          </div>
          <button
            onClick={() => {
              updateCart("remove", productData._id);
            }}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
