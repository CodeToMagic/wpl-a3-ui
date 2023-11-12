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
import { useState } from "react";
import CustomCard from "../card/card";
import { data } from "../mockdata";
import "./Home.css";

const Home = () => {
  const categories = ["Residential", "Commercial", "Industrial"];
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  return (
    <>
      <div className="container">
        <Grid2 container rowSpacing={1} columnSpacing={1} direction={"column"}>
          <Grid2>
            <Typography variant="h6" gutterBottom color={"primary"}>
              Home
            </Typography>
          </Grid2>
          <Grid2>
            <Typography variant="h3" gutterBottom>
              Arcade
            </Typography>
          </Grid2>
          <Grid2>
            <Typography variant="h6" gutterBottom>
              This is the list of available games
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
                    console.log(ele?.target?.value);
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
                    console.log(ele);
                  }}
                  style={{ backgroundColor: "white" }}
                >
                  {categories.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 xs={5} lg={1}>
              <Button variant="contained">Search</Button>
            </Grid2>
            <Grid2 xs={6} lg={2}>
              <Button variant="outlined" style={{ backgroundColor: "white" }}>
                Add new game
              </Button>
            </Grid2>
          </Grid2>
        </Grid2>
      </div>
      <br />
      <div>
        <Grid2 container>
          {data.map((game) => (
            <Grid2 xs={12} md={6} lg={3} marginBlockEnd={3} key={game._id}>
              <CustomCard {...game} />
            </Grid2>
          ))}
        </Grid2>
      </div>
    </>
  );
};
export default Home;
