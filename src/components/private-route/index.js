import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { GlobalContext } from "../..";

export const PrivateRoute = ({ childern }) => {
  const { isCurrentSessionActive } = useContext(GlobalContext);
  return isCurrentSessionActive ? childern : <Navigate to="/" />;
};
