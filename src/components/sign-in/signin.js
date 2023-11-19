import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Snackbar } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
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
const validationSchema = yup.object().shape({
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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export const SignIn = () => {
  const navigate = useNavigate();
  const [isError, setError] = useState(false);
  const { isCurrentSessionActive = false, setCurrentSessionActive } =
    useContext(GlobalContext);
  useEffect(() => {
    if (isCurrentSessionActive) {
      navigate("/games");
    }
    // eslint-disable-next-line
  }, [isCurrentSessionActive]);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      axios
        .post("http://localhost:3001/auth/login", values, {
          withCredentials: true,
        })
        .then(
          (response) => {
            if (response.status === 200) {
              setCurrentSessionActive(true);
              navigate("/games");
            }
          },
          (error) => {
            setError(true);
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
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="username"
              autoComplete="email"
              autoFocus
              value={formik.values.username}
              onChange={formik.handleChange}
              error={
                formik?.touched?.username && Boolean(formik?.errors?.username)
              }
              helperText={formik?.touched?.username && formik?.errors?.username}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={
                formik?.touched?.password && Boolean(formik?.errors?.password)
              }
              helperText={formik?.touched?.password && formik?.errors?.password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={formik.handleSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link
                  variant="body2"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        {isError && (
          <Snackbar
            variant="solid"
            color="danger"
            autoHideDuration={3000}
            open={isError}
            onClose={() => {
              setError(false);
            }}
            style={{}}
          >
            login failed due to invalid credentials
          </Snackbar>
        )}
      </Container>
    </ThemeProvider>
  );
};
