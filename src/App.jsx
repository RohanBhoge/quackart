import { BrowserRouter, json, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Product from "./components/Product";
import Navbar from "./components/Navbar";
import CartPage from "./Pages/CartPage";
import Logout from "./components/AccountSetting";
import Account from "./Pages/Account";
import CartLoginForm from "./components/CartLoginForm";
import { useContext } from "react";
import ProductContext from "./context/Product/ProductContext";

export default function App() {
  const context = useContext(ProductContext);
  const logedUser = context.logedUser;
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route
          path="/cart"
          element={
            Object.keys(logedUser).length === 0 ? (
              <CartLoginForm />
            ) : (
              <CartPage />
            )
          }
        />
        <Route path="/login" element={<Account />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}