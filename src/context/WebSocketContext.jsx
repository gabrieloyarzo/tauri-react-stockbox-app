// WebSocketContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "./SnackbarContext";

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketContext = createContext();

const WebSocketContextProvider = ({ children }) => {
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [webSocket, setWebSocket] = useState(null);

  const connectWebSocket = () => {
    const ws = new WebSocket(`${import.meta.env.VITE_API_URL}`);
    ws.addEventListener("message", (message) => {
      showSnackbar(message.data, "info");
    });

    ws.addEventListener("error", () => {
      console.error("Error conectando a WebSocket");
    });

    ws.addEventListener("open", () => {
      console.log("WebSocket conexión establecida");
    });
    setWebSocket(ws);
  };

  const disconnectWebSocket = () => {
    if (webSocket) {
      webSocket.close();
      setWebSocket(null);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      connectWebSocket();
    }
    else {
      disconnectWebSocket();
      navigate("/login");
    }
  }, []);

  const value = {
    connectWebSocket,
    disconnectWebSocket,
    webSocket,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketContextProvider;
