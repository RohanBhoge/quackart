import { createRoot } from "react-dom/client";
import App from "./src/App.jsx";
import ProductState from "./src/context/Product/ProductState.jsx";
import AuthProvider from "./src/context/Auth/AuthProvider.jsx";
import CartProvider from "./src/context/Cart/CartProvider.jsx";
import ThemeProvider from "./src/context/Theme/ThemeProvider.jsx";

const root = createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <ProductState>
      <CartProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </CartProvider>
    </ProductState>
  </AuthProvider>
);