import { useContext, useEffect } from "react";
import "./Login.css";
import ProductContext from "../context/Product/ProductContext.jsx";
import { useNavigate } from "react-router-dom";
import Close from "../assets/close.svg";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThemeContext from "../context/Theme/ThemeContext.jsx";
import AuthContext from "../context/Auth/AuthContext.jsx";

const Login = () => {
  const { loginActive } = useContext(ProductContext);
  const { token, setToken, backendUrl } = useContext(AuthContext);
  const { dark } = useContext(ThemeContext);

  const navigate = useNavigate();

  const newUser = async (name, email, password) => {
    try {
      const response = await axios.post(backendUrl + "/api/user/register", {
        name,
        email,
        password,
      });
      
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success("Registration Successful please login");
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(backendUrl + "/api/user/login", {
        email,
        password,
      });

      console.log(response.data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success("Login Successful");
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, [token]);

  return (
    <div
      className={`sign-login-container ${
        dark ? "primary-dark-active dark-active" : ""
      }`}
    >
      {loginActive && <img src={Close} alt="Close" className="close-icon" />}
      <input type="checkbox" id="chk" aria-hidden="true" />

      <div className="sign-up">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            newUser(
              e.target.txt.value,
              e.target.email.value,
              e.target.password.value
            );
          }}
        >
          <label htmlFor="chk" aria-hidden="true">
            Sign Up
          </label>
          <input
            type="text"
            name="txt"
            placeholder="User Name"
            className="user-name"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="e-mail"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="password"
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>

      <div className={`login ${dark ? "dark-active" : ""}`}>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            loginUser(e.target.email.value, e.target.pswd.value);
          }}
        >
          <label htmlFor="chk" aria-hidden="true">
            Login
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="e-mail"
            required
          />
          <input
            type="password"
            name="pswd"
            placeholder="Password"
            className="password"
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
