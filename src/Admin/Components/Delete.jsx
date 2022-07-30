import { useAuthContext } from "../../Contexts/authContext";
import {useParams } from 'react-router-dom';
import { ADMIN } from "../../Config/Routes/paths";

const Delete = () => {
  const ID = useParams().id
  const { globalAdminToken } = useAuthContext();

  const base = import.meta.env.VITE_BASE_URL;
  const endpoint = `/deleteProduct/${ID}`;

  await fetch(base + endpoint, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + globalAdminToken.tokenAdmin,
    },
  })
}

setTimeout(function(){
  return <Navigate to={ADMIN} />;
}, 5000);


export default Delete;
