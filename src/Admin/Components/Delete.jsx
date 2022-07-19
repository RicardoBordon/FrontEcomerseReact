import Cookies from "universal-cookie";

const Delete = () => {
  const itemID = window.location.pathname;
  const ID = itemID.split("/").pop();
  const cookies = new Cookies();

  const base = import.meta.env.VITE_BASE_URL;
  const endpoint = `deleteProduct/${ID}`;

  fetch(base + endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json",
    Authorization: "Bearer " + cookies.get("tokenAdmin")
    },
    // body: JSON.stringify(valores),
  });
  console.log("elmento borrado");
  return <h1>elemento borrado</h1>;
};

export default Delete;
