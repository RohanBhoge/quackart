import { useContext, useEffect, useState } from "react";
import "./Login.css";
import ProductContext from "../context/Product/ProductContext";
import { useNavigate } from "react-router-dom";
import Close from "../assets/close.svg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  // const [token, setToken] = useState("");

  const { loginActive, token, setToken, dark, backendUrl } =
    useContext(ProductContext);
  const navigate = useNavigate();
  const newUser = async (name, email, password) => {
    try {
      console.log(backendUrl);

      const response = await axios.post(backendUrl + "/api/user/register", {
        name,
        email,
        password,
      });
      console.log(response);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
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

      console.log(response);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
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
            console.log("responce submited");
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
