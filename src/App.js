import { Backdrop, CircularProgress } from "@mui/material";
import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { GlobalContext } from ".";
import "./App.css";
import MyForm from "./components/form/form";
import GamePreview from "./components/game-preview/game.preview";
import Home from "./components/home/Home";
import { SignIn } from "./components/sign-in/signin";
import { SignUp } from "./components/sign-up/signup";

function App() {
  const { isLoading } = useContext(GlobalContext);
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
            <Route path="/games" element={<Home />}></Route>
            <Route path="/games/new" element={<MyForm />}></Route>
            <Route path="/games/:id" element={<GamePreview />}></Route>
            <Route path="/games/:id/edit" element={<MyForm />}></Route>
            <Route path="/" element={<Navigate to="/games" />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
