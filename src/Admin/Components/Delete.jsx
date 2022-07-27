import { useAuthContext } from "../../Contexts/authContext";
import Swal from "sweetalert2";
import { Navigate, Outlet, useParams } from 'react-router-dom';
import { ADMIN } from "../../Config/Routes/paths";

const Delete = () => {
  const ID = useParams().id
  const { globalAdminToken } = useAuthContext();

  const base = import.meta.env.VITE_BASE_URL;
  const endpoint = `/deleteProduct/${ID}`;

  fetch(base + endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + globalAdminToken.tokenAdmin,
    },
  })

    return <Navigate to={ADMIN} />;
};

export default Delete;
