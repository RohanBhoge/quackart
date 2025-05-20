import { useState } from "react";
import themeContext from "./ThemeContext";
const ThemeProvider = (props) => {
  const [dark, setDark] = useState(
    localStorage.getItem("DarkMode") === "true" ? true : false
  );
  console.log(dark);

  return (
    <themeContext.Provider value={{ dark, setDark }}>
      {props.children}
    </themeContext.Provider>
  );
};

export default ThemeProvider;
