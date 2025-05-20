import { useContext } from "react";
import Login from "../components/Login.jsx";
import "./Account.css";
import ThemeContext from "../context/Theme/ThemeContext.jsx";

const Account = () => {
  const { dark } = useContext(ThemeContext);
  return (
    <div className={`login-page ${dark ? "primary-dark-active " : ""}`}>
      <Login />
    </div>
  );
};

export default Account;
