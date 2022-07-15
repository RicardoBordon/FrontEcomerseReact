import { createContext, useMemo, useState, useCallback, useContext } from "react";
import PropTypes from 'prop-types';
import Cookies from "universal-cookie";


export const AuthContext = createContext();

export function AuthContextProvider({children}) {
    const cookies = new Cookies();
    const [isAuthenticated, setIsAuthenticaded] = useState(false );
    
    const [isAdminAuthenticated, setIsAdminAuthenticaded] = useState(false);    

    const Login = useCallback(function() {                                                                   
        setIsAuthenticaded(true);
    }, []);

    const Admin = useCallback(function() {                                                                   
        setIsAdminAuthenticaded(true);
    }, []);

    const Logout = useCallback(function() {
        cookies.remove("token");
        cookies.remove("tokenAdmin");
        setIsAuthenticaded(false);
        setIsAdminAuthenticaded(false);
    }, []);

    const value = useMemo(() => ({
        Login,
        Admin,
        Logout,
        isAuthenticated,
        isAdminAuthenticated
    }), [Login, Admin, Logout,isAuthenticated, isAdminAuthenticated, Admin]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthContextProvider.propTypes = {
    children: PropTypes.object
};

export function useAuthContext() {
    return useContext(AuthContext);
}