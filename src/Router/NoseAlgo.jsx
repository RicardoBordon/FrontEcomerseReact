import { HOME, LOGIN, PRIVATE } from "../Config/Routes/paths";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../Contexts/authContext";
import axios from "axios";

//URL API
const base = import.meta.env.VITE_BASE_URL;
const endpoint = `/refresh`;

export default function Sessiones() {
  const { Refresh, globalToken } = useAuthContext();

  const RefreshToken = () => {
    axios({
      method: "get",
      url: base + endpoint,
      withCredentials: true,
    })
      .then(function (response) {
        console.log("refresh" + response);
      }, [])
      .catch(function (error) {
        console.log("sin cookie");
      });
  };

  if (sessionStorage.getItem("user") && globalToken.token === undefined) {
    console.log("por aqui")
    return <Navigate to={PRIVATE} />;
  }
  if (sessionStorage.getItem("user") && globalToken.token !== undefined) {
    RefreshToken();
  }
else {
    console.log("ni admin ni user");
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
