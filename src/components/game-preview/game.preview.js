import { Box, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../..";
import "./game.preview.css";
const GamePreview = () => {
  const { id } = useParams();
  const [gameData, setGameData] = useState({});
  const { incrementLoading, decrementLoading } = useContext(GlobalContext);
  const getCurrentServerUrl = () => {
    const protocol = window.location.protocol;
    const host = window.location.host;

    return `${protocol}//${host}/`;
  };
  useEffect(() => {
    if (id) {
      const getTheGameData = async (id) => {
        incrementLoading();
        const res = await axios.get(`http://localhost:3001/games/${id}`);
        setGameData(res?.data);
        decrementLoading();
        console.log(process.env.PUBLIC_URL);
      };
      getTheGameData(id);
    }
    // eslint-disable-next-line
  }, [id]);

  return (
    <>
      {gameData && (
        <Paper elevation={3} sx={{ marginRight: "2%", marginLeft: "2%" }}>
          <Box sx={{ padding: 5 }}>
            <Typography variant="h3" gutterBottom sx={{ paddingBottom: 5 }}>
              Game Details
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <img
                  height="200px"
                  className="image-container"
                  width="300px"
                  src={`${getCurrentServerUrl()}${gameData?.image?.path}`}
                  alt={gameData?.image?.description}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography paragraph>Name: {gameData?.name}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography paragraph>
                  Description: {gameData?.description}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography paragraph>Type: {gameData?.type}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography paragraph>
                  Minimum Age: {gameData?.minimumAge}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography paragraph>
                  Pricing (Hourly): {gameData?.pricing?.hourly}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography paragraph>
                  Pricing (Per Game): {gameData?.pricing?.perGame}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      )}
    </>
  );
};
export default GamePreview;