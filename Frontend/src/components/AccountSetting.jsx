import React, { useContext } from "react";
import "./AccountSetting.css";
import addAcountIcon from "../assets/add_account.svg";
import logoutIcon from "../assets/logoutIcon.svg";
import { Link, useNavigate } from "react-router-dom";
import ProductContext from "../context/Product/ProductContext";
const Logout = () => {
  const context = useContext(ProductContext);
  const navigation = useNavigate();
  return (
    <div className="container">
      <div className="profile-container">
        {/* Heading */}
        <h1>Quackart</h1>

        {/* User info Section */}
        <div className="user-profile">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
            alt=""
          />
          <div className="user-details">
            <p className="user-name">
              {context.logedUser.name ? context.logedUser.name : "Guest"}
            </p>
            <p className="user-email">
              {context.logedUser.email || "useremail@gmail.com"}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider"></div>

        {/* Link and add anather account */}
        <Link to={"/login"} className="add-account-link">
          <img src={addAcountIcon} alt="" />
          <p>Add anather account</p>
        </Link>

        {/* Divider*/}
        <div className="section-divider"></div>

        {/* Sign out button */}
        <div
          className="sign-out-button"
          onClick={() => {
            localStorage.setItem("LogedUser", JSON.stringify({}));
            context.setLogedUser({});
            navigation("/");
          }}
        >
          <img src={logoutIcon} alt="" />
          <p>sign out of account</p>
        </div>
      </div>
    </div>
  );
};
export default Logout;
