import React, { createContext, useState, useContext } from "react";
import CustomSnackbar from "../components/atoms/custom-ui/CustomSnackbar";

const SnackbarContext = createContext();

export const useSnackbar = () => useContext(SnackbarContext);

const SnackbarContextProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const showSnackbar = (message, severity = "info") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <CustomSnackbar
        open={snackbar.open}
        closeSnack={handleClose}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </SnackbarContext.Provider>
  );
};

export default SnackbarContextProvider;
