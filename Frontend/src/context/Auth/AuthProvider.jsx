import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { use } from "react";
import axios from "axios";

const AuthProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userDetail, setUserDetail] = useState({});

  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  useEffect(() => {
    getUserDetails();
  }, [token]);

  const getUserDetails = async () => {
    try {
      if (!token) {
        setUserDetail({});
        return;
      }
      const response = await axios.get(backendUrl + "/api/user/user-details", {
        headers: {
          token,
        },
      });

      if (response.data.success) {
        setUserDetail(response.data.user);
      } else {
        console.log("Error:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        backendUrl,
        userDetail,
        setUserDetail,
        getUserDetails,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
