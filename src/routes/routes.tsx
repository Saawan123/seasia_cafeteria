// import { Routes, Route, Outlet } from "react-router-dom";
// import React from "react";
// // import ProtectedRoute from "./ProtectedRoutes";
// import Dashboard from "../Pages/AdminPanelPages/Dashboard";
// // import Sidebar from "../components/SideBar";


// const Login = React.lazy(() => import("../Pages/Login"));
// const AdminPanel = React.lazy(() => import("../Pages/AdminPanel"));
// const Orders = React.lazy(() => import("../Pages/AdminPanelPages/Orders"));
// const CustomerOrders = React.lazy(() => import("../Pages/AdminPanelPages/CustomerOrders"));
// const UserList = React.lazy(() => import("../Pages/AdminPanelPages/UserList"));
// const Menu = React.lazy(() => import("../Pages/AdminPanelPages/Menu"));

// export default function RouteFile() {
//   return (
//     <Routes >
     

//       {/* <Route path="/login" element={ <Login />} /> */}
//       {/* <Route path="/" element={<Login />} /> */}
//       <Route path="/" element={  <Login /> }
//       />
//         <Route path="/AdminPanel" element={<AdminPanel />} />
//         <Route path="/AdminPanel/dashboard" element={<Dashboard />} />
//         <Route path="/AdminPanel/orders" element={<Orders/>} />
//         <Route path="/AdminPanel/custom-order" element={<CustomerOrders/>} />
//         <Route path="/AdminPanel/user-list" element={<UserList/>} />
//         <Route path="/AdminPanel/Menu" element={<Menu/>} />

        
//     </Routes>
//   );
// }
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute, { ProtectedRouteCheck } from "./ProtectedRoutes";
const Dashboard = React.lazy(() => import("../Pages/AdminPanelPages/Dashboard"))
const Login = React.lazy(() => import("../Pages/Login"));
const AdminPanel = React.lazy(() => import("../Pages/AdminPanel"));
const Orders = React.lazy(() => import("../Pages/AdminPanelPages/Orders"));
const CustomerOrders = React.lazy(() => import("../Pages/AdminPanelPages/CustomerOrders"));
const UserList = React.lazy(() => import("../Pages/AdminPanelPages/UserList"));
const Menu = React.lazy(() => import("../Pages/AdminPanelPages/Menu"));

export default function RouteFile() {
  return (
    <Routes>
      {/* Use ProtectedRoute for routes that require authentication */}
      <Route
        path="/"
        element={
          <ProtectedRouteCheck>
            <Login />
          </ProtectedRouteCheck>
        }
      />
      <Route
        path="/AdminPanel"
        element={<ProtectedRoute />} // Wrap the ProtectedRoute around the routes that require authentication
      >
        {/* Define your nested routes here */}
        <Route path="/AdminPanel" element={<AdminPanel />} />
        <Route path="/AdminPanel/dashboard" element={<Dashboard />} />
        <Route path="/AdminPanel/orders" element={<Orders />} />
        <Route path="/AdminPanel/custom-order" element={<CustomerOrders />} />
        <Route path="/AdminPanel/user-list" element={<UserList />} />
        <Route path="/AdminPanel/Menu" element={<Menu />} />
      </Route>

      {/* Public routes that don't require authentication */}
      {/* <Route path="/login" element={<Login />} /> */}
    </Routes>
  );
}
