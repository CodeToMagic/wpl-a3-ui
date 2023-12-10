import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../..";
import TextField from "@mui/material/TextField";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ResponsiveAppBar from "../NavBar";

const DoctorHome = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
  });
  const [tableData, setTableData] = useState({
    rows: [],
    columns: [],
  });
  //   console.log(formData);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleCancel = () => {
    console.log("Cancel");
  };
  const { setCurrentSessionActive, loggedInUserName } =
    useContext(GlobalContext);

  const formatter = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };
  useEffect(() => {
    if (formData.fromDate !== "" && formData.toDate !== "") {
      const formattedFromDate = formatter(formData.fromDate);
      const formattedToDate = formatter(formData.toDate);
      //   console.log(formattedFromDate, formattedToDate);
      axios
        .post(
          "http://localhost:8080/doctors/appointments",
          { from: formattedFromDate, to: formattedToDate },
          { withCredentials: true }
        )
        .then((res) => {
          //   console.log("--", res.data.doctorSlots);
          const rows = [];
          const columns = [
            { field: "date", headerName: "Date (dd/mm/yyyy)", width: 150 },
            { field: "slot", headerName: "Slot", width: 150 },
            { field: "patientId", headerName: "Patient ID", width: 120 },
            { field: "status", headerName: "Status", width: 120 },
            { field: "patientName", headerName: "Patient Name", width: 200 },
            { field: "patientPhone", headerName: "Patient Phone", width: 150 },
          ];
          const appointments = res.data.doctorSlots;
          //   console.log("###", appointments);
          for (let i = 0; i < appointments.length; ++i) {
            // console.log("#", i, appointments[i]);
            const outerObj = appointments[i];
            for (
              let j = 0;
              j < appointments[i]["AppointmentHistory"].length;
              ++j
            ) {
              //   console.log("*", appointments[i]["AppointmentHistory"][j]);
              const innerObj = appointments[i]["AppointmentHistory"][j];
              //   console.log(outerObj, innerObj);
              if (innerObj.currentStatus !== "CANCELED") {
                const row = {
                  id: `${outerObj.slotId}-${innerObj.appointmentId}`,
                  date: new Date(outerObj.date).toLocaleDateString("en-GB"),
                  slot: outerObj.slot,
                  patientId: innerObj.patientId,
                  status: innerObj.currentStatus,
                  patientName: `${innerObj.user.firstName} ${innerObj.user.lastName}`,
                  patientPhone: `${innerObj.user.phoneNumber}`,
                };
                rows.push(row);
              }
            }
          }
          setTableData({ rows, columns });
        });
    }
  }, [formData.fromDate, formData.toDate]);
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
      <ResponsiveAppBar isDoctor={true} />
      <h1>{`Hello Dr.${loggedInUserName}, welcome back.`}</h1>
      {/* <Button
        variant="contained"
        color="primary"
        onClick={() => {
          handleLogOut();
        }}
      >
        logout
      </Button> */}
      <h2>Please select a date range to view your appointments</h2>
      <form>
        <TextField
          fullWidth
          id="fromDate"
          name="fromDate"
          label="From Date"
          type="date"
          value={formData.fromDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          id="toDate"
          name="toDate"
          label="To Date"
          type="date"
          value={formData.toDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          margin="normal"
          required
        />
        {formData.fromDate !== "" && formData.toDate !== "" && (
          <DataGrid {...tableData} slots={{ toolbar: GridToolbar }} />
        )}
        <Button variant="outlined" color="primary" onClick={handleCancel}>
          Cancel
        </Button>
      </form>
    </>
  );
};

export default DoctorHome;
