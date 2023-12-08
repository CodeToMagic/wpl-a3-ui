import { Grid, Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { GlobalContext } from "../..";

const validationSchema = yup.object().shape({
  medicineName: yup.string().required("Medicine name is required"),
  availableQTY: yup
    .number()
    .integer("Value must be an integer")
    .positive("Value must be greater than 0"),
  cost: yup.number().positive("Value must be greater than 0"),
  isPrescriptionNeeded: yup.boolean().required("This field is required"),
  description: yup.string().required("Description is required"),
  imageUrl: yup.string().url("Invalid URL").required("Image URL is required"),
});

const MyForm = () => {
  const { id } = useParams();
  const [isEdit, setEdit] = useState(id !== undefined);
  const { incrementLoading, decrementLoading } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [gameData, setGameData] = useState({
    medicineName: "",
    description: "",
    availableQTY: "",
    cost: "",
    isPrescriptionNeeded: "",
    imageUrl: "",
    isEdit: false,
  });
  const getTheGameData = async (id) => {
    incrementLoading();
    try {
      axios
        .get(`http://localhost:3001/games/${id}`, {
          withCredentials: true,
        })
        .then(
          (res) => {
            if (res?.data !== null) {
              setGameData(res?.data);
            } else {
              setEdit(false);
            }
          },
          (error) => {
            setEdit(false);
          }
        );
    } catch (error) {
      console.log(error);
    } finally {
      decrementLoading();
    }
  };

  useEffect(() => {
    if (id) {
      getTheGameData(id);
    }
    // eslint-disable-next-line
  }, [id]);
  useEffect(() => {
    formik.setValues({
      medicineName: gameData?.medicineName,
      availableQTY: gameData?.availableQTY,
      description: gameData?.description,
      cost: gameData?.cost,
      isPrescriptionNeeded: gameData?.isPrescriptionNeeded,
      imageUrl: gameData?.imageUrl,
    });
    // eslint-disable-next-line
  }, [gameData]);
  const formik = useFormik({
    initialValues: {
      medicineName: gameData?.medicineName,
      availableQTY: gameData?.availableQTY,
      description: gameData?.description,
      cost: gameData?.cost,
      isPrescriptionNeeded: gameData?.isPrescriptionNeeded,
      imageUrl: gameData?.imageUrl,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let res;
      if (!isEdit) {
        // console.log(values);
        res = await axios.post(
          `http://localhost:8080/medicines/create`,
          { ...values },
          {
            withCredentials: true,
          }
        );
      } else {
        res = await axios.put(
          `http://localhost:3001/games/${id}/edit`,
          { ...values },
          {
            withCredentials: true,
          }
        );
      }
      navigate(`/games/${res?.data?.medicineId}`);
    },
  });
  const handleCancel = () => {
    if (isEdit) {
      navigate(`/games/${id}`);
    } else {
      navigate("/games");
    }
  };
  return (
    <Paper elevation={3} sx={{ marginRight: "2%", marginLeft: "2%" }}>
      <Box sx={{ padding: 5 }}>
        <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>
          {!isEdit ? "New Game" : "Edit Game"}
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="medicineName"
                label="Medicine Name"
                name="medicineName"
                required
                fullWidth
                value={formik.values.medicineName}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="availableQTY"
                label="Quantity"
                name="availableQTY"
                required
                fullWidth
                value={formik.values.availableQTY}
                onChange={formik.handleChange}
                type="number"
                inputProps={{
                  step: 1,
                  min: 1,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="cost"
                label="Cost"
                name="cost"
                required
                fullWidth
                value={formik.values.cost}
                onChange={formik.handleChange}
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputLabel id="prescription-needed">
                Prescription needed?
              </InputLabel>
              <Select
                labelId="prescription-needed"
                id="isPrescriptionNeeded"
                name="isPrescriptionNeeded"
                value={formik.values.isPrescriptionNeeded}
                onChange={formik.handleChange}
                error={
                  formik.touched.isPrescriptionNeeded &&
                  Boolean(formik.errors.isPrescriptionNeeded)
                }
                fullWidth
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
              {formik.touched.isPrescriptionNeeded &&
                formik.errors.isPrescriptionNeeded && (
                  <FormHelperText error>
                    {formik.errors.isPrescriptionNeeded}
                  </FormHelperText>
                )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                fullWidth
                multiline
                rows={3}
                value={formik.values.description}
                required
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Image URL"
                name="imageUrl"
                fullWidth
                value={formik.values.imageUrl}
                required
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item>
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Paper>
  );
};

export default MyForm;
