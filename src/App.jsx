import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";

//Public;
import PublicRoute from "./Router/PublicRoute";
import HomeLoginScreen from "./Home/Screen/HomeLoginScreen";
import HomeRegisterScreen from "./Home/Screen/HomeRegisterScreen";
import HomeShopScreen from "./Home/Screen/HomeShopScreen";

//Shop Screen
import PrivateRouter from "./Router/PrivateRoute";
import ShopScreen from "./Shop/Screens/ShopScreen";
import SingleProductScreen from "./Shop/Screens/SingleProductScreen";

//Admin Screen
import PrivateRouterAdmin from "./Router/PrivaterouteAdmin";
import ShopAdminScreen from "./Admin/Screen/ShopAdminScreen";
import EditScreen from "./Admin/Screen/EditScreen";
import Delete from "./Admin/Components/Delete";
import CreateAdminScreen from "./Admin/Screen/CreateAdminScreen";

import { AuthContextProvider } from "./Contexts/authContext";
import CartBuyScreen from "./Shop/Screens/CartBuyScreen";
import { HOME, PRIVATE, ADMIN } from "./Config/Routes/paths";

function App() { 
  return (
    <>
      <AuthContextProvider> 
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path={HOME} element={<PublicRoute/>}>
          {<Route index element={<HomeShopScreen/>} exact />}
          {<Route path="/login" element={<HomeLoginScreen/>} exact />}
          {<Route path="/register" element={<HomeRegisterScreen />} exact />}
          {<Route path="*" element={<HomeShopScreen />} exact/>}
          </Route>
       
          {/* PrivateUser */}
          <Route path={PRIVATE} element={<PrivateRouter/>}>
          {<Route index element={<ShopScreen/>} exact />}
          <Route path="/shop/:id" element={<SingleProductScreen/>} exact />
          <Route path="/shop/cart" element={<CartBuyScreen/>} exact />
          </Route>

          {/* Admin */}
          <Route path={ADMIN} element={<PrivateRouterAdmin/>}>
          {<Route path="/admin" element={<ShopAdminScreen />} exact />}
          {<Route path="/admin/create" element={<CreateAdminScreen />} exact />}
          {<Route path="/admin/edit/:id" element={<EditScreen />} exact />}
          {<Route path="/admin/delete/:id" element={<Delete />} exact />}
          </Route>
        </Routes>
      </BrowserRouter>
      </AuthContextProvider>
    </>
  );
}

export default App;
