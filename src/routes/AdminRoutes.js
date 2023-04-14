import { Navigate, Outlet } from "react-router-dom";

const AdminRoutes = () => {
  let token = localStorage.getItem("token");
  let groups = localStorage.getItem("groups");
  return token && groups === "admin" ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoutes;
