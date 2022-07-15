import {LOGIN} from '../Config/Routes/paths';
import { Navigate, Outlet } from 'react-router-dom';
import {useAuthContext} from '../Contexts/authContext';

export default function PrivateRouterAdmin() {
    const {isAdminAuthenticated} = useAuthContext();
    
    if(!isAdminAuthenticated) {
        return <Navigate to={LOGIN} />;
    }

    return (
        <div>
            <Outlet/>
        </div>
    );
}