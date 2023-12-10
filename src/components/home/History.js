import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const History = () => {
  const [tableData, setTableData] = useState({
    rows: [],
    columns: [],
  });
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:8080/orders", { withCredentials: true }).then(
      (res) => {
        console.log(res.data.orderHistory);
        const columns = [
          { field: "orderId", headerName: "Order ID", flex: 1 },
          { field: "userId", headerName: "Patient ID", flex: 1 },
          { field: "totalAmount", headerName: "Order Amount ($)", flex: 1 },
          { field: "currentStatus", headerName: "Current Status", flex: 1 },
          { field: "date", headerName: "Date (dd/mm/yyyy)", flex: 1 },
        ];
        const obj = res.data.orderHistory;
        console.log("##", obj);
        const rows = obj.map((item) => {
          return {
            id: item.orderId,
            orderId: item.orderId,
            userId: item.userId,
            totalAmount: item.totalAmount,
            currentStatus: item.currentStatus,
            date: new Date(item.lastUpdate).toLocaleDateString("en-GB"),
          };
        });
        setTableData({ rows, columns });
      },
      (err) => console.log(err)
    );
  }, []);
  return (
    <>
      <h1>Your Order History</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          navigate("/doctor/welcome");
        }}
      >
        Go back
      </Button>
      <DataGrid {...tableData} slots={{ toolbar: GridToolbar }} />
    </>
  );
};

export default History;
