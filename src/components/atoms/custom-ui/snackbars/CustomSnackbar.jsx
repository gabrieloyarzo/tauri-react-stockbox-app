import React, { forwardRef } from "react";
import { Snackbar, Alert } from "@mui/material";

const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert elevation={6} ref={ref} {...props} />;
});

const CustomSnackbar = ({ open, closeSnack, message, severity }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={closeSnack}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <SnackbarAlert onClose={closeSnack} severity={severity}>
        {message}
      </SnackbarAlert>
    </Snackbar>
  );
};

export default CustomSnackbar;
