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

  if (sessionStorage.getItem("admin") !== "true") {
    return <Navigate to={LOGIN} replace={true} />;
  }
  else if (
    sessionStorage.getItem("admin") === "true" &&
    globalAdminToken.tokenAdmin === undefined
  ) {
    RefreshToken();
    console.log("refresh");
    return <Navigate to={ADMIN}/>;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
