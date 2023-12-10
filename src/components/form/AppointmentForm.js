import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ResponsiveAppBar from "../NavBar";

const AppointmentForm = () => {
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
    navigate("/patient/welcome");
  };

  const handleBook = (props, type) => {
    // console.log(props, type);
    // axios
    // .post("http://localhost:8080/appointment/schedule", {doctorId: props.docto})
    const obj = {
      doctorId: props.doctorId,
      date: props.date,
      slot: type,
    };
    // console.log(obj);
    axios
      .post(
        "http://localhost:8080/appointment/schedule",
        { ...obj },
        {
          withCredentials: true,
        }
      )
      .then(navigate("/patient/welcome"));
  };

  const formatter = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  useEffect(() => {
    if (formData.fromDate !== "" && formData.toDate !== "") {
      //   console.log(formData.fromDate, formData.toDate);
      const formattedFromDate = formatter(formData.fromDate);
      const formattedToDate = formatter(formData.toDate);
      //   console.log(formattedFromDate, formattedToDate);
      axios
        .post(
          "http://localhost:8080/doctors",
          { from: formattedFromDate, to: formattedToDate },
          { withCredentials: true }
        )
        .then((res) => {
          const appointmentData = res.data.doctors;
          const rows = [];
          const columns = [
            { field: "date", headerName: "Date", width: 150 },
            { field: "doctorId", headerName: "Doctor ID", width: 150 },
            { field: "doctorName", headerName: "Doctor Name", width: 200 },
            {
              field: "slotMorning",
              headerName: "Morning Slots Available",
              width: 200,
            },
            {
              field: "scheduleMorning",
              headerName: "Book Morning Slot",
              width: 200,
              renderCell: (params) => (
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ backgroundColor: "green" }}
                  onClick={() => handleBook(params.row, "MORNING")}
                  disabled={params.row.slotMorning === 0}
                >
                  {params.row.slotMorning > 0 ? "Book" : "No Slots"}
                </Button>
              ),
            },
            {
              field: "slotAfternoon",
              headerName: "Afternoon Slots Available",
              width: 200,
            },
            {
              field: "scheduleAfternoon",
              headerName: "Book Afternoon Slot",
              width: 200,
              renderCell: (params) => (
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ backgroundColor: "green" }}
                  onClick={() => handleBook(params.row, "AFTERNOON")}
                  disabled={params.row.slotAfternoon === 0}
                >
                  {params.row.slotAfternoon > 0 ? "Book" : "No Slots"}
                </Button>
              ),
            },
          ];
          for (const date in appointmentData) {
            // console.log(`Date: ${date}`);

            // Iterate over each doctor on the specific date
            for (const doctorId in appointmentData[date]) {
              //   const doctorDetails = appointmentData[date][doctorId];
              //   console.log(`Doctor ID: ${doctorId}`);
              //   console.log(
              //     `Doctor Name: ${doctorDetails.firstName} ${doctorDetails.lastName}`
              //   );

              //   // Iterate over morning and afternoon slots
              //   ["MORNING", "AFTERNOON"].forEach((slot) => {
              //     const slotDetails = doctorDetails[slot];
              //     console.log(`Slot: ${slot}`);
              //     console.log(`Slots Available: ${slotDetails.slotsAvailable}`);
              //   });
              const doctorDetails = appointmentData[date][doctorId];

              // Create a row object
              const row = {
                id: `${date}-${doctorId}`, // Unique identifier for the row
                date: date,
                doctorId: doctorId,
                doctorName: `${doctorDetails.firstName} ${doctorDetails.lastName}`,
                slotMorning: doctorDetails.MORNING.slotsAvailable,
                slotAfternoon: doctorDetails.AFTERNOON.slotsAvailable,
              };
              //   console.log(row);
              rows.push(row);
            }
          }
          //   console.log(rows, columns);
          setTableData({ rows, columns });
        });
    }
  }, [formData.fromDate, formData.toDate]);

  return (
    <div>
      <ResponsiveAppBar />
      <h1>Schedule Appointment</h1>
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
    </div>
  );
};

export default AppointmentForm;
