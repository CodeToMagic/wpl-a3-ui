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
import axios from "axios";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { GlobalContext } from "../..";
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const addressRegex = /^[a-zA-Z0-9, -]*$/;
const phoneNumberRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
const nameSchema = Yup.string()
  .matches(/^[A-Za-z ]+$/, "Only alphabets and spaces are allowed")
  .required("Field is required");
const validationSchema = yup.object().shape({
  fname: nameSchema,
  lname: nameSchema,
  username: yup
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
  const { isCurrentSessionActive = false } = useContext(GlobalContext);
  useEffect(() => {
    if (isCurrentSessionActive) {
      navigate("/games");
    }
    // eslint-disable-next-line
  }, [isCurrentSessionActive]);
  const formik = useFormik({
    initialValues: {
      username: "",
      fname: "",
      lname: "",
      password: "",
      phoneNumber: "",
      address: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      axios
        .post(
          `http://localhost:3001/auth/register`,
          { ...values },
          {
            withCredentials: true,
          }
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
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
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
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="fname"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={formik.values.fname}
                  onChange={formik.handleChange}
                  error={
                    formik?.touched?.fname && Boolean(formik?.errors?.fname)
                  }
                  helperText={formik?.touched?.fname && formik?.errors?.fname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lname"
                  autoComplete="family-name"
                  value={formik.values.lname}
                  onChange={formik.handleChange}
                  error={
                    formik?.touched?.lname && Boolean(formik?.errors?.lname)
                  }
                  helperText={formik?.touched?.lname && formik?.errors?.lname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="username"
                  autoComplete="email"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  error={
                    formik?.touched?.username &&
                    Boolean(formik?.errors?.username)
                  }
                  helperText={
                    formik?.touched?.username && formik?.errors?.username
                  }
                />
              </Grid>
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
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={formik.handleSubmit}
            >
              Sign Up
            </Button>
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
