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
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import ProtectedRoute, { ProtectedRouteCheck } from "./ProtectedRoutes";
import "../routes/route.scss"
const Dashboard = React.lazy(() => import("../Pages/AdminPanelPages/Dashboard"))
const Login = React.lazy(() => import("../Pages/Login"));
const User = React.lazy(()=>import("../Pages/UserPanel/UserProfile"))
const AdminPanel = React.lazy(() => import("../Pages/AdminPanel"));
const Orders = React.lazy(() => import("../Pages/AdminPanelPages/Orders"));
const CustomerOrders = React.lazy(() => import("../Pages/AdminPanelPages/CustomerOrders"));
const UserList = React.lazy(() => import("../Pages/AdminPanelPages/UserList"));
const Menu = React.lazy(() => import("../Pages/AdminPanelPages/Menu"));

export default function RouteFile() {
  const navigate = useNavigate()
  return (
    <Routes>
  
      {/* Use ProtectedRoute for routes that require authentication */}
      <Route path="/" element={<Login />} />
       <Route path="/" element ={<ProtectedRouteCheck/>}>
      <Route
        path="/UserProfile"
        element={
    
            <User />
       
        }
      />
        
       </Route>
      <Route
        path="/AdminPanel"
        element={<ProtectedRoute />} 
      >
        {/* Define your nested routes here */}
        <Route path="/AdminPanel" element={<AdminPanel />} />
        <Route path="/AdminPanel/dashboard" element={<Dashboard />} />
        <Route path="/AdminPanel/orders" element={<Orders />} />
        <Route path="/AdminPanel/custom-order" element={<CustomerOrders />} />
        <Route path="/AdminPanel/user-list" element={<UserList />} />
        <Route path="/AdminPanel/Menu" element={<Menu />} />
      </Route>
      <Route path="*" element={
      <div>
<div className="d-flex justify-content-center align-items-center mt-5">

      <h2>Something Went Wrong...</h2>
</div>
      <div className="d-flex justify-content-center align-items-center mt-5">

      <button className="error-btn text-warning fw-bold" onClick={()=>{navigate("/");
    localStorage.clear()
    }}>Back to Login</button>
      </div>
      </div>
      
      } />
      {/* Public routes that don't require authentication */}
    </Routes>
  );
}
