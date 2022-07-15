import {PRIVATE} from '../Config/Routes/paths';
import { Navigate, Outlet } from 'react-router-dom';
import {useAuthContext} from '../Contexts/authContext';

export default function PublicRoute() {
    const {isAuthenticated} = useAuthContext();
    
    // if(!isAuthenticated) {
    //     return <Navigate to={PRIVATE} />;
    // }

    return (
        <div>
            <Outlet/>
        </div>
    );
}