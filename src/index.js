import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [loadingCount, setLoadingCount] = useState(0);
  const incrementLoading = () => {
    setLoadingCount((prevCount) => prevCount + 1);
  };

  const decrementLoading = () => {
    setLoadingCount((prevCount) => prevCount - 1);
  };
  const isLoading = loadingCount > 0;

  return (
    <GlobalContext.Provider
      value={{ isLoading, incrementLoading, decrementLoading }}
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
