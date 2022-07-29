import { ADMIN, PRIVATE } from '../Config/Routes/paths';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function PublicRoute() {

    if(sessionStorage.getItem("user") === "true"){
        return <Navigate to={PRIVATE} replace={false}/>;
    }
    else if(sessionStorage.getItem("admin") === "true"){
        return <Navigate to={ADMIN} replace={false}/>;
    }
        return (
            <div>
                <Outlet/>
            </div>
        );

    }

