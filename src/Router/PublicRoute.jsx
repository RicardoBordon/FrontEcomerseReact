import { ADMIN, PRIVATE } from '../Config/Routes/paths';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import {useAuthContext} from '../Contexts/authContext';
import { Public } from '@mui/icons-material';

export default function PublicRoute() {
    const {isAuthenticated} = useAuthContext();
    const {isAdminAuthenticated} = useAuthContext();
    console.log(useLocation())
    console.log(sessionStorage.getItem("user"))

    // if(useLocation().pathname === "/" && sessionStorage.getItem("user") === "true"){
    //     return <Navigate to={PRIVATE} replace={false}/>;
    // }
    // else if(useLocation().pathname === "/" && sessionStorage.getItem("admin") === "true"){
    //     return <Navigate to={ADMIN} replace={false}/>;
    // }
        return (
            <div>
                <Outlet/>
            </div>
        );

    }

