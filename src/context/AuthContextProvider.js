import { useEffect } from "react";
import { createContext, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

function getInitialState() {
  const initState = Cookies.get("expertia");
  return initState ? initState : "";
}

const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(getInitialState);

  useEffect(() => {
    Cookies.set("expertia", auth, { expires: 365 });
  }, [auth]);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
