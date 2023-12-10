import { Button } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../..";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ResponsiveAppBar from "../NavBar";

const PatientHome = () => {
  const navigate = useNavigate();
  const { setCurrentSessionActive, loggedInUserName } =
    useContext(GlobalContext);

  const [data, setData] = useState({ rows: [], columns: [] });
  const [render, setRender] = useState(false);
  const getAppointmentHistory = async () => {
    axios
      .get("http://localhost:8080/appointment/history", {
        withCredentials: true,
      })
      .then((apiData) => {
        const obj = apiData.data.patientAppointmentHistory;
        const rows = obj.map((appointment) => ({
          id: appointment.appointmentId,
          appointmentId: appointment.appointmentId,
          status: appointment.currentStatus,
          date: new Date(
            appointment.appointmentSlots.date
          ).toLocaleDateString(),
          slot: appointment.appointmentSlots.slot,
          doctorId: appointment.appointmentSlots.doctorId,
          doctorFirstName: appointment.appointmentSlots.user.firstName,
          doctorLastName: appointment.appointmentSlots.user.lastName,
          doctorEmail: appointment.appointmentSlots.user.email,
          doctorPhoneNumber: appointment.appointmentSlots.user.phoneNumber,
        }));
        const columns = [
          {
            field: "appointmentId",
            headerName: "Appointment ID",
            width: 150,
          },
          { field: "status", headerName: "Status", width: 150 },
          { field: "date", headerName: "Date", width: 150 },
          { field: "slot", headerName: "Slot", width: 150 },
          { field: "doctorId", headerName: "Doctor ID", width: 150 },
          {
            field: "doctorFirstName",
            headerName: "Doctor First Name",
            width: 200,
          },
          {
            field: "doctorLastName",
            headerName: "Doctor Last Name",
            width: 200,
          },
          { field: "doctorEmail", headerName: "Doctor Email", width: 200 },
          {
            field: "doctorPhoneNumber",
            headerName: "Doctor Phone #",
            width: 200,
          },
          {
            field: "cancel",
            headerName: "Cancel Appointment",
            width: 200,
            renderCell: (params) =>
              params.row.status === "SCHEDULED" ? (
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ backgroundColor: "red" }}
                  onClick={() =>
                    handleCancelAppointment(params.row.appointmentId)
                  }
                >
                  Cancel
                </Button>
              ) : null,
          },
        ];
        setData({ rows, columns });
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  };

  const handleScheduleAppointment = () => {
    // console.log("schedule");
    navigate("/patient/scheduleAppointment");
  };
  useEffect(() => {
    getAppointmentHistory();
  }, [render]);

  const handleCancelAppointment = async (appointmentId) => {
    // console.log(`Cancelled appointment with ID: ${appointmentId}`);
    await axios
      .post(
        "http://localhost:8080/appointment/cancel",
        { appointmentId },
        { withCredentials: true }
      )
      .then((res) => {
        // console.log(res);
        setRender((prev) => !prev);
        // getAppointmentHistory();
      });
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
  return (
    <div className="patient-home-container">
      <ResponsiveAppBar />
      <h1>{`Hello ${loggedInUserName}, Welcome back.`}</h1>
      <div className="appointment-section">
        <h2>Your Appointments</h2>
        <div className="data-grid-container">
          <DataGrid {...data} slots={{ toolbar: GridToolbar }} key={render} />
        </div>
      </div>
    </div>
  );
};

export default PatientHome;
