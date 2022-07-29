import {
  createContext,
  useMemo,
  useState,
  useCallback,
  useContext,
} from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  //URL API
  const base = import.meta.env.VITE_BASE_URL;

  const [globalToken, setGlobalToken] = useState({});

  const [globalAdminToken, setAdminGlobalToken] = useState({});

  
  const login = useCallback(function (token) {
    sessionStorage.setItem("user", true);
    setGlobalToken(token);
  });

  const Admin = useCallback(function (token) {
    sessionStorage.setItem("admin", true);
    setAdminGlobalToken(token);
  }, []);

  const Logout = useCallback(async function () {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("admin");
    setGlobalToken("");
    setAdminGlobalToken("");
  }, []);

  const value = useMemo(
    () => ({
      login,
      Admin,
      Logout,
      globalToken,
      globalAdminToken,
    }),
    [
      login,
      Admin,
      Logout,
      globalToken,
      globalAdminToken,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthContextProvider.propTypes = {
  children: PropTypes.object,
};

export function useAuthContext() {
  return useContext(AuthContext);
}
