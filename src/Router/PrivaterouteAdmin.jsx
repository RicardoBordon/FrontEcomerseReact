import { ADMIN, LOGIN } from "../Config/Routes/paths";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../Contexts/authContext";
import axios from "axios";

export default function PrivateRouterAdmin() {
  const base = import.meta.env.VITE_BASE_URL;
  const endpoint = `/refreshAdmin`;

  const { Admin, globalAdminToken } = useAuthContext();

  const RefreshToken = () => {
    axios({
      method: "get",
      url: base + endpoint,
      withCredentials: true,
    })
      .then(function (response) {
        Admin(response.data);
      }, [])
      .catch(function (error) {
        console.log("sin cookieee");
      });
  };
  //sin autorizacion no entro

  if (sessionStorage.getItem("admin") !== "true") {
    return <Navigate to={LOGIN} replace={true} />;
  }

  //Si estoy logueado y no existe token porque recargue y se perdió de la memoria
  // llamo a refresh para obtener un nuevo token y persistir el usuario
  else if (
    sessionStorage.getItem("admin") === "true" &&
    globalAdminToken.tokenAdmin === undefined
  ) {
    RefreshToken();
    console.log("refresh");
    return <Navigate to={ADMIN}/>;
  }
  console.log(globalAdminToken);

  return (
    <div>
      <Outlet />
    </div>
  );
}
