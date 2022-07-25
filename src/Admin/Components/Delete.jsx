import { useAuthContext } from "../../Contexts/authContext";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const Delete = () => {
  const itemID = window.location.pathname;
  const ID = itemID.split("/").pop();
  const { globalAdminToken } = useAuthContext();

  const base = import.meta.env.VITE_BASE_URL;
  const endpoint = `/deleteProduct/${ID}`;

  fetch(base + endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + globalAdminToken.tokenAdmin,
    },
  });
  // .then(function (response) {
  //   console.log(response)
  //   if(response.status === 400){
  //     alert("Error al registrar")
  //   }
  //   else if(response.status === 200){
  //     alert("Actualizado correctamente");
  //   }})

  console.log("elmento borrado");
  return (<h1>ELEMENTO BORRADO</h1>);
};

export default Delete;
