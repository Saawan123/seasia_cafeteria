import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/SideBar";
import { useSelector } from "react-redux";

export const useAuth = () => {
  const userdata = localStorage.getItem("token");
  const user = userdata ? { loggedIn: true } : { loggedIn: false };
  return user.loggedIn;
};

export const getToken = () => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
};
// authentication for user
export const ProtectedRouteCheck:any = () => {
  const isAuth = useAuth(); 
 const role = localStorage.getItem("apiResponse")
  return isAuth && role==="User" ? <Outlet /> : <Navigate to ="/"/>;
};
// authentication for admin
const ProtectedRoute :any = () => {
  const isAuth = useAuth();
  
  return isAuth ? (
    <>
      <Sidebar />
      <main className="content-wrapper">
        {/* <AdminPanel /> */}
        <Outlet />
      </main>
    </>
  ) : (
    <Navigate to="/" /> 
  );
};


export default ProtectedRoute;
