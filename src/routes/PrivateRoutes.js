import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  let token = localStorage.getItem("access");
  let groups = localStorage.getItem("groups");
  return token && groups !== "admin" ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
