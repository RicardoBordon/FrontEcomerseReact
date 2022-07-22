import {HOME, LOGIN, PRIVATE} from '../Config/Routes/paths';
import { Navigate, Outlet } from 'react-router-dom';
import {useAuthContext} from '../Contexts/authContext';

export default function Refresh() {
    const res = async () => {
        await axios({
          method: "get",
          url: base+endpoint2,
          withCredentials: true,
        })
        .then(function (response) {
          setToken(response.data)
        })
      } 
    

    return (
        <div>
            <Outlet/>
        </div>
    );
}