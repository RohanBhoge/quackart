import "./CartProduct.css";
import deleteIcon from "../assets/delete.svg";
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
      <img src={productData.image} alt={productData.title} />
      <div className="product-info">
        <p>{productData.title}</p>
        <p>${productData.price}</p>
      </div>

      <div className="buttons">
        <button onClick={(e) => updateQuantity(product.quantity - 1, e)}>
          -
        </button>

        <button onClick={removeCartItem}>
          <img src={deleteIcon} alt="Delete" />
        </button>

        <button onClick={(e) => updateQuantity(product.quantity + 1, e)}>
          +
        </button>
      </div>

      <p className="product-quantity">
        Quantity: <span>{product.quantity}</span>
      </p>
      <p className="product-total-price">
        Total Price: ${(productData.price * product.quantity).toFixed(2)}
      </p>
    </div>
  );
}

export default CartProduct;
