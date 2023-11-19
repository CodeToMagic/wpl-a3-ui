import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { GlobalContext } from "../..";

const PrivateRoute = ({ children }) => {
  const { isCurrentSessionActive } = useContext(GlobalContext);
  return isCurrentSessionActive ? children : <Navigate to="/" />;
};
export default PrivateRoute;
