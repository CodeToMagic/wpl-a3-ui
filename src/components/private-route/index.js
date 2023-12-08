import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { GlobalContext } from "../..";
import ConfirmationModel from "../confirmation/confirmation";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isInactive, setIsInactive] = useState(false);
  const { isCurrentSessionActive, setCurrentSessionActive } =
    useContext(GlobalContext);
  const updateExpireTime = () => {
    const expireTime = Date.now() + 1500000;
    localStorage.setItem("wpl_a3_expire_time", expireTime);
  };
  const checkIfActive = () => {
    if (
      localStorage.getItem("wpl_a3_expire_time") &&
      localStorage.getItem("wpl_a3_expire_time") < Date.now() + 10000
    ) {
      setIsInactive(true);
    }
    if (
      localStorage.getItem("wpl_a3_expire_time") &&
      localStorage.getItem("wpl_a3_expire_time") < Date.now()
    ) {
      handleLogOut();
    }
  };
  const handleLogOut = async () => {
    await axios
      .get("http://localhost:8080/auth/logout", { withCredentials: true })
      .then(
        (res) => {
          if (res.status === 200) {
            setCurrentSessionActive(false);
          }
        },
        (error) => {
          setCurrentSessionActive(false);
        }
      );
    navigate("/");
  };
  useEffect(() => {
    updateExpireTime();
    window.addEventListener("click", updateExpireTime);
    window.addEventListener("keypress", updateExpireTime);
    window.addEventListener("scroll", updateExpireTime);
    window.addEventListener("mousemove", updateExpireTime);
    return () => {
      window.removeEventListener("click", updateExpireTime);
      window.removeEventListener("keypress", updateExpireTime);
      window.removeEventListener("scroll", updateExpireTime);
      window.removeEventListener("mousemove", updateExpireTime);
    };
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      checkIfActive();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line
  }, []);

  return isCurrentSessionActive ? (
    <>
      {children}{" "}
      <ConfirmationModel
        subtitle={
          "Uh-oh! Looks like you've been taking a little break. Just a heads up: You'll be logged out in 10 seconds. Do you like to extend the session?"
        }
        no={() => handleLogOut()}
        yes={() => setIsInactive(false)}
        open={isInactive}
      />
      ;
    </>
  ) : (
    <Navigate to="/" />
  );
};
export default PrivateRoute;
