import { Button } from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../..";

const DoctorHome = () => {
  const navigate = useNavigate();
  const { setCurrentSessionActive, loggedInUserName } =
    useContext(GlobalContext);
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
  return (
    <>
      <h1>{`Hello Dr.${loggedInUserName}`}</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          handleLogOut();
        }}
      >
        logout
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          navigate("/doctor/purchase");
        }}
      >
        Purchase Medicine
      </Button>
    </>
  );
};

export default DoctorHome;
