import { useContext } from "react";
import Login from "../components/Login.jsx";
import "./Account.css";
import ProductContext from "../context/Product/ProductContext.jsx";

const Account = () => {
  const { dark } = useContext(ProductContext);
  return (
    <div className={`login-page ${dark ? "primary-dark-active " : ""}`}>
      <Login />
    </div>
  );
};

export default Account;
