import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Product from "./components/Product";
import Navbar from "./components/Navbar";
import CartPage from "./Pages/CartPage";
import Logout from "./components/Logout";
import Account from "./Pages/Account";
import HomePageShemmer from "./components/HomePageShemmer.jsx";

export default function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<Account />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/shemmer" element={<HomePageShemmer />} />
      </Routes>
    </HashRouter>
  );
}
