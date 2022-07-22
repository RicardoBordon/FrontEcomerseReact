import {HOME, LOGIN, PRIVATE} from '../Config/Routes/paths';
import { Navigate, Outlet } from 'react-router-dom';
import {useAuthContext} from '../Contexts/authContext';

export default function PublicRoute() {
    const {isAuthenticated} = useAuthContext();

    // if(!isAdminAuthenticated) {
    //     return <Navigate to={LOGIN} />;
    // }
    

    return (
        <div>
            <Outlet/>
        </div>
    );
}