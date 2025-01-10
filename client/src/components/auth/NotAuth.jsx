import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const user = useSelector((state) => state.user);

  if (!user) {
    return <Outlet />;
  } else {
    return <Navigate to="/browse" />;
  }
};

export default RequireAuth;
