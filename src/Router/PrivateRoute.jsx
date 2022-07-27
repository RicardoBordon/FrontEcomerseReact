import {LOGIN, PRIVATE } from '../Config/Routes/paths';
import { Navigate, Outlet } from 'react-router-dom';
import {useAuthContext} from '../Contexts/authContext';
import axios from "axios";

export default function PrivateRouter() {
    const base = import.meta.env.VITE_BASE_URL;
    const endpoint = `/refreshAdmin`;

    const { login, globalToken } = useAuthContext();

    const RefreshToken = () => {
        console.log("ejecutando refresh")
      axios({
        method: "get",
        url: base + endpoint,
        withCredentials: true,
      })
        .then(function (response) {
          login(response.data);
        }, [])
        .catch(function (error) {
          console.log("sin cookieee");
        });
    }
  
  //sin autorizacion no entro 

  if(sessionStorage.getItem("user") !== "true") {
      return <Navigate to={LOGIN} replace={true}/>
  }  

   //Si estoy logueado y no existe token porque recargue y se perdió de la memoria
   // llamo a refresh para obtener un nuevo token y persistir el usuario
   
  else if ( sessionStorage.getItem("user") === "true" && globalToken.token === undefined ){
     RefreshToken();
    return <Navigate to={PRIVATE}/>
  }

    return (
        <div>
            <Outlet/>
        </div>
    );
}