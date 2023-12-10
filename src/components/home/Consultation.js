import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const Consultation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tableData, setTableData] = useState({
    rows: [],
    columns: [],
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const [total, setTotal] = useState(0);
  const fetchAllGames = async () => {
    try {
      axios
        .get(`http://localhost:8080/medicines/`, { withCredentials: true })
        .then(
          (res) => {
            const obj = res?.data.medicines;
            // console.log(obj);
            const columns = [
              { field: "medicineId", headerName: "Medicine ID", width: 120 },
              {
                field: "medicineName",
                headerName: "Medicine Name",
                width: 200,
              },
              {
                field: "availableQTY",
                headerName: "Available Quantity",
                width: 180,
              },
              { field: "cost", headerName: "Cost ($)", width: 120 },
            ];
            const rows = obj.map((medcine) => ({
              id: medcine.medicineId,
              medicineId: medcine.medicineId,
              medicineName: medcine.medicineName,
              availableQTY: medcine.availableQTY,
              cost: `${medcine.cost}`,
            }));
            setTableData({ rows, columns });
          },
          (error) => {
            console.log(error);
          }
        );
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrder = async (flag) => {
    console.log(flag);
    const obj = {
      appointmentId: Number(id),
      shouldOrder: flag,
      items: selectedRows.map((item) => {
        return {
          medicineId: item.id,
          qty: 1,
        };
      }),
      totalAmount: total,
    };
    // console.log(obj);
    axios
      .post(
        "http://localhost:8080/order",
        { ...obj },
        { withCredentials: true }
      )
      .then(navigate("/doctor/welcome"), (e) => console.log(e));
  };

  const handleCancel = () => {
    navigate("/doctor/welcome");
  };

  useEffect(() => {
    fetchAllGames();
  }, []);

  return (
    <>
      <h1>Consultation for Appointment # {`${id}`}</h1>
      <h3>Total Amount: ${total}</h3>
      <DataGrid
        checkboxSelection
        // onRowSelectionModelChange={(newRowSelectionModel) => {
        //   setSelectedRows(newRowSelectionModel);
        // }}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          let temp = 0;
          const selectedMedicines = newRowSelectionModel.map((id) => {
            const selectedMedicine = tableData.rows.find(
              (medicine) => medicine.id === id
            );
            temp += Number(selectedMedicine.cost);
            return {
              id,
              cost: selectedMedicine.cost,
            };
          });
          setSelectedRows(selectedMedicines);
          setTotal(temp);
        }}
        {...tableData}
        slots={{ toolbar: GridToolbar }}
      />
      <Button
        variant="outlined"
        color="primary"
        onClick={() => handleOrder(true)}
        disabled={total <= 0}
      >
        Place Order
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => handleOrder(false)}
        disabled={total <= 0}
      >
        Generate Prescription Only
      </Button>
      <Button
        variant="outlined"
        color="primary"
        style={{ color: "red", borderColor: "red" }}
        onClick={handleCancel}
      >
        Cancel
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => console.log(selectedRows)}
      >
        Show selected rows
      </Button>
    </>
  );
};

export default Consultation;
