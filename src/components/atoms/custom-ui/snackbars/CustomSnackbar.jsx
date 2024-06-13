import React, { forwardRef } from "react";
import { Snackbar, Alert } from "@mui/material";

const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
  return <Alert elevation={6} ref={ref} {...props} />;
});

const CustomSnackbar = ({ open, closeSnack, text, severity }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={closeSnack}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      style={{
        right: "25%",
      }}
    >
      <SnackbarAlert onClose={closeSnack} severity={severity}>
        {text}
      </SnackbarAlert>
    </Snackbar>
  );
};

export default CustomSnackbar;
