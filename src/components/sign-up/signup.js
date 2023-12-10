import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Alert } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { GlobalContext } from "../..";
import ResponsiveAppBar from "../NavBar";
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const addressRegex = /^[a-zA-Z0-9, -]*$/;
const phoneNumberRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
const nameSchema = yup
  .string()
  .matches(/^[A-Za-z ]+$/, "Only alphabets and spaces are allowed")
  .required("Field is required");
const validationSchema = yup.object().shape({
  firstName: nameSchema,
  lastName: nameSchema,
  height: yup
    .number()
    .typeError("Height must be a number")
    .min(1, "Height must be greater than 0")
    .required("Height is required"),
  weight: yup
    .number()
    .typeError("Weight must be a number")
    .min(1, "Weight must be greater than 0")
    .required("Weight is required"),
  dob: yup.string().required("Date of Birth is required"),
  creditCard: yup
    .string()
    .matches(/^\d{16}$/, "Invalid credit card number")
    .required("Credit card number is required"),
  gender: yup.string().required("Gender is required"),
  userRole: yup.string().required("Role is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .matches(
      passwordRegex,
      "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol"
    )
    .required("Password is required"),
  phoneNumber: yup
    .string()
    .matches(phoneNumberRegex, "Invalid phone number")
    .required("Phone number is required"),
  address: yup
    .string()
    .matches(
      addressRegex,
      "Invalid address format. Only alphanumeric characters, commas, and hyphens are allowed."
    )
    .required("Address is required"),
});
const validationSchemaForUpdate = yup.object().shape({
  firstName: nameSchema,
  lastName: nameSchema,
  height: yup
    .number()
    .typeError("Height must be a number")
    .min(1, "Height must be greater than 0")
    .required("Height is required"),
  weight: yup
    .number()
    .typeError("Weight must be a number")
    .min(1, "Weight must be greater than 0")
    .required("Weight is required"),
  creditCard: yup
    .string()
    .matches(/^\d{16}$/, "Invalid credit card number")
    .required("Credit card number is required"),
  gender: yup.string().required("Gender is required"),
  userRole: yup.string().required("Role is required"),
  phoneNumber: yup
    .string()
    .matches(phoneNumberRegex, "Invalid phone number")
    .required("Phone number is required"),
  address: yup
    .string()
    .matches(
      addressRegex,
      "Invalid address format. Only alphanumeric characters, commas, and hyphens are allowed."
    )
    .required("Address is required"),
});
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}

      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export const SignUp = () => {
  const navigate = useNavigate();
  const [isError, setError] = useState(false);
  const { isCurrentSessionActive = false, currentUserInfo } =
    useContext(GlobalContext);
  // console.log(currentUserInfo);
  const [dynamicValidationSchema, setDynamicValidationSchema] =
    useState(validationSchema);
  useEffect(() => {
    if (isCurrentSessionActive) {
      formik.setValues({
        firstName: currentUserInfo.firstName,
        lastName: currentUserInfo.lastName,
        phoneNumber: currentUserInfo.phoneNumber,
        address: currentUserInfo.address,
        gender: currentUserInfo.gender,
        creditCard: currentUserInfo.creditCard,
        userRole: currentUserInfo.userRole,
        height: currentUserInfo.height,
        weight: currentUserInfo.weight,
      });
      setDynamicValidationSchema(validationSchemaForUpdate);
    }
    // eslint-disable-next-line
  }, [isCurrentSessionActive]);
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      phoneNumber: "",
      address: "",
      gender: "",
      creditCard: "",
      userRole: "",
      height: "",
      weight: "",
      dob: "",
    },
    validationSchema: dynamicValidationSchema,
    onSubmit: async (values) => {
      if (isCurrentSessionActive) {
        axios
          .put(
            `http://localhost:8080/auth/update`,
            { ...values },
            { withCredentials: true }
          )
          .then(
            (res) => {
              if (res.status === 200) {
                navigate("/");
              }
            },
            (err) => {
              setError(true);
              console.log(err);
            }
          );
      } else {
        axios.post(`http://localhost:8080/auth/register`, { ...values }).then(
          (res) => {
            if (res.status === 200) {
              navigate("/");
            }
          },
          (err) => {
            setError(true);
            console.log(err);
          }
        );
      }
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      {isCurrentSessionActive && (
        <ResponsiveAppBar isDoctor={currentUserInfo.userRole === "DOCTOR"} />
      )}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isCurrentSessionActive ? "Update profile" : " Sign Up"}
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={
                    formik?.touched?.firstName &&
                    Boolean(formik?.errors?.firstName)
                  }
                  helperText={
                    formik?.touched?.firstName && formik?.errors?.firstName
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={
                    formik?.touched?.lastName &&
                    Boolean(formik?.errors?.lastName)
                  }
                  helperText={
                    formik?.touched?.lastName && formik?.errors?.lastName
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender"
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  error={formik.touched.gender && Boolean(formik.errors.gender)}
                  fullWidth
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
                {formik.touched.gender && formik.errors.gender && (
                  <FormHelperText error>{formik.errors.gender}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel id="user-role">Role</InputLabel>
                <Select
                  labelId="user-role"
                  id="userRole"
                  name="userRole"
                  value={formik.values.userRole}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.userRole && Boolean(formik.errors.userRole)
                  }
                  fullWidth
                >
                  <MenuItem value={"ADMIN"}>Admin</MenuItem>
                  <MenuItem value={"DOCTOR"}>Doctor</MenuItem>
                  <MenuItem value={"PATIENT"}>Patient</MenuItem>
                </Select>
                {formik.touched.userRole && formik.errors.userRole && (
                  <FormHelperText error>
                    {formik.errors.userRole}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="height"
                  label="Height"
                  name="height"
                  autoComplete="off"
                  value={formik.values.height}
                  onChange={formik.handleChange}
                  error={formik.touched.height && Boolean(formik.errors.height)}
                  helperText={formik.touched.height && formik.errors.height}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">cm</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="weight"
                  label="Weight"
                  name="weight"
                  autoComplete="off"
                  value={formik.values.weight}
                  onChange={formik.handleChange}
                  error={formik.touched.weight && Boolean(formik.errors.weight)}
                  helperText={formik.touched.weight && formik.errors.weight}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">kg</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              {!isCurrentSessionActive && (
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="dob"
                    label="Date of Birth"
                    type="date"
                    name="dob"
                    autoComplete="off"
                    value={formik.values.dob}
                    onChange={formik.handleChange}
                    error={formik.touched.dob && Boolean(formik.errors.dob)}
                    helperText={formik.touched.dob && formik.errors.dob}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="creditCard"
                  label="Credit Card Number"
                  name="creditCard"
                  autoComplete="credit-card-number"
                  value={formik.values.creditCard}
                  onChange={formik.handleChange}
                  error={
                    formik?.touched?.creditCard &&
                    Boolean(formik?.errors?.creditCard)
                  }
                  helperText={
                    formik?.touched?.creditCard && formik?.errors?.creditCard
                  }
                />
              </Grid>
              {!isCurrentSessionActive && (
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={
                      formik?.touched?.email && Boolean(formik?.errors?.email)
                    }
                    helperText={formik?.touched?.email && formik?.errors?.email}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phnum"
                  label="Phone Number"
                  name="phoneNumber"
                  autoComplete="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  error={
                    formik?.touched?.phoneNumber &&
                    Boolean(formik?.errors?.phoneNumber)
                  }
                  helperText={
                    formik?.touched?.phoneNumber && formik?.errors?.phoneNumber
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={
                    formik?.touched?.address && Boolean(formik?.errors?.address)
                  }
                  helperText={
                    formik?.touched?.address && formik?.errors?.address
                  }
                />
              </Grid>
              {!isCurrentSessionActive && (
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik?.touched?.password &&
                      Boolean(formik?.errors?.password)
                    }
                    helperText={
                      formik?.touched?.password && formik?.errors?.password
                    }
                  />
                </Grid>
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={formik.handleSubmit}
            >
              {isCurrentSessionActive ? "Update profile" : " Sign Up"}
            </Button>
            {!isCurrentSessionActive && (
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    variant="body2"
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            )}
          </Box>
          <br />
          {isError && (
            <Alert severity="error">
              Oops! Something went wrong. If you are already registered with our
              system. If you forgot your password, use the 'Forgot Password'
              option. For further assistance, please reach out to our support
              team.
            </Alert>
          )}
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};
