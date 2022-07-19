import { createContext, useMemo, useState, useCallback, useContext } from "react";
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export function AuthContextProvider({children}) {

    
    const [isAuthenticated, setIsAuthenticaded] = useState(false );
    
    const [isAdminAuthenticated, setIsAdminAuthenticaded] = useState(false);    

    const login = useCallback(function() {                                                                   
         setIsAuthenticaded(true);
    }, []);

    const Admin = useCallback(function() {                                                                   
        setIsAdminAuthenticaded(true);
    }, []);

    const Logout = useCallback(function() {


        setIsAuthenticaded(false);
        setIsAdminAuthenticaded(false);
    }, []);

    const value = useMemo(() => ({
        login,
        Admin,
        Logout,
        isAuthenticated,
        isAdminAuthenticated
    }), [login, Admin, Logout,isAuthenticated, isAdminAuthenticated]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthContextProvider.propTypes = {
    children: PropTypes.object
};

export function useAuthContext() {
    return useContext(AuthContext);
}