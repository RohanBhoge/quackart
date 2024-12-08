import { createRoot } from "react-dom/client";
import App from "./src/App";
import ProductState from "./src/context/Product/ProductState.jsx";

const root = createRoot(document.getElementById("root"));
root.render(
  <ProductState>
    <App />
  </ProductState>
);