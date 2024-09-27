import "./CartProduct.css";
import deleteIcon from "../assets/delete.svg";
import upArrow from "../assets/up-arrow.svg";
import downArrow from "../assets/arrow-down-01.svg";
import { useContext, useEffect, useState } from "react";
import ProductContext from "../context/Product/ProductContext";

function CartProduct({ product }) {
  const context = useContext(ProductContext);
  const [productData, setProductData] = useState({});

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${product.id}`)
      .then((res) => res.json())
      .then((data) => setProductData(data));
  }, [product.id]);

  const removeCartItem = () => {
    context.removeFromCart(productData.id);
  };

  const updateQuantity = (newQuantity, event) => {
    context.updateCartItemQuantity(product.id, newQuantity);

    if (newQuantity > product.quantity) {
      context.addCartValue(event);
    } else if (newQuantity > 0) {
      context.minusCartValue(event, product.id);
    } else {
      context.removeFromCart(product.id);
    }
  };

  return (
    <div className="cart-product">
      <img
        className="product-img"
        src={productData.image}
        alt={productData.title}
      />
      <div className="product-info">
        <p>{productData.title}</p>
        <div className="price-button">
          <p>${(productData.price * product.quantity).toFixed(2)}</p>
          <div className="buttons">
            <button onClick={(e) => updateQuantity(product.quantity - 1, e)}>
              -
            </button>
            <button onClick={(e) => updateQuantity(product.quantity + 1, e)}>
              +
            </button>
          </div>
        </div>
        <div className="qty-delete">
          <div className="qty">
            <p>Qty: {product.quantity}</p>
            <div className="inc-dic">
              <img
                src={upArrow}
                alt=""
                onClick={(e) => updateQuantity(product.quantity + 1, e)}
              />
              <img
                src={downArrow}
                alt=""
                onClick={(e) => updateQuantity(product.quantity - 1, e)}
              />
            </div>
          </div>
          <button onClick={removeCartItem}>Remove</button>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
