import {
  createContext,
  useMemo,
  useState,
  useCallback,
  useContext,
} from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  //URL API
  const base = import.meta.env.VITE_BASE_URL;
  const endpoint2 = `/refresh`;

  const [isAuthenticated, setIsAuthenticaded] = useState(false);

  const [isAdminAuthenticated, setIsAdminAuthenticaded] = useState(false);

  const [globalToken, setGlobalToken] = useState({});

  const [globalAdminToken, setAdminGlobalToken] = useState({});

  
  const login = useCallback(function (token) {
    sessionStorage.setItem("user", true);
    setGlobalToken(token);
    setIsAuthenticaded(true);
  }, []);

  const Admin = useCallback(function (token) {
    sessionStorage.setItem("admin", true);
    setAdminGlobalToken(token);
    setIsAdminAuthenticaded(true);
  }, []);

  const Logout = useCallback(async function () {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("admin");
    setIsAuthenticaded(false);
    setIsAdminAuthenticaded(false);
    setGlobalToken("");
    setAdminGlobalToken("");
  }, []);

  const value = useMemo(
    () => ({
      login,
      Admin,
      Logout,
      isAuthenticated,
      isAdminAuthenticated,
      globalToken,
      globalAdminToken,
    }),
    [
      login,
      Admin,
      Logout,
      isAuthenticated,
      isAdminAuthenticated,
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
