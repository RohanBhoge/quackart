import { useContext } from "react";
import "./Login.css";
import ProductContext from "../context/Product/ProductContext";
import { useNavigate } from "react-router-dom";
import Close from "../assets/close.svg";

const Login = () => {
  const {
    userAccount,
    setUserAccount,
    setLogedUser,
    loginActive,
    setUserName,
  } = useContext(ProductContext);
  const navigate = useNavigate();

  const newUser = (name, email, pwd) => {
    const storedAccounts = JSON.parse(localStorage.getItem("account")) || [];
    const isEmailExist = storedAccounts.some(
      (account) => account.email === email
    );

    if (isEmailExist) {
      alert("Email already exists");
      return;
    }

    const newUserAccount = {
      name,
      email,
      password: pwd,
      cartproducts: [],
    };

    const updatedAccounts = [...storedAccounts, newUserAccount];
    localStorage.setItem("account", JSON.stringify(updatedAccounts));
    setUserAccount(updatedAccounts);
  };

  const loginUser = (email, password) => {
    const storedAccounts = JSON.parse(localStorage.getItem("account")) || [];
    const foundAccount = storedAccounts.find(
      (account) => account.email === email && account.password === password
    );

    if (foundAccount) {
      localStorage.setItem("LogedUser", JSON.stringify(foundAccount));
      const loggedUser = JSON.parse(localStorage.getItem("LogedUser"));
      setLogedUser(loggedUser);
      setUserName(loggedUser.name);
      navigate("/");
    } else if (storedAccounts.length === 0) {
      alert("Please register first.");
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="sign-login-container">
      {loginActive && <img src={Close} alt="Close" className="close-icon" />}
      <input type="checkbox" id="chk" aria-hidden="true" />

      <div className="sign-up">
        <form
          onSubmit={(e) => {
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

      <div className="login">
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
