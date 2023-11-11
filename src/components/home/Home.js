import { Button, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CustomCard from "../card/card";
import { data } from "../mockdata";
import "./Home.css";

const Home = () => {
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

          <Grid2 container direction={"row"} rowSpacing={0}>
            <Grid2 xs={6} md={2}>
              Name
            </Grid2>
            <Grid2 xs={6} md={2}>
              Filter
            </Grid2>
            <Grid2 xs={6} md={1}>
              <Button variant="contained">Search</Button>
            </Grid2>
            <Grid2 xs={6} md={2}>
              <Button variant="contained">Add new game</Button>
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