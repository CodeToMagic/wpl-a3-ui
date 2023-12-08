import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../..";
import ConfirmationModel from "../confirmation/confirmation";
import "./game.preview.css";
const GamePreview = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [gameData, setGameData] = useState({});
  const [modelOpen, setModelOpen] = useState(false);
  const { incrementLoading, decrementLoading } = useContext(GlobalContext);
  const getCurrentServerUrl = () => {
    const protocol = window.location.protocol;
    const host = window.location.host;
    return `${protocol}//${host}/`;
  };
  const homePage = () => {
    navigate("/games");
  };
  const editPage = () => {
    navigate(`/games/${id}/edit`);
  };
  const handleClose = () => {
    setModelOpen(false);
  };
  const handleAccept = async () => {
    setModelOpen(false);
    incrementLoading();
    await axios.delete(`http://localhost:8080/medicines/${id}`, {
      withCredentials: true,
    });
    decrementLoading();
    navigate("/games");
  };
  useEffect(() => {
    if (id) {
      const getTheGameData = async (id) => {
        incrementLoading();
        const res = await axios.get(`http://localhost:8080/medicines/${id}`, {
          withCredentials: true,
        });
        // console.log(res?.data.medicine);
        setGameData(res?.data.medicine);
        decrementLoading();
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
            <Grid container>
              <Grid
                container
                direction={"row"}
                justifyContent={"space-between"}
              >
                <Grid item>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ paddingBottom: 5 }}
                  >
                    Medicine Details
                  </Typography>
                </Grid>
                <Grid item>
                  <Button variant="outlined" onClick={homePage}>
                    Home
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <img
                  height="200px"
                  className="image-container"
                  width="300px"
                  src={gameData?.imageUrl}
                  alt={gameData?.description}
                  title={gameData?.description}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography paragraph>
                  Name: {gameData?.medicineName}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography paragraph>
                  Description: {gameData?.description}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography paragraph>
                  Type:{" "}
                  {gameData?.isPrescriptionNeeded === true
                    ? "Prescription"
                    : "Non-prescription"}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography paragraph>Cost: {`$${gameData?.cost}`}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography paragraph>
                  Available Quantity: {gameData?.availableQTY}
                </Typography>
              </Grid>
              <Grid container direction={"row"} spacing={1}>
                <Grid item>
                  <Button variant="contained" onClick={editPage}>
                    Edit
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      setModelOpen(true);
                    }}
                  >
                    Delete
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <ConfirmationModel
            title={"Are you sure to delete?"}
            subtitle={
              "Caution: Deleting this item is irreversible. Are you sure you want to proceed? Your decision cannot be undone."
            }
            open={modelOpen}
            no={handleClose}
            yes={handleAccept}
          />
        </Paper>
      )}
    </>
  );
};
export default GamePreview;
