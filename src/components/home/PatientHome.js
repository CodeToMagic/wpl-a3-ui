import { Button } from "@mui/material";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../..";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";

const VISIBLE_FIELDS = ["name", "rating", "country", "dateCreated", "isAdmin"];

const PatientHome = () => {
  const navigate = useNavigate();
  const { setCurrentSessionActive, loggedInUserName } =
    useContext(GlobalContext);

  useEffect(() => {
    const getAppointmentHistory = async () => {
      axios
        .get("http://localhost:8080/appointment/history", {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
        });
    };
    getAppointmentHistory();
  }, []);

  const { data } = useDemoData({
    dataSet: "Employee",
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100,
  });

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
      <h1>{`Hello ${loggedInUserName}`}</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          handleLogOut();
        }}
      >
        logout
      </Button>
      Your appointments
      <div style={{ height: 800, width: "100%" }}>
        <DataGrid {...data} slots={{ toolbar: GridToolbar }} />
      </div>
    </>
  );
};

export default PatientHome;
