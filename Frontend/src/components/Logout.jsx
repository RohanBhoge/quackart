import { useContext } from "react";
import "./Logout.css";
import addAcountIcon from "../assets/add_account.svg";
import darkaddAcountIcon from "../assets/darkadd_account.svg";
import logoutIcon from "../assets/logoutIcon.svg";
import darklogoutIcon from "../assets/darklogoutIcon.svg";
import profile from "../assets/profile.svg";
import darkprofile from "../assets/darkprofile.svg";
import ThemeContext from "../context/Theme/ThemeContext.jsx";
import AuthContext from "../context/Auth/AuthContext.jsx";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Logout = () => {
  const { setToken, userDetail } = useContext(AuthContext);
  const { dark } = useContext(ThemeContext);
  const navigation = useNavigate();

  return (
    <div className={`${dark ? "primary-dark-active active-dark" : ""}`}>
      <div className={`container`}>
        <div className="profile-container">
          {/* Heading */}
          <h1>QuickCart</h1>

          {/* User info Section */}
          <div className="user-profile">
            <img src={dark ? darkprofile : profile} alt="" />
            <div className="user-details">
              <p className="user-name">
                {userDetail.name ? userDetail.name : "Guest"}
              </p>
              <p className="user-email">
                {userDetail.email || "useremail@gmail.com"}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="section-divider"></div>

          {/* Link and add anather account */}
          <Link to={"/login"} className="add-account-link">
            <img src={dark ? darkaddAcountIcon : addAcountIcon} alt="" />
            <p>Add anather account</p>
          </Link>

          {/* Divider*/}
          <div className="section-divider"></div>

          {/* Sign out button */}
          <div
            className="sign-out-button"
            onClick={() => {
              localStorage.removeItem("token");
              setToken("");
              toast.success("Logout Successful");
              navigation("/");
            }}
          >
            <img src={dark ? darklogoutIcon : logoutIcon} alt="" />
            <p>sign out of account</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Logout;
