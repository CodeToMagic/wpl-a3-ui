import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../..";
import CustomCard from "../card/card";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [type, setType] = useState("All");

  const {
    filterGames,
    setGames,
    applyFilter,
    incrementLoading,
    decrementLoading,
    setFilterGames,
    typeFilter,
    setTypeFilter,
    setCurrentSessionActive,
  } = useContext(GlobalContext);
  const fetchAllGames = () => {
    incrementLoading();
    try {
      axios
        .get(`http://localhost:8080/medicines/`, { withCredentials: true })
        .then(
          (res) => {
            // setGames(res?.data.medcines);
            // setFilterGames(res?.data.medcines);
            // console.log("--", res?.data);
            // const obj = res?.data;
            // console.log("---", typeof obj.medicines, "###", obj.medicines);
            // const uniqueTypes = [
            // ...new Set(res?.data.map((item) => item.type)),
            // ];
            setTypeFilter(["Prescription", "Non-prescription", "All"]);
            const obj = res?.data.medicines;
            setGames(obj);
            setFilterGames(obj);
            decrementLoading();
          },
          (error) => {
            decrementLoading();
            console.log(error);
          }
        );
    } catch (error) {
      decrementLoading();
      console.log(error);
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
    fetchAllGames();
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   console.log("filterGames: ", filterGames);
  // }, [filterGames]);

  return (
    <>
      <div className="container">
        <Grid2 container rowSpacing={1} columnSpacing={1} direction={"column"}>
          <Grid2>
            <Grid2
              container
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Grid2>
                <Typography
                  variant="h6"
                  gutterBottom
                  color={"primary"}
                  onClick={() => {
                    window.location.reload();
                  }}
                  style={{
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  Home
                </Typography>
              </Grid2>
              <Grid2>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    handleLogOut();
                  }}
                >
                  logout
                </Button>
              </Grid2>
            </Grid2>
          </Grid2>
          <Grid2>
            <Typography variant="h3" gutterBottom>
              Inventory
            </Typography>
          </Grid2>
          <Grid2>
            <Typography variant="h6" gutterBottom>
              This is the list of available medicines
            </Typography>
          </Grid2>

          <Grid2 container direction={"row"} rowSpacing={1} columnSpacing={1}>
            <Grid2 xs={12} lg={4}>
              <div>
                <TextField
                  id="name"
                  label="Name"
                  name="name"
                  fullWidth
                  value={name}
                  onChange={(ele) => {
                    setName(ele?.target?.value);
                  }}
                  InputProps={{
                    style: { backgroundColor: "white" },
                  }}
                />
              </div>
            </Grid2>
            <Grid2 xs={12} lg={4}>
              <FormControl fullWidth size="medium">
                <InputLabel id="type">Type</InputLabel>
                <Select
                  labelId="type"
                  id="type"
                  value={type}
                  label="Age"
                  onChange={(ele) => {
                    setType(ele?.target?.value);
                  }}
                  style={{ backgroundColor: "white" }}
                >
                  {typeFilter.map((item, index) => (
                    <MenuItem value={item} key={index}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 xs={5} lg={1}>
              <Button
                variant="contained"
                onClick={() => {
                  applyFilter(name, type);
                }}
              >
                Search
              </Button>
            </Grid2>
            <Grid2 xs={6} lg={2}>
              <Button
                variant="outlined"
                style={{ backgroundColor: "white" }}
                onClick={() => {
                  navigate("/admin/new");
                }}
              >
                Add new medicine
              </Button>
            </Grid2>
          </Grid2>
        </Grid2>
      </div>
      <br />
      <div>
        <Grid2 container>
          {filterGames &&
            filterGames.map((game) => (
              <Grid2
                xs={12}
                md={6}
                lg={3}
                marginBlockEnd={3}
                key={game.medicineId}
              >
                <CustomCard {...game} />
              </Grid2>
            ))}
        </Grid2>
      </div>
    </>
  );
};
export default Home;
