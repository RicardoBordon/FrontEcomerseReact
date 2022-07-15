import {LOGIN} from '../Config/Routes/paths';
import { Navigate, Outlet } from 'react-router-dom';
import {useAuthContext} from '../Contexts/authContext';

export default function PrivateRouter() {
    const {isAuthenticated} = useAuthContext();
    
    if(!isAuthenticated) {
        return <Navigate to={LOGIN} />;
    }

    return (
        <div>
            <Outlet/>
        </div>
    );
}