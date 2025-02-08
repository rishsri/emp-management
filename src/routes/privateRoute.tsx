import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { urls } from "../URLs/urls";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const {isAuthenticated} = useAuthContext();
  return isAuthenticated ? children : <Navigate to={urls.LOGIN} />;
};

export default PrivateRoute;
