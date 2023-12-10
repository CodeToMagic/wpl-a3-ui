import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [isCurrentSessionActive, setCurrentSessionActive] = useState(false);
  const [loadingCount, setLoadingCount] = useState(0);
  const [games, setGames] = useState();
  const [filterGames, setFilterGames] = useState();
  const [typeFilter, setTypeFilter] = useState(["All"]);
  const [loggedInUserRole, setLoggedInUserRole] = useState("");
  const [loggedInUserName, setLoggedInUserName] = useState("");
  const [currentUserInfo, setCurrentUserInfo] = useState({});
  const incrementLoading = () => {
    setLoadingCount((prevCount) => prevCount + 1);
  };

  const decrementLoading = () => {
    setLoadingCount((prevCount) => prevCount - 1);
  };
  const applyFilter = (name, type) => {
    const res = games.filter(
      (item) =>
        item?.medicineName.toLowerCase().includes(name.toLowerCase()) &&
        ((item?.isPrescriptionNeeded === true && type === "Prescription") ||
          (item?.isPrescriptionNeeded === false &&
            type === "Non-prescription") ||
          type === "All")
    );
    setFilterGames(res);
  };
  const isLoading = loadingCount > 0;

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        incrementLoading,
        decrementLoading,
        filterGames,
        setGames,
        applyFilter,
        setFilterGames,
        typeFilter,
        setTypeFilter,
        isCurrentSessionActive,
        setCurrentSessionActive,
        loggedInUserRole,
        setLoggedInUserRole,
        loggedInUserName,
        setLoggedInUserName,
        currentUserInfo,
        setCurrentUserInfo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
