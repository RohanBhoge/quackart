import { useState } from "react";
import "./Login.css";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });
      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="sign-login-container">
      <input type="checkbox" id="chk" aria-hidden="true" />
      <div className="sign-up">
        <form>
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
      <div className="login">
        <form onSubmit={onSubmitHandler}>
          <label htmlFor="chk" aria-hidden="true">
            Login
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="e-mail"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
          <input
            type="password"
            name="pswd"
            placeholder="Password"
            className="password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
