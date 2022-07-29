import {LOGIN, PRIVATE } from '../Config/Routes/paths';
import { Navigate, Outlet } from 'react-router-dom';
import {useAuthContext} from '../Contexts/authContext';
import axios from "axios";

export default function PrivateRouter() {
    const base = import.meta.env.VITE_BASE_URL;
    const endpoint = `/refresh`;

    const {
        login,
        globalToken,
      } = useAuthContext();
   
    const RefreshToken = async () => {
      await axios({
        method: "get",
        url: base + endpoint,
        withCredentials: true,
      })
        .then(async function (response) {
          await login(response.data);
        }, [])
        .catch(async function (error) {
          console.log("sin cookieee");
        });
    }
  
    if ( sessionStorage.getItem("user") === "true" && globalToken.token === undefined ){
      RefreshToken();
      return <Navigate to={PRIVATE} replace={true}/>
    }  


  else if(sessionStorage.getItem("user") !== "true") {
      return <Navigate to={LOGIN} replace={true}/>
  }  



    return (
        <div>
            <Outlet/>
        </div>
    );
}