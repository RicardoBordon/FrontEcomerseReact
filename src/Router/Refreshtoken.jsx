    import React from 'react'
import { PRIVATE } from '../Config/Routes/paths';
    
    
    async function Refreshtoken() {
        const base = import.meta.env.VITE_BASE_URL;
        const endpoint = `/login`;
        const endpoint2 = `/refresh`;
        const endpoint3 = `/refreshAdmin`;

     await axios({
        method: "get",
        url: base + endpoint2,
        withCredentials: true,
      })
        .then(function (response) {
          login(response.data);
        }, [])
        .catch(function (error) {
          console.log("sin cookieee");
        });

      return (
         <Navigate to={PRIVATE}></Navigate>
      )
    }
    
    export default Refreshtoken
