import React, { useEffect } from "react";
import "./App.css";
import GlobalContextProvider from "./context/GlobalContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./theme/theme";
import { useTheme } from "@mui/material/styles";
import Login from "./components/pages/Login";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import RouterApp from "./routes/RouterApp";

const App = () => {
  useEffect(() => {
    // Establece la conexión al servidor WebSocket
    const socket = new WebSocket(`${import.meta.env.VITE_API_URL}`);

    // Maneja eventos del WebSocket
    socket.onopen = () => {
      console.log("WebSocket connected");
      // Puedes enviar mensajes al servidor aquí si es necesario
      socket.send("Hello Server!");
    };

    socket.onmessage = (event) => {
      console.log("Message from server:", event.data);
      // Maneja los mensajes recibidos del servidor
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
      // Puedes manejar la lógica cuando se cierra la conexión
    };

    // Cierra la conexión al desmontar el componente
    return () => {
      socket.close();
    };
  }, []); // Este efecto se ejecuta solo una vez al montar el componente

  const theme = useTheme();
  const themeMode = localStorage.getItem("theme");

  return (
    <ThemeProvider theme={themeMode === "dark" ? darkTheme : lightTheme}>
      <GlobalContextProvider>
        <Router>
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
        </Router>
      </GlobalContextProvider>
    </ThemeProvider>
  );
};

export default App;
