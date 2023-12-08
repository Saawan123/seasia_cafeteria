import { Navigate, Outlet } from "react-router-dom";
import Login from "../Pages/Login";
import ToastifyShow from "../components/ToastifyShow";
import AdminPanel from "../Pages/AdminPanel";
import Sidebar from "../components/SideBar";

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

export const ProtectedRouteCheck = ({ children }: any) => {
  const isAuth = useAuth();
  return isAuth ? <Navigate to="/" /> : children;
};

const ProtectedRoute = () => {
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
    <Navigate to="/" /> // Redirect to login if not authenticated
  );
};


export default ProtectedRoute;
