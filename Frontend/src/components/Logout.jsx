import { useContext } from "react";
import "./Logout.css";
import addAcountIcon from "../assets/add_account.svg";
import darkaddAcountIcon from "../assets/darkadd_account.svg";
import logoutIcon from "../assets/logoutIcon.svg";
import darklogoutIcon from "../assets/darklogoutIcon.svg";
import { Link, useNavigate } from "react-router-dom";
import ProductContext from "../context/Product/ProductContext.jsx";
import profile from "../assets/profile.svg";
import darkprofile from "../assets/darkprofile.svg";

const Logout = () => {
  const context = useContext(ProductContext);
  const navigation = useNavigate();
  return (
    <div className={`${context.dark ? "primary-dark-active active-dark" : ""}`}>
      <div className={`container`}>
        <div className="profile-container">
          {/* Heading */}
          <h1>QuickCart</h1>

          {/* User info Section */}
          <div className="user-profile">
            <img src={context.dark ? darkprofile : profile} alt="" />
            <div className="user-details">
              <p className="user-name">
                {context.useDetail.name ? context.useDetail.name : "Guest"}
              </p>
              <p className="user-email">
                {context.useDetail.email || "useremail@gmail.com"}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="section-divider"></div>

          {/* Link and add anather account */}
          <Link
            to={"/login"}
            className="add-account-link"
          >
            <img
              src={context.dark ? darkaddAcountIcon : addAcountIcon}
              alt=""
            />
            <p>Add anather account</p>
          </Link>

          {/* Divider*/}
          <div className="section-divider"></div>

          {/* Sign out button */}
          <div
            className="sign-out-button"
            onClick={() => {
              localStorage.removeItem("token");
              context.setToken("");
              navigation("/");
            }}
          >
            <img src={context.dark ? darklogoutIcon : logoutIcon} alt="" />
            <p>sign out of account</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Logout;
