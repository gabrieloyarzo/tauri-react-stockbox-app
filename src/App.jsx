import React, { useEffect } from "react";
import "./App.css";
import GlobalContextProvider from "./context/GlobalContext";
import WebSocketContextProvider from "./context/WebSocketContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./theme/theme";
import { useTheme } from "@mui/material/styles";
import Login from "./components/pages/Login";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import RouterApp from "./routes/RouterApp";

const App = () => {
  const theme = useTheme();
  const themeMode = localStorage.getItem("theme");

  return (
    <ThemeProvider theme={themeMode === "dark" ? darkTheme : lightTheme}>
      <Router>
        <GlobalContextProvider>
            <WebSocketContextProvider>
              <Routes>
                <Route
                  path="/*"
                  element={
                    <ProtectedRoutes>
                      <RouterApp />
                    </ProtectedRoutes>
                  }
                />
                <Route path="/login" element={<Login />} />
              </Routes>
            </WebSocketContextProvider>
        </GlobalContextProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
