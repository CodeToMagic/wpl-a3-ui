import { Backdrop, CircularProgress } from "@mui/material";
import axios from "axios";
import { useContext, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { GlobalContext } from ".";
import "./App.css";
import MyForm from "./components/form/form";
import GamePreview from "./components/game-preview/game.preview";
import Home from "./components/home/Home";
import PatientHome from "./components/home/PatientHome";
import DoctorHome from "./components/home/DoctorHome";
import PurchaseMedicine from "./components/PurchaseMedicine/PurchaseMedicine.js";
import PrivateRoute from "./components/private-route";
import { SignIn } from "./components/sign-in/signin";
import { SignUp } from "./components/sign-up/signup";

function App() {
  const {
    isLoading,
    setCurrentSessionActive,
    setLoggedInUserRole,

    setLoggedInUserName,
  } = useContext(GlobalContext);

  useEffect(() => {
    const isUserAuthenticated = async () => {
      axios
        .get("http://localhost:8080/auth/isAuthenticated", {
          withCredentials: true,
        })
        .then(
          (res) => {
            if (res.data.userInfo) {
              setCurrentSessionActive(true);
              setLoggedInUserRole(res.data.userInfo.userRole);
              setLoggedInUserName(res.data.userInfo.firstName);
            } else {
              setCurrentSessionActive(false);
            }
          },
          (err) => {
            setCurrentSessionActive(false);
          }
        );
    };
    isUserAuthenticated();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="global-padding">
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<SignIn />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route
              path="/games"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/patient/welcome"
              element={
                <PrivateRoute>
                  <PatientHome />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/doctor/welcome"
              element={
                <PrivateRoute>
                  <DoctorHome />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/doctor/purchase"
              element={
                <PrivateRoute>
                  <PurchaseMedicine />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/games/new"
              element={
                <PrivateRoute>
                  <MyForm />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/games/:id"
              element={
                <PrivateRoute>
                  <GamePreview />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/games/:id/edit"
              element={
                <PrivateRoute>
                  <MyForm />
                </PrivateRoute>
              }
            ></Route>
            <Route path="/" element={<Navigate to="/login" />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
